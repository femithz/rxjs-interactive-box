import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Box } from "../models/box.model";


@Injectable({
  providedIn: 'root',
})
export class StateService {

  private boxesSubject = new BehaviorSubject<Box[]>(
    this.loadState()
  );
  boxes$ = this.boxesSubject.asObservable();

  getBoxes(): Box[] {
    return this.boxesSubject.value;
  }

  updateBox(id: number, selectedOption: string) {
    const updatedBoxes = this.getBoxes().map(box =>
      box.id === id ? { ...box, selectedOption } : box
    );
    this.boxesSubject.next(updatedBoxes);
    this.saveState();
  }

  clearSelections() {
    const clearedBoxes = this.getBoxes().map(box => ({
      ...box,
      selectedOption: undefined,
    }));
    this.boxesSubject.next(clearedBoxes);
    this.saveState();
  }
  private createDefaultBoxes() {
    return  Array.from({ length: 10 }, (_, i) => ({ id: i + 1 }))
  }

  private loadState(): Box[] {
    const storedState = sessionStorage.getItem('boxesState');
    return storedState ? JSON.parse(storedState) : this.createDefaultBoxes();
  }

  private saveState(): void {
    const state = this.boxesSubject.value;
    sessionStorage.setItem('boxesState', JSON.stringify(state));
  }
}
