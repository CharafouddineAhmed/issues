import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent {

  componentName: string = "";

  constructor(private route: ActivatedRoute){

    if (this.route.component) {
      this.componentName = this.route.component.name;
    } else {
      this.componentName = "";
    }

  }  
}
