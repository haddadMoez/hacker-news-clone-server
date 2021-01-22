import { Link } from '../models/link';

const post = async (_, { description, url }) => {
  const link = new Link({ description, url });

  link.save((err) => {
    if (err) return err;
  });

  return link;
};

export { post };
