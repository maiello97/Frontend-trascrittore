import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrascrittoreComponent } from './trascrittore.component';

describe('TrascrittoreComponent', () => {
  let component: TrascrittoreComponent;
  let fixture: ComponentFixture<TrascrittoreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrascrittoreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrascrittoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
