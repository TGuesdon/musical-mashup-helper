import { Tonality } from "./tonality.enum";

export class Song {

    id: string;
    name: string;
    artist: string;
    bpm: number;
    tonality: Tonality;

    constructor(name : string, artist: string, bpm: number, tonality: Tonality){
        this.name = name;
        this.artist = artist;
        this.bpm = bpm;
        this.tonality = tonality;
    }

    setId(id: string){
        this.id = id;
    }

}
