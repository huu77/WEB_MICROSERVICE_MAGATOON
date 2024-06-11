import Skeleton from '@mui/material/Skeleton';

function ChapterSkeleton() {
    return (<div>
        <h2 className="text-blue-600 flex my-4 justify-start text-2xl items-center border-solid border-b-2 border-gray-500 mx-4">
            <i className="fa-solid fa-bars mr-2"></i>Chương
        </h2>
        <div className="overflow-hidden pb-4 border-solid border rounded border-gray-500">
            <Skeleton
                variant="rectangular"
                width={1030}
                height={24} />
            <Skeleton
                variant="rectangular"
                width={1030}
                height={24} />
            <Skeleton
                variant="rectangular"
                width={1030}
                height={24} />
        </div>
    </div>);
}

export default ChapterSkeleton;
