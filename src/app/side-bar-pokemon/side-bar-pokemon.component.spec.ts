import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarPokemonComponent } from './side-bar-pokemon.component';

describe('SideBarComponent', () => {
  let component: SideBarPokemonComponent;
  let fixture: ComponentFixture<SideBarPokemonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarPokemonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SideBarPokemonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
