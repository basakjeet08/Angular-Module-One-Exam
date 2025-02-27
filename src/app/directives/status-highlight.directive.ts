import { Directive, HostBinding, HostListener, Input } from '@angular/core';

@Directive({ selector: '[appStatusHighlight]' })
export class StatusHighlightDirective {
  // These are the color to be used
  private default = 'var(--card--color)';
  private todoColor = 'var(--error--color)';
  private inProgressColor = 'var(--card--variant--color)';
  private doneColor = 'var(--confirm--color)';

  // This is the input to the status of the Component and the background object
  @Input('status') status!: string;
  @HostBinding('style.backgroundColor') backgroundColor: string = this.default;

  // This is the function which is invoked when the user hovers the component
  @HostListener('mouseenter') onMouseEnter() {
    // Checking if the status is not given
    if (!this.status) return;

    // Giving the color status accordingly
    if (this.status === 'TO DO') {
      this.backgroundColor = this.todoColor;
    } else if (this.status === 'In - Progress') {
      this.backgroundColor = this.inProgressColor;
    } else {
      this.backgroundColor = this.doneColor;
    }
  }

  // This is the function which is invoked when the user un - hovers the component
  @HostListener('mouseleave') onMouseLeave() {
    this.backgroundColor = this.default;
  }
}
