import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Issue } from '../../modeles/issue';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-issues',
  templateUrl: './issues.component.html',
  styleUrls: ['./issues.component.css']
})
export class IssuesComponent  {
  private itemsCollection: AngularFirestoreCollection<Issue>;
  issues: Observable<Issue[]>;
  constructor(private readonly afs: AngularFirestore, private router: Router) {
    this.itemsCollection = afs.collection<Issue>('issues');
    // this.issues = this.itemsCollection.valueChanges({ idField: 'customID' });
    this.issues = this.itemsCollection.valueChanges();
  }
  

  goToDetail(issue: Issue) {
    // const heroId = hero ? hero.id : null;
    // Pass along the hero id if available
    // so that the HeroList component can select that item.
    this.router.navigate(['/details', { id: issue.id }]); 

  }  

}


