import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppModule } from '../app.module';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports:[
        AppModule
      ],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('shoud disabled form', () => {

    component.user = {password:'', email:''};

    expect(component.disabledForm()).toBeTrue();

  });

  it('shoud enabled form', () => {

    component.user = {password:'12345678', email:'fredmpeixoto@gmail.com'};

    expect(component.disabledForm()).toBeFalse();

  });

});
