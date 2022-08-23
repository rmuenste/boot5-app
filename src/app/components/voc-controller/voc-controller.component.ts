import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiceService } from 'src/app/data/data-service.service';
import { LogService } from 'src/app/data/log.service';
import { LogData } from 'src/app/data/logData';
import { vocGerRu } from 'src/app/data/mydata';
import { simpleShuffle } from 'src/app/modules/shuffle';

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
  currentId: number = 0;                        // The index of the current word
  totalWords: number = -1;                      // The total number of words in the training (array length)
  counter: number = 1;                          // The word counter for the current training
  correctWords: number = 0;                     // The number of correct words
  mongoId: string = "";                         // The id in the mongo data base
  currentWord: string = "";                     // The current word as string
  userTranslation: string = "";                 // The user translation of the current word
  trainerRunning = false;                       // flag: is the trainer running
  showFinalResult = false;                      // flag: should we show the result screen

  langFrom: LangFrom[] = [
    {value: 'russian', viewValue: 'russian'},
  ];

  langTo: LangTo[] = [
    {value: 'german', viewValue: 'german'},
  ];


  constructor(private vocDataService: DataServiceService, private logDataService: LogService) {
    this.vocData = [...vocGerRu];
    this.currentWord = this.vocData[this.currentId].Russian;
   }

  //===========================================================================================
  // ngOnInit
  //===========================================================================================
  // Here we initialize the component and load the word list
  ngOnInit(): void {

    this.vocDataService.getWords().subscribe({
      next: (res) => {
        res = simpleShuffle(res);
        this.vocData = [...res];
        this.currentId = 0;
        this.currentWord = this.vocData[this.currentId].Russian;
        this.mongoId = this.vocData[this.currentId]._id;
        this.totalWords = this.vocData.length;
        this.counter = 1;
        this.correctWords = 0;
        this.trainerRunning = false;
        this.showFinalResult = false;
        this.vocData.forEach( (value) => value.success = false);
        console.log(`id: ${this.mongoId}`);
        console.log(this.vocData);
      },
      error: (e) => console.log(e),
      complete: () => {
        console.log("getWords completed");
      }
    });
  }

  //===========================================================================================
  // advanceWord
  //===========================================================================================
  // We advance the state one word and check if we have reached the end of the word list
  advanceWord() {
    this.currentId = (this.currentId + 1) % this.vocData.length;
    this.currentWord = this.vocData[this.currentId].Russian;
    this.mongoId = this.vocData[this.currentId]._id;
    this.userTranslation = "";
    this.counter = this.counter + 1;
  }

  //===========================================================================================
  // checkUserSolution
  //===========================================================================================
  // We check the user solution, give an according response and advance to the next word
  checkUserSolution() {
    let gerTranslation = this.vocData[this.currentId].German;
    console.log(`User translation: ${this.userTranslation}`);
    if (this.userTranslation === gerTranslation) {
      console.log("Correct translation");
      // all ok and advance
      this.vocData[this.currentId].success = true;
      if(this.counter === this.totalWords) {
        this.showFinalResult = true;
        this.trainerRunning = false;
        console.log("All words done!")
      }
      this.advanceWord();
      this.correctWords = this.correctWords + 1;
      console.log(`Current id: ${this.currentId}`);
      console.log(`Current word: ${this.currentWord}`);
      // Log the result to the data base for statistics
//      let logData: LogData = {
//        wordId: this.mongoId,
//        result: true
//      };
//      this.onLogResult2(logData);

    } else {
      console.log("Wrong translation");
      this.vocData[this.currentId].success = false;
      if(this.counter === this.totalWords) {
        this.showFinalResult = true;
        this.trainerRunning = false;
        console.log("All words done!")
      }
      this.advanceWord();
    }
  }

  //===========================================================================================
  // handleSubmit
  //===========================================================================================
  // The entry point for handling the submitted user data
  handleSubmit(form: NgForm) {
    //console.log(form.value.userSolution);
    //this.checkUserSolution(form.value.userSolution);
    this.checkUserSolution();
  }

  onLogResult() {

    const logData: LogData = {
      wordId: this.mongoId,
      result: true
    }

    this.logDataService.logResult(logData).subscribe({
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
      this.showFinalResult = !this.showFinalResult;

    this.currentId = 0;
    this.currentWord = this.vocData[this.currentId].Russian;
    this.mongoId = this.vocData[this.currentId]._id;
    this.totalWords = this.vocData.length;
    this.counter = 1;
    this.correctWords = 0;

    this.vocData.forEach( (value) => value.success = false);

  }

  //===========================================================================================
  // onStartTrainer
  //===========================================================================================
  // Starts the trainer and sets the running training variable to true
  onStartTrainer() {
    this.trainerRunning = true;
    this.resetValues();
    console.log("Trainer is now running!");
  }

  //===========================================================================================
  // onStopTrainer
  //===========================================================================================
  // Stops the trainer and resets the application state
  onStopTrainer() {
    this.trainerRunning = false;
    this.resetValues();
  }

}
