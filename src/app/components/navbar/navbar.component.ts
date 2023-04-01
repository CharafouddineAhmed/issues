import { Component } from '@angular/core';
import { Router, NavigationEnd  } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  currentRoute?: string;
  id?: string; 

  constructor(private router: Router){

    router.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        console.log(this.currentRoute)

        if (this.currentRoute && this.currentRoute.includes('/details')) {
          const parts = this.currentRoute.split(';');
          if (parts.length > 1) {
            this.id = parts[1].split('=')[1];
            // La variable "id" contient la valeur "zqsXIuAxfFADLHqNMx8P"
          }
        }

        
      }
    });
  }
}
