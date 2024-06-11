import React, { useEffect, useState } from "react";
import { useCreatePaymentMutation } from "../../features/api/apiSlice";
import axios from "axios";

function PaymentPage() {
    const [createPayment, { isLoading: isloaddingdelete, isError, isSuccess }] = useCreatePaymentMutation();


    const handleSubmit = async (event) => {
        const paymentData = {
            type: 1,
            amount: event.target['so-tien'].value,
            Billing_Information: event.target['noi-dung-thanh-toan'].value,
            bankCode: event.target['ngan-hang'].value,
            language: event.target['ngon-ngu'].value,
        };
        console.log(paymentData);
        try {
            const response = await createPayment(paymentData).unwrap();
            console.log('Payment created successfully:', response);
        } catch (error) {
            console.error('Failed to create payment:', error);
        }
        console.log(createPayment, "123")
        return createPayment;
    };
 

  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState([]);


  useEffect(() => {
    async function getApi() {
      const rs = await axios.get("https://api.vietqr.io/v2/banks");
      setSelectedBank(rs.data.data);
    }
    getApi()
  }, []);
 
  const handleBankChange = (event) => {
    // Xử lý việc chọn ngân hàng trong dropdown
    setSelectedBank(event.target.value);
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="container mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-xl font-bold mb-4">VNPay Demo</h1>
        <div className="mb-4">
          <a href="#" className="text-blue-500">
            Danh sách
          </a>{" "}
          |
          <a href="#" className="text-blue-500">
            Tạo mới
          </a>
        </div>
        <h2 className="text-2xl font-bold mb-4">Tạo mới đơn hàng</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="loai-hang-hoa" className="block text-gray-700">
              Loại hàng hóa
            </label>
            {/* Các trường nhập khác */}
          </div>
          <div className="mb-4">
            <label htmlFor="ngan-hang" className="block text-gray-700">
              Ngân hàng
            </label>
            <select
              id="ngan-hang"
              className="block w-full mt-1 border-gray-300 rounded-md shadow-sm focus:ring focus:ring-opacity-50"
              onChange={handleBankChange}
            >
              <option value="NCB"> Ngân hàng Quốc Dân</option>
              {selectedBank.map((bank) => (
                <option key={bank.code} value={bank.code}>
                  {bank.name}
                </option>
              ))}
            </select>
          </div>
          {/* Các trường nhập khác */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Thanh toán Redirect
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PaymentPage;
