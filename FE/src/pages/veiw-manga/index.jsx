import React, { useEffect, useState } from "react";
import "./manga.css";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCreateViewDetailMutation,
  useGetChapterImageQuery,
  useGetChaptersQuery,
  useGetProfileQuery,
} from "../../features/api/apiSlice";
import Chapter from "../../components/Card/components/Chapter";

function ViewManga() {
  //use hook
  const changepage = useNavigate();

  const { storyId, chapterId } = useParams(); // Lấy storyId và chapterId từ URL

  const { data: datachapter, isSuccess: chapterisSuccess } =
    useGetChaptersQuery({
      storyId: storyId,
      page: 1,
      limit: 3,
    });

  const { data: dataProfile, isSuccess: isSuccessProfile } =
    useGetProfileQuery();

  const { data: chapterImages, isSuccess: isGetChapterImagesSuccess } =
    useGetChapterImageQuery(chapterId); // Sử dụng chapterId thay vì id
  const [hidden, setHidden] = useState(false);

  const toggleHidden = () => {
    setHidden(!hidden);
  };

  const { data: DataChapters, isSuccess: isSuccessDataChapters } =
    useGetChaptersQuery({
      storyId,
      page: 1,
      limit: 4,
    });

  const handleCheck = () => {
    if (!isSuccessDataChapters) return null;

    const index = DataChapters.data.chapters.findIndex(
      (i) => i.id === parseInt(chapterId)
    );

    if (index === -1) {
      // Không tìm thấy chapterId trong danh sách
      return null;
    }

    const prevChapter =
      index > 0 ? DataChapters.data.chapters[index - 1].id : null;
    const nextChapter =
      index < DataChapters.data.chapters.length - 1
        ? DataChapters.data.chapters[index + 1].id
        : null;

    return {
      nextChapter,
      chapterId: parseInt(chapterId),
      prevChapter,
    };
  };

  if (!chapterisSuccess) {
    return <div>loading...</div>;
  }
  const handleChange = (type) => {
    if (type === "nextChapter") {
      if (handleCheck().nextChapter) {
        changepage(`/story/${storyId}/chapter/${handleCheck().nextChapter}`);
      }
    } else {
      if (handleCheck().prevChapter) {
        changepage(`/story/${storyId}/chapter/${handleCheck().prevChapter}`);
      }
    }
  };
  return (
    <div className="relative">
      <div className="text-4xl text-blue-500 font-semibold flex mb-4 justify-start ml-10">
        Chapter {chapterId}
      </div>
      <div className="flex relative justify-center mb-4">
        <a href="/story/22">
          <i className="fa-solid fa-bars w-[40px] h-[40px]"></i>
        </a>
        <button
          className={`rounded border-solid border-b-2 border-gray-500 bg-red-400 w-8 `}
          onClick={() => handleChange("nextChapter")}
        >
          <i className="fa-solid fa-caret-left"></i>
        </button>
        <button
          onClick={toggleHidden}
          className="w-1/3 mx-4 border-solid border border-gray-500 flex justify-between items-center px-2"
        >
          <p> chapter </p>
          <i className="fa-solid fa-caret-down"></i>
        </button>
        <button
          className="rounded border-solid border-b-2 border-gray-500 bg-red-400 w-8"
          onClick={() => handleChange("prevChapter")}
        >
          <i className="fa-solid fa-caret-right"></i>
        </button>
        <button className="bg-green-500 hover:bg-green-400 p-2 rounded ml-2 text-white">
          <i className="fa-solid fa-heart"></i> theo dõi
        </button>
        <div
          className={`absolute w-full bg-gray-100 top-12 ${
            hidden ? "" : "hidden"
          }`}
        >
          <div className="flex lischapter flex-wrap absolute bg-gray-100 overflow-auto shadow-gray-500 border border-gray-500 p-4 w-[600px] ">
            {datachapter.data.chapters.map((chapter) => (
              <div
                className="w-1/5 p-2 border-gray-500 border m-2 bg-white"
                key={chapter.id}
              >
                <Chapter
                  chapter={chapter}
                  fontsize={17}
                  display={"hidden"}
                  justify={"center"}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        <div>
          {isGetChapterImagesSuccess
            ? chapterImages.data.map((chapterImage) => (
                <img
                  key={chapterImage.id}
                  src={`${import.meta.env.VITE_GATEWAY_DOMAIN}/story-api/${
                    chapterImage.path
                  }`}
                  alt="mangatoon"
                />
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default ViewManga;
