import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

//angular/material
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';

import {CategoriaService} from './../../services/categoria.service';
import { UtilidadService } from '../../../../services/utilidad.service';
import { Categoria } from '../../../../core/models/categoria';

@Component({
  selector: 'app-modalcategoria',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    MatSelectModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule
  ],
  templateUrl: './modalcategoria.component.html',
  styleUrl: './modalcategoria.component.scss'
})
export class ModalcategoriaComponent implements OnInit {

  //Variables
  formularioCategoria: FormGroup;
  tituloAccion: string = 'Agregar';
  botonAccion: string = 'Guardar';

  constructor(
    private modalActual: MatDialogRef<ModalcategoriaComponent>,
    private fb: FormBuilder,
    private categoriaServicio: CategoriaService,
    private utilidadServicio: UtilidadService
  ){
    this.formularioCategoria = this.fb.nonNullable.group({
      nombre:['', [Validators.required]],
      esActivo:['1', [Validators.required]],
    })
  }

  ngOnInit(): void {
  }

  guardar_Categoria(){
    const _categoria: Categoria = {
      idCategoria: 0,
      nombre: this.formularioCategoria.value.nombre,
      esActivo: parseInt(this.formularioCategoria.value.esActivo)
    };
    //logiaca para guardar la categoria
    this.categoriaServicio.guardar(_categoria)
    .subscribe({
      next:(data) => {
        if (data.status) {
          this.utilidadServicio.mostrarAlerta('La categoria se registro','Exito');
          this.modalActual.close('true');
        } else {
          this.utilidadServicio.mostrarAlerta('No se puede registrar la categoria','Error')
        }
      },
      error:(e) => {}
    });
  }
}
