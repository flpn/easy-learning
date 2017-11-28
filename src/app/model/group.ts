import { User } from './user'
import { GroupPosts} from './group-posts'

export class Group{
    $key: string
    uid: string;
    title: string
    description: string
    groupImage: string
    subscribers: Array<User>
    groupPosts: Array<GroupPosts>
    adm: User
    requests: Array<User>

    constructor(){
        this.subscribers = []
        this.requests = []
        
    }

}