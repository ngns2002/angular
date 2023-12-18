import { Component, OnInit } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CurdService } from 'src/app/service/curd.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  addPassValue: string = '';
  addEmailValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CurdService) {}

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
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.taskArr.push(res); // Thêm vào mảng để hiển thị ngay lập tức
      this.addTaskValue = ''; // Xóa giá trị nhập
      this.addPassValue = '';
    }, err => {
      alert(err);
    })
  }
  editTask() {
    this.taskObj.user = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(res => {
      this.ngOnInit();
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
    this.addPassValue = etask.pass;
  }
}