import { useCreateStoryFollowDetailMutation, useDeleteStoryFollowDetailMutation, useGetStoryFollowDetailQuery, useGetfollowCountQuery } from "../../../features/api/apiSlice";
import ViewFollowSkeleton from './FollowCountSkeleton'; // Ensure this path is correct
import { useState, useEffect } from 'react';
import Follow from './../../../pages/follow/index';

function FollowCount({ id, userId }) {
    const { data: dataFollowDetail, isFetching: isFetchingFollowDetail } = useGetStoryFollowDetailQuery(
        {
            userId: userId,
            storyId: id
        }
    );

    const [typeFollowBtn, setTypeFollowBtn] = useState(false);


    useEffect(() => {
        if (!isFetchingFollowDetail && dataFollowDetail) {
            if (dataFollowDetail.data.length === 0) {
                setTypeFollowBtn(true);

            } else {
                setTypeFollowBtn(false);

            }
        }
    }, [isFetchingFollowDetail, dataFollowDetail]);

    const { data, isFetching, isError: isFetchingError } = useGetfollowCountQuery(id);
    const [createStoryFollowDetail, { isLoading, isError: isCreatingError }] = useCreateStoryFollowDetailMutation();
    const [deleteStoryFollowDetail, { isLoading: isLoadingDelete, isError: isDeleteError }] = useDeleteStoryFollowDetailMutation();
    let accessToken = localStorage.getItem('accessToken');
    let refreshToken = localStorage.getItem('refreshToken');

    const handleFollow = async () => {
        try {
            if (!accessToken || !refreshToken) {
                return;
            }
            setTypeFollowBtn(!typeFollowBtn); // Toggle follow button state

            if (typeFollowBtn) {
                await createStoryFollowDetail({ storyId: id, userId }).unwrap();
                // If following, create a follow detail for the story
            } else {
                await deleteStoryFollowDetail({ storyId: id, userId }).unwrap();
                // If unfollowing, delete the follow detail for the story
            }
        } catch (error) {
            // Handle any errors that might occur during follow/unfollow actions
            console.error("Error handling follow/unfollow:", error);
        }
    };




    if (isFetching) {
        return <ViewFollowSkeleton />;
    }

    if (isFetchingError) {
        return <div>Error fetching follow count</div>;
    }

    return (
        <div>
            <div className="my-auto flex">
                {typeFollowBtn ? (<button
                    onClick={handleFollow}
                    className={`bg-green-500 hover:bg-green-400 p-2 rounded mr-1 text-white `}
                    disabled={isLoading}
                >
                    <i className={`fa-solid fa-heart mr-1 `}> </i>
                    Follow
                </button>) : (<button
                    onClick={handleFollow}
                    className={`bg-green-500 hover:bg-green-400 p-2 rounded mr-1 text-white `}
                    disabled={isLoadingDelete}
                >
                    <i className={`fa-solid fa-heart mr-1 text-yellow-500`}> </i>
                    unfollow
                </button>)}



                <p>{data?.data?.followCount || 0} lượt theo dõi</p>
            </div>
            {isCreatingError && <p>Error creating follow detail</p>}
            {isDeleteError && <p>Error deleting follow detail</p>}
        </div>
    );
}

export default FollowCount;
