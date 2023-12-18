import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CurdService } from 'src/app/service/curd.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent {

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
  }

  addTask() {
    this.taskObj.user = this.addTaskValue;
    this.taskObj.email = this.addEmailValue;
    this.taskObj.pass = this.addPassValue;
    this.crudService.addTask(this.taskObj).subscribe(res => {
      this.taskArr.push(res); // Thêm vào mảng để hiển thị ngay lập tức
      this.addTaskValue = ''; // Xóa giá trị nhập
      this.addEmailValue = '';
      this.addPassValue = '';
    }, err => {
      alert(err);
    })
  }
}
