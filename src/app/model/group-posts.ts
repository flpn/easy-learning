import { User } from './user'

export class GroupPosts{
    $key: string;
    user: User;
    text: string;    
    published: number;

    constructor(){
        this.published = Date.now()
    }
}