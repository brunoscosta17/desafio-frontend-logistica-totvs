import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatTableModule,
        NoopAnimationsModule,
        TableComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct columns', async () => {
    component.displayedColumns = ['nome', 'pendentes', 'realizadas'];
    component.dataSource = [
      { nome: 'Carlos Pereira', pendentes: 4, realizadas: 5 },
      { nome: 'Carla Souza', pendentes: 4, realizadas: 3 },
      { nome: 'Maria Oliveira', pendentes: 5, realizadas: 3 },
      { nome: 'João Silva', pendentes: 4, realizadas: 5 }
    ];
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    const headerCells = fixture.debugElement.queryAll(By.css('th.mat-mdc-header-cell'));
    const columnTitles = headerCells.map(cell => cell.nativeElement.textContent.trim());

    expect(columnTitles).toEqual(['Nome', 'Pendentes', 'Realizadas']);
  });

  it('should display the correct data', async () => {
    component.displayedColumns = ['nome', 'pendentes', 'realizadas'];
    component.dataSource = [
      { nome: 'Carlos Pereira', pendentes: 4, realizadas: 5 },
      { nome: 'Carla Souza', pendentes: 4, realizadas: 3 },
      { nome: 'Maria Oliveira', pendentes: 5, realizadas: 3 },
      { nome: 'João Silva', pendentes: 4, realizadas: 5 }
    ];
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tr.mat-mdc-row'));
    expect(rows.length).toBe(4);

    const firstRowCells = rows[0].queryAll(By.css('td.mat-mdc-cell'));
    expect(firstRowCells[0].nativeElement.textContent.trim()).toBe('Carlos Pereira');
    expect(firstRowCells[1].nativeElement.textContent.trim()).toBe('4');
    expect(firstRowCells[2].nativeElement.textContent.trim()).toBe('5');

    const secondRowCells = rows[1].queryAll(By.css('td.mat-mdc-cell'));
    expect(secondRowCells[0].nativeElement.textContent.trim()).toBe('Carla Souza');
    expect(secondRowCells[1].nativeElement.textContent.trim()).toBe('4');
    expect(secondRowCells[2].nativeElement.textContent.trim()).toBe('3');
  });

  it('should display column headers with titlecase', async () => {
    component.displayedColumns = ['nome', 'pendentes', 'realizadas'];
    component.dataSource = [
      { nome: 'Carlos Pereira', pendentes: 4, realizadas: 5 },
      { nome: 'Carla Souza', pendentes: 4, realizadas: 3 },
      { nome: 'Maria Oliveira', pendentes: 5, realizadas: 3 },
      { nome: 'João Silva', pendentes: 4, realizadas: 5 }
    ];
    fixture.detectChanges();

    await fixture.whenStable();
    fixture.detectChanges();

    const headerCells = fixture.debugElement.queryAll(By.css('th.mat-mdc-header-cell'));
    const columnTitles = headerCells.map(cell => cell.nativeElement.textContent.trim());

    expect(columnTitles).toEqual(['Nome', 'Pendentes', 'Realizadas']);
  });
});
