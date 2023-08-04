import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchFusionComponent } from './search-fusion.component';

describe('SearchFusionComponent', () => {
  let component: SearchFusionComponent;
  let fixture: ComponentFixture<SearchFusionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchFusionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchFusionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
