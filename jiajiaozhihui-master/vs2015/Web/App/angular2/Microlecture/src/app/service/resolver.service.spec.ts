import { TestBed, inject } from '@angular/core/testing';

import { ResolverService } from './resolver.service';

describe('ResolverService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ResolverService]
    });
  });

  it('should be created', inject([ResolverService], (service: ResolverService) => {
    expect(service).toBeTruthy();
  }));
});
