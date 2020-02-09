import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import {FormControl} from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface Images {
  images: string;
}
@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {
 
  @Input() images = [];
  @Output() selectImg = new EventEmitter<string>()
 
  constructor(public dialog: MatDialog) {}
  myselect = new FormControl();
  img: string;
  selectedImg: string;

  getSelValue() : string {
    this.selectedImg = this.myselect.value;
    return this.selectedImg;
  }



  openDialog(): void {
    this.getSelValue();
   const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
    width: '50%',
    data: this.selectedImg
  });

  dialogRef.afterClosed().subscribe(result => {
    let nameArr = Array.from(this.selectedImg);
    let count = nameArr.indexOf('.');
    let truncName = nameArr.splice(0, count);
    let imgName = truncName.join("");
  
    console.log(imgName);
    this.selectImg.emit(imgName);
    
  });

  }


  ngOnInit() {
   console.log(this.images);
  }

}


@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: Images) {}

  onNoClick(): void {
    this.dialogRef.close(this.data);
  }

}
