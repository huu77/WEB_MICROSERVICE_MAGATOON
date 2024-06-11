import { useEffect, useState } from 'react';
import { useGetCommentsQuery, useGetProfileQuery, useGetStoriesQuery } from '../../features/api/apiSlice';
import CardList from './../../components/CardList';
import Topview from '../../components/TopView';
import CommentList from '../../components/CommentList';
import { json } from 'react-router-dom';

export default function Home() {
    const [page, setPage] = useState(1)
 
    const { data, isFetching, isSuccess } = useGetStoriesQuery({
        page: 1,
        limit: 10,
    })
 
    const { data: commentResponse, isSuccess: isGetCommentsSuccess } = useGetCommentsQuery({
        chapterId: 6,
        isOldest: 0,
        page: 1,
        limit: 10
    })

    if (isFetching) {
        <p>loading...</p>
    } else if (isSuccess) {
        return (
            <div className="flex justify-center " >
                <div className="container flex justify-between">

                    <CardList
                        className=" "
                        data={data && data.data}
                        pageInfo={{
                            page,
                            limit: 10
                        }}
                        setPage={setPage}
                    />


                    <Topview className="w-1/3" />
                </div>
            </div>
        )
    }

    if (isGetCommentsSuccess) {
        return (
            <CommentList comments={commentResponse.data} />
        )
    }
}