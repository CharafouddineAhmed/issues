
// https://github.com/iamacup/react-native-markdown-display/issues/110
import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject} from 'rxjs';
import { Issue } from '../../modeles/issue';
import { map } from 'rxjs/operators';
import { Comment } from '../../modeles/issue';

import { HttpClient } from '@angular/common/http';

export interface Popup {
  view: boolean,
  color: string,
  message: string
}

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent  {

  private issueDoc! : AngularFirestoreDocument<Issue >;
  issue$!: Observable<Issue | undefined>;
  commentaires: Comment[] | undefined  ; 

  id!: string;
  content! : string;
  issue: Issue | undefined;
  contenu : string = "";
  componentName: string = "";
  popup_view: boolean = false;
  popup_color: string = "";
  popup_message: string = "";

  constructor(
    private route: ActivatedRoute, 
    private afs: AngularFirestore, 
    private storage: AngularFireStorage,
    private http: HttpClient) {

      if (this.route.component) {
        this.componentName = this.route.component.name;
      } else {
        this.componentName = "";
      }

    this.id = this.route.snapshot.paramMap.get('id')!;

    this.issueDoc = this.afs.doc<Issue>(`issues/${this.id}`);
    this.issue$ = this.issueDoc.valueChanges();

    this.issue$.subscribe(issue => {
      this.commentaires = issue?.comments;
    });
    
    this.issue$.forEach(element => {
      this.contenu = element?.content.replaceAll("\\n", "\n");
      
    })

    

    


  }

  onPopup(popup: Popup){
    this.popup_view = popup.view;
    this.popup_color = popup.color;
    this.popup_message = popup.message;
  }

 

}
