import { Component } from '@angular/core';
import {SidebarComponent} from '../../../../shared/components/sidebar/sidebar.component'

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [SidebarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss'
})
export class LayoutComponent {

}
