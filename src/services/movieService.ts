
import axios from "axios";


import { type Movie } from "../types/movie";
interface AppGetResults{
  results: Movie[]
  total_pages: number;
}

export default async function fetchMovies(queryUser: string): Promise<Movie[]>{
    let page = 1;
    
    const mykey = import.meta.env.VITE_TMDB_TOKEN
    
    
    
        
            try {
                
                const response = await axios.get<AppGetResults>(
                    
                    'https://api.themoviedb.org/3/search/movie',
    
                    {params: {
                        include_adult: false,
                        language: 'en-US',
                        query: queryUser,
                        page: page
    
    
                    },
                    headers:{
                        accept: 'application/json',
                        Authorization: `Bearer ${mykey}`,
                    }}
                    
                
                
            );
            
            
            return response.data.results;
              
            

            
            }catch (error) {
              if (axios.isAxiosError(error)) {
                const apiMessage = error.response?.data?.status_message;
                throw new Error(apiMessage || error.message);
              } else {
                throw new Error(String(error));
              }
            }
          }