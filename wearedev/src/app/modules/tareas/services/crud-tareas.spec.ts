import { TestBed } from '@angular/core/testing';

import { CrudTareas } from './crud-tareas';

describe('CrudTareas', () => {
  let service: CrudTareas;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrudTareas);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
