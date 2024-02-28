import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeListCardComponent } from './home-list-card.component';

describe('HomeListCardComponent', () => {
  let component: HomeListCardComponent;
  let fixture: ComponentFixture<HomeListCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeListCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeListCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
