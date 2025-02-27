import { Injectable } from '@angular/core';
import { Task } from '../Models/Task';
import { Observable, Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  // These are the task list variable and the subject that will pass data events
  private taskList: Task[] = [];
  private taskSubject = new Subject<Task[]>();
  private readonly TASK_KEY = 'task-list';

  // Initializing the task list with the previous values from the local storage
  constructor() {
    this.taskList = this.getTaskListFromLocalStorage();
    this.taskSubject.subscribe((_taskList) => this.setTaskListToLocalStorage());
  }

  // Unsubscribing the subject when the service is getting destroyed
  OnDestroy() {
    this.taskSubject?.unsubscribe();
  }

  // Encapsulating the task list data to prevent data changes outside the service
  getTaskList(): Task[] {
    return [...this.taskList];
  }

  // Returning the task subject as readonly to prevent changes to it
  getTaskSubject(): Observable<Task[]> {
    return this.taskSubject.asObservable();
  }

  // This function is used to parse data from the local storage
  getTaskListFromLocalStorage() {
    return JSON.parse(localStorage.getItem(this.TASK_KEY) || '[]');
  }

  // This function is used to set the new task list to the local storage
  setTaskListToLocalStorage() {
    localStorage.setItem(this.TASK_KEY, JSON.stringify(this.taskList));
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
