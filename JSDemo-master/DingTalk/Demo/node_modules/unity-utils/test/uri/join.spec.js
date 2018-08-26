import test from 'ava';
import join from '../../src/uri/join';

test('empty path', t => {

    t.is(
        join(),
        '/'
    );
});

test('path with null', t => {
    t.is(
        join('path', 'with', null),
        'path/with'
    );
});

test('path with boolean', t => {
    t.is(
        join('path', 'with', false),
        'path/with',
        'false'
    );

    t.is(
        join('path', 'with', true),
        'path/with/true',
        'true'
    );
});


test('path with numbers', t => {
    t.is(
        join('path', 'with', 1),
        'path/with/1',
        '1'
    );

    t.is(
        join('path', 'with', 0),
        'path/with/0',
        '0'
    );

    t.is(
        join('path', 'with', Infinity),
        'path/with/Infinity',
        'Infinity'
    );

    t.is(
        join('path', 'with', NaN),
        'path/with',
        'NaN'
    );
});

test('path with undefined', t => {
    t.is(
        join('path', 'with', undefined),
        'path/with'
    );
});

test('path with slashes', t => {
    t.is(
        join('/path//', '//with/', '///slashes'),
        '/path/with/slashes',
        'slashes'
    );

    t.is(
        join('/path//', '//with/', '///more///slashes///'),
        '/path/with/more/slashes/',
        'more slashes'
    );
});

test('path with array', t => {
    t.is(
        join('path', 'with', []),
        'path/with',
        'empty array'
    );

    t.is(
        join('path', 'with', ['t', 'e', 's', 't']),
        'path/with/t,e,s,t',
        'regular array'
    );
});

test('path with object', t => {
    t.is(
        join('path', 'with', {}),
        'path/with/[object Object]'
    );
});

test('path with regexp', t => {
    t.is(
        join('path', 'with', /^$/),
        'path/with/^$/'
    );
});