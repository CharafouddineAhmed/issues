import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Issue } from '../../modeles/issue';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import firebase from "firebase/compat/app";
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-new-issue',
  templateUrl: './new-issue.component.html',
  styleUrls: ['./new-issue.component.css']
})
export class NewIssueComponent {

  issueForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  private issuesCollection: AngularFirestoreCollection<Issue>;
  // issues: Observable<Issue[]>;

  constructor(
    private readonly afs: AngularFirestore, 
    private storage: AngularFireStorage,
    private router: Router) {
      this.issuesCollection = afs.collection<Issue>('issues');
    
  }

  addNewIssue(){
    console.warn('Your order has been submitted', this.issueForm.value.title);
   
    // add doc in firestoe 
    // Persist a document id
    const id = this.afs.createId();
    const { serverTimestamp } = firebase.firestore.FieldValue;
    const fileContent = this.issueForm.value.content;

    const issue: Issue = {
      id: id,
      status: 'open', // default value
      postBy: 'Ahmed CHARAFOUDDINE',
      title: this.issueForm.value.title,
      content: this.issueForm.value.content,
      dateCreated: serverTimestamp(),
    };

    this.issuesCollection.doc(id).set(issue)
      .then(() => {
        this.issueForm.reset();
        this.router.navigate(['/issues']);
      })
      .catch( e => {console.error('error : ', e)})

    
    // Ajout dans storage 
    const fileName = id + '.md';
    const blob = new Blob([fileContent ? fileContent : ''], { type: 'text/markdown' });
    const ref = this.storage.ref('contents/'+ fileName);
    const task = ref.put(blob);
    task.then(() => {
      console.log('Fichier envoyé');
    }).catch(error => {
      console.error('Erreur lors de l\'envoi du fichier', error);
    });



  }
}
