import MyPagination from '../MyPagination';
import Card from './../Card';

export default function CardListSP({ data: { stories, count }, pageInfo: { page, limit }, setPage }) {
    function handleChangePage(e, val) {
        setPage(val);
    }
    return (
        <div className="grow mt-3">
            <div className="grid grid-cols-2 gap-2">
                {stories.map((story) => (
                    <Card key={story.id} story={story.story} />
                ))}
            </div>

            <div className="flex justify-center">
                {
                    count > limit
                        ?
                        <MyPagination
                            count={Math.ceil(count / limit)}
                            page={page}
                            onChange={handleChangePage}
                        />
                        :
                        null
                }
            </div>
        </div>
    )
}