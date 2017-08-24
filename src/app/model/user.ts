export class User {
    $key: string;
    uid: string;
    email: string;
    name: string;
    lastname: string;
    score: number;
    profileImage: string;
    
    constructor() {
        this.score = 0;
        this.profileImage = 'https://image.flaticon.com/icons/png/512/78/78373.png';
    }
}