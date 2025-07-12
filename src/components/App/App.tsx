import { useEffect, useState } from "react";

import SearchBar from "../SearchBar/SearchBar";
import { type Movie } from "../../types/movie";
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import fetchMovies from "../../services/movieService";
import { useQuery } from "@tanstack/react-query";


export default function App(){

    const [movies, setMovies] = useState<Movie[]>([]);
    const [querys, setQuerys] = useState<string>('');

    
    
  const {data, error, isLoading, isError} = useQuery({
    queryKey: ['movies', querys],
    queryFn: () => fetchMovies(querys),
    enabled: querys !== '',
  })
  

  useEffect(() =>{
    setMovies([]);
    if(data?.length === 0){
      toast('No movies found for your request.');
    }
    else if(data !== undefined){
      
      setMovies(data);
      
    }


  }, [data])
    
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)


    const handleMovieSelect = (movie: Movie) =>{
        setSelectedMovie(movie);
        
    }

    const handleCloseModal = () =>{
        
        setSelectedMovie(null);
    }

    return (
        <>
          <SearchBar onSubmit={setQuerys} />
          <Toaster />
      
          {isError ? (
            <ErrorMessage error={error.message}/>
          ) : isLoading ? (
            <Loader />
          ) : (
            <>
              {movies.length > 0 && (
                <MovieGrid onSelect={handleMovieSelect} movies={movies} />
              )}
              {selectedMovie !== null && (
                <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
              )}
            </>
          )}
        </>
      );
      
}

    
