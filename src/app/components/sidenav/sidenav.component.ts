import { Component, computed, inject, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav'
import { ToggleNavService } from '../../services/toggle-nav.service';
import { MatIconModule } from '@angular/material/icon'
import { CustomSidenavComponent } from "./custom-sidenav/custom-sidenav.component";

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, CustomSidenavComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {

  hover = signal (false);

  navWidth = computed(() => this.toggleNavService.isOpen() ? '65px' : '250px');
  collapseImg = computed(() => this.toggleNavService.isOpen());

  toggleNavService = inject(ToggleNavService);

  constructor(){}
}
