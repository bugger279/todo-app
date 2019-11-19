import { Component, OnInit, ViewChild,Inject } from '@angular/core';
import { AuthenticationService } from "../_services/authentication.service";
import { FormBuilder, FormGroup, FormControl, Validators,FormGroupDirective, NgForm } from '@angular/forms';
import {MatPaginator} from '@angular/material/paginator';
// import {MatTableDataSource} from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  task: string;
  loggedInUser: {};
  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  taskList : [];
  taskForm: FormGroup;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  constructor(public auth: AuthenticationService,private toastr: ToastrService,public dialog: MatDialog) {
    // this.taskForm = new FormGroup({
    //   taskName: new FormControl('', [Validators.required]),
    //   emailId: new FormControl('', [Validators.required, Validators.email]),
    //   DOB: new FormControl('', [Validators.required]),
    //   password: new FormControl('', [Validators.required, Validators.minLength(7),
    //   Validators.maxLength(35),
    //   Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,35}$/)]),
    //   rePassword: new FormControl('', [Validators.required])
    // },{validators:this.passwordValidator});
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '500px',
      data: {task: this.task}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('This func called',result,this.task);
      this.toastr.success('Hello world!', 'Toastr fun!');
      this.task = result;
    });
  }

  ngOnInit() {
    this.auth.currentUser.subscribe(user => {
      this.loggedInUser = user;
    });
    // this.dataSource.paginator = this.paginator;
    this.auth.getList().subscribe(userData => {
      this.taskList = userData;
    },
    (error) => {
      // this.toastr.error('Failed!', 'Toastr fun!');
      // window.alert("Login Credentials Not Matched.")
      this.taskList = [];
      // console .log("error",error);
    });
  }
  addTsk(){
    this.toastr.success('Hello world!', 'Toastr fun!');
  }
}
@Component({
  selector: 'dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick() {
    this.dialogRef.close();
  }

}
export interface DialogData {
  task: string;
}
// export interface PeriodicElement {
//   name: string;
//   position: number;
//   weight: number;
//   symbol: string;
// }

// const ELEMENT_DATA: PeriodicElement[] = [
//   {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
//   {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
//   {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
//   {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
//   {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
//   {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
//   {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
//   {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
//   {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
//   {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
//   {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
//   {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
//   {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
//   {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
//   {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
//   {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
//   {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
//   {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
//   {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
//   {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
// ];