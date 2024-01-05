import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/model/Cliente';
import { EnderecoCEP } from 'src/app/model/EnderecoCEP';
import { Pedido } from 'src/app/model/Pedido';
import { BuscarcepService } from 'src/app/servicos/buscarcep.service';
import { CarrinhoService } from 'src/app/servicos/carrinho.service';
import { ClienteService } from 'src/app/servicos/cliente.service';
import { PedidoService } from 'src/app/servicos/pedido.service';

@Component({
  selector: 'app-efetivarpedido',
  templateUrl: './efetivarpedido.component.html',
  styleUrls: ['./efetivarpedido.component.css']
})
export class EfetivarpedidoComponent implements OnInit {

  public cliente: Cliente;
  public achou: boolean;
  public cli!: Cliente;
  public visivel: boolean;
  public pedido: Pedido;
  public menssagemErro!: string;

  constructor(private cliService: ClienteService,
    private pedService: PedidoService,
    private cepService: BuscarcepService,
    private router: Router,
    private carService: CarrinhoService) {
    this.cliente = new Cliente();
    this.pedido! = new Pedido();
    this.achou = false;
    this.visivel = false;
  }

  ngOnInit(): void {
  }

  public isCPFValid(): boolean {

    if (!this.cliente.cpf || this.cliente.cpf.length == 0) {

      return false;
    }

    let cpf = this.cliente.cpf.trim().replace(".", "").replace(".", "").replace("-", "");
    //console.log(cpf)
    let digitos: number[] = cpf.split("").map(i => +i);
    //console.log(digitos);

    if (cpf.length == 0 || cpf == "11111111111" || cpf == "22222222222" || cpf == "33333333333" || cpf == "44444444444" || cpf == "55555555555" ||
      cpf == "66666666666" || cpf == "77777777777" || cpf == "88888888888" || cpf == "99999999999") {

      return false;
    }

    let digito1 = digitos[0] * 10 + digitos[1] * 9 + digitos[2] * 8 + digitos[3] * 7 + digitos[4] * 6 + digitos[5] * 5 + digitos[6] * 4 + digitos[7] * 3 + digitos[8] * 2;
    //console.log(digito1);
    let d1 = digito1 = 11 - digito1 % 11;

    if (d1 >= 10) { //regra se o número forn >=10 
      d1 = 0;
    }
    if (d1 != digitos[9]) {// primeiro digito não confere
      return false;
    }

    let digito2 = digitos[0] * 11 + digitos[1] * 10 + digitos[2] * 9 + digitos[3] * 8 + digitos[4] * 7 + digitos[5] * 6 + digitos[6] * 5 + digitos[7] * 4 + digitos[8] * 3 + digitos[9] * 2;

    //console.log(digito2)
    let d2: number = 11 - digito2 % 11;
    if (d2 >= 10) { //regra oara se digito 2 for >=10
      d2 = 0;
    }

    if (d2 != digitos[10]) {
      return false;
    }
    else {
      return true;
    }
    //console.log(d2);

    return false;

  }

  public buscarCpf() {
    if (!this.isCPFValid()) {
      this.menssagemErro = "CPF informado é inválido, verifique!"
      document.getElementById("btnModal")?.click();
      return;
    }
    this.cliService.buscarClientePeloCpf(this.cliente.cpf)
      .subscribe(
        (cli: any) => {
          this.cliente = cli;
          this.achou = true;
          //console.log(this.cliente)
          this.visivel = true
          this.cliente.reset();

        },
        (err) => {
          if (err.status == 404) {
            //deu certo, mas a pesquisa não encontoru o cliente com esse telefone é cliente novo
            this.visivel = true;


          } else {
            alert("Erro desconhecido " + err)

          }
        }
      );
  }

  public ocultaAlert() {
    this.visivel = false;
  }

  public buscarCEP() {
    this.cepService.buscarCEP(this.cliente.cep).subscribe
      ((res: any) => {
        this.cliente.logradouro = res.logradouro;
        this.cliente.cidade = res.localidade;
        this.cliente.bairro = res.bairro;
        this.cliente.estado = res.uf;

      },
        (err) => {
          console.log("")
          this.menssagemErro = "Informe um CEP válido, sem pontos e traços."
          document.getElementById("btnModal")?.click();

        }
      );
  }

  public finalizarPedido() {
    let pedidoTmp!: Pedido;
    pedidoTmp = JSON.parse(localStorage.getItem("cart")!);
    this.pedido.itensPedido = pedidoTmp.itensPedido;
    this.pedido.valorTotal = pedidoTmp.valorTotal;
    this.pedido.cliente = this.cliente;
    this.pedido.status = 0; //pedido inicial

    //console.log("aqui é o pedido: " + this.pedido);

    this.pedService.inserirNovoPedido(this.pedido).subscribe(
      (res: any) => {
        //alert("Pedido efetivado = numero " + res.idPedido);
        localStorage.removeItem("cart");
        this.carService.getNumberOfItens().next(0);
        this.router.navigate(["/recibo/", res.idPedido])
      },
      (err) => {
        // Trate erros aqui
        alert("Erro ao efetivar o pedido: ");
      });

  }


}
