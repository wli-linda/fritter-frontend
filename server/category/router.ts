import type {Request, Response} from 'express';
import express from 'express';
import CategoryCollection from './collection';
import FollowCollection from '../follow/collection';
import * as userValidator from '../user/middleware';
import * as categoryValidator from '../category/middleware';
import * as util from './util';
import { constructFreetResponse } from '../freet/util';

const router = express.Router();

/**
 * Get freets feed filtered by a user category.
 *
 * @name GET /api/categories/:categoryId?/freets
 *
 * @return {FreetResponse[]} - An array of freets by the users in this category
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the category
 * @throws {404} - If the categoryId is not valid
 *
 */
 router.get(
  '/:categoryId?/freets',
  [
    userValidator.isUserLoggedIn,
    categoryValidator.isCategoryExists,
    categoryValidator.isValidCategoryModifier,
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const freets = await FollowCollection.findAllFreetsByFollowed(userId);
    const filteredFreets = await CategoryCollection.findAllFeedFreetsInCategory(req.params.categoryId as string, freets)
    res.status(200).json(filteredFreets.map(constructFreetResponse));
  }
);

/**
 * Create a new category for a post.
 *
 * @name POST /api/categories/
 *
 * @param {string} name - The name of the category
 * @return {CategoryResponse} - The created category
 * @throws {403} - If the user is not logged in
 * @throws {400} - If the category name is empty or a stream of empty spaces
 * @throws {413} - If the category name is more than 15 characters long
 */
 router.post(
  '/',
  [
    userValidator.isUserLoggedIn,
    categoryValidator.isValidCategoryName
  ],
  async (req: Request, res: Response) => {
    const userId = (req.session.userId as string) ?? ''; // Will not be an empty string since its validated in isUserLoggedIn
    const category = await CategoryCollection.addOne(userId, req.body.name);

    res.status(201).json({
      message: 'Your category was created successfully.',
      category: util.constructCategoryResponse(category)
    });
  }
);

/**
 * Get categories by author.
 *
 * @name GET /api/categories/:authorId?
 *
 * @return {CategoryResponse[]} - An array of categories
 * @throws {404} - If authorId is invalid
 *
 */
router.get(
  '/:authorId?',
  [
    categoryValidator.isAuthorExists
  ],
  async (req: Request, res: Response) => {
    const categories = await CategoryCollection.findAllByAuthor(req.params.authorId as string);
    const response = categories.map(util.constructCategoryResponse);
    res.status(200).json(response);
  }
);

/**
 * Delete a category
 *
 * @name DELETE /api/categories/:categoryId?
 *
 * @return {string} - A success message
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the category
 * @throws {404} - If the categoryId is not valid
 */
router.delete(
  '/:categoryId?',
  [
    userValidator.isUserLoggedIn,
    categoryValidator.isCategoryExists,
    categoryValidator.isValidCategoryModifier
  ],
  async (req: Request, res: Response) => {
    await CategoryCollection.deleteOne(req.params.categoryId);
    res.status(200).json({
      message: 'Your category was deleted successfully.'
    });
  }
);

/**
 * Add/remove items in a category
 *
 * @name PUT /api/categories/:categoryId?/:itemId?operation=addOrDelete
 *
 * @return {CategoryResponse} - The updated category
 * @throws {403} - If the user is not logged in or is not the author of
 *                 the category
 * @throws {404} - If the categoryId is not valid
 * @throws {400} - If the operation is empty
 * @throws {404} - If the operation is not valid
 */
router.put(
  '/:categoryId?/:itemId?',
  [
    userValidator.isUserLoggedIn,
    categoryValidator.isCategoryExists,
    categoryValidator.isValidCategoryModifier,
    categoryValidator.isValidOperation
  ],
 async (req: Request, res: Response) => {
  const operation = req.query.operation;
  const categoryId = req.params.categoryId;
  const itemId = req.params.itemId;
  var category;
  if (operation == "add") {
    category = await CategoryCollection.addItemToCategory(categoryId, itemId);
  } else {
    category = await CategoryCollection.deleteItemFromCategory(categoryId, itemId);
  }
  res.status(200).json({
    message: 'Your category was updated successfully.',
    tier: util.constructCategoryResponse(category)
  });
 }
);

export {router as categoryRouter};
