import Thumbnail1 from '../src/images/blog1.jpg';
import Thumbnail2 from '../src/images/blog2.jpg';
import Thumbnail3 from '../src/images/blog3.jpg';
import Thumbnail4 from '../src/images/blog4.jpg';

export const DUMMY_POSTS = [
    {
        id: '1',
        thumbnail: Thumbnail1,
        category: 'education',
        title: 'This is the title of the very first post on this blog',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        authorID: 3,
    },
    {
        id: '2',
        thumbnail: Thumbnail2,
        category: 'science',
        title: 'Welcome to Ghana',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        authorID: 1,
    },
    {
        id: '3',
        thumbnail: Thumbnail3,
        category: 'weather',
        title: 'This is the title of the very third post on this blog',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        authorID: 13,
    },
    {
        id: '4',
        thumbnail: Thumbnail4,
        category: 'farming',
        title: 'This is the title of the very last post on this blog',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
        authorID: 11,
    },
];
