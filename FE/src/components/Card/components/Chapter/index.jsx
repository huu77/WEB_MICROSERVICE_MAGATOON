import { NavLink } from "react-router-dom";
import { calculateTimeAgo } from "../../../../helpers/moment";

export default function Chapter({ chapter: { id, name, updatedAt, storyId }, }) {
    return (
        <div className={`flex justify-between py-1 w-full`}>
            <NavLink
                className='text-[17px]'
                to={`/story/${storyId}/chapter/${id}`}
            >
                {name}
            </NavLink>
            <span className={`text-[17px] color-[silver] italic opacity-80`}>{calculateTimeAgo(updatedAt)}</span>
        </div>
    )
}