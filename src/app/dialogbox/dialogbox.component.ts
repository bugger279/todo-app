import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormGroupDirective, NgForm } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthenticationService } from "../_services/authentication.service";
import { ToastrService } from 'ngx-toastr';
import { TaskServiceService } from '../_services/task-service.service';

@Component({
  selector: 'app-dialogbox',
  templateUrl: './dialogbox.component.html',
  styleUrls: ['./dialogbox.component.css']
})
export class DialogboxComponent implements OnInit {
  taskForm: FormGroup;
  priorities = [{ title: "Low", value: "Low" }, { title: "Medium", value: "Medium" }, { title: "High", value: "High" }]
  constructor(
    public task : TaskServiceService,
    private authenticationService: AuthenticationService,
    public dialogRef: MatDialogRef<DialogboxComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private toastr: ToastrService) {
    this.taskForm = new FormGroup({
      _id: new FormControl(''),
      taskname: new FormControl('', [Validators.required]),
      priority: new FormControl('', [Validators.required]),
      startDate: new FormControl('', [Validators.required]),
      endDate: new FormControl('', [Validators.required]),
      comments: new FormControl('', [Validators.required])
    });
  }
  startDateChange(val){
    console.log("val",val);
  }
  ngOnInit() {
    // console.log("data",this.data.data);
    this.taskForm.setValue({
      _id: this.data.data._id,
      taskname: this.data.data.taskname,
      priority: this.data.data.priority,
      startDate: this.data.data.startDate,
      endDate: this.data.data.endDate,
      comments: this.data.data.comments
    });
  }
  onSubmit(){
    if (this.taskForm.invalid) {
      return false;
    }
    if (this.taskForm.value._id) {

      if (localStorage.getItem('currentUser')) {
        // let data = JSON.parse(localStorage.getItem('guestUser'));
        // this.dataSource = new MatTableDataSource(data);
        // return { data: data };
        this.authenticationService.updateTask(this.taskForm.value).subscribe(response => {
          if (response.success) {
            this.toastr.success('Success!', response.message);
            this.task.addTask(response.data);
            this.task.method = "edit";
            // console.log("response", response);
            // this.Router.navigate([""]);
          }
        },
          (error) => {
            console.log("error",error)
            
            this.toastr.error('Error!', error);
          });
      } else {
        // this.dataSource = new MatTableDataSource([]);
        // localStorage.setItem('guestUser', null);
        // return { data: "" };
      }

    } else {
      if (localStorage.getItem('currentUser')) {
      this.authenticationService.addTask(this.taskForm.value).subscribe(response => {
        if (response.success) {
          this.toastr.success('Success!', response.message);
          this.task.addTask(response.task);
          this.task.method = "add";
          // console.log("response", response);
          // this.Router.navigate([""]);
        }
      },
        (error) => {
          console.log("error",error)
          
          this.toastr.error('Error!', error);
        });
      } else {
        
      }
    }
  }
}

// export interface DialogData {
//   task: string;
// }