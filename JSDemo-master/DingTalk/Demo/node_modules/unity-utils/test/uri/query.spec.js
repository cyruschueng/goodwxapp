import test from 'ava';
import query from '../../src/uri/query';


test('standard', t => {
    t.deepEqual(
        query({ param: 'val', param2: 'val2' }),
        { param: 'val', param2: 'val2' }
    );
});

test('empty', t => {
    t.deepEqual(
        query(),
        undefined
    );
});

test('empty object', t => {
    t.deepEqual(
        query({}),
        {}
    );
});

test('with empty string', t => {
    t.deepEqual(
        query({ param: 'val', emptySting: '' }),
        { param: 'val' }
    );
});

test('with zero', t => {
    t.deepEqual(
        query({ param: 'val', zero: 0 }),
        { param: 'val', zero: 0 }
    );
});

test('with null', t => {
    t.deepEqual(
        query({ param: 'val', 'null': null }),
        { param: 'val' }
    );
});

test('with undefined', t => {
    t.deepEqual(
        query({ param: 'val', 'undefined': undefined }),
        { param: 'val' }
    );
});

test('with Infinity', t => {
    t.deepEqual(
        query({ param: 'val', 'Infinity': Infinity }),
        { param: 'val', 'Infinity': Infinity }
    );
});

test('with boolean', t => {
    t.deepEqual(
        query({ param: 'val', 'false': false }),
        { param: 'val', 'false': false },
        'false'
    );

    t.deepEqual(
        query({ param: 'val', 'true': true }),
        { param: 'val', 'true': true },
        'true'
    );
});

test('with object', t => {
    t.deepEqual(
        query({ param: 'val', object: {} }),
        { param: 'val', object: {} }
    );
});

test('with array', t => {
    t.deepEqual(
        query({ param: 'val', array: [] }),
        { param: 'val', array: [] },
    );
});