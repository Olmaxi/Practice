var posts = [
    {
        id: '1',
        description: '1',
        createdAt: new Date('2020-03-23T10:00:00'),
        author: 'Mr.NoOne',
        photoLink: './graphic/MrNoOne.png',
        likes : 0,
        hashtages : ['#a', '#b'],
        title: 'some title',
    },

    {
        id: '2',
        description: '2',
        createdAt: new Date('2020-03-23T11:00:00'),
        author: 'Mr',
        photoLink: './graphic/MrNoOne.png',
        likes : 0,
        hashtages : ['#a', '#b'],
        title: 'some title',
    },

    {
        id: '3',
        description: '3',
        createdAt: new Date('2020-03-23T11:20:00'),
        author: 'Mr.NoOne',
        photoLink: './graphic/MrNoOne.png',        
        likes : 0,
        hashtages : ['#a'],
        title: 'some title',
    },

    {
        id: '4',
        description: '4',
        createdAt: new Date('2020-03-23T15:50:00'),
        author: 'Mr.NoOne',
        photoLink: './graphic/MrNoOne.png',
        hashtages : [],
        title: 'some title',
    },

    {
        id: '5',
        description: '5',
        createdAt: new Date('2020-03-23T13:34:00'),
        author: 'M.NoOne',
        photoLink: './graphic/MrNoOne.png',
        hashtages : [],
        title: 'some title',
    },
];

var postsForAdding = [

    {
        id: '6',
        description: 'съешь ещё этих мягких французских булок, да выпей чаю',
        createdAt: new Date('2020-03-23T16:35:00'),
        author: 'Mr.NoOne',
        photoLink: './graphic/MrNoOne.png',
    },

    {
        id: '7',
        description: 'съешь ещё этих мягких французских булок, да выпей чаю',
        createdAt: new Date('2020-03-23T17:20:00'),
        author: 'Mr.NoOne',
        photoLink: './graphic/MrNoOne.png',

    },

    {
        id: '8',
        description: 'съешь ещё этих мягких французских булок, да выпей чаю',
        createdAt: new Date('2020-03-23T14:10:00'),
        author: 'Mr.NoOne',
        photoLink: './graphic/MrNoOne.png',

    },

    {
        id: '9',
        description: 'съешь ещё этих мягких французских булок, да выпей чаю',
        createdAt: new Date('2020-03-23T13:10:00'),
        author: 'Mr.NoOne',
        photoLink: './graphic/MrNoOne.png',

    },

    {
        id: '10',
        description: 'I am not validated',
        createdAt: '',
        author: '',
        photoLink: '',
    },

    {
        id: '11',
        description: 'I am not validated',
        createdAt: new Date('2020-03-23T13:10:00'),
        author: '',
        photoLink: '',
    },  
    {
        id: '12',
        description: 'I am not validated',
        createdAt: '',
        author: '',
        photoLink: './graphic/MrNoOne.png',
    },  
];

var sameID_Posts = [
    {
        id: '1',
        description: 'Same',
        createdAt: new Date('2020-03-23T10:00:00'),
        author: 'Mr.NoOne',
        photoLink: './graphic/MrNoOne.png',

    },

    {
        id: '2',
        description: 'ID',
        createdAt: new Date('2020-03-23T11:00:00'),
        author: 'Mr.NoOne',
        photoLink: './graphic/MrNoOne.png',
    },  
];


let validatedPostForAdding = {
    id: '20',
    description: 'qwe',
    createdAt: new Date('2020-03-23T13:10:00'),
    author: 'Maxim',
    photoLink: './graphic/MrNoOne.png',
    hashtages : ["#d"],
    title: 'some title',
}

let notValidatedPostForAdding = {
    id: '21',
    description: 'съешь ещё этих мягких французских булок, да выпей чаю',
    createdAt: '',
    author: 'Mr.NoOne',
    photoLink: '',
    hashtages : [],
    title: 'some title',
}

