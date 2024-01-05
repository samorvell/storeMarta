import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { RodapeComponent } from './componentes/rodape/rodape.component';
import { DestaquesComponent } from './componentes/destaques/destaques.component';
import { DetalhesComponent } from './componentes/detalhes/detalhes.component';
import { CarroselComponent } from './componentes/carrosel/carrosel.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CarrinhoComponent } from './componentes/carrinho/carrinho.component';
import { EfetivarpedidoComponent } from './componentes/efetivarpedido/efetivarpedido.component';
import { ReciboComponent } from './componentes/recibo/recibo.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RodapeComponent,
    DestaquesComponent,
    CarroselComponent,
    DetalhesComponent,
    CarrinhoComponent,
    EfetivarpedidoComponent,
    ReciboComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
