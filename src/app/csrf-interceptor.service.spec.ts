import { TestBed } from '@angular/core/testing';

import { CsrfInterceptorService } from './csrf-interceptor.service';

describe('CsrfInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CsrfInterceptorService = TestBed.get(CsrfInterceptorService);
    expect(service).toBeTruthy();
  });
});
