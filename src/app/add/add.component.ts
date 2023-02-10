import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { DatiService } from '../dati.service';
import { Libro } from '../libro';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  @Input() libro:Libro= new Libro(); //this.iniLibro();
  @Output() fatto =new EventEmitter<boolean>();

  librofrm:FormGroup;

  constructor(public datiService:DatiService, public fb: FormBuilder) { 
    this.librofrm=fb.group(new Libro());
  }

  ngOnInit(): void {
    console.log(this.libro)
    this.librofrm= this.fb.group({
      id: [this.libro.id],
      'titolo':[this.libro.titolo, Validators.required],
      'autore':[this.libro.autore],
      'prezzoCopertina':[this.libro.prezzoCopertina]
    });
  }

  onSubmit(libro:Libro){
    if (this.libro.id!=0) // 
      this.datiService.update(libro).subscribe(res => 
        {
          this.fatto.emit(true);
         }//,
        // err =>{
        //   // gestione errore
        // }
        )
    else this.datiService.add(libro).subscribe(res => 
      {
        this.fatto.emit(true);
      })
  }

  annulla(){
    this.fatto.emit(false);
  }

  getErrorMessage() {
    if (this.librofrm.controls['titolo'].hasError('required')) {
      return 'You must enter a value';
    }
    //
    return this.librofrm.controls['titolo'].hasError('required') ? 'Not a valid email' : '';
  }

}
