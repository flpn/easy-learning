import { ForumPost } from './forum-post';

export class Answer extends ForumPost{
    constructor() {
        super();
        this.published = Date.now();
        this.score = 0;
    }
 }