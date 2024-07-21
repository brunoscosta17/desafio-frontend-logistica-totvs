import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListDeliveriesComponent } from './list-deliveries.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('ListDeliveriesComponent', () => {
  let component: ListDeliveriesComponent;
  let fixture: ComponentFixture<ListDeliveriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ListDeliveriesComponent,
        HttpClientTestingModule,
        BrowserAnimationsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
