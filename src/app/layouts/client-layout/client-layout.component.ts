import { Component } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-client-layout',
  standalone: true,
  templateUrl: './client-layout.component.html',
  styleUrl: './client-layout.component.css',
  imports: [HeaderComponent, FooterComponent, RouterOutlet]
})
export class ClientLayoutComponent {

}
