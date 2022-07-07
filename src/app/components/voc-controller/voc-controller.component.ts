import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DataServiceService } from 'src/app/data/data-service.service';
import { vocGerRu } from 'src/app/data/mydata';
import { simpleShuffle } from 'src/app/modules/shuffle';

@Component({
  selector: 'app-voc-controller',
  templateUrl: './voc-controller.component.html',
  styleUrls: ['./voc-controller.component.css']
})
export class VocControllerComponent implements OnInit {

  vocData = [];
  currentId: number = 0;
  currentWord: string = "";
  userTranslation: string = "";
  constructor(private vocDataService: DataServiceService) {
    this.vocData = [...vocGerRu];
    this.currentWord = this.vocData[this.currentId].Russian;
   }

  ngOnInit(): void {

    this.vocDataService.getWords().subscribe({
      next: (res) => {
        res = simpleShuffle(res);
        this.vocData = [...res];
        this.currentWord = this.vocData[this.currentId].Russian;
        console.log(this.vocData);
      },
      error: (e) => console.log(e),
      complete: () => {
        console.log("getWords completed");
      }
    });
  }

  //checkUserSolution(userSol: string) {
  checkUserSolution() {
    let gerTranslation = this.vocData[this.currentId].German;
    console.log(`User translation: ${this.userTranslation}`);
    if (this.userTranslation === gerTranslation) {
      console.log("Correct translation");
      // all ok and advance
      this.currentId = (this.currentId + 1) % this.vocData.length;
      this.currentWord = this.vocData[this.currentId].Russian;
      this.userTranslation = "";
      console.log(`Current id: ${this.currentId}`);
      console.log(`Current word: ${this.currentWord}`);
    } else {
      console.log("Wrong translation");
      this.userTranslation = "";
    }
  }

  handleSubmit(form: NgForm) {
    //console.log(form.value.userSolution);
    //this.checkUserSolution(form.value.userSolution);
    this.checkUserSolution();
  }
}
