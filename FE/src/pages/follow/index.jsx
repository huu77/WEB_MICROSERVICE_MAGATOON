import { useState, useEffect } from 'react';
import { useGetProfileQuery, useGetStoryFollowDetailQuery } from '../../features/api/apiSlice';
import Topview from '../../components/TopView';
import CardListSP from '../../components/CardList/cardlist';

export default function Follow() {
    const [page, setPage] = useState(1);
    const { data: dataProfile, isSuccess: isSuccessProfile } = useGetProfileQuery();

    let userId = null;
    if (isSuccessProfile) {
        userId = dataProfile.data.id;
    }

    const { data, isFetching, isSuccess } = useGetStoryFollowDetailQuery(
        { userId: userId },
        // { skip: !userId } // Skip the query if userId is null
    );

    if (!isSuccessProfile || !userId) {
        return <div>Loading profile...</div>; // Loading profile data
    }

    if (isFetching) {
        return <div>Loading stories...</div>; // Loading stories data
    } else if (isSuccess) {
        const stories = data.data; // Destructure stories from data.data
        const count = data.data.length;
        return (
            <div className="container flex">
                <div>
                    <div>
                        <h1 className="flex justify-start text-3xl items-center text-blue-500">
                            Truyện đang theo dõi
                            <i className="fa-solid fa-angle-right"></i>
                        </h1>
                        <span className="flex justify-start text-left pr-1">
                            Để theo dõi truyện, nhấn vào Theo dõi như hình bên dưới:
                            Bạn nên Đăng nhập để truy cập truyện đã theo dõi của bạn ở bất cứ đâu
                        </span>
                        <img
                            src="https://nettruyenco.vn/public/images/theo-doi.jpg"
                            className="w-full"
                        />
                    </div>
                    <div className="justify-center flex">
                        <div className="flex justify-between pb-3">
                            <CardListSP
                                className="w-2/3 "
                                data={{ stories, count }}
                                pageInfo={{ page, limit: 10 }}
                                setPage={setPage}
                            />
                        </div>
                    </div>
                </div>
                <Topview className="w-1/3" />
            </div>
        );
    }

    return null; // Added fallback return
}
