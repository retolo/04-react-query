interface SearchBarProps{
    onSubmit: (queryPer: string) => void
}
import toast, { Toaster } from 'react-hot-toast';
import styles from './SearchBar.module.css'

export default function SearchBar({onSubmit}: SearchBarProps){



    const handleSubmit = (formData: FormData) =>{
        const inputValue = formData.get('query')
        if(inputValue === '' || inputValue === null){
            toast('Please enter your search query.');
            return;
        }
        
        onSubmit(String(inputValue));
        
        
        
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
        <Toaster/>
         Search
         </button>
         </form>
         </div>
        </header>

    )
    
}