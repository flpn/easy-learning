export class GroupPosts{
    $key: string;
    user: string;
    text: string;    
    published: number;

    constructor(){
        this.published = Date.now()
    }
}