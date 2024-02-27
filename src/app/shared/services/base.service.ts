import { Injectable } from '@angular/core';

import { BASE_URL_API } from '../../../environments/environment';

@Injectable()
export class BaseService {
  constructor() {}

  protected getAppSettings(): any {
    return BASE_URL_API;
  }

  protected getHeaders(): any {
    return {
      'Content-Type': 'application/json',
      'Accept-Language': 'pt-BR',
      'x-api-version': '1.0',
    };
  }
}

export default BaseService;
