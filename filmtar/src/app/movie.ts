/*
export interface Movie
{
    id: number;
    title: string;
}
*/
export interface Movie
{
  adult : boolean,
  backdrop_path : string,
  budget : number,
  genres: {
    id: number,
    name: string
  }[],
  genre_ids : number,
  homepage: string,
  overview : string,
  id : number,
  imdb_id : string,
  original_language : string,
  original_title : string,
  popularity : number,
  poster_path : string,
  production_companies: {
    id: number,
    name: string
  }[],
  production_countries: {
    iso_3166_1: string,
    name: string
  }[],
  release_date : string,
  revenue : number,
  runtime : number,
  spoken_languages: {
    iso_3166_1: string,
    name: string
  }[],
  status : string,
  title : string,
  tagline : string,
  video : boolean,
  vote_average : number,
  vote_count : number

    /*
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title : string;
    ovierview : string;
    popularity : number;
    poster_path : string;
    release_date : string;
    title: string;
    video : boolean;
    vote_average : number;
    vote_count : number*/
}
/*
export class Movie {
    constructor(
      public adult : boolean,
      public backdrop_path : string,
      public budget : number,
      public genres: {
        id: number,
        name: string
      }[],
      public genre_ids : number,
      public homepage: string,
      public overview : string,
      public id : number,
      public imdb_id : string,
      public original_language : string,
      public original_title : string,
      public ovierview : string,
      public popularity : number,
      public poster_path : string,
      public production_companies: {
        id: number,
        name: string
      }[],
      public production_countries: {
        iso_3166_1: string,
        name: string
      }[],
      public release_date : string,
      public revenue : number,
      public runtime : number,
      public spoken_languages: {
        iso_3166_1: string,
        name: string
      }[],
      public status : string,
      public title : string,
      public tagline : string,
      public video : boolean,
      public vote_average : number,
      public vote_count : number) { }
  }*/