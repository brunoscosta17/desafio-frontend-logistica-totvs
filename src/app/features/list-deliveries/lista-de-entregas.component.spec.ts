import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeEntregasComponent } from './lista-de-entregas.component';

describe('ListaDeEntregasComponent', () => {
  let component: ListaDeEntregasComponent;
  let fixture: ComponentFixture<ListaDeEntregasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDeEntregasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeEntregasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
