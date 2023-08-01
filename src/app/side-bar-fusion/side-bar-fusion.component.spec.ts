import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarFusionComponent } from './side-bar-fusion.component';

describe('SideBarFusionComponent', () => {
  let component: SideBarFusionComponent;
  let fixture: ComponentFixture<SideBarFusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarFusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarFusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
