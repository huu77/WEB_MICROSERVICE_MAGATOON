
import { useState } from 'react';
import { useGetHistoryDetailQuery } from '../../features/api/apiSlice';
import CardList from './../../components/CardList';
import Topview from '../../components/TopView';

export default function History() {
    const [page, setPage] = useState(1)
    const { data, isFetching, isSuccess } = useGetHistoryDetailQuery({
        page: 1,
        limit: 10
    })
    console.log("data", data)

    if (isFetching) {
        return (
            <div>
                history
                <Topview className="w-1/3" />
            </div>)
    } else if (isSuccess) {
        return (
            <div className="container">
                <h1 className="flex justify-start text-3xl items-center text-blue-500" >
                    Lịch sử đọc truyện
                    <i className="fa-solid fa-angle-right"></i>
                </h1>
                <span className="flex justify-start text-left pr-12">Lịch sử đọc truyện "Theo tài khoản" chỉ được lưu khi bạn đọc hết chapter</span>
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
    else if (data == null) {
        return (
            <div className="container">
                <h1 className="flex justify-start text-3xl items-center text-blue-500" >
                    Lịch sử đọc truyện
                    <i className="fa-solid fa-angle-right"></i>
                </h1>
                <span className="flex justify-start text-left pr-12">Lịch sử đọc truyện "Theo tài khoản" chỉ được lưu khi bạn đọc hết chapter</span>
                <div className=' flex justify-end'>
                    <div className="flex " >
                        chua cos history
                        {/* 
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
                        } */}

                        <Topview className="w-1/3 " />
                    </div>
                </div>
            </div>
        )
    }
}