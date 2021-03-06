/**
 * Egy szereplő szerepeinek adatait tároló modell
 * ActorService használja
 */
export interface Role
{
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    popularity: number;
    character: string;
    credit_id: string;
    order:string;
}