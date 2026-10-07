// Define the structure of a single task item
interface Task {
  id: number;
  title: string;
  completed: boolean;
  priority: 'low' | 'medium' | 'high';
  createdAt: Date;
}

// Define the input type for creating a new task (omitting auto-generated fields)
type NewTaskInput = Omit<Task, 'id' | 'createdAt' | 'completed'>;

// TaskManager class to handle operations
class TaskManager {
  private tasks: Task[] = [];
  private nextId: number = 1;

  // Add a new task
  public addTask(input: NewTaskInput): Task {
    const newTask: Task = {
      id: this.nextId++,
      title: input.title.trim(),
      priority: input.priority,
      completed: false,
      createdAt: new Date(),
    };

    if (!newTask.title) {
      throw new Error('Task title cannot be empty.');
    }

    this.tasks.push(newTask);
    return newTask;
  }

  // Mark a task as completed or incomplete
  public toggleTask(id: number): void {
    const task = this.tasks.find((t) => t.id === id);
    if (!task) {
      throw new Error(`Task with ID ${id} not found.`);
    }
    task.completed = !task.completed;
  }

  // Remove a task by ID
  public deleteTask(id: number): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter((t) => t.id !== id);
    return this.tasks.length < initialLength;
  }

  // Get all tasks, optionally filtered by completion status
  public getTasks(completedOnly?: boolean): Task[] {
    if (completedOnly !== undefined) {
      return this.tasks.filter((t) => t.completed === completedOnly);
    }
    return [...this.tasks];
  }

  // Get task summary statistics
  public getStats(): { total: number; completed: number; pending: number } {
    const total = this.tasks.length;
    const completed = this.tasks.filter((t) => t.completed).length;
    return {
      total,
      completed,
      pending: total - completed,
    };
  }
}

// --- Example Usage ---
const manager = new TaskManager();

// Add tasks
manager.addTask({ title: 'Learn TypeScript interfaces', priority: 'high' });
manager.addTask({ title: 'Build a 100-line code snippet', priority: 'medium' });
manager.addTask({ title: 'Write unit tests', priority: 'low' });

// Toggle a task
manager.toggleTask(1);

// Print results
console.log('All Tasks:', manager.getTasks());
console.log('Task Statistics:', manager.getStats());
