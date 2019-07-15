"use strict";

class ViewController {

    constructor() {

        this._GameTitle = $("#gameTitle");
        this._StartBtn = $("#startBTN");
        this._PickCategory = $("#categories");
        this._CategoryBTNs = $("#categoryBTNs");
        this._PickDifficulty = $("#difficulties");
        this._DifficultyBTNs = $("#difficultyBTNs");

        this._IsGameStarted = false;
    }

    initialize() {

        this.showGameTitle(1000);

        this.showStartBtn(1000);

        this.emptyCategoryBTNs();

        this.emptyDifficultyBTNs();
    }

    startGame() {

        let promises = [];

        promises.push(this.hideGameTitle(1000));

        promises.push(this.hideStartBtn(1000));

        Promise.all(promises).then(() => {

            this._IsGameStarted = true;
        });
    }

    hideGameTitle(mSec) {

        return this._GameTitle.fadeOut(mSec).promise();
    }

    hideStartBtn(mSec) {

        return this._StartBtn.fadeOut(mSec).promise();
    }

    showGameTitle(mSec) {

        return this._GameTitle.fadeIn(mSec);
    }

    showStartBtn(mSec) {

        return this._StartBtn.fadeIn(mSec);
    }

    createCategoryBTNs(categories) {

        for (let category of categories) {

            var newBTN = $("<div>");

            newBTN.text(category);

            newBTN.addClass("categoryBTN");

            this._CategoryBTNs.append(newBTN);
        }
    }

    emptyCategoryBTNs() {

        this._CategoryBTNs.empty();
    }

    showPickCategory(mSec) {

        this._PickCategory.fadeIn(mSec);
    }

    hidePickCategory(mSec) {

        return this._PickCategory.fadeOut(mSec).promise();
    }

    createDifficultyBTNs(difficulties) {

        for (let difficulty of difficulties) {

            var newBTN = $("<div>");

            newBTN.text(difficulty);

            newBTN.addClass("difficultyBTN");

            this._DifficultyBTNs.append(newBTN);
        }
    }

    emptyDifficultyBTNs() {

        this._DifficultyBTNs.empty();
    }

    showPickDifficulty(mSec) {

        this._PickDifficulty.fadeIn(mSec);
    }

    hidePickDifficulty(mSec) {

        return this._PickDifficulty.fadeOut(mSec).promise();
    }







    get isGameStarted() { return this._IsGameStarted; }
    set isGameStarted(value) { throw new Error("Class:View:isGameStarted is PRIVATE"); }
}