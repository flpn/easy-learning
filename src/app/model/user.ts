import { Group } from './group'

export class User {
    $key: string;
    uid: string;
    email: string;
    name: string;
    lastname: string;
    score: number;
    profileImage: string;
    isAdm: boolean;
    
    constructor() {
        this.isAdm = false;
        this.score = 0;
        this.profileImage = 'https://image.flaticon.com/icons/png/512/78/78373.png';
    }
}