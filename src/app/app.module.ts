import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { BrowserAnimationsModule  } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { NewIssueComponent } from './components/new-issue/new-issue.component';
import { IssuesComponent } from './components/issues/issues.component';
import { ReactiveFormsModule } from '@angular/forms';
import { IssueDetailComponent } from './components/issue-detail/issue-detail.component';
import { MarkdownModule } from 'ngx-markdown';
import { HttpClientModule } from '@angular/common/http';
import { EditorIssueComponent } from './components/editor-issue/editor-issue.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LabelComponent } from './components/label/label.component';


@NgModule({
  declarations: [
    AppComponent,
    IssuesComponent,
    NewIssueComponent,
    IssueDetailComponent,
    EditorIssueComponent,
    NavbarComponent,
    LabelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    //AngularFireModule.initializeApp(yourFirebaseConfig)
    //provideFirebaseApp(() => initializeApp(environment.firebase)),
    // provideDatabase(() => getDatabase()),
    // provideFirestore(() => getFirestore())
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    ReactiveFormsModule,
    HttpClientModule,
    MarkdownModule.forRoot(),
    

    
    
  
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
