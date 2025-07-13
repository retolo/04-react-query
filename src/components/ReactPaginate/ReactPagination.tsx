import css from './ReactPaginate.module.css'

import ReactPaginate  from 'react-paginate';

interface ReactPaginateProps{
    currentPage: number,
    totalPages: number,
    setCurrentPage: (number: number) => void,
}

export default function ReactPagination({currentPage, totalPages, setCurrentPage}: ReactPaginateProps){
    return(
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={({selected}) => setCurrentPage(selected + 1)}
            forcePage={currentPage - 1}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            pageCount={totalPages}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName={css.pagination}
            activeClassName={css.active}
                        />
    )
}