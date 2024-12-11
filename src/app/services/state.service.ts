import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Box } from '../models/box.model';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  boxesSubject = new BehaviorSubject<Box[]>(this.loadState());
  boxes$ = this.boxesSubject.asObservable();

  selectedBoxSubject = new BehaviorSubject<Box | null>(this.loadSelectedBox());
  selectedBox$ = this.selectedBoxSubject.asObservable();

  totalValueSubject = new BehaviorSubject<number>(this.calculateInitialTotalValue());
  totalValue$ = this.totalValueSubject.asObservable();

  selectedOptionSubject = new BehaviorSubject<string | null>(null);
  selectedOption$ = this.selectedOptionSubject.asObservable();

   options = {
    frontSalto: ['.1', '.2', '.3', '.4', '.5', '.6', '.7', '.8', '.9', '1.0'],
    backSalto: ['3.4', '4.5', '5.6', '6.7', '7.8', '8.9', '9.0', '10.1', '11.2', '12.3'],
    other: ['H', 'F', 'A', 'B', 'C', 'D', 'E', 'G', 'I', 'J'],
  };


  getFrontOptions() {
    return this.options.frontSalto;
  }

  getBackOptions() {
    return this.options.backSalto;
  }

  getOtherOptions() {
    return this.options.other;
  }


  getBoxes(): Box[] {
    return this.boxesSubject.getValue();
  }

  selectBox(boxId: number) {
    const box = this.getBoxes().find(b => b.id === boxId) || null;
    this.selectedBoxSubject.next(box);
    this.saveSelectedBox(box);
    if (box && box.selectedOption) {
      this.selectedOptionSubject.next(box.selectedOption);
    } else {
      this.selectedOptionSubject.next(null);
    }
  }

  onOptionSelected(option: string): void {
    const boxes = this.getBoxes();
    const currentBox = this.selectedBoxSubject.getValue();
    if (currentBox) {
      this.updateBox(currentBox.id, option);
      const currentIndex = boxes.findIndex(box => box.id === currentBox.id);
      const nextBox = boxes[currentIndex + 1] || currentBox;
      this.selectedBoxSubject.next(nextBox);
      this.saveSelectedBox(nextBox);
    }
  }


  updateBox(id: number, selectedOption: string) {
    const updatedBoxes = this.getBoxes().map(box =>
      box.id === id ? { ...box, selectedOption } : box
    );
    this.boxesSubject.next(updatedBoxes);
    this.saveState(updatedBoxes);
    this.updateTotalValue(updatedBoxes);
  }


  clearSelections() {
    const clearedBoxes = this.getBoxes().map(box => ({
      ...box,
      selectedOption: undefined,
    }));
    this.boxesSubject.next(clearedBoxes);
    this.saveState(clearedBoxes);
    this.selectedBoxSubject.next(null);
    this.saveSelectedBox(null);
    this.updateTotalValue(clearedBoxes);
  }


  private loadState(): Box[] {
    const storedState = sessionStorage.getItem('boxesState');
    return storedState ? JSON.parse(storedState) : this.createDefaultBoxes();
  }

  private saveState(state: Box[]): void {
    sessionStorage.setItem('boxesState', JSON.stringify(state));
  }

  private loadSelectedBox(): Box | null {
    const storedSelectedBox = sessionStorage.getItem('selectedBox');
    return storedSelectedBox ? JSON.parse(storedSelectedBox) : null;
  }

  private saveSelectedBox(selectedBox: Box | null): void {
    sessionStorage.setItem('selectedBox', JSON.stringify(selectedBox));
  }

    private createDefaultBoxes(): Box[] {
    return Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      selectedOption: undefined,
    }));
  }

  private calculateInitialTotalValue(): number {
    const total = this.getBoxes().reduce((sum, box) => {
      const numericValue = parseFloat(box.selectedOption || '0');
      return sum + (isNaN(numericValue) ? 0 : numericValue);
    }, 0);
    return parseFloat(total.toFixed(2));
  }

  private updateTotalValue(boxes: Box[]): void {
    const totalValue = boxes.reduce((sum, box) => {
      const numericValue = parseFloat(box.selectedOption || '0');
      return sum + (isNaN(numericValue) ? 0 : numericValue);
    }, 0);
    this.totalValueSubject.next(parseFloat(totalValue.toFixed(2)));
  }
}

