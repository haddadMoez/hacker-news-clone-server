import _ from 'lodash';

const isValidLink = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
const blackList = [
  'https://www.example-black-list.com',
  'example-black-list.com',
  'www.example-black-list.com',
];

const isValid = (link) => {
  if (typeof link !== 'string') return false;

  link = link.toLowerCase();
  if (!isValidLink.test(link)) return false;

  if (_.includes(blackList, link)) return false;

  return true;
};

export { isValid };
