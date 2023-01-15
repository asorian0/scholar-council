import { TruncateContentPipe } from './truncate-content.pipe';

describe('TruncateContentPipe', () => {
  let pipe: TruncateContentPipe;

  it('should create an instance', () => {
    pipe = new TruncateContentPipe();

    expect(pipe).toBeTruthy();
  });

  it('should transform', () => {
    expect(pipe.transform('aaa', 2)).toBe('aaa...');
  });
});
