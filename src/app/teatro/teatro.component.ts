import { Component, OnInit, Input } from '@angular/core';
import { kvaasService } from '../kvaas.service';
import { teatro } from '../app.component';

class posto {
  id: number;
  occupato: boolean;
  posizione: string;
  nome: string;

  constructor(id: number, occupato: boolean, posizione: string, nome: string) {
    this.id = id;
    this.occupato = occupato;
    this.posizione = posizione;
    this.nome = nome;
  }
}

@Component({
  selector: 'app-teatro',
  templateUrl: './teatro.component.html',
  styleUrls: ['./teatro.component.css'],
})
export class TeatroComponent implements OnInit {
  error: any;
  file_platea: number;
  platea_posti: posto[] = [];
  palchi_posti: posto[] = [];
  posti_platea: number;
  file_palchi: number;
  posti_palchi: number;
  numero: number;
  numero0: number;
  matrice_platea = [];
  nomi: string[];

  matrice_palchi = [];
  nome: string;

  constructor(private query: kvaasService) {
    this.error = '0';
  }

  @Input() chiave: string;
  @Input() teatro: teatro;
  @Input() show1: boolean;

  ngOnInit() {
    this.query.getData(this.chiave).subscribe({
      next: (x: any) => {
        this.teatro = JSON.parse(x);
        this.file_palchi = this.teatro.totale_file_palco;
        this.posti_palchi = this.teatro.totale_posti_palco;
        this.file_platea = this.teatro.totale_file_platea;
        this.posti_platea = this.teatro.totale_posti_platea;
        this.nomi = this.teatro.nomi;
        this.numero0 = Math.ceil(this.posti_palchi / this.file_palchi);
        this.numero = Math.ceil(this.posti_platea / this.file_platea);
        this.teatro_costruction(this.numero, 'platea');
        this.teatro_costruction(this.numero0, 'palchi');
      },
      error: (err) =>
        console.error('Observer got an error8: ' + JSON.stringify(err)),
    });
  }

  teatro_costruction(numero: number, posizione: string) {
    if (posizione === 'platea') {
      this.matrice_platea = [];
      for (let i = 0; i < this.teatro.totale_posti_platea; i++) {
        if (this.teatro.posti_occupati.indexOf(i + 'platea') != -1) {
          var post = new posto(i, true, 'platea', '');
          this.platea_posti.push(post);
        } else {
          var post = new posto(i, false, 'platea', '');
          this.platea_posti.push(post);
        }
      }
      for (let i = 0; i < numero; i++) {
        this.matrice_platea[i] = [];
        for (let j = 0; j < this.teatro.totale_file_platea; j++) {
          let index = i * this.teatro.totale_file_platea + j;
          if (index < this.platea_posti.length) {
            this.matrice_platea[i][j] = this.platea_posti[index];
          }
        }
      }
    } else {
      this.matrice_palchi = [];
      for (let i = 0; i < this.teatro.totale_posti_palco; i++) {
        if (this.teatro.posti_occupati.indexOf(i + 'palco') != -1) {
          var post = new posto(i, true, 'palco', '');
          this.palchi_posti.push(post);
        } else {
          var post = new posto(i, false, 'palco', '');
          this.palchi_posti.push(post);
        }
      }
      for (let i = 0; i < this.numero0; i++) {
        this.matrice_palchi[i] = [];
        for (let j = 0; j < this.teatro.totale_file_palco; j++) {
          let index = i * this.teatro.totale_file_palco + j;
          if (index < this.palchi_posti.length) {
            this.matrice_palchi[i][j] = this.palchi_posti[index];
          }
        }
      }
    }
  }

  prenota_posto_platea(id: number, nome: string, posizione: string) {
    if (id === -1 || nome === undefined || posizione === null) {
      window.alert(
        'Devi inserire un nome e selezionare un posto per proseguire la prenotazione!'
      );
    } else if (
      this.platea_posti[id].occupato === false &&
      this.teatro.posti_occupati.indexOf(id + posizione) === -1
    ) {
      if (this.teatro.nomi.indexOf(nome) === -1) {
        this.platea_posti[id].occupato = true;
        this.teatro.nomi;
        this.platea_posti[id].nome = nome;
        this.teatro.nomi.push(nome);
        this.teatro.posti_occupati.push(id + posizione);
        this.query.setData(this.teatro, this.chiave).subscribe({
          next: (x: any) => {
            window.alert(
              'Hai prenotato il posto ' +
                id +
                ' a nome ' +
                this.nome +
                ' della sezione ' +
                posizione
            );
          },
          error: (err) =>
            console.error('Observer got an error3: ' + JSON.stringify(err)),
        });
      } else {
        window.alert('Esiste già una prenotazione a nome ' + nome);
      }
    } else {
      window.alert('Non puoi prenotare questo posto, è occupato');
    }
  }

  prenota_posto_palco(id: number, nome: string, posizione: string) {
    if (id === -1 || nome === undefined || posizione === null) {
      window.alert(
        'Devi inserire un nome e selezionare un posto per proseguire la prenotazione!'
      );
    } else if (
      this.palchi_posti[id].occupato === false &&
      this.teatro.posti_occupati.indexOf(id + posizione) === -1
    ) {
      if (this.teatro.nomi.indexOf(nome) === -1) {
        this.palchi_posti[id].occupato = true;
        this.palchi_posti[id].nome = nome;
        this.teatro.nomi.push(nome);
        this.teatro.posti_occupati.push(id + posizione);
        this.query.setData(this.teatro, this.chiave).subscribe({
          next: (x: any) => {
            window.alert(
              'Hai prenotato il posto ' +
                id +
                ' a nome ' +
                this.nome +
                ' della sezione ' +
                posizione
            );
          },
          error: (err) =>
            console.error('Observer got an error3: ' + JSON.stringify(err)),
        });
      } else {
        window.alert('Esiste già una prenotazione a questo nome');
      }
    } else {
      window.alert('Non puoi prenotare questo posto, è occupato');
    }
  }
}
