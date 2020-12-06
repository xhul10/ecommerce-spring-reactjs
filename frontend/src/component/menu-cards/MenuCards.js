import React from 'react';
import usePagination from "../pagination/usePagination";
import PerfumeCardItem from "../card/PerfumeCardItem";
import PaginationItem from "../pagination/PaginationItem";
import SearchForm from "../search-form/SearchForm";

function MenuCards({data, itemsPerPage, startFrom, searchByData}) {
    const {slicedData, pagination, prevPage, nextPage, changePage, setFilteredData, setSearching} = usePagination({
        itemsPerPage,
        data,
        startFrom
    });

    return (
        <div className="container">
            <div className="container-fluid row mt-5 ml-2">
                <SearchForm
                    data={data}
                    searchByData={searchByData}
                    setFilteredData={setFilteredData}
                    setSearching={setSearching} />
            </div>
            <div className="row mt-3 ml-2">
                <div className="container-fluid">
                    <PaginationItem
                        pagination={pagination}
                        prevPage={prevPage}
                        changePage={changePage}
                        nextPage={nextPage}/>
                    <div className="row">
                        {slicedData.map((perfume) => {
                            return (
                                <PerfumeCardItem
                                    perfume={perfume}
                                    colSize={3}
                                    link={"/product"}
                                    btnName={"Купить"}/>
                            );
                        })}
                    </div>
                    <PaginationItem
                        pagination={pagination}
                        prevPage={prevPage}
                        changePage={changePage}
                        nextPage={nextPage}/>
                </div>
            </div>
        </div>
    );
}

export default MenuCards;