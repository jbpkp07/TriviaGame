"use strict";

class Model {

    constructor() {

        this._QuestionAmount = 10;
        this._TriviaAPI = new TriviaAPI(this._QuestionAmount);
        this._TriviaQuestions = [];
        this._TriviaQuestionsIndex = 0;
        this._CategoryPicked = null;
        this._DifficultyPicked = null;
    }

    getAPIUrl() {

        if (this._CategoryPicked === null ||  this._DifficultyPicked === null) {

            throw new Error("Class:Model:getAPIUrl _CategoryPicked or _DifficultyPicked is null");
        }

        return this._TriviaAPI.generateAPIString(this._CategoryPicked, this._DifficultyPicked);
    }

    setTriviaQuestions(jsonResponse) {

        for (let question of jsonResponse.results) {

            this._TriviaQuestions.push(question);
            console.log(question);
        }
    }

    getNextTriviaQuestion() {

        let question = this._TriviaQuestions[this._TriviaQuestionsIndex];

        this._TriviaQuestionsIndex++;

        if (this._TriviaQuestionsIndex === this._QuestionAmount) {

            throw new Error("Class:Model:getNextTriviaQuestion index out-of-range");
        }

        return question;
    }

    // get guessesRemaining() { return this._GuessesRemaining; }
    // set guessesRemaining(value) { throw new Error("Class:Model:guessesRemaining is PRIVATE"); }

    // get wins() { return this._Wins; }
    // set wins(value) { throw new Error("Class:Model:wins is PRIVATE"); }

    // get score() { return this._Score; }
    // set score(value) { throw new Error("Class:Model:score is PRIVATE"); }

    // get btnElements() { return this._BtnElements; }
    // set btnElements(value) { throw new Error("Class:Model:btnElements is PRIVATE"); }

    // get currentPhrase() { return this._CurrentPhrase; }
    // set currentPhrase(value) { throw new Error("Class:Model:currentPhrase is PRIVATE"); }

    // get getStatus() { return this._Status; }
    // set getStatus(value) { throw new Error("Class:Model:getStatus is PRIVATE"); }

    // get letterElementsSelected() { return this._LetterElementsSelected; }
    // set letterElementsSelected(value) { throw new Error("Class:Model:letterElementsSelected is PRIVATE"); }
}

class TriviaAPI {

    constructor(amount) {

        this._APIRoot = "https://opentdb.com/api.php";
        this._APIAmount = "amount=" + amount;
        this._APICategory = "category=";
        this._APIDifficulty = "difficulty=";
        this._APIType = "type=multiple";

        this._Categories = ["General Knowledge", "Sports", "Computers", "Video Games", "Movies", "History"];
        this._Difficulties = ["Easy", "Medium", "Hard"];
    }

    generateAPIString(category, difficulty) {

        let categoryNum;

        switch (category) {

            case this._Categories[0]: //General Knowledge
                categoryNum = 9;
                break;
            case this._Categories[1]: //Sports
                categoryNum = 21;
                break;
            case this._Categories[2]: //Computers
                categoryNum = 18;
                break;
            case this._Categories[3]: //Video Games
                categoryNum = 15;
                break;
            case this._Categories[4]: //Movies
                categoryNum = 11;
                break;
            case this._Categories[5]: //History
                categoryNum = 23;
                break;
        }

        let apiString =
            this._APIRoot + "?" +
            this._APIAmount + "&" +
            this._APICategory + categoryNum + "&" +
            this._APIDifficulty + difficulty.toLowerCase() + "&" +
            this._APIType;

        return apiString;
    }
}