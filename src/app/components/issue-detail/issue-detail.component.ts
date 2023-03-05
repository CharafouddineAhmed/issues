

import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Issue } from '../../modeles/issue';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-issue-detail',
  templateUrl: './issue-detail.component.html',
  styleUrls: ['./issue-detail.component.css']
})
export class IssueDetailComponent implements OnInit  {

  private issueDoc!: AngularFirestoreDocument<Issue>;
  issue$!: Observable<Issue | undefined>;
  id!: string;
  content! : string;

  fileUrl: string | undefined;
  issue: Issue | undefined;
  fileContent: string | undefined;

  constructor(
    private route: ActivatedRoute, 
    private afs: AngularFirestore, 
    private storage: AngularFireStorage,
    private http: HttpClient) {
    
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.issueDoc = this.afs.doc<Issue>(`issues/${this.id}`);
    this.issue$ = this.issueDoc.valueChanges();


    const filePath = this.id + '.md';
    const ref = this.storage.ref('contents/' + filePath);
    ref.getDownloadURL().subscribe(url => {
      this.http.get(url, {responseType: 'text'}).subscribe(fileContent => {
        this.fileContent = fileContent; 
        console.log(this.fileContent)
      })
      this.fileUrl = url;
    });
  }

}
