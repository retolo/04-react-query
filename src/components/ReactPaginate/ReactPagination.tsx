import css from './ReactPaginate.module.css'

import ReactPaginate  from 'react-paginate';

interface ReactPaginateProps{
    forcePage: number,
    pageCount: number,
    onPageChange: (number: number) => void,
}

export default function ReactPagination({forcePage, pageCount, onPageChange}: ReactPaginateProps){
    return(
        <ReactPaginate
            breakLabel="..."
            nextLabel=">"
            onPageChange={({selected}) => onPageChange(selected + 1)}
            forcePage={forcePage - 1}
            pageRangeDisplayed={5}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel="<"
            renderOnZeroPageCount={null}
            containerClassName={css.pagination}
            activeClassName={css.active}
                        />
    )
}