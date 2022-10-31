import type {HydratedDocument, Types} from 'mongoose';
import type {Follow} from './model';
import FollowModel from './model';
import { Freet } from '../freet/model';
import UserCollection from '../user/collection';
import FreetCollection from '../freet/collection';

class FollowCollection {
  /**
   * Follow another user
   *
   * @param {string} followerId - The id of the follower of the follow
   * @param {string} followedId - The id of the followed of the follow
   * @return {Promise<HydratedDocument<Follow>>} - The newly created Follow
   */
  static async addOne(followerId: Types.ObjectId | string, followedId: Types.ObjectId | string): 
  Promise<HydratedDocument<Follow>> {
    const date = new Date();
    const follow = new FollowModel({
      followerId,
      followedId,
      timeFollowed: date,
    });
    await follow.save(); 
    return (await follow.populate('followerId')).populate('followedId');
  }

  /**
   * Follow another user by username
   *
   * @param {string} follower - The username of the follower of the follow
   * @param {string} followed - The username of the followed of the follow
   * @return {Promise<HydratedDocument<Follow>>} - The newly created Follow
   */
   static async addOneByUsername(follower: string, followed: string): Promise<HydratedDocument<Follow>> {
    const followerId = (await UserCollection.findOneByUsername(follower)).id;
    const followedId = (await UserCollection.findOneByUsername(followed)).id;
    return this.addOne(followerId, followedId);
   }

  /**
   * Find whether user 1 follows user 2
   *
   * @param {string} followerId - The id of the follower of the follow
   * @param {string} followedId - The id of the followed of the follow
   * @return {Promise<HydratedDocument<Follow>>} - The relevant Follow
   */
   static async findOne(followerId: Types.ObjectId | string, followedId: Types.ObjectId | string): 
   Promise<HydratedDocument<Follow>> {
    return FollowModel.findOne({followerId: followerId, followedId: followedId}).populate('followerId').populate('followedId');
   }

  /**
   * Find whether user 1 follows user 2 by username
   *
   * @param {string} follower - The username of the follower of the follow
   * @param {string} followed - The username of the followed of the follow
   * @return {Promise<HydratedDocument<Follow>>} - The relevant Follow
   */
    static async findOneByUsername(follower: string, followed: string): 
    Promise<HydratedDocument<Follow>> {
      const followerId = (await UserCollection.findOneByUsername(follower))._id;
      const followedId = (await UserCollection.findOneByUsername(followed))._id;
      return this.findOne(followerId, followedId);
    }

  /**
   * Get all the followed list of a user
   *
   * @param {string} userId - The userId of the user
   * @return {Promise<HydratedDocument<Follow>[]>} - An array of all of the followed of the user
   */
  static async findAllByUserId(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Follow>>> {
    const user = await UserCollection.findOneByUserId(userId);
    return FollowModel.find({followerId: user._id}).populate('followerId').populate('followedId');
  }

  // /**
  //  * Get all the followed list of a user by username
  //  *
  //  * @param {string} username - The username of the user
  //  * @return {Promise<HydratedDocument<Follow>[]>} - An array of all of the followed of the user
  //  */
  //  static async findAllByUsername(username: string): Promise<Array<HydratedDocument<Follow>>> {
  //   const user = await UserCollection.findOneByUsername(username);
  //   return this.findAllByUserId(user.id);
  // }

  /**
   * Get all the freets from the followed list of a user
   *
   * @param {string} userId - The userId of the user
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the followed's freets of the user
   */
  static async findAllFreetsByFollowed(userId: Types.ObjectId | string): Promise<Array<HydratedDocument<Freet>>> {
    const follows = await this.findAllByUserId(userId);
    const getFreets = async function (follow: Follow) {
      const user = await UserCollection.findOneByUserId(follow.followedId);
      const freets = await FreetCollection.findAllByUsername(user.username);
      return Promise.all(freets.map((freet) => freet.populate('authorId')));
    }

    var res = new Array<HydratedDocument<Freet>>();
    for (let i = 0; i < follows.length; i++) {
      const freets = await getFreets(follows.at(i));
      res = res.concat(freets);
    }
    return res
  }

  /**
   * Get all the freets from the followed list of a user by username
   *
   * @param {string} username - The username of the user
   * @return {Promise<HydratedDocument<Freet>[]>} - An array of all of the followed's freets of the user
   */
  static async findAllFreetsByFollowedByUsername(username: string): Promise<Array<HydratedDocument<Freet>>> {
    const user = await UserCollection.findOneByUsername(username);
    return this.findAllFreetsByFollowed(user.id);
  }

  /**
   * Unfollow another user.
   *
   * @param {string} followId - The followId of follow to delete
   * @return {Promise<Boolean>} - true if the follow has been deleted, false otherwise
   */
  static async deleteOne(followId: Types.ObjectId | string): Promise<boolean> {
    const follow = await FollowModel.deleteOne({_id: followId});
    return follow !== null;
  }

  /**
   * Delete all the follows associated with a user.
   *
   * @param {string} userId - The id of the user.
   */
   static async deleteManybyUser(userId: Types.ObjectId | string): Promise<void> {
    await FollowModel.deleteMany({followerId: userId});
    await FollowModel.deleteMany({followedId: userId});
  }
}

export default FollowCollection;
