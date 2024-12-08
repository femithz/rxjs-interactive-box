import {Component, Input, Output, EventEmitter, ChangeDetectionStrategy} from '@angular/core';
import { CommonModule } from '@angular/common';
import {Box} from "../../models/box.model";


@Component({
    selector: 'app-box',
  changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule],
  standalone: true,
    templateUrl: './box.component.html',
    styleUrls: ['./box.component.css']
})
export class BoxComponent {
  @Input() box!: Box;
  @Input() isSelected: boolean = false;
  @Output() boxSelected = new EventEmitter<number>();

  selectBox() {
    this.boxSelected.emit(this.box.id);
  }
}
