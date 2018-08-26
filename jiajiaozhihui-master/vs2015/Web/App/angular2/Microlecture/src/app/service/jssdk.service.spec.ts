import { TestBed, inject } from '@angular/core/testing';

import { JssdkService } from './jssdk.service';

describe('JssdkService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JssdkService]
    });
  });

  it('should be created', inject([JssdkService], (service: JssdkService) => {
    expect(service).toBeTruthy();
  }));
});
