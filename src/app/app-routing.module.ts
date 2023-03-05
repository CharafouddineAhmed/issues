import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IssuesComponent } from './components/issues/issues.component';
import { NewIssueComponent } from './components/new-issue/new-issue.component';
import { IssueDetailComponent } from './components/issue-detail/issue-detail.component';

const routes: Routes = [
  { path: 'issues', component: IssuesComponent }, 
  { path: 'new', component: NewIssueComponent }, 
  { path: 'details', component: IssueDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
