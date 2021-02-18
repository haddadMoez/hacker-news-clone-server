import { Link } from '../models/link';
import _ from 'lodash';

const feed = async () => {
  const links = await Link.find({});
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
