import { useEffect, useState } from "react";

import SearchBar from "../SearchBar/SearchBar";
import { type Movie } from "../../types/movie";
import toast, { Toaster } from 'react-hot-toast';
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
import {fetchMovies} from "../../services/movieService";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import ReactPaginate from "../ReactPaginate/ReactPagination";


export default function App(){

    
    const [querys, setQuerys] = useState<string>('');
    

    const [currentPage, setCurrentPage] = useState(1);
    
  const {data, error, isLoading, isError, isSuccess, isPending} = useQuery({
    queryKey: ['movies', querys, currentPage],
    queryFn: () => fetchMovies(querys, currentPage),
    enabled: querys !== '',
    placeholderData: keepPreviousData,
  })

  const totalPages = data?.total_pages ?? 0;

  
  

  useEffect(() =>{
    
    if(data?.results.length === 0){
      toast('No movies found for your request.');
    }
    
   


  }, [data, querys])
    
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)


    const handleMovieSelect = (movie: Movie) =>{
        setSelectedMovie(movie);
        
    }

    const handleCloseModal = () =>{
        
        setSelectedMovie(null);
    }
    const handlePages = (newQuery: string) =>{
        setQuerys(newQuery);
        setCurrentPage(1);
        
        
        
    }
    

    return (
        <>
          <SearchBar onSubmit={handlePages}/>
          
      
          {isError ? (
            <ErrorMessage error={error.message}/>
          ) :isLoading && isPending ? (
            <Loader />
          ) : (
            <>
              {isSuccess && (
                <>
                
                <MovieGrid onSelect={handleMovieSelect} movies={data?.results} />
                <ReactPaginate forcePage={currentPage} pageCount={totalPages} onPageChange={setCurrentPage}/>
                
                
                </>
                
              )}
              {selectedMovie !== null && (
                <MovieModal movie={selectedMovie} onClose={handleCloseModal} />
              )}
            </>
          )}
          <Toaster />
        </>
      );
      
}

    
