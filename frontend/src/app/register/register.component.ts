import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Register } from './register.model';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  registerForm = new FormGroup({
    nombreCompleto: new FormControl('', [Validators.required, Validators.minLength(5)]),
    correoElectronico: new FormControl('', [Validators.required, Validators.email]),
    contrasena: new FormControl('', [Validators.required, Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')
    ]),
    contrasenaConfirm: new FormControl('', [Validators.required, Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')
    ]),
    edad: new FormControl('', [Validators.required, Validators.min(18)]),
    genero: new FormControl('', Validators.required),
    noticias: new FormControl(false),
    promociones: new FormControl(false),
    actualizacionesProducto: new FormControl(false),
    paisResidencia: new FormControl('', Validators.required),
    fechaNacimiento: new FormControl('', Validators.required)
  });

  constructor(
    private httpClient: HttpClient) {}

    contrasenaConfirmValidator(control: AbstractControl){
      if(control.get('contrasena')?.value === control.get('passwordConfirm')?.value){
        return null;
      } else {
        return {
          'confirmError': true
        }
      }
    }

    save(){

      let register: Register = {
        nombreCompleto: this.registerForm.get('nombreCompleto')?.value ?? '',
        correoElectronico: this.registerForm.get('correoElectronico')?.value ?? '',
        contrasena: this.registerForm.get('contrasena')?.value ?? '',
        edad: this.registerForm.get('edad')?. value ?? '',
        genero: this.registerForm.get('genero')?. value ?? '',
        noticias: this.registerForm.get('noticias')?. value ?? false,
        promociones: this.registerForm.get('promociones')?. value ?? false,
        actualizacionesProducto: this.registerForm.get('actualizacionesProducto')?. value ?? false,
        paisResidencia: this.registerForm.get('paisResidencia')?. value ?? '',
        fechaNacimiento: this.registerForm.get('fechaNacimiento')?. value ?? ''
      };

      let url = 'http://localhost:3000/register';
      this.httpClient.post<Register>(url, register)
                      .subscribe(res => {
                        console.log(res);
                      });


    }

}
