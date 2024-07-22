import { Pipe, PipeTransform, ChangeDetectorRef } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';

@Pipe({
  name: 'mbw-translate',
  pure: false
})
export class MBWTranslatePipe extends TranslatePipe implements PipeTransform {
  constructor(translateService: TranslateService, private cdr: ChangeDetectorRef) {
    super(translateService, cdr);
  }

  override transform(query: string, ...args: any[]): any {
    return super.transform(query, ...args);
  }

}
