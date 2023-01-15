import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateContent',
})
export class TruncateContentPipe implements PipeTransform {
  public transform(value: string, length: number): string {
    return `${value
      .split(' ')
      .slice(0, length - 1)
      .join(' ')}...`;
  }
}
