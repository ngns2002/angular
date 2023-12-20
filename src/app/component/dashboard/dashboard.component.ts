import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CurdService } from 'src/app/service/curd.service';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj: Task = new Task();
  taskArr: Task[] = [];
  hide = true;

  addTaskValue: string = '';
  addPassValue: string = '';
  addEmailValue: string = '';
  editTaskValue: string = '';
  editEmailValue: string = '';
  editPassValue: string = '';

  constructor(private crudService: CurdService, private router:Router) {}

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addPassValue = '';
    this.addEmailValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }

  getAllTask() {
    this.crudService.getAllTask().subscribe(res => {
      this.taskArr = res;
    }, err => {
      alert("Unable to get list of tasks");
    });
  }

  addTask() {
    this.taskObj.user = this.addTaskValue;
    this.taskObj.email = this.addEmailValue;
    this.taskObj.pass = this.addPassValue;

    // Add role based on email address
    if (this.taskObj.email.endsWith('@angular')) {
      this.taskObj.role = 'admin';
    } else {
      this.taskObj.role = 'email';
    }

    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.taskArr.push(res); // Thêm vào mảng để hiển thị ngay lập tức
      this.addTaskValue = ''; // Xóa giá trị nhập
      this.addPassValue = '';
      this.editTaskValue = '';
    }, err => {
      alert(err);
    })
  }
  editTask() {
    this.taskObj.user = this.editTaskValue;
    this.taskObj.email = this.editEmailValue;
    this.taskObj.pass = this.editPassValue;

    // Add role based on email address
    if (this.taskObj.email.endsWith('@angular')) {
      this.taskObj.role = 'admin';
    } else {
      this.taskObj.role = 'email';
    }

    this.crudService.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit();
        this.editTaskValue = ''; // Xóa giá trị nhập
        this.editEmailValue = ''; // Xóa giá trị nhập
        this.editPassValue = ''; // Xóa giá trị nhập
      }, err=> {
      alert("Failed to update task");
    })
  }
  deleteTask(etask : Task) {
    this.crudService.deleteTask(etask).subscribe(res => {
      this.ngOnInit();
    }, err=> {
      alert("Failed to delete task");
    });
  }

  call(etask : Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.user;
    this.editEmailValue = etask.email;
    this.editPassValue = etask.pass;
  }
  logout(): void {
    // Remove login info from storage
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
