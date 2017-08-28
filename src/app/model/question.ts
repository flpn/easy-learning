import { ForumPost } from './forum-post';

export class Question extends ForumPost{
    title: string;
    tags: string;
    viewed: number;
    answers: Array<Question>;

    constructor() {
        super();
        this.viewed = 0
        this.score = 0;
        this.published = Date.now()
    }
}