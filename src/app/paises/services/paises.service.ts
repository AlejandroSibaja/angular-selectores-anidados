import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable, of } from 'rxjs';
import { Pais, PaisSmall } from '../interfaces/paises.interface';

@Injectable({
  providedIn: 'root'
})
export class PaisesService {

  private baseUrl = 'https://restcountries.com/v3.1'
  private _regiones: string[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regiones(): string[] {
    return this._regiones;
  }

  constructor( private http: HttpClient ) { }

  getPaisesPorRegion( region: string ): Observable<PaisSmall[]> {
    const url = `${ this.baseUrl }/region/${ region }?fields=cca3,name`;
    return this.http.get<PaisSmall[]>( url );
  }

  getPaisPorCodigo( codigo: string ): Observable<Pais[]> {
    if ( !codigo ) { return of([] as Pais[]) }
    
    const url = `${ this.baseUrl }/alpha/${ codigo }`;
    return this.http.get<Pais[]>( url );
  }

  // getPaisPorCodigoSmall( codigo: string ): Observable<PaisSmall> {
  //   if ( !codigo ) { return of({} as PaisSmall) }
    
  //   const url = `${ this.baseUrl }/alpha/${ codigo }`;
  //   return this.http.get<PaisSmall>( url );
  // }

  // getPaisesPorCodigos( borders: string[] ) : Observable<PaisSmall[]> {
  //   if (!borders) {
  //     return of([]);
  //   }
  //   const peticiones: Observable<PaisSmall>[] = [];
  //   borders.forEach ( codigo => {
  //     const peticion = this.getPaisPorCodigoSmall(codigo);
  //     peticiones.push( peticion );
  //   });

  //   return combineLatest( peticiones );
  // }

  getPaisPorCodigosSmall( codigos: string[] ): Observable<PaisSmall[]> {
    console.log(codigos)
    if ( codigos.length === 0 ) { return of([] as PaisSmall[]) }
    
    const url = `${ this.baseUrl }/alpha?codes=${ codigos }&fields=cca3,name`;
    return this.http.get<PaisSmall[]>( url );
  }



}
