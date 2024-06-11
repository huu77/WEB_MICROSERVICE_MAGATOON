import * as React from 'react';
import Rating from '@mui/material/Rating';
import StarIcon from '@mui/icons-material/Star';
import { useCreateStoryRatingDetailMutation, useGetStoryIdRatingDetailQuery, useGetStoryRatingDetailQuery, useUpdateStoryRatingDetailMutation } from '../../features/api/apiSlice';

export default function HoverRating({ id, userId }) {
    
    const { data } = useGetStoryRatingDetailQuery(
        id
    )

    const { data: dataRatingDetail, isFetching: isFetchingRatingDetail } = useGetStoryIdRatingDetailQuery(
        {
            userId: userId,
            storyId: id
        }
    );
    const [createStoryRatingDetail] = useCreateStoryRatingDetailMutation();
    const [updateStoryRatingDetail] = useUpdateStoryRatingDetailMutation();


    // console.log(userId, "data")
    const dataRating = data.data[0]

    const float = 0.2
    const num = 1 / float * dataRating.rating
    const [value, setValue] = React.useState(num);
    // const [hover, setHover] = React.useState(-1);

    const handleGetStar = async (v) => {
    
        if (!dataRatingDetail.data  ) { // Corrected condition

           const rs =  await createStoryRatingDetail({ storyId: id, userId, star: v ? v:6 }).unwrap();
            console.log(rs)
        } else {
            const rs =   await updateStoryRatingDetail({ storyId: id, userId, star: v }).unwrap();
            console.log(rs)
        }
    }

    return (
        <div className='flex my-2'>
            <div
                sx={{
                    width: 500,
                    display: 'flex',
                    alignItems: 'center',
                }}
            >
                <Rating
                    name="hover-feedback"
                    value={value}
                    precision={float}
                    onClick={(e) => handleGetStar(e.target.value)}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}
                    // onChangeActive={(event, newHover) => {
                    //     setHover(newHover);
                    // }}
                    emptyIcon={<StarIcon style={{ opacity: 1 }} fontSize="inherit" />}
                    readOnly={localStorage.getItem("accessToken") && localStorage.getItem("refreshToken") ? false : true}
                />

            </div>
            <span className='ml-2 mt-[-3px] text-yellow-500 text-[20px]  '> {dataRating.star} sao / {dataRating.ratingCount} Lượt Đánh Giá</span>
        </div>
    );
}
