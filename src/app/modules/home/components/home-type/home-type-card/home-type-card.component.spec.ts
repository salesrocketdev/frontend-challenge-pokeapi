import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTypeCardComponent } from './home-type-card.component';

describe('HomeTypeCardComponent', () => {
  let component: HomeTypeCardComponent;
  let fixture: ComponentFixture<HomeTypeCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeTypeCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeTypeCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
