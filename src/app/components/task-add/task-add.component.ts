import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css'],
})
export class TaskAddComponent {
  // This holds a object referring to the form container in the Template file
  @ViewChild('formContainer') form!: NgForm;

  // Injecting the task service and router
  constructor(private taskService: TaskService, private router: Router) {}

  // This function is invoked if the submit button is clicked
  onSubmitClick() {
    const { title, description, status } = this.form.value;
    this.taskService.addTask(title, description, status);

    // Navigating to the task list page
    this.router.navigate(['/']);
  }
}
