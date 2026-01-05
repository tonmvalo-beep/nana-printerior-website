import { EditorState } from './types';

const MAX_HISTORY = 20;

export class EditorHistory {
  private history: EditorState[] = [];
  private currentIndex: number = -1;

  push(state: EditorState): void {
    this.history = this.history.slice(0, this.currentIndex + 1);
    this.history.push(JSON.parse(JSON.stringify(state)));
    this.currentIndex++;

    if (this.history.length > MAX_HISTORY) {
      this.history.shift();
      this.currentIndex--;
    }
  }

  undo(): EditorState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return JSON.parse(JSON.stringify(this.history[this.currentIndex]));
    }
    return null;
  }

  redo(): EditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return JSON.parse(JSON.stringify(this.history[this.currentIndex]));
    }
    return null;
  }

  canUndo(): boolean {
    return this.currentIndex > 0;
  }

  canRedo(): boolean {
    return this.currentIndex < this.history.length - 1;
  }

  clear(): void {
    this.history = [];
    this.currentIndex = -1;
  }
}
