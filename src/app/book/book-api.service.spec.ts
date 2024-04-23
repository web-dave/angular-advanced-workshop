import { TestBed, waitForAsync } from '@angular/core/testing';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { BookApiService } from './book-api.service';
import { Observable, firstValueFrom } from 'rxjs';
import { Book } from './models';
import { books } from './book-list/book-list.component.spec';

describe('BookApiService', () => {
  let service: BookApiService;
  let mockFetchApi: HttpTestingController;
  const endpoint = 'http://localhost:4730/books';

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting(), BookApiService]
    });

    service = TestBed.inject(BookApiService);
    mockFetchApi = TestBed.inject(HttpTestingController);
  }));

  afterEach(() => {
    mockFetchApi.verify();
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('getAllBooks', async () => {
    const getAllBooks = firstValueFrom(service.getAll());
    mockFetchApi.expectOne(endpoint).flush(books);
    await expectAsync(getAllBooks).toBeResolvedTo(books);
  });

  describe('errorhandling', () => {
    it('offline', async () => {
      const getAllBooks = firstValueFrom(service.getAll());
      mockFetchApi.expectOne(endpoint).error(new ProgressEvent('Network error.'));
      await expectAsync(getAllBooks).toBeRejectedWithError('Sorry, we have connectivity issues.');
    });

    it('500', async () => {
      const getAllBooks = firstValueFrom(service.getAll());
      mockFetchApi.expectOne(endpoint).flush('', { status: 500, statusText: 'API Crashed' });
      await expectAsync(getAllBooks).toBeRejectedWithError('Sorry, we could not load any books');
    });
  });
});
