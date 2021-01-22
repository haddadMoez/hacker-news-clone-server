import { post } from './mutation';
import _ from 'lodash';

const resolvers = {
    Query: {
        info: () => 'This is a simple query'
    },
    Mutation: {
        post
    }
}

export { resolvers };
