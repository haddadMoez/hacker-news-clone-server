import { Link } from '../models/link';
import _ from 'lodash';

const feed = () => Link.find({});

const linkById = async (_, { id }) => {
  const link = await Link.findOne({ _id: id });
  return link;
};

export { feed, linkById };
