import { useGetstoryGenreDetailQuery } from "../../../features/api/apiSlice";
import React from "react";
import { NavLink } from 'react-router-dom';
import GenreSkeleton from "./GenreSkeleton";

function Genre({ id }) {
    const { data: dataGenre, isFetching: isFetchingGenre, isSuccess: isSuccessGenre } = useGetstoryGenreDetailQuery({
        storyId: id,
    });
    if (isFetchingGenre) {
        return (
            <div>
                <GenreSkeleton />
            </div>
        );
    }

    if (!dataGenre || !dataGenre.data || dataGenre.data.length === 0) {
        return (
            <div>đang cập nhật</div>
        );
    } else {
        return (
            <div>
                {dataGenre.data.map((data, index) => (
                    <React.Fragment key={data.genre.id}>
                        <NavLink to={`/${data.genre.id}`}>
                            <p className='mx-1 text-blue-400 hover:text-blue-700'>{data.genre.name}</p>
                        </NavLink>
                        {index !== dataGenre.data.length - 1 && <span> - </span>}
                    </React.Fragment>
                ))}
            </div>
        );
    }
}

export default Genre;
