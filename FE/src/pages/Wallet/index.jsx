import { useState } from 'react';
import { useGetWalletQuery } from "../../features/api/apiSlice";

function Wallet() {
    const { data: dataWallet, isSuccess: isSuccesswallet } = useGetWalletQuery();
    const [selectedValue, setSelectedValue] = useState('');

    const handleChange = (event) => {
        setSelectedValue(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(selectedValue);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="container mx-auto mt-8">
                    <h1 className="text-3xl font-bold text-sky-700">Mua dịch vụ để xem được nhiều chuyện hay hơn</h1>
                    <h2 className="text-sky-500 my-2">CREDIT: {isSuccesswallet ? dataWallet.data.balance : 'loading...'}</h2>
                    <div className="w-full rounded-lg border">
                        <div className="bg-gray-200 text-gray-700 flex">
                            <p className="px-4 py-3 text-left w-1/2">Giá</p>
                            <p className="px-4 py-3 text-left w-1/2">Thêm điểm</p>
                        </div>
                        <div className="flex-row w-full">
                            <div className="flex w-full py-2">
                                <input
                                    className="mx-2"
                                    type="radio"
                                    id="option1"
                                    name="fav_language"
                                    value="100"
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor="option1"
                                    className="w-1/2 border-r border-gray-300"
                                >100k
                                </label>
                                <p className="w-1/2 ml-2">1 tuần</p>
                            </div>
                            <div className="flex w-full py-2">
                                <input
                                    className="mx-2"
                                    type="radio"
                                    id="option2"
                                    name="fav_language"
                                    value="300"
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor="option2"
                                    className="w-1/2 border-r border-gray-300"
                                >300k
                                </label>
                                <p className="w-1/2 ml-2">1 tháng</p>
                            </div>
                            <div className="flex w-full py-2">
                                <input
                                    className="mx-2"
                                    type="radio"
                                    id="option3"
                                    name="fav_language"
                                    value="1000"
                                    onChange={handleChange}
                                />
                                <label
                                    htmlFor="option3"
                                    className="w-1/2 border-r border-gray-300"
                                >1000k
                                </label>
                                <p className="w-1/2 ml-2">1 năm</p>
                            </div>
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="flex mx-auto my-3 p-3 w-[500px] text-center text-white bg-sky-400 rounded"
                    >tính tiền</button>
                </div>
            </form>
        </div>
    );
}

export default Wallet;
