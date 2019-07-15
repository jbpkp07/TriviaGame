"use strict";
/* global ViewController, Model */

class GameController {

    constructor() {

        this._ViewController = new ViewController();
        this._Model = new Model();
        this._IsCategoryPicked = false;
        this._IsDifficultyPicked = false;
        this._AreTriviaQuestionsConsumed = false;
    }

    beginStartSequence() {

        this._ViewController.initialize();

        $("#startBTN").click(() => {
            
            $("#startBTN").off("click");

            this._ViewController.startGame();
        });

        return this.createPromise(() => this._ViewController.isGameStarted === true);
    }

    pickCategory() {

        this._ViewController.createCategoryBTNs(this._Model._TriviaAPI._Categories);

        this._ViewController.showPickCategory(1000);
        
        let thisController = this;

        $(".categoryBTN").click(function() { 

            $(".categoryBTN").off("click");

            thisController._ViewController.hidePickCategory(1000).then(() => {
                
                thisController._Model._CategoryPicked = $(this).text();

                thisController._IsCategoryPicked = true;
            });
        });

        return this.createPromise(() => this._IsCategoryPicked === true);
    }

    pickDifficulty() {

        this._ViewController.createDifficultyBTNs(this._Model._TriviaAPI._Difficulties);

        this._ViewController.showPickDifficulty(1000);
        
        let thisController = this;

        $(".difficultyBTN").click(function() { 

            $(".difficultyBTN").off("click");

            thisController._ViewController.hidePickDifficulty(1000).then(() => {
                
                thisController._Model._DifficultyPicked = $(this).text();

                thisController._IsDifficultyPicked = true;
            });
        });

        return this.createPromise(() => this._IsDifficultyPicked === true);
    }

    getTriviaQuestionsFromAPI() {

        let apiURL = this._Model.getAPIUrl();
      
        let connection = {
            url: apiURL,
            method: "Get"
        };   
        
        $.ajax(connection).then((response) => {

            this._Model.setTriviaQuestions(response);

            this._AreTriviaQuestionsConsumed = true;
        }).catch(() => {

            alert("Triva API did not return results. Please refresh page and try again.");
            throw new Error("Class:GameController:getTriviaQuestionsFromAPI trivia API did not respond correctly");
        });

        return this.createPromise(() => this._AreTriviaQuestionsConsumed === true);
    }

    beginTriviaQuestions() {

        alert("here");
    }

    createPromise(waitFunction) {

        const poll = (resolve) => {

            if (waitFunction()) {
                resolve();
            }
            else {
                setTimeout(() => poll(resolve), 100);
            }
        };

        return new Promise(poll);
    }
}