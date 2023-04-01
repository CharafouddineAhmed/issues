import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Issue } from '../../modeles/issue';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, BehaviorSubject, combineLatest } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { NavbarService } from 'src/app/services/navbar.service';


@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent  {
  private itemsCollection: AngularFirestoreCollection<Issue>;
  issues: Observable<Issue[]>;

  countComments: boolean | undefined;

  constructor(
    private readonly afs: AngularFirestore, 
    private router: Router,
    private navbar: NavbarService) {
    this.itemsCollection = afs.collection<Issue>('issues');
    this.issues = this.itemsCollection.snapshotChanges().pipe(
      map( actions => actions.map( a => {
        const data = a.payload.doc.data() as Issue;
        console.log(data);
        
        const id = a.payload.doc.id; 

        return {id, ...data}
      }) )
    );
    
    
  }
  

  goToDetail(issue: Issue) {
    // const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that item.
    this.router.navigate(['/details', { id: issue.id }]); 

  } 

  clearFiltre(){
    console.log("clear filtre");
  }

  getIssuesCount() {
    this.issues.subscribe(data => {
      if (data.length === 0) {
        return true;
      } else {
  
        return false;
  
      }
    });
  }
  
  goToHome() {
    this.navbar.goTo('issues');
  }

}


