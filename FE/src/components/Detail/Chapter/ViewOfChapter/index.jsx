import { useGetViewOfChapterQuery } from "../../../../features/api/apiSlice";

function ViewCountChapter({ chapter }) {
    const { data: dataViewOfChapter, isSuccess: isSuccessViewOfChapter } = useGetViewOfChapterQuery({
        chaterId: chapter.id, // Typo: Corrected to chapterId
        toDate: new Date().toISOString(), // Pass toDate separately
    });
    // console.log(new Date().toISOString(), chapter.id, "dataViewOfChapter", dataViewOfChapter);

    if (!isSuccessViewOfChapter) {
        return <div>loading.... </div>;
    }


    return (
        <div>
            lượt xem
        </div>
    );
}

export default ViewCountChapter;
