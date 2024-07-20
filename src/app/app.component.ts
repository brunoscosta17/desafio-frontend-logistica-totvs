import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  menuItems = [
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Lista de Entregas', route: '/lista-de-entregas' }
  ];

  title = 'Logística';

  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(private router: Router) {}

  redirectTo(route: string) {
    this.router.navigate([route]).then(() => {
      this.sidenav.close();
    });
  }

}
