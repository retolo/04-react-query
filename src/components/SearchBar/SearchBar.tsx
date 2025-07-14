interface SearchBarProps{
    onSubmit: (queryPer: string) => void;
    setPage: (page: number) => void;
}

import styles from './SearchBar.module.css'
const page = 1;
import toast, { Toaster } from 'react-hot-toast';
export default function SearchBar({onSubmit, setPage}: SearchBarProps){



    const handleSubmit = (formData: FormData) =>{
        const inputValue = formData.get('query')
        if(inputValue === '' || inputValue === null){
            toast('Please enter your search query.');
            return;
        }
        
        onSubmit(String(inputValue));
        setPage(page);
        
        
        
        
        
    }


    
    
    


        
        

    
    return(
        <header className={styles.header}>
         <div className={styles.container}>
         <a
         className={styles.link}
         href="https://www.themoviedb.org/"
         target="_blank"
         rel="noopener noreferrer"
         >
         Powered by TMDB
         </a>
         <form action={handleSubmit}  className={styles.form}>
         <input
         className={styles.input}
         type="text"
         name="query"
         autoComplete="off"
        placeholder="Search movies..."
         autoFocus
         
         
         />
         <button  className={styles.button} type="submit">
        
         Search
         </button>
         </form>
         </div>
         <Toaster />
        </header>

    )
    
}