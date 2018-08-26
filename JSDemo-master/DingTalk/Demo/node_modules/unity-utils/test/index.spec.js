import test from 'ava';
import utils from '../src';

// uri
import { uri } from '../src';

test('uri imports are identical', t => {
    t.is(
        utils.uri,
        uri
    );
});