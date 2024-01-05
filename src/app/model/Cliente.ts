export class Cliente {

    public idCliente !: number;
    public name!: string;
    public email!: string;
    public telefone!: string;
    public dataNasc!: string;
    public cpf!: string;
    public cep!: string;
    public logradouro!: string;
    public numero!: string;
    public complemento!: string;
    public bairro!: string;
    public cidade!: string;
    public estado!: string;

    public reset() {
        this.name = "";
        this.bairro = "";
        this.cep = "";
        this.cidade = "";
        this.email = "";
        this.telefone = "";
        this.estado = "";
        this.numero = "";
        this.logradouro = "";
    }

}