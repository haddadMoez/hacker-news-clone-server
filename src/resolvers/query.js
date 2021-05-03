import { Link } from '../models/link';
import _ from 'lodash';

import { PAGINATION } from '../constants';

const feed = async (parent, args, context, info) => {
  const { LIMIT } = PAGINATION;
  const conditions = args.filter
    ? {
        $or: [{ url: args.filter }, { description: args.filter }],
      }
    : {};

  const sort = args.sort || '_id';
  const limit = args.limit || LIMIT;
  const skip = args.skip > 0 ? (args.skip - 1) * limit : 0;

  const links = await Link.find(conditions)
    .populate('postedBy')
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const count = links.length;
  const total = await Link.count();

  return {
    id: 'main-feed',
    links,
    total,
    count,
  };
};

const linkById = async (_, { id }) => {
  const link = await Link.findOne({ _id: id });
  return link;
};

export { feed, linkById };
