import React, {useState } from 'react';
import ReactPaginate from 'react-paginate';
import {useSelector} from "react-redux";
import SearchResultList from "./search-result-list";

// Example items, to simulate fetching from another resources.
// const items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
//
// function Items({ currentItems }) {
//     return (
//         <>
//             {currentItems &&
//                 currentItems.map((item) => (
//                     <div>
//                         <h3>Item #{item}</h3>
//                     </div>
//                 ))}
//         </>
//     );
// }

function SearchResultPagination({ itemsPerPage }) {
    const {resList} = useSelector((state) => {
        return state.resList;
    });



    // Here we use item offsets; we could also use page offsets
    // following the API or data you're working with.
    const [itemOffset, setItemOffset] = useState(0);


    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    const currentItems = resList.slice(itemOffset, endOffset);
    const pageCount = Math.ceil(resList.length / itemsPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % resList.length;
        // console.log(
        //     `User requested page number ${event.selected}, which is offset ${newOffset}`
        // );
        setItemOffset(newOffset);
    };

    return (
        <>
            <SearchResultList resList={currentItems} />
            <nav aria-label="Page navigation comments">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="previous"
                    renderOnZeroPageCount={null}
                    containerClassName="pagination justify-content-center"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    activeClassName="active"
                />
            </nav>
        </>
    );
}


export default SearchResultPagination;