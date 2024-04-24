import { HttpTestingController } from '@angular/common/http/testing';
import { BookApiService } from './book-api.service';
import { firstValueFrom } from 'rxjs';
import { books } from './book-list/book-list.component.spec';
import { HttpMethod, SpectatorHttp, createHttpFactory } from '@ngneat/spectator';

describe('BookApiService', () => {
  let spectator: SpectatorHttp<BookApiService>;
  const creatHttp = createHttpFactory(BookApiService);
  const endpoint = 'http://localhost:4730/books';

  beforeEach(() => {
    spectator = creatHttp();
  });

  it('should create', () => {
    expect(spectator).toBeTruthy();
  });

  it('getAllBooks', async () => {
    const getAllBooks = firstValueFrom(spectator.service.getAll());
    spectator.expectOne(endpoint, HttpMethod.GET).flush(books);
    await expectAsync(getAllBooks).toBeResolvedTo(books);
  });

  describe('errorhandling', () => {
    it('offline', async () => {
      const getAllBooks = firstValueFrom(spectator.service.getAll());
      spectator.expectOne(endpoint, HttpMethod.GET).error(new ProgressEvent('Network error.'));
      await expectAsync(getAllBooks).toBeRejectedWithError('Sorry, we have connectivity issues.');
    });

    it('500', async () => {
      const getAllBooks = firstValueFrom(spectator.service.getAll());
      spectator.expectOne(endpoint, HttpMethod.GET).flush('', { status: 500, statusText: 'API Crashed' });
      await expectAsync(getAllBooks).toBeRejectedWithError('Sorry, we could not load any books');
    });
  });
});
