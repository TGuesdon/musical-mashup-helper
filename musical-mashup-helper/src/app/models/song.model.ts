import { Tonality } from "./tonality.enum";

export class Song {

    id: string;
    name: string;
    artist: string;
    bpm: number;
    tonality: Tonality;
    prod: boolean;
    rapped: boolean;

    constructor(name : string, artist: string, bpm: number, tonality: Tonality, prod: boolean, rapped: boolean){
        this.name = name;
        this.artist = artist;
        this.bpm = bpm;
        this.tonality = tonality;
        if(prod == undefined){
            this.prod = false;
        }else{
            this.prod = prod;
        }
        if(rapped == undefined){
            this.rapped = true;
        }else{
            this.rapped = rapped;
        }
    }

    setId(id: string){
        this.id = id;
    }

}
