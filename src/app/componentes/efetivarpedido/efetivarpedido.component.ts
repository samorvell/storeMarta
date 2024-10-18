import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/model/Client';
import { AddressCEP } from 'src/app/model/AddressCEP';
import { Order } from 'src/app/model/Order';
import { SearchCepService } from 'src/app/servicos/searchcep.service';
import { CartService } from 'src/app/servicos/cart.service';
import { ClientService } from 'src/app/servicos/client.service';
import { OrderService } from 'src/app/servicos/order.service';
import { catchError, of, tap } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';



@Component({
  selector: 'app-efetivarpedido',
  templateUrl: './efetivarpedido.component.html',
  styleUrls: ['./efetivarpedido.component.css']
})
export class EfetivarpedidoComponent implements OnInit {

  @ViewChild('btnModal') btnModal!: ElementRef;

  public client: Client;
  public achou: boolean;
  public cli!: Client;
  public visivel: boolean;
  public order: Order;
  public mensagemErro!: string;
  public msgEndereco!: string;
  public exibirPerguntaEndereco!: boolean;
  public exibirFormEndereco!: boolean;

  constructor(private cliService: ClientService,
    private cdRef: ChangeDetectorRef,
    private ordService: OrderService,
    private searchCepService: SearchCepService,
    private router: Router,
    private carService: CartService) {
    this.client = new Client();
    this.order! = new Order();
    this.achou = false;
    this.visivel = false;
    this.exibirFormEndereco = false;
    this.exibirPerguntaEndereco = true;
    this.msgEndereco = "";
  }

  ngOnInit(): void {
  }

  public exibirForm() {
    this.exibirPerguntaEndereco = false;
    this.exibirFormEndereco = true;
    this.client.cep = "";
    this.client.logradouro = "";
    this.client.numero = "";
    this.client.complemento = "";
    this.client.cidade = "";
    this.client.bairro = "";
    this.client.estado = "";
  }

  public ocultarForm() {
    this.exibirPerguntaEndereco = false;
    this.exibirFormEndereco = false;
  }

  public isCPFValid(): boolean {
    if (!this.client.cpf || this.client.cpf.length === 0) {
      return false;
    }

    let cpf = this.client.cpf.trim().replace(/\D/g, '');

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) {
      return false;
    }

    const calculateCheckDigit = (digits: number[], factor: number): number => {
      const sum = digits.reduce((acc, digit, index) => acc + digit * (factor - index), 0);
      const checkDigit = 11 - (sum % 11);
      return checkDigit >= 10 ? 0 : checkDigit;
    };

    const digits = cpf.split('').map(Number);

    const d1 = calculateCheckDigit(digits.slice(0, 9), 10);
    if (d1 !== digits[9]) {
      return false;
    }

    const d2 = calculateCheckDigit(digits.slice(0, 10), 11);
    if (d2 !== digits[10]) {
      return false;
    }

    return true;
  }

  buscarCpf() {
    this.cliService.buscarClientePeloCpf(this.client.cpf)
  .pipe(
    tap((cli: any) => {
      if (cli) {
        this.client = cli;
        this.achou = true;
        this.msgEndereco = cli.logradouro.substr(0, 10) + "************* ";
        this.visivel = true;
        this.client.reset();
      }
    }),
    catchError((err) => {
      if (err.status === 404) {
        this.achou = false;
        this.visivel = true;
        this.mensagemErro = "Bem vinda(o)! Você é nova(o) por aqui!";
      } else {
        this.mensagemErro = "Erro desconhecido: " + err.message;
        this.achou = false;
      }
      return of(null);
    })
  )
  .subscribe();
  }
  


  public ocultaAlert() {
    this.visivel = false;
  }

  public buscarCEP() {
    this.searchCepService.buscarCEP(this.client.cep).subscribe(
      (res: any) => {
        this.client.logradouro = res.logradouro;
        this.client.cidade = res.localidade;
        this.client.bairro = res.bairro;
        this.client.estado = res.uf;
      },
      (err) => {
        console.log("")
        this.mensagemErro = "Informe um CEP válido, sem pontos e traços."
        document.getElementById("btnModal")?.click();
      }
    );
  }

  public finalizarPedido() {
    const ordTempJson = localStorage.getItem("cart");

    if (!ordTempJson) {
      console.error("Erro: O carrinho está vazio.");
      alert("Erro ao efetivar o pedido: O carrinho está vazio.");
      return;
    }

    let ordTemp: Order;
    try {
      ordTemp = JSON.parse(ordTempJson);
    } catch (e) {
      console.error("Erro ao parsear o carrinho:", e);
      alert("Erro ao efetivar o pedido: Carrinho inválido.");
      return;
    }

    if (!ordTemp || !ordTemp.itemsOrdered) {
      console.error("Erro: Carrinho ou itemsOrdered está vazio.");
      alert("Erro ao efetivar o pedido: Carrinho ou itemsOrdered está vazio.");
      return;
    }

    this.order.itemsOrdered = ordTemp.itemsOrdered;
    this.order.amount = ordTemp.amount;
    this.order.client = this.client;
    this.order.status = 0; // pedido inicial

    this.ordService.inserirNovoPedido(this.order).subscribe(
      (res: { idOrder: number }) => {
        localStorage.removeItem("cart");
        this.carService.setNumberOfItems(0);

        if (res && res.idOrder) { // Verifique se res e res.idOrder estão definidos
          this.router.navigate(["/recibo/", res.idOrder]);
        } else {
          console.error("Erro: res ou res.idOrder está indefinido");
          alert("Erro ao efetivar o pedido: ID do pedido está indefinido");
        }
      },
      (err) => {
        console.error("Erro ao efetivar o pedido:", err);
        alert("Erro ao efetivar o pedido: " + err.message);
      }
    );
  }
}
