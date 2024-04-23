import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BookCardComponent } from './book-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';

describe('BookCardComponent 1st test', () => {
  it('title should be n/a', () => {
    const component = new BookCardComponent();

    expect(component.content.title).toBe('n/a');
  });
});

describe('BookCardComponent 2nd test', () => {
  let component: BookCardComponent;
  let fixture: ComponentFixture<BookCardComponent>;
  let view: HTMLElement;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BookCardComponent, RouterLink],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(BookCardComponent);
    component = fixture.componentInstance;
    view = fixture.nativeElement;
    fixture.autoDetectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('view should contain n/a', () => {
    expect(view.innerText).toContain('n/a');
  });

  it('title should be n/a', () => {
    expect(view.querySelector('mat-card-title')?.textContent).toBe('n/a');
  });
});
