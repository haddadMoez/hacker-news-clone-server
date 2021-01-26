import _ from 'lodash';

const isValidEmail = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
const blackList = ['test-blacklist@black-list.com'];

const isValid = (email) => {
  if (typeof email !== 'string') return false;

  email = email.toLowerCase();
  if (!isValidEmail.test(email)) return false;

  if (_.includes(blackList, email)) return false;

  return true;
};

export { isValid };
