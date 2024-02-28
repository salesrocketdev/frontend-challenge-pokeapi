import { Component } from '@angular/core';

import { BaseService } from 'src/app/shared/services';

@Component({
  selector: 'app-base-component',
  templateUrl: './base.component.html',
})
export class BaseComponent extends BaseService {
  public blobBaseUrl = this.getBlobUrl();
}
