# Unity Utils

[![Travis-CI](https://api.travis-ci.org/auru/unity-utils.svg?branch=master)](https://travis-ci.org/auru/unity-utils)
[![Coverage Status](https://coveralls.io/repos/github/auru/unity-utils/badge.svg?branch=master)](https://coveralls.io/github/auru/unity-utils?branch=master)
[![npm version](https://badge.fury.io/js/unity-utils.svg)](https://badge.fury.io/js/unity-utils)
[![Scrutinizer](https://scrutinizer-ci.com/g/auru/unity-utils/badges/quality-score.png?b=master)](https://scrutinizer-ci.com/g/auru/unity-utils/)
[![Deps](https://david-dm.org/auru/unity-utils/status.svg)](https://david-dm.org/auru/unity-utils)
[![Deps-Dev](https://david-dm.org/auru/unity-utils/dev-status.svg)](https://david-dm.org/auru/unity-utils)
[![Dependency Status](https://dependencyci.com/github/auru/unity-utils/badge)](https://dependencyci.com/github/auru/unity-utils)

> Useful utility functions for the Unity team.

# Table of Contents
  * [Installation](#installation)
  * [API](#api)
    * [uri](#uri)
  * [Contributing](#contributing)
  * [License](#license)

# Installation

```bash
npm i --save unity-utils
```

# API
## uri
URI utilities.

### join([arg1, [arg2, ...]])

**Deafult:** `'/'`

**Returns:** {String}

Joins `path` parts, dropping all `falsy` parts, except for `0`.
Accepts any amount of arguments of any type.

**Example:**
```js
import { join } from 'unity-utils/uri';
console.log(join('path', 'with', null)); // outputs: "path/with"
```
### query(queryObject)

**Returns:** {Object}

Filters query object, dropping `undefined`, `null` and `''` values.

#### queryObject {Object}

Any query-like object.

**Example:**
```js
import { query } from 'unity-utils/uri';
console.log(query({ param: 'val', 'null': null })); // outputs: "{"param": "val"}"
```

# Contributing

* Provide [conventional commit messages](https://github.com/conventional-changelog/conventional-changelog-angular/blob/master/convention.md) by using `npm run commit` instead of `git commit`.
* **Core contributors:** use GitHub's *Rebase and merge* as a default way of merging PRs.

# License
MIT © AuRu
