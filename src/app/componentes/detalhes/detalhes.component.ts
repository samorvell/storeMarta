import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/Product';
import { Order } from 'src/app/model/Order';
import { CartService } from 'src/app/servicos/cart.service';
import { ProductService } from 'src/app/servicos/product.service';

@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.component.html',
  styleUrls: ['./detalhes.component.css']
})
export class DetalhesComponent implements OnInit {

  public produtoDetalhe!: Product;
  public quantidade: number = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = +params['id']; // Converte o parâmetro id para número
      this.recuperaProduto(id);
    });
  }

  public recuperaProduto(id: number) {
    this.productService.getProdutoPeloId(id).subscribe(
      (prod: Product) => {
        this.produtoDetalhe = prod;
      },
      (err) => {
        console.error('Erro ao recuperar produto:', err);
        // Lógica de tratamento de erro, como redirecionamento para página de erro
      }
    );
  }

  public adicionarCarrinho() {
    let cartItem = localStorage.getItem("cart");
    let order: Order = cartItem ? JSON.parse(cartItem) : new Order();


    let item = {
      itemQty: this.quantidade,
      product: this.produtoDetalhe,
      unitPrice: this.produtoDetalhe.price,
      totalPrice: this.produtoDetalhe.price * this.quantidade
    };

    order.itemsOrdered.push(item);
    order.amount += item.totalPrice;

    localStorage.setItem("cart", JSON.stringify(order));
    this.cartService.setNumberOfItems(order.itemsOrdered.length);

    this.router.navigate(["/carrinho"]);
  }
}
