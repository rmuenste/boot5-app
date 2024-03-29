import { Component } from "@angular/core";
import { MatDialog, MatDialogClose, MatDialogActions, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-stop-trainer',
  template: `<h1 mat-dialog-title>Are you sure?</h1>
             <mat-dialog-actions>
              <button mat-button [mat-dialog-close]="true">Yes</button>
              <button mat-button [mat-dialog-close]="false">No</button>
             </mat-dialog-actions>`
})
export class StopTrainerComponent {

}
