"use strict";
/* global GameController */

class Game {

    constructor() {

        this._GameController = null;
    }

    startGame() {
    
        this._GameController = new GameController();

        this._GameController.beginStartSequence().then(() => {

            this.pickCategory();
        });
    }

    pickCategory() {
       
        this._GameController.pickCategory().then(() => {

            this.pickDifficulty();
        });
    }

    pickDifficulty() {

        this._GameController.pickDifficulty().then(() => {

            this.startTriviaQuestions();
        });
    }

    startTriviaQuestions() {

        this._GameController.getTriviaQuestionsFromAPI().then(() => {

            this._GameController.beginTriviaQuestions();

            this.startGame();
        });
    }
}