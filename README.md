# ObjExp

Matches objects using object expressions.

## Installation

```javascript
npm install object-expression
```

## Usage

The example bellow shows how to filter an array of objects using ObjExp.

```javascript
var ObjExp = require('../');

var people = [
    {
        'name': 'Malcolm Reynolds', 'birth_year': 2468, 'aim': 'misbehave',
        'accessories': [{'name': 'floral bonnet', 'description': 'pretty'}],
    },
    {
        'name': 'Zoë Alleyne Washburne', 'birth_year': 2484,
        'occupation': 'smuggler'
    },
    {
        'name': 'Inara Serra',
        'occupation': 'companion'
    },
    {
        'name': 'Kaywinnet Lee Frye',
        'occupation': 'mechanic'
    },
    {
        'name': 'Hoban Washburne',
        'accessories': [{'name': 'allosaurus', 'description': 'evil laugh'}],
        'occupation': 'pilot'
    },
    {
        'name': 'Jayne Cobb',
        'accessories': [{'name': 'earflap hat', 'description': 'cunning'}, {'name': 'vera', 'description': 'very favorite gun'}],
        'occupation': 'public relations'
    },
    {
        'name': 'Derrial Book',
        'accessories': [{'name': 'book', 'description': 'broken'}],
        'occupation': 'Shepherd'
    },
    {
        'name': 'River Tam'
    },
    {
        'name': 'Simon Tam',
        'occupation': 'surgeon'
    }
];

var pattern = new ObjExp({ 'name': { '$regex': /mal.*/i }, 'birth_year': { '$gt': 2450, '$lt': 2475 } });
pattern.and({ 'aim': 'misbehave' });
pattern.or({ 'accessories': { '$any': { '$or': [{ 'name': 'floral bonnet' }, { 'name': 'earflap hat' }] } } });
pattern.or({ 'occupation': { '$in': ['companion', 'mechanic'] } });
pattern.and(ObjExp.not({ 'occupation': { '$in': ['reavers', 'public relations'] } }));

var matches = people.filter(pattern.test);
console.log(matches);

/*
output:

[ { name: 'Malcolm Reynolds',
    birth_year: 2468,
    aim: 'misbehave',
    accessories: [ [Object] ] },
  { name: 'Inara Serra', occupation: 'companion' },
  { name: 'Kaywinnet Lee Frye', occupation: 'mechanic' } ]

 */

```

## API

### new ObjExp([expression])

This creates and retuns a new ObjExp.


### Static Methods

#### ObjExp.and(expressions)

Returns an expression that would be true if and only if all passed expressions are true.

#### ObjExp.or(expressions)

Returns an expression that would be true if at least one of the passed expressions is true.

#### ObjExp.not(expression)

Returns an expression that would be true if the passed expression is false.

#### ObjExp.test(value, operator, expression)

Tests if the value matches the expression using the operator.

### Operators

#### $and(value, expressions)

Returns true if the value matches all expressions.

#### $or(value, expressions)

Returns true if the value matches at least one expression.

#### $not(value, expression)

Returns true if the value does not match the expression.

#### $eq(value, expression)

Returns true if the value is equal to the expression.

#### $gt(value, expression)

Returns true if the value is greater than the expression.

#### $gte(value, expression)

Returns true if the value is greater than or equal to the expression.

#### $lt(value, expression)

Returns true if the value is lesser than the expression.

#### $lte(value, expression)

Returns true if the value is lesser than or equal to the expression.

#### $in(value, array)

Returns true if the value is in the array.

#### $exists(value, expression)

Returns true if the value existance is reflected by the expression.

#### $regex(value, regex)

Returns true if the value matches the regular expression.

#### $all(value, expression)

Returns true if the value is an array with all elements matching the expression.

#### $any(value, expression)

Returns true if the value is an array with at least one element matching the expression.

#### $size(value, expression)

Returns true if the value is an array with length matching the expression.


### Prototype Methods

#### ObjExp#and(expressions)

Modifies the ObjExp, matching if the current expression and all passed expressions is true.

#### ObjExp#or(expressions)

Modifies the ObjExp, matching if the current expression or at least one of the passed expressions is true.

#### ObjExp#test(value)

Tests if the value matches the expression using the operator.


## TODO

- Tests
- Optimizations
