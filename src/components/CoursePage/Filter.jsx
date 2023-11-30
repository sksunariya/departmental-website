import React, { useState } from 'react';

const Filter = (props) => {
    let filterData = props.filterData;
    let category = props.category;
    let setCategory = props.setCategory;

    function filterHandler (title) {
        setCategory(title);
    }

    return (
        <div className='flex gap-5 p-4'>
            {filterData.map( (data) => {
                return (
                        <button onClick={() => filterHandler(data.title)} 
                            className={`btn bg-[rgb(34,34,59)] text-lg rounded-md border-2 p-0.5 px-2 text-white hover:bg-opacity-50 transition-all duration-300 ${category === data.title ? "bg-opacity-60 border-white": "bg-opacity-40 border-transparent"} ` } 
                            key={data.id}>
                            {data.title}
                        </button>
                )
            })
            }
        </div>
    )
}

export default Filter;