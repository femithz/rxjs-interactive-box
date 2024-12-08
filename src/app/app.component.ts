import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from './services/state.service';
import { BoxComponent } from "./components/box/box.component";
import { OptionSelectorComponent } from "./components/option-selector/option-selector.component";
import { Observable } from "rxjs";
import {Box} from "./models/box.model";


@Component({
    selector: 'app-root',
    imports: [CommonModule, BoxComponent, OptionSelectorComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
  boxes$: Observable<Box[]> = this.state.boxes$;
  selectedBox: Box | null = null;
  totalValue = 0;
  frontSaltoOptions = ['.1', '.2', '.3', '.4', '.5', '.6', '.7', '.8', '.9', '1.0'];
  backSaltoOptions = ['3.4', '4.5', '5.6', '6.7', '7.8', '8.9', '9.0', '10.1', '11.2', '12.3'];
  otherOptions = ['( H', 'F', 'A', 'B', 'C', 'D', 'E', 'G', 'I', 'J'];
  selectedOption: any;


  constructor(private state: StateService) {}

  onBoxSelected(boxId: number) {
    const boxes = this.state.getBoxes();
    this.selectedBox = boxes.find(box => box.id === boxId) || null;
    if (this.selectedBox && this.selectedBox.selectedOption) {
      this.selectedOption = this.selectedBox.selectedOption;
    } else {
      this.selectedOption = null;
    }
  }

  onOptionSelected(option: string) {
    if (this.selectedBox) {
      this.state.updateBox(this.selectedBox.id, option);
      this.updateTotalValue();
      this.selectedOption = option;
      const boxes = this.state.getBoxes();
      const currentIndex = boxes.findIndex(box => box.id === this.selectedBox?.id);
      const nextBox = boxes[currentIndex + 1];
      this.selectedBox = nextBox || null;
      this.selectedOption = nextBox?.selectedOption || null;
    }
  }

  clearSelections() {
    this.state.clearSelections();
    this.totalValue = 0;
  }

  private updateTotalValue() {
    const boxes = this.state.getBoxes();
    this.totalValue = boxes.reduce((sum, box) => {
      if (box.selectedOption) {
        return sum + parseFloat(box.selectedOption) || 0;
      }
      return sum;
    }, 0);
  }
}
