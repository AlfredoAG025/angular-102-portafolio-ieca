import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Pokemon } from './pokemon';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, 
            FormsModule,
            CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent implements OnInit {
  title: string = 'fundamentos-ag';
  private subtitle = 'fundamentos-ag-private';

  email = "edu@email.com"
  btnDisabled = true;

  contadorOvejas = 1;

  // objeto persona
  // llave - valor
  // llaves siempre es cadena
  persona: {
    nombre: string,
    edad?: number
  } = {
    nombre: ''
  }

  listaPersonas: string[] = []

  boxStyles = {
    background: 'black',
    width: 100,
    height: 100
  }

  registroInputs = {
    email: '',
    passkey: ''
  }

  pokedex: Pokemon[] = []

  nuevoPokemon: string = ''

  mostrarAlerta() {
    alert('Alera de event binding')  
  }

  agregarPersona() {
    this.listaPersonas.push(this.persona.nombre)
    this.persona.nombre = ''
  }

  eliminarPersona(i: number){
    this.listaPersonas.splice(i, 1);
  }

  contarOveja() {
    this.contadorOvejas += 1;
  }

  handlerRegistro() {
    console.log(this.registroInputs)
  }

  limpiarFormulario() {
    this.registroInputs.email = "";
    this.registroInputs.passkey = "";
  }

  ngOnInit(): void {
    console.log('ngOnInit start...')
    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=8&offset=${Math.floor(Math.random() * 250)}`
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        this.pokedex = data.results
        this.pokedex.forEach((pokemon) => {
          fetch(`${pokemon.url}`)
              .then((response) => response.json())
              .then((data) => {
                pokemon.image = data.sprites.front_default
              })
        })
      })
      .then(() => console.log('ngOnInit end...'))
  }

}
