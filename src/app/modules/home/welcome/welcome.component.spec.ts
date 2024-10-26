import { ComponentFixture, TestBed } from '@angular/core/testing';

import { By } from '@angular/platform-browser';
import { VButtonComponent } from '../../../shared/ui/v-button/v-button.component';
import { VCardComponent } from '../../../shared/ui/v-card/v-card.component';
import { WelcomeComponent } from './welcome.component';
import { provideRouter } from '@angular/router';

describe('WelcomeComponent', () => {
  let component: WelcomeComponent;
  let fixture: ComponentFixture<WelcomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WelcomeComponent,
        VButtonComponent,
        VCardComponent,
      ],
      providers: [
        provideRouter([]) // Set up routing with an empty array or add routes as needed
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render VCardComponent', () => {
    const cardElement = fixture.debugElement.query(By.directive(VCardComponent));
    expect(cardElement).toBeTruthy();
  });

  it('should render VButtonComponent', () => {
    const buttonElement = fixture.debugElement.query(By.directive(VButtonComponent));
    expect(buttonElement).toBeTruthy();
  });
});
