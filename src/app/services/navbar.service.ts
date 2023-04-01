import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {

  constructor(public router: Router) { }

  goTo(param: string ){
    this.router.navigate([param]);
    console.log('Go to .. ' +  param);
  }
}
