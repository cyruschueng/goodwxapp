import test from 'ava';
import * as all from '../../src/uri';
import obj from '../../src/uri';

test('join imports are identical', t => {
    t.is(
        all.join,
        obj.join
    );
});

test('query imports are identical', t => {
    t.is(
        all.query,
        obj.query
    );
});