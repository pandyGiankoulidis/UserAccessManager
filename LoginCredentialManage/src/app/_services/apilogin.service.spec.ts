import { TestBed } from '@angular/core/testing';

import { APILoginService } from './apilogin.service';

describe('APILoginService', () => {
  let service: APILoginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(APILoginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
