import React, { useState } from "react";
import {
  useGetProfileQuery,
  useGetStoriesQuery,
} from "../../features/api/apiSlice";
import { useParams } from "react-router-dom";
import MangaDetailSkeleton from "./PagemangaSkeleton";
import HoverRating from "../../components/rating";
import Author from "./../../components/Detail/Author";
import Genre from "./../../components/Detail/Genre/index";
import Chapter from "../../components/Detail/Chapter";
import ViewCount from "../../components/Detail/ViewCount";
import BtnViewManga from "../../components/BtnViewManga";
import FollowCount from "./../../components/Detail/FollowCount/index";
import BtnPayment from "./../../components/BtnPayment/index";
import { useGetStoryRatingDetailQuery } from "../../features/api/apiSlice";

const MangaDetailPage = () => {
  const { id } = useParams();
  const {
    data: datarating,
    isFetching: isFetchingrating,
    isSuccess: isSuccessrating,
  } = useGetStoryRatingDetailQuery(id);
  const { data: dataProfile, isSuccess: isSuccessprofile } =
    useGetProfileQuery();
  const { data, isFetching, isSuccess } = useGetStoriesQuery({
    page: 1,
    limit: 1,
    id: id,
  });

  const [isExpanded, setIsExpanded] = useState(false);
  const [buttonText, setButtonText] = useState("Xem thêm");

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
    setButtonText(isExpanded ? "Xem thêm" : "Thu gọn");
  };

  if (isFetching && !isSuccessprofile && isFetchingrating) {
    return (
      <div>
        <MangaDetailSkeleton />
      </div>
    );
  }

  return (
    <div className="detail container">
      <h1 className="text-4xl text-blue-500 font-semibold my-2">
        {isSuccess && data?.data.stories[0].title && null}
      </h1>
      <div className="flex">
        <div className="relative w-auto h-[300px]">
          <img
            className="mr-4 w-[200px] h-[300px]"
            src={
              isSuccess
                ? `${import.meta.env.VITE_GATEWAY_DOMAIN}/story-api/${
                    data.data.stories[0].coverImageUrl
                  }`
                : null
            }
            alt=""
          />
          <div
            className="absolute w-[200px] bg-[#8a8080de] text-yellow-400 p-[2px] bottom-0 text-[20px] flex justify-center"
          >
            Free
          </div>
        </div>
        <nav>
          <ul>
            <li className="flex mt-4 ">
              <span className="w-28 flex justify-start items-center ">
                <i className="fa-solid fa-user mr-2"></i>tác giả
              </span>
              <span>
                <div>
                  <Author id={id} />
                </div>
              </span>
            </li>
            <li className="flex mt-4">
              <span className="w-28 flex justify-start items-center ">
                <i className="fa-solid fa-wifi mr-2"></i>tình trạng
              </span>
              {isSuccess
                ? data.data.stories.status === 0
                  ? "Đang cập nhật"
                  : "Hoàn thành"
                : null}
            </li>
            <li className="flex mt-4">
              <span className="w-28 flex justify-start items-center ">
                <i className="fa-solid fa-tags mr-2"> </i>thể loại
              </span>
              <Genre id={id} />
            </li>
            <li className="flex mt-4">
              <span className="w-28 flex justify-start items-center  ">
                <i className="fa-solid fa-eye mr-2"></i> <ViewCount id={id} />
              </span>
            </li>
          </ul>
          {isSuccessrating && (
            <HoverRating id={id} userId={dataProfile.data.id} />
          )}
          <div className="follow-btn flex mt-1">
            {isSuccessprofile && (
              <FollowCount id={id} userId={dataProfile.data.id} />
            )}
          </div>
          <BtnViewManga />
          {/* <BtnPayment /> */}
        </nav>
      </div>
      <div className="content">
        <h2 className="text-blue-600 flex  justify-start text-2xl items-center  border-solis border-b-2 border-gray-500 mx-4">
          {" "}
          <i className="fa-regular fa-file-lines mr-2"></i>Nội Dung
        </h2>
        <div
          className={`overflow-hidden p-4 ${
            isExpanded
              ? "h-full"
              : "before:block before:w-full before:absolute before:bottom-0 before:z-10 before:h-4 before:bg-gradient-to-b before:from-transparent before:to-[#e7e7e7] max-h-[108px]"
          } relative`}
        >
          <div
            dangerouslySetInnerHTML={ data && {
              __html: data.data.stories[0].description,
            }}
          />
        </div>
        <button
          className="text-blue-500 hover:tex-violet-500 flex justify-center w-full mt-2"
          onClick={handleToggle}
        >
          {buttonText}
        </button>
      </div>
      <Chapter id={id} />
    </div>
  );
};

export default MangaDetailPage;
