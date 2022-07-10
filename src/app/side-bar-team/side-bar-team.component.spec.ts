import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarTeamComponent } from './side-bar-team.component';

describe('SideBarTeamComponent', () => {
  let component: SideBarTeamComponent;
  let fixture: ComponentFixture<SideBarTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
