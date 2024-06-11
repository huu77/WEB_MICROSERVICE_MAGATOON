import Skeleton from '@mui/material/Skeleton';

const MangaDetailPage = () => {

    return (
        <div className='detail container'>

            <h1 className='my-2'>
                <Skeleton
                    variant="rectangular"
                    width={250}
                    height={40} />
            </h1>

            <div className="flex ">
                <Skeleton
                    variant="rectangular"
                    width={200}
                    height={272} />
                <nav>

                    <ul className='ml-3 '>
                        <li className="flex mt-4 ">
                            <span className='w-28 flex justify-start items-center '>
                                <i className="fa-solid fa-user mr-2"></i>tác giả
                            </span>

                        </li>
                        <li className="flex mt-4">
                            <span className='w-28 flex justify-start items-center '>
                                <i className="fa-solid fa-wifi mr-2"></i>tình trạng
                            </span>
                            <Skeleton
                                variant="rectangular"
                                width={160}
                                height={24} />

                        </li>
                        <li className="flex mt-4">
                            <span className='w-28 flex justify-start items-center '>
                                <i className="fa-solid fa-tags mr-2"> </i>thể loại
                            </span>
                        </li>
                        <li className="flex mt-4">
                            <span className='w-28 flex justify-start items-center '>
                                <i className="fa-solid fa-eye mr-2"></i>lượt xem
                            </span>
                            <span>N/A </span>
                        </li>
                    </ul>
                    <div className="follow-btn flex mt-4">
                        <button className='bg-green-500 hover:bg-green-400 p-2 rounded mr-1 text-white'><i className="fa-solid fa-heart"></i> theo dõi</button>
                        <p>0  lượt theo dõi</p>
                    </div>
                    <div className="flex mt-4">
                        <button className='bg-yellow-500 hover:bg-yellow-400 p-2 rounded mr-1 text-white'>đọc từ đầu </button>
                        <button className='bg-yellow-500 hover:bg-yellow-400 p-2 rounded mr-1 text-white'> đọc mới nhất </button>
                        <button className='bg-red-700 hover:bg-red-500 p-2 rounded mr-1 text-white'> đọc tiếp <i className="fa-solid fa-chevron-right"></i></button>
                    </div>
                </nav>
            </div>
            <div className="content">
                <h2 className="text-blue-600 flex  justify-start text-2xl items-center  border-solis border-b-2 border-gray-500 mx-4"> <i className="fa-regular fa-file-lines mr-2"></i>Nội Dung</h2>
                <div>
                    <Skeleton
                        variant="rectangular"
                        width={1030}
                        height={100} />
                </div>
            </div>
        </div>
    );
};

export default MangaDetailPage;
