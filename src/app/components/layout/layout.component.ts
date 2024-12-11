import { Component } from '@angular/core';
import {CommonModule} from "@angular/common";
import {BoxComponent} from "../box/box.component";
import {OptionSelectorComponent} from "../option-selector/option-selector.component";
import {StateService} from "../../services/state.service";
import {HeaderComponent} from "../header/header.component";

@Component({
  selector: 'app-layout',
  imports: [CommonModule, BoxComponent, OptionSelectorComponent, HeaderComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(public stateService: StateService) {}
}
