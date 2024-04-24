import { BookCardComponent } from './book-card.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterLink, ActivatedRoute } from '@angular/router';
import { Spectator, createComponentFactory } from '@ngneat/spectator';

describe('BookCardComponent 1st test', () => {
  it('title should be n/a', () => {
    const component = new BookCardComponent();

    expect(component.content.title).toBe('n/a');
  });
});

describe('BookCardComponent 2nd test', () => {
  let spectator: Spectator<BookCardComponent>;
  const createComponent = createComponentFactory({
    component: BookCardComponent,
    // imports: [RouterLink],
    providers: [
      {
        provide: ActivatedRoute,
        useValue: {}
      }
    ]
    // schemas: [NO_ERRORS_SCHEMA]
  });

  beforeEach(() => (spectator = createComponent()));

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('view should contain n/a', () => {
    expect(spectator.query('mat-card')).toContainText('n/a');
  });

  it('title should be n/a', () => {
    expect(spectator.query('mat-card-title')).toContainText('n/a');
  });
});
