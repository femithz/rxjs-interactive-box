import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from "./components/layout/layout.component";


@Component({
    selector: 'app-root',
    imports: [CommonModule, LayoutComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {

}
