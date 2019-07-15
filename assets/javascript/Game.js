"use strict";
/* global Controller */

class Game {

    constructor() {

        this._Controller = new Controller();
        this._IsStartSequenceInitiated = false;
    }

    startGame() {

        if (!this._IsStartSequenceInitiated) {

            this._IsStartSequenceInitiated = true;

            let hasFinishedPromise = this._Controller.beginStartSequence();

            hasFinishedPromise.then(() => {

                this.continueGame();
            });
        }
    }

    continueGame() {

        this._Controller.assignListeners();

        this._Controller.beginNextPhrase();
    }
}