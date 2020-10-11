import { TestBed } from '@angular/core/testing';

import { EnvironmentServiceService } from './environment-service.service';

describe('EnvironmentServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnvironmentServiceService = TestBed.get(EnvironmentServiceService);
    expect(service).toBeTruthy();
  });
});
