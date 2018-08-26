import { join as pathJoin } from 'path';

export default function join(...args) {

    args = args.filter( arg => arg === 0 || Boolean(arg) ).map(String);
    return args.length ? `${pathJoin(...args)}` : '/';
}