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