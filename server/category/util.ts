import type {HydratedDocument} from 'mongoose';
import type {Category, PopulatedCategory} from '../category/model';

// Update this if you add a property to the Category type!
type CategoryResponse = {
  _id: string;
  author: string;
  name: string;
  items: Array<string>;
};

/**
 * Transform a raw Category object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Category>} category - A category
 * @returns {CategoryResponse} - The category object formatted for the frontend
 */
const constructCategoryResponse = (category: HydratedDocument<Category>): CategoryResponse => {
  const categoryCopy: PopulatedCategory = {
    ...category.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  const {username} = categoryCopy.authorId;
  const items = categoryCopy.items;
  const itemNames = items.map(item => item.username);
  delete categoryCopy.authorId;
  delete categoryCopy.items;
  return {
    ...categoryCopy,
    _id: categoryCopy._id.toString(),
    author: username,
    items: itemNames,
  };
};

export {
  constructCategoryResponse
};
