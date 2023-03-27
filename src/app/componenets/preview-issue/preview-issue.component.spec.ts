import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreviewIssueComponent } from './preview-issue.component';

describe('PreviewIssueComponent', () => {
  let component: PreviewIssueComponent;
  let fixture: ComponentFixture<PreviewIssueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreviewIssueComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreviewIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
