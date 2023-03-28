import { Component, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import firebase from "firebase/compat/app";
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Issue, Comment } from '../../modeles/issue';


@Component({
  selector: 'app-editor-issue',
  templateUrl: './editor-issue.component.html',
  // template: '<p>editor issue<p>',
  styleUrls: ['./editor-issue.component.css']
})
export class EditorIssueComponent {

  @Input('componentName') componentName = '';
  @Input('issueId') issueId = '';

  issueForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });

  // false = writeComponent & true = previewComponent 
  viewOption : boolean = false;
  private issuesCollection: AngularFirestoreCollection<Issue>;
  // issues: Observable<Issue[]>;
  content : string = "";
  title : string = "";

  constructor(
    private readonly afs: AngularFirestore, 
    private storage: AngularFireStorage,
    private router: Router
  ){
    this.issuesCollection = afs.collection<Issue>('issues');
  }

  previewIssue(){
    console.log("preview... ")
    this.viewOption = true;
    this.content = this.issueForm.value.content?.replaceAll("\\n", "\n") || "";
    this.title = this.issueForm.value.title || "";
  }

  writeIssue(){
    console.log("Write view ... ");
    this.viewOption = false
  }

  /**
   * Add new issue in Issues firestore collections
   */
  addNewIssue(){   
    // add doc in firestoe 
    // Persist a document id
    const id = this.afs.createId();
    const { serverTimestamp } = firebase.firestore.FieldValue;
    const fileContent = this.issueForm.value.content;

    const contentUpdated = this.issueForm.value.content?.replace(/\n/g, '\\n');
    console.log(contentUpdated);

    const issue: Issue = {
      id: id,
      status: 'open', // default value
      postBy: 'Ahmed CHARAFOUDDINE',
      title: this.issueForm.value.title,
      content: contentUpdated,
      dateCreated: serverTimestamp(),
    };

    this.issuesCollection.doc(id).set(issue)
      .then(() => {
        this.issueForm.reset();
        this.router.navigate(['/issues']);
      })
      .catch( e => {console.error('error : ', e)})

    // // Ajout dans storage 
    // const fileName = id + '.md';
    // const blob = new Blob([fileContent ? fileContent : ''], { type: 'text/markdown' });
    // const ref = this.storage.ref('contents/'+ fileName);
    // const task = ref.put(blob);
    // task.then(() => {
    //   console.log('Fichier envoyé');
    // }).catch(error => {
    //   console.error('Erreur lors de l\'envoi du fichier', error);
    // });
  }


  addNewCommentInIssue(){

    const { serverTimestamp } = firebase.firestore.FieldValue;

    const comment: Comment = {
      postBy: 'Ahmed CHARAFOUDDINE',
      content: this.issueForm.value.content?.replaceAll("\\n", "\n") || "",
      datePosted: new Date(),
    }

    this.afs.doc(`issues/${this.issueId}`).update({
      comments: firebase.firestore.FieldValue.arrayUnion(comment)
    });

  }
}
