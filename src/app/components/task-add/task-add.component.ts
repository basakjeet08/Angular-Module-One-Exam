import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css'],
})
export class TaskAddComponent implements OnInit {
  // This is the user input stored here for the component
  taskInput = {
    id: '',
    title: '',
    description: '',
    status: '',
  };

  // This flag tells if the component is opened in edit mode or add mode
  isEditMode: boolean = false;

  // Injecting the task service , router and route
  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Initializing and checking if the mode opened is edit or add
  ngOnInit(): void {
    // Fetching the task if the id is provided
    const taskId = this.route.snapshot.queryParams['taskId'];
    if (!taskId) return;
    const task = this.taskService.getTaskById(taskId);

    // Setting the task defaults if the component is opened in edit mode
    if (task) {
      this.isEditMode = true;

      this.taskInput = {
        id: task.id,
        title: task.title,
        description: task.description,
        status: task.status,
      };
    }
  }

  // This function is invoked if the submit / edit button is clicked
  onSubmitClick() {
    if (this.isEditMode) {
      this.taskService.updateTask(
        this.taskInput.id,
        this.taskInput.title,
        this.taskInput.description,
        this.taskInput.status
      );
    } else {
      this.taskService.addTask(
        this.taskInput.title,
        this.taskInput.description,
        this.taskInput.status
      );
    }

    // Navigating to the task list page
    this.router.navigate(['/']);
  }
}
