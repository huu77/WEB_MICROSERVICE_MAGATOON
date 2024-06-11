import React from 'react'

export default function TopViewSkeletion() {
    return (
        Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className=" border-solid mt-3 pb-0 border-gray-500 border-b manga flex  w-full  ">
                <span className='p-2 text-xl  items-center flex ' >{index + 1} </span>

                <div className=' w-14 rounded h-20 bg-gray-400 mb-1'></div>
                <div className=' w-full  '>

                    <p className=' w-10/12 h-5 bg-gray-400  mb-2' > </p>

                    <div className="flex justify-between w-auto ">

                        <p className='h-5 w-40 bg-gray-400'> </p>
                        <span className='flex  justify-end w-10 h-5 bg-gray-400 '></span>
                    </div>
                </div>
            </div>

        )

        )
    )
}