export class Artist {

    id: string;
    name: string;
    color: string;

    constructor(name: string, color: string){
        this.name = name;
        this.color = color;
    }

    setId(id: string){
        this.id = id;
    }

}
