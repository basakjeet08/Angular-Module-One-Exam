import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Task } from 'src/app/Models/Task';
import { TaskService } from 'src/app/services/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
})
export class TaskListComponent implements OnInit, OnDestroy {
  // These are the task list variable and subscription to task event data
  taskList!: Task[];
  private taskSubscription!: Subscription;

  // Injecting the Task Service , Router and the route
  constructor(
    private taskService: TaskService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  // This initializes the task list and starts a subscription to the task list data events
  ngOnInit(): void {
    this.taskList = this.taskService.getTaskList();

    // Subscribing to the task list
    this.taskSubscription = this.taskService
      .getTaskSubject()
      .subscribe((taskList) => (this.taskList = taskList));
  }

  // This function is invoked when the show details button is clicked
  onDetailsClick(id: string) {
    this.router.navigate(['task-details', id], { relativeTo: this.route });
  }

  // This function is invoked when the user clicks on the edit option
  onEditClick(id: string) {
    this.router.navigate(['/task-add'], {
      relativeTo: this.route,
      queryParams: { taskId: id },
    });
  }

  // Removing the task list subscription to prevent memory leaks
  ngOnDestroy(): void {
    this.taskSubscription?.unsubscribe();
  }
}
