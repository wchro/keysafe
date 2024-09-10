import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
  standalone: true,
  name: 'atob',
})
export class AtobPipe implements PipeTransform {
  transform(value: string): string {
    return atob(value);
  }
}
