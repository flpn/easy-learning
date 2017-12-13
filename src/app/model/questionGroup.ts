import { Alternative } from './alternative'

export class QuestionGroup {

    title: string
    alternative: Array<Alternative>
    correctAlternative: Alternative;

    constructor(){
        this.alternative = []
        this.correctAlternative = new Alternative()
    }


}