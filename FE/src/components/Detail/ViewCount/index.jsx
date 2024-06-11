import { useGetviewCountQuery } from "../../../features/api/apiSlice";
import VeiwCountSkeleton from "./VeiwCountSkeleton";

function ViewCount({ id }) {
    const { data, isFetching, isSuccess } = useGetviewCountQuery(
        id
    )
    if (isFetching) {
        return (
            <div>
                <VeiwCountSkeleton />
            </div>
        )
    }
    return (
        <div>
            <p>{data.data.viewCount} Lượt Xem</p>
        </div>
    );
}

export default ViewCount;