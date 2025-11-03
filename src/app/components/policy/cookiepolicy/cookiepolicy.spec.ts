import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cookiepolicy } from './cookiepolicy';

describe('Cookiepolicy', () => {
  let component: Cookiepolicy;
  let fixture: ComponentFixture<Cookiepolicy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cookiepolicy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cookiepolicy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
