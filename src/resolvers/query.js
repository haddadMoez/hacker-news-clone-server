import { Link } from '../models/link';
import _ from 'lodash';

const feed = async (parent, { filter }, context, info) => {
  const conditions = filter
    ? {
        $or: [{ url: filter }, { description: filter }],
      }
    : {};
  const links = await Link.find(conditions).populate('postedBy');
  return {
    id: 'main-feed',
    links,
    count: links.length,
  };
};

const linkById = async (_, { id }) => {
  const link = await Link.findOne({ _id: id });
  return link;
};

export { feed, linkById };
