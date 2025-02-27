import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from 'src/app/Models/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
})
export class TaskDetailsComponent implements OnInit {
  // This variables keeps track of the current task
  taskData!: Task;

  // Injecting the basic task service , router and routes
  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // Initializing the task data for the component
  ngOnInit(): void {
    // Fetching the task data
    const taskId = this.route.snapshot.params['id'];
    const task = this.taskService.getTaskById(taskId);

    // If the task is not present then we revert back to the task details screen
    if (!task) {
      alert(
        'The Given ID must be invalid or not Task Data Found. Redirecting you to the previous page !!'
      );

      // Navigating back to the task list page
      this.router.navigate(['../../'], { relativeTo: this.route });
    } else this.taskData = task;
  }
}
