import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorIssueComponent } from './editor-issue.component';

describe('EditorIssueComponent', () => {
  let component: EditorIssueComponent;
  let fixture: ComponentFixture<EditorIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditorIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditorIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
