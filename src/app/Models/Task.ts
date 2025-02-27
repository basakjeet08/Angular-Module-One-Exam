export class Task {
  readonly id: string = crypto.randomUUID();

  constructor(
    readonly title: string,
    readonly description: string,
    readonly status: string
  ) {}
}
