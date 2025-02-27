import { Injectable } from '@angular/core';
import { Task } from '../Models/Task';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  // These are the task list variable and the subject that will pass data events
  private taskList: Task[] = [];
  private taskSubject = new Subject<Task[]>();

  // Initializing the task list to some dummy data for testing
  constructor() {
    this.taskList = [
      new Task('Title', 'Description', 'In - Progress'),
      new Task('Title', 'Description', 'In - Progress'),
      new Task('Title', 'Description', 'In - Progress'),
      new Task('Title', 'Description', 'In - Progress'),
    ];
  }

  // Encapsulating the task list data to prevent data changes outside the service
  getTaskList() {
    return [...this.taskList];
  }

  // Returning the task subject as readonly to prevent changes to it
  getTaskSubject() {
    return this.taskSubject.asObservable();
  }
}
