export class User{
    id:number = 0;
    username:string="";
    password:string="";

    public constructor(id:number, username:string, password:string){
        this.id = id;
        this.username = username;
        this.password = password;
    }
}

