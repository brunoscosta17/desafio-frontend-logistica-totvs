import { TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        NoopAnimationsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        RouterTestingModule.withRoutes([])
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Logística' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Logística');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('span')?.textContent).toContain('Dashboard');
  });

  it('should have sidenav closed initially', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const sidenav = compiled.querySelector('mat-sidenav');
    expect(sidenav?.hasAttribute('closed')).toBeTruthy();
  });

  it('should toggle sidenav on button click', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const toggleButton = fixture.debugElement.query(By.css('button'));
    toggleButton.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(app.sidenav.opened).toBe(true);
  });

  it('should render menu items', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.menuItems = [
      { name: 'Dashboard', route: '/dashboard' },
      { name: 'Lista de Entregas', route: '/lista-de-entregas' }
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const menuItems = compiled.querySelectorAll('mat-nav-list a');
    expect(menuItems.length).toBe(2);
    expect(menuItems[0].textContent).toContain('Dashboard');
    expect(menuItems[1].textContent).toContain('Lista de Entregas');
  });

  it('should call redirectTo with correct route when menu item is clicked', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    spyOn(app, 'redirectTo');
    app.menuItems = [
      { name: 'Dashboard', route: '/dashboard' },
      { name: 'Lista de Entregas', route: '/lista-de-entregas' }
    ];
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const menuItems = compiled.querySelectorAll('mat-nav-list a');
    menuItems[0].dispatchEvent(new Event('click'));
    expect(app.redirectTo).toHaveBeenCalledWith('/dashboard');
  });

  it('should have a router-outlet', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const compiled = fixture.nativeElement as HTMLElement;
    const routerOutlet = compiled.querySelector('router-outlet');
    expect(routerOutlet).not.toBeNull();
  });

});
