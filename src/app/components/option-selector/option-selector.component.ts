import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-option-selector',
    imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './option-selector.component.html',
    styleUrls: ['./option-selector.component.css']
})
export class OptionSelectorComponent {
  @Input() frontSaltoOptions: string[] = [];
  @Input() backSaltoOptions: string[] = [];
  @Input() otherOptions: string[] = [];
  @Input() selectedOption: string | null = null;
  @Output() optionSelected = new EventEmitter<string>();

  select(option: string) {
    this.optionSelected.emit(option);
  }
}
