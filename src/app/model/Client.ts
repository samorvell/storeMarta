export class Client {

    public idCliente !: number;
    public name!: string;
    public email!: string;
    public phone!: string;
    public dateBirth!: string;
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
        this.phone = "";
        this.estado = "";
        this.numero = "";
        this.logradouro = "";
    }

}