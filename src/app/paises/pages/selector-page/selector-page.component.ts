import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs';

import { Pais, PaisSmall } from '../../interfaces/paises.interface';
import { PaisesService } from '../../services/paises.service';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: [
  ]
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    region  : ['', Validators.required],
    pais    : ['', Validators.required],
    frontera: ['', Validators.required],
  })

  regiones: string[] = [];
  paises: PaisSmall[] = [];
  fronteras: PaisSmall[] = [];

  // UI
  cargando: boolean = false;

  constructor( private fb: FormBuilder,
               private paisesService: PaisesService ) {}

  ngOnInit(): void {
    this.regiones = this.paisesService.regiones;

    // Cuando cambie la region
    // this.miFormulario.get('region')?.valueChanges
    //   .subscribe( region => {
    //     this.paisesService.getPaisesPorRegion( region )
    //       .subscribe( paises => {
    //         console.log(paises);
    //         this.paises = paises;
    //       })
    //   })

    // Cuando cambie la region
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.miFormulario.get('pais')?.reset('');
          this.cargando = true;
        }),
        switchMap( region => this.paisesService.getPaisesPorRegion( region ))
      )
      .subscribe( paises => {
        this.paises = paises;
        this.cargando = false;
      })

    // Cuando cambie el pais
    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap( ( _ ) => {
          this.cargando = true;
          this.miFormulario.get('frontera')?.reset('');
        }),
        switchMap( codigo => this.paisesService.getPaisPorCodigo( codigo )),
        switchMap( pais => this.paisesService.getPaisPorCodigosSmall( pais[0]?.borders || [] ))
      )
      .subscribe(paises => {
        this.fronteras = paises;
        this.cargando = false;
      })

  }

  guardar() {
    console.log( this.miFormulario.value );
  }

}
