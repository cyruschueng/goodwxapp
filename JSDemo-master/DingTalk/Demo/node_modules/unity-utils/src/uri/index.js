import { default as joinImported } from './join';
import { default as queryImported } from './query';

export const join = joinImported;
export const query = queryImported;

export default {
    join,
    query
};