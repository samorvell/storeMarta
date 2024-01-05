import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.css']
})
export class ReciboComponent implements OnInit {

  public idPedido!: number;
  constructor(private acitvatedroute: ActivatedRoute) {
    this.idPedido = 0;
  }

  ngOnInit(): void {
    this.idPedido = this.acitvatedroute.snapshot.params['id'];

  }

}
