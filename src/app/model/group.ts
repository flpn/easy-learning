import { User } from './user'
import { GroupPosts} from './group-posts'
import { QuestionGroup } from './questionGroup'
export class Group{
    $key: string
    uid: string;
    title: string
    description: string
    groupImage: string
    subscribers: Array<User>
    groupPosts: Array<GroupPosts>
    questions: Array<QuestionGroup>
    adm: User
    requests: Array<User>

    constructor(){
        this.subscribers = []
        this.requests = []
        this.questions = []
        this.adm = new User()
        
    }

}