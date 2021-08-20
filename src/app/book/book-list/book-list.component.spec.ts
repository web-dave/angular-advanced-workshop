import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore } from '@ngrx/store/testing';
import { NEVER, of } from 'rxjs';
import { BookListComponent } from './book-list.component';

export const books = [
  {
    title: 'Design Patterns',
    subtitle: 'Elements of Reusable Object-Oriented Software',
    isbn: '978-0-20163-361-0',
    abstract:
      'Capturing a wealth of experience about the design of object-oriented software, four top-notch designers present a catalog of simple and succinct solutions to commonly occurring design problems. Previously undocumented, these 23 patterns allow designers to create more flexible, elegant, and ultimately reusable designs without having to rediscover the design solutions themselves.',
    numPages: 395,
    author: 'Erich Gamma / Richard Helm / Ralph E. Johnson / John Vlissides',
    publisher: 'Bernd',
    prize: '$9.99',
    cover: ''
  },
  {
    title: 'REST und HTTP',
    subtitle: 'Entwicklung und Integration nach dem Architekturstil des Web',
    isbn: '978-3-86490-120-1',
    abstract:
      'Das Buch bietet eine theoretisch fundierte, vor allem aber praxistaugliche Anleitung zum professionellen Einsatz von RESTful HTTP. Es beschreibt den Architekturstil REST (Representational State Transfer) und seine Umsetzung im Rahmen der Protokolle des World Wide Web (HTTP, URIs und andere).',
    numPages: 330,
    author: 'Stefan Tilkov / Martin Eigenbrodt / Silvia Schreier / Oliver Wolf',
    publisher: 'Steffanie',
    prize: '$10.88',
    cover: ''
  }
];
describe('BookListComponent', () => {
  let component: BookListComponent;
  let fixture: ComponentFixture<BookListComponent>;
  let mySpy: jasmine.Spy;
  let service: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookListComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        MockStore,
        {
          provide: Store,
          useValue: { select: () => of('') }
        }
      ]
    }).compileComponents();

    service = TestBed.inject(Store);
    mySpy = spyOn(service, 'select').and.returnValue(of(books));
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Mock Book-List', () => {
    it('get Books', () => {
      fixture.detectChanges();
      expect(mySpy).toHaveBeenCalled();
    });
  });
});
