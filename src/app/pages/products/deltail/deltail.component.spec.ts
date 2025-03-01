import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeltailComponent } from './deltail.component';

describe('DeltailComponent', () => {
  let component: DeltailComponent;
  let fixture: ComponentFixture<DeltailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeltailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DeltailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
