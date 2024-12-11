import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Box} from "../../models/box.model";
import {StateService} from "../../services/state.service";
import {Observable} from "rxjs";

@Component({
    selector: 'app-box',
  changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule],
  standalone: true,
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.css']
})
export class BoxComponent {
  constructor(public stateService: StateService) {
  }
}
