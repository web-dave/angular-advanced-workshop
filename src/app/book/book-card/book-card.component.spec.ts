import { BookCardComponent } from './book-card.component';

describe('BookCardComponent', () => {
  it('title should be n/a', () => {
    const component = new BookCardComponent();

    expect(component.content.title).toBe('n/a');
  });
});
