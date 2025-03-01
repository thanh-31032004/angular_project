import { Component } from '@angular/core';
import { ListComponent } from "../products/list/list.component";

@Component({
  selector: 'app-homepage',
  standalone: true,
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
  imports: [ListComponent]
})
export class HomepageComponent {

}
