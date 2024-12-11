import { Component } from '@angular/core';
import {StateService} from "../../services/state.service";
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(public stateService: StateService) {}
}
