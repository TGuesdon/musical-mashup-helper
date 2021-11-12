import { Tonality } from "./tonality.enum";

export class Song {

    id: string;
    name: string;
    artist: string;
    bpm: number;
    tonality: Tonality;
    prod: boolean;
    rapped: boolean;

    constructor(name : string, artist: string, bpm: number, tonality: Tonality, prod ?: boolean, rapped ?: boolean){
        this.name = name;
        this.artist = artist;
        this.bpm = bpm;
        this.tonality = tonality;
        if(prod != null){
            this.prod = prod;
        }
        if(rapped != null){
            this.rapped = rapped;
        }
    }

    setId(id: string){
        this.id = id;
    }

}
