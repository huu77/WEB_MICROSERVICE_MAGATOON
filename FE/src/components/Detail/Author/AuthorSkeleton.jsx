import Skeleton from '@mui/material/Skeleton';

function AuthorSkeleton() {
    return (<p>
        <Skeleton
            variant="rectangular"
            width={160}
            height={24} />
    </p>);
}

export default AuthorSkeleton;