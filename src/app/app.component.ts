import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { kvaasService } from './kvaas.service';
import { NgForm } from '@angular/forms';

export class teatro {
  totale_file_platea: number;
  totale_file_palco: number;
  totale_posti_platea: number;
  totale_posti_palco: number;
  posti_occupati: any[];
  nomi: string[];

  constructor(
    totale_file_platea: number,
    totale_file_palco: number,
    totale_posti_platea: number,
    totale_posti_palco: number,
    posti_occupati: any[],
    nomi: string[]
  ) {
    this.totale_file_platea = totale_file_platea;
    this.totale_file_palco = totale_file_palco;
    this.totale_posti_platea = totale_posti_platea;
    this.totale_posti_palco = totale_posti_palco;
    this.posti_occupati = posti_occupati;
    this.nomi = nomi;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  show: number = 0;
  error: any;
  teatro: teatro;
  questo: string;
  chiave: string;
  show1: boolean = false;

  ngOnInit() {}

  constructor(private query: kvaasService) {
    this.error = '0';
  }

  change() {
    this.show++;
  }

  Receivekey(chiave: string) {
    this.query.getData(chiave).subscribe({
      next: (x: any) => {
        this.teatro = x;
      },
      error: (err) => {
        console.error('Observer got an error: ' + JSON.stringify(err)),
          (this.show1 = false);
        window.alert('chiave non valida');
      },
    });
    this.chiave = chiave;

    this.show1 = true;
  }

  Createatro(dimensioni: NgForm) {
    const file_platea = dimensioni.value['file_platea'];
    const posti_platea = dimensioni.value['posti_platea'];
    const file_palco = dimensioni.value['file_palchi'];
    const posti_palco = dimensioni.value['posti_palchi'];

    var chiave_: string;
    var teatro_ = new teatro(
      file_platea,
      file_palco,
      posti_platea,
      posti_palco,
      [],
      []
    );

    this.query.newData().subscribe({
      next: (x: any) => {
        chiave_ = x;
        window.alert(
          'La chiave per accedere al tuo teatro è: ' + chiave_ + '. Conservala!'
        );
        this.query.setData(teatro_, chiave_).subscribe({
          next: (x: any) => {},
          error: (err) =>
            console.error('Observer got an error: ' + JSON.stringify(err)),
        });
        this.teatro = teatro_;
        this.chiave = chiave_;

        this.show1 = true;
      },
      error: (err) =>
        console.error('Observer got an error: ' + JSON.stringify(err)),
    });
  }
}

//last one correct 0bd66403
