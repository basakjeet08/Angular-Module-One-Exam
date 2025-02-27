import { Injectable } from '@angular/core';
import { Task } from '../Models/Task';
import { Observable, Subject } from 'rxjs';

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
  getTaskList(): Task[] {
    return [...this.taskList];
  }

  // Returning the task subject as readonly to prevent changes to it
  getTaskSubject(): Observable<Task[]> {
    return this.taskSubject.asObservable();
  }

  // This function adds a task list to the task lists
  addTask(title: string, description: string, status: string) {
    this.taskList.push(new Task(title, description, status || 'TO DO'));
    this.taskSubject.next(this.getTaskList());
  }

  // This function updates the task given
  updateTask(id: string, title: string, description: string, status: string) {
    this.taskList = this.taskList.map((task) => {
      if (task.id === id) {
        return {
          id: id,
          title: title,
          description: description,
          status: status || 'TO DO',
        };
      } else return task;
    });

    this.taskSubject.next(this.getTaskList());
  }

  // This function provides the task matching the id
  getTaskById(id: string): Task | undefined {
    return this.taskList.find((task) => task.id === id);
  }
}
