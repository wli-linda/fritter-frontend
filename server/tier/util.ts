import type {HydratedDocument} from 'mongoose';
import type {Tier, PopulatedTier} from '../tier/model';

// Update this if you add a property to the Tier type!
type TierResponse = {
  _id: string; 
  owner: string;
  isEnabled: boolean;
  timedFollowers: Array<string>;
  overrideFollowers: Array<string>;
};

/**
 * Transform a raw Tier object from the database into an object
 * with all the information needed by the frontend
 *
 * @param {HydratedDocument<Tier>} tier - A tier
 * @returns {TierResponse} - The tier object formatted for the frontend
 */
const constructTierResponse = (tier: HydratedDocument<Tier>): TierResponse => {
  const tierCopy: PopulatedTier = {
    ...tier.toObject({
      versionKey: false // Cosmetics; prevents returning of __v property
    })
  };
  const owner = tierCopy.ownerId;
  delete tierCopy.ownerId;
  const timedFollowers = tierCopy.timedFollowers.map(follower => follower.username);
  const overrideFollowers = tierCopy.overrideFollowers.map(follower => follower.username);
  delete tierCopy.timedFollowers;
  delete tierCopy.overrideFollowers;

  return {
    ...tierCopy,
    _id: tierCopy._id.toString(),
    owner: owner.username,
    timedFollowers: timedFollowers,
    overrideFollowers: overrideFollowers,
  };
};

export {
  constructTierResponse
};
