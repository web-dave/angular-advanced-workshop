import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { Component, Input, NO_ERRORS_SCHEMA } from '@angular/core';
import { BookListComponent } from './book-list.component';
import { AsyncPipe, NgFor } from '@angular/common';
import { BookApiService } from '../book-api.service';
import { Book } from '../models';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { BookCardComponent } from '../book-card/book-card.component';

const books: Book[] = [
  {
    id: '1001606140805',
    title: 'Java Web Scraping Handbook',
    subtitle: 'Learn advanced Web Scraping techniques',
    isbn: '1001606140805',
    abstract:
      'Web scraping or crawling is the art of fetching data from a third party website by downloading and parsing the HTML code to extract the data you want. It can be hard. From bad HTML code to heavy Javascript use and anti-bot techniques, it is often tricky. Lots of companies use it to obtain knowledge ...',
    author: 'Kevin Sahin',
    publisher: 'Leanpub',
    price: 0.0,
    numPages: 115,
    cover: 'http://localhost:4730/covers/1001606140805.png'
  },
  {
    id: '9780071494618',
    title: 'Hacking Exposed Web 2.0',
    subtitle: 'Web 2.0 Security Secrets and Solutions',
    isbn: '9780071494618',
    abstract:
      'Protect your Web 2.0 architecture against the latest wave of cybercrime using expert tactics from Internet security professionals. Hacking Exposed Web 2.0 shows how hackers perform reconnaissance, choose their entry point, and attack Web 2.0 - based services, and reveals detailed countermeasures and...',
    author: 'Rich Cannings, Himanshu Dwivedi, Zane Lackey',
    publisher: 'McGraw-Hill',
    price: 12.03,
    numPages: 258,
    cover: 'http://localhost:4730/covers/9780071494618.png'
  }
];

@Component({
  selector: 'ws-book-card',
  template: '{{content.title}}',
  standalone: true
})
class foo {
  @Input() content: any;
}

describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let view: HTMLElement;

  const bookApiMock = jasmine.createSpyObj<BookApiService>(['getAll']);
  bookApiMock.getAll.and.returnValue(of(books));

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [BookListComponent],
      providers: [
        {
          provide: BookApiService,
          useValue: bookApiMock
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(BookListComponent, {
        remove: { imports: [BookCardComponent] },
        add: { imports: [foo] }
      })
      .compileComponents();
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    view = fixture.nativeElement;
    fixture.autoDetectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render two Books', () => {
    expect(view.querySelectorAll('ws-book-card').length).toBe(2);
    expect(view.querySelector('ws-book-card')?.textContent).toBe(books[0].title);
  });
});
