
import { useState } from 'react';
import { useGetStoriesQuery } from '../../features/api/apiSlice';
import CardList from './../../components/CardList';
import Topview from '../../components/TopView';

export default function Hot() {
    const [page, setPage] = useState(1)
    const { data, isFetching, isSuccess } = useGetStoriesQuery({
        page,
        limit: 10
    })

    if (isFetching) {

    } else if (isSuccess) {
        return (
            <div className="container">
                <h1 className="flex justify-start text-3xl items-center text-blue-500 py-2" >Truyện tranh HOT đọc nhiều nhất
                    <i class="fa-solid fa-angle-right"></i>
                </h1>
                <div className='justify-center flex'>
                    <div className="flex justify-between" >

                        {
                            <CardList
                                className="w-2/3"
                                data={data.data}
                                pageInfo={{
                                    page,
                                    limit: 10
                                }}
                                setPage={setPage}
                            />
                        }

                        <Topview className="w-1/3" />
                    </div>
                </div>
            </div>
        )
    }
}