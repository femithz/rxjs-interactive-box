import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StateService } from "../../services/state.service";

@Component({
    selector: 'app-option-selector',
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
    templateUrl: './option-selector.component.html',
    styleUrls: ['./option-selector.component.css']
})
export class OptionSelectorComponent {
  constructor(public stateService: StateService) {}
}
