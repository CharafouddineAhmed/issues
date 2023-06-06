import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder  } from '@angular/forms';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { BehaviorSubject, combineLatest, Observable, Subject, switchMap } from 'rxjs';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import firebase from "firebase/compat/app";
import { AngularFireStorage } from '@angular/fire/compat/storage';

import { Issue, Comment } from '../../modeles/issue';

export interface Popup {
  view: boolean,
  color: string,
  message: string
}

export interface Item {
  text: string;
  color: string;
  size: string;
}

@Component({
  selector: 'app-editor-issue',
  templateUrl: './editor-issue.component.html',
  // template: '<p>editor issue<p>',
  styleUrls: ['./editor-issue.component.css']
})
export class EditorIssueComponent implements OnInit {

  @Input('componentName') componentName = '';
  @Input('issueId') issueId = '';
  @Output() popup = new EventEmitter<Popup>();

  popup_view: boolean = false;
  popup_color: string = "";
  popup_message: string = "";

  issueForm!: FormGroup;
  
  // false = writeComponent & true = previewComponent 
  viewOption : boolean = false;
  private issuesCollection: AngularFirestoreCollection<Issue>;
  // issues: Observable<Issue[]>;
  contenu : string = "";
  titre : string = "";

  // items$: Observable<Item[]>;
  // sizeFilter$: BehaviorSubject<string|null>;
  // colorFilter$: BehaviorSubject<string|null>;
// 
  constructor(
    private readonly afs: AngularFirestore, 
    private router: Router,
    private formBuilder: FormBuilder
  ){
    this.issuesCollection = afs.collection<Issue>('issues');

  }

  ngOnInit(): void {
      this.issueForm = this.formBuilder.group({
        title: ['', ],
        selectedOptionType: ['', ],
        content: ['', [
          Validators.required, 
          Validators.minLength(1)
        ]],
      });
  }

  // get title() { return this.issueForm.get('title'); }
  // get content() { return this.issueForm.get('content'); }

  previewIssue(){
    console.log("preview... ")
    this.viewOption = true;

    this.contenu = this.issueForm?.value.content?.replaceAll("\\n", "\n") || "";
    this.titre = this.issueForm?.value.title || "";
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
    const type = this.issueForm.get("selectedOptionType")?.value;

    const color_type = this.getColor(type);

    const issue: Issue = {
      id: id,
      status: 'isOpen', // default value
      postBy: 'Ahmed CHARAFOUDDINE',
      title: this.issueForm.value.title,
      content: contentUpdated,
      // dateCreated: serverTimestamp(),
      dateCreated: new Date(),
      type_name: type,
      color_type: color_type,
    };

    this.issuesCollection.doc(id).set(issue)
      .then(() => {
        console.log("ajouter")
        this.issueForm.reset();
        this.router.navigate(['/issues']);
      })
      .catch( e => {console.error('error : ', e)})
  }

  addNewCommentInIssue(){
    const comment: Comment = {
      postBy: 'Ahmed CHARAFOUDDINE',
      content: this.issueForm.value.content?.replaceAll("\\n", "\n") || "",
      datePosted: new Date(),
      type: "isOpen"
    }

    this.afs.doc(`issues/${this.issueId}`).update({
      comments: firebase.firestore.FieldValue.arrayUnion(comment)
    }).then(() => {

      this.popup.emit({
          view: true, 
          color: 'alert-success', 
          message: 'Le nouveau commentaire à été publié'
        })

    }).catch(error => {
      this.popup.emit({
        view: true, 
        color: 'alert-danger', 
        message: "error lors de l'ajout du commentaire : " + error
      })

    })
  }

  closeCompletedIssue(): void  {
    
    this.afs.doc(`issues/${this.issueId}`).update({
      // status: firebase.firestore.FieldValue.arrayUnion('open')
      status: 'isClose'
    }).then(() => {
      const d = new Date();
      this.popup.emit({view: true, color: 'alert-success', message: 'Issue completed on ' + d.toString() })

      const comment: Comment = {
        postBy: 'Ahmed CHARAFOUDDINE',
        content: this.issueForm.value.content?.replaceAll("\\n", "\n") || "",
        datePosted: new Date(),
        type: "closeCompletedIssue"
      }

      this.afs.doc(`issues/${this.issueId}`).update({
        comments: firebase.firestore.FieldValue.arrayUnion(comment)
      })

    }).catch(error => {
      
      this.popup.emit({view: true, color: 'alert-danger', message: "error lors de la cloture du issue" + error})

    })
  }

  // filterByType(type : string|null ){
  //   this.typeFilter$.next(type);
  // }

 
  getColor(option: string): string {
    switch (option) {
      case 'Documentation':
        return 'text-bg-dark';
      case 'Blogs':
        return 'text-bg-primary';
      case 'Knowledge Articles':
        return 'text-bg-warning';
      case 'Known Issues':
        return 'text-bg-danger';
      default:
        return 'text-bg-light';
    }
  }

}
