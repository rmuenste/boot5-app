import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiceService } from 'src/app/data/data-service.service';
import { LogService } from 'src/app/data/log.service';
import { LogData, LogArray } from 'src/app/data/logData';
import { vocGerRu } from 'src/app/data/mydata';
import { simpleShuffle, permutationShuffe } from 'src/app/modules/shuffle';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainerComponent } from './stop-trainer.component';
import { MatDialogRef } from '@angular/material/dialog';

interface LangFrom {
  value: string;
  viewValue: string;
}

interface LangTo {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-voc-controller',
  templateUrl: './voc-controller.component.html',
  styleUrls: ['./voc-controller.component.css']
})
export class VocControllerComponent implements OnInit {

  vocData = [];                                 // The data array used in the training
  origData = [];                                // The data array used in the training
  permutation = [];                             // The data array used in the training
  currentId: number = 0;                        // The index of the current word
  totalWords: number = -1;                      // The total number of words in the training (array length)
  counter: number = 1;                          // The word counter for the current training
  correctWords: number = 0;                     // The number of correct words
  mongoId: string = "";                         // The id in the mongo data base
  currentWord: string = "";                     // The current word as string
  userTranslation: string = "";                 // The user translation of the current word
  trainerRunning = false;                       // flag: is the trainer running
  showFinalResult = false;                      // flag: should we show the result screen
  showingUserFeedback = false;                  // flag: feedback for user solution on/off
  textColor = 'black';
  buttonText = 'Submit';

  wordLists = [];
  wordLists2 = ["A1", "A2", "A3"];
  wordList = [];
  wordListName = "A1";
  fromValue = "russian";
  toValue = "german";

  langFrom: LangFrom[] = [
    {value: 'russian', viewValue: 'russian'},
    {value: 'german', viewValue: 'german'},
  ];

  langTo: LangTo[] = [
    {value: 'german', viewValue: 'german'},
    {value: 'russian', viewValue: 'russian'},
  ];

// [ngStyle]="{'color': vocData[currentId].success ? 'green' : 'red'}"

  constructor(private vocDataService: DataServiceService,
              private logDataService: LogService,
              private dialog: MatDialog
              ) {
    this.vocData = [...vocGerRu];
    this.currentWord = this.vocData[this.currentId][this.fromValue];
   }
  onDictChange(ob): void {
    console.log("Event: %o", ob);
    console.log(`VAlue2: ${this.wordListName}`);
  }

  //===========================================================================================
  // fetchWords
  //===========================================================================================
  // Here we get the words from the database
  async fetchWords() {
    console.log("Fetch words: %s", this.wordListName);
    const words$ = this.vocDataService.getWords(this.wordListName);
    words$.subscribe({
      next: (res) => {
        this.origData = [...res];

        [this.vocData, this.permutation] = permutationShuffe(res);
        this.vocData.forEach( (value) => value.success = false);
        console.log(`id: ${this.mongoId}`);
        console.log(this.vocData);
      },
      error: (e) => console.log(e),
      complete: () => {
      this.resetValues();
      this.trainerRunning = true;
      console.log("Trainer is now running!");
      console.log("getWords completed");
      }
    });

   }

  //===========================================================================================
  // ngOnInit
  //===========================================================================================
  // Here we initialize the component and load the word list
  ngOnInit(): void {

//    this.vocDataService.getWords().subscribe({
//      next: (res) => {
//        this.origData = [...res];
//
//        [this.vocData, this.permutation] = permutationShuffe(res);
//        this.currentId = 0;
//        this.currentWord = this.vocData[this.currentId][this.fromValue];
//        this.mongoId = this.vocData[this.currentId]._id;
//        this.totalWords = this.vocData.length;
//        this.counter = 1;
//        this.correctWords = 0;
//        this.vocData.forEach( (value) => value.success = false);
//        console.log(`id: ${this.mongoId}`);
//        console.log(this.vocData);
//      },
//      error: (e) => console.log(e),
//      complete: () => {
//        console.log("getWords completed");
//      }
//    });

    this.trainerRunning = false;
    this.showFinalResult = false;
    this.vocDataService.getDictionaries().subscribe({
      next: (res) => {
        this.wordLists = [...res];
        console.log(this.wordLists);
      },
      error: (e) => console.log(e),
      complete: () => {
        console.log("getDictionaries completed");
      }
    });


  }

  //===========================================================================================
  // advanceWord
  //===========================================================================================
  // We advance the state one word and check if we have reached the end of the word list
  advanceWord() {
    this.currentId = (this.currentId + 1) % this.vocData.length;
    this.currentWord = this.vocData[this.currentId][this.fromValue];
    this.mongoId = this.vocData[this.currentId]._id;
    this.userTranslation = "";
    this.counter = this.counter + 1;
  }

  //===========================================================================================
  // checkUserSolution
  //===========================================================================================
  // We check the user solution, give an according response and advance to the next word
  checkUserSolution() {

    let toTranslation = this.vocData[this.currentId][this.toValue];
    console.log(`User translation: ${this.userTranslation}`);
    if (this.userTranslation === toTranslation) {
      console.log("Correct translation");

      this.textColor = 'green';
      this.userTranslation = this.userTranslation + " \u{2713}";
      // all ok and advance
      this.vocData[this.currentId].success = true;
      this.vocData[this.currentId].repetitions = this.vocData[this.currentId].repetitions + 1;
      this.vocData[this.currentId].correct = this.vocData[this.currentId].correct + 1;

      this.correctWords = this.correctWords + 1;
      console.log(`Current id: ${this.currentId}`);
      console.log(`Current word: ${this.currentWord}`);

      // Check if we have completed all words
      if(this.counter === this.totalWords) {
        this.showFinalResult = true;
        this.trainerRunning = false;
        console.log("All words done! Logging result")
        this.onLogResult();
      }

      // Log the result to the data base for statistics
//      let logData: LogData = {
//        wordId: this.mongoId,
//        result: true
//      };

    } else {
      console.log("Wrong translation");
      this.vocData[this.currentId].success = false;
      this.textColor = 'red';
      this.userTranslation = this.userTranslation + " \u{2718}";
      this.vocData[this.currentId].repetitions = this.vocData[this.currentId].repetitions + 1;

      if(this.counter === this.totalWords) {
        this.showFinalResult = true;
        this.trainerRunning = false;
        console.log("All words done! Logging result")
        this.onLogResult();
      }
    }

    // We know should give the user a feeback
    this.showingUserFeedback = true;
    this.buttonText = 'Continue';
  }
  //===========================================================================================
  // setFeedbackStyle()
  //===========================================================================================
  // Here we set the feedbackStyle here
  setFeedbackStyle() {
    // Set the user feedback style
    if (this.showingUserFeedback) {

    }
    // set the normal style
    else {

    }
  }

  //===========================================================================================
  // handleSubmit
  //===========================================================================================
  // The entry point for handling the submitted user data
  handleSubmit(form: NgForm) {
    //console.log(form.value.userSolution);
    //this.checkUserSolution(form.value.userSolution);
    if (this.showingUserFeedback === false) {
      this.checkUserSolution();
    }
    else {
      this.advanceWord();
      this.showingUserFeedback = false;
      this.textColor = 'black';
      this.buttonText = 'Submit';
    }
  }

  onLogResult() {

    const logData: LogData = {
      wordId: this.mongoId,
      result: true
    }

    const logArr: LogArray = {
      wordStatistics: this.vocData,
      dictId: this.wordListName
    }

    this.logDataService.logArrayResult(logArr).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (e) => console.log(e),
      complete: () => {
        console.log("logResult completed");
      }
    });
  }

  onLogResult2(logData: LogData) {

    this.logDataService.logResult(logData).subscribe({
      next: (res) => {
        res = simpleShuffle(res);
        console.log(this.vocData);
      },
      error: (e) => console.log(e),
      complete: () => {
        console.log("getWords completed");
      }
    });

//    this.authService.login( {
//      email: this.loginForm.value.email,
//      password: this.loginForm.value.password
//    }).subscribe({
//      next: (res) => {
//        this.authService.authSuccessful();
//        let resObj = {...res};
//        console.log( `Response = ${JSON.stringify(resObj)}`);
//        console.log( `User id = ${resObj.user}`);
//      },
//      error: (e) => console.log(e),
//      complete: () => {
//        console.log("Login complete");
//      }
//    });
  }
  //===========================================================================================
  // resetValues
  //===========================================================================================
  // Resets the state of the component to the inital state
  resetValues() {
    if(this.showFinalResult)
      this.showFinalResult = false;

    this.currentId = 0;
    this.currentWord = this.vocData[this.currentId][this.fromValue];
    this.mongoId = this.vocData[this.currentId]._id;
    this.totalWords = this.vocData.length;
    this.counter = 1;
    this.correctWords = 0;
    this.textColor = 'black';
    this.buttonText = 'Submit';
    this.userTranslation = "";

    this.vocData.forEach( (value) => value.success = false);
    this.trainerRunning = false;

  }

  //===========================================================================================
  // onStartTrainer
  //===========================================================================================
  // Starts the trainer and sets the running training variable to true
  onStartTrainer() {
    this.fetchWords();
  }

  //===========================================================================================
  // onStopTrainer
  //===========================================================================================
  // Stops the trainer and resets the application state
  onStopTrainer() {
    const dialogRef = this.dialog.open(StopTrainerComponent);

    dialogRef.afterClosed().subscribe(result => {
      if(result) {
        this.resetValues();
      }
    })
  }

}
