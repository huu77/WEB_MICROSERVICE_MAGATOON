import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useGetChaptersQuery, useGetViewOfChapterQuery } from '../../../features/api/apiSlice';
import { calculateTimeAgo } from './../../../helpers/moment/index';
import ChapterSkeleton from './ChapterSkeleton';
import ViewCountChapter from './ViewOfChapter/index';

export default function Chapter({ id }) {
    const [limit, setLimit] = useState({
        limit: 4,
        currLimit: 4
    });

    const { data: datachapter, isSuccess: chapterisSuccess } = useGetChaptersQuery({
        storyId: id,
        page: 1,
        limit: limit.currLimit,
    });

    const viewMoreHandler = () => {
        setLimit({
            ...limit,
            currLimit: limit.currLimit + limit.limit
        })
    };


    if (!chapterisSuccess) {
        return (
            <div>
                <ChapterSkeleton />
            </div>
        );
    }
 
    const countchapter = datachapter.data.count
    return (
        <div className='mb-6'>
            <h2 className="text-blue-600 flex my-4 justify-start text-2xl items-center border-solid border-b-2 border-gray-500 mx-4">
                <i className="fa-solid fa-bars mr-2"></i>Chương
            </h2>
            <div className='overflow-hidden pb-4 border-solid border rounded border-gray-500'>
                {datachapter.data.chapters.map((data) => (
                    <Link
                        to={`/story/${id}/chapter/${data.id}`}
                        key={data.id}
                    >
                        <div className='flex justify-between p-2 mx-2 border-dashed border-b border-gray-500'>
                            <div className='flex justify-between py-1 w-full'>
                                <p className='text-[17px]'>{data.name}</p>
                                <span className='text-[17px] text-silver italic opacity-80'>{calculateTimeAgo(data.updatedAt)}</span>
                                <p className='text-[17px] text-silver italic opacity-80'>
                                    <ViewCountChapter
                                        chapter={data}
                                        
                                    />
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className='w-full flex justify-center'>
                <div className='flex justify-between '>
                    {limit.currLimit < countchapter
                        ? (<button
                            className='text-blue-500 hover:text-violet-500 mx-[200px] '
                            onClick={viewMoreHandler}>
                            Xem thêm
                        </button>)
                        : null
                    }
                </div>
            </div>
        </div>
    );
}


