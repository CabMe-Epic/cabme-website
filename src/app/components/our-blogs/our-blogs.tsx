import axios from "axios";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const OurBlogs = () => {
  const [contentData, setContentData] = React.useState<any>([]);
  const [leftPostIndex, setLeftPostIndex] = React.useState(0); // Left side index
  const [rightPostIndex, setRightPostIndex] = React.useState(1); // Right side index

  const getContentData = async () => {
    try {
      const result = await axios.get(
        "https://marketing.cabme.in/wp-json/wp/v2/posts"
      );
      setContentData(result.data);
    } catch (error) {
      console.log("Error fetching posts", error);
    }
  };

  React.useEffect(() => {
    getContentData();
  }, []);

  const handleNextLeft = () => {
    if (leftPostIndex < contentData.length - 1) {
      setLeftPostIndex(leftPostIndex + 1);
    }
  };

  const handlePrevLeft = () => {
    if (leftPostIndex > 0) {
      setLeftPostIndex(leftPostIndex - 1);
    }
  };

  const handleNextRight = () => {
    if (rightPostIndex < contentData.length - 1) {
      setRightPostIndex(rightPostIndex + 1);
    }
  };

  const handlePrevRight = () => {
    if (rightPostIndex > 0) {
      setRightPostIndex(rightPostIndex - 1);
    }
  };

  if (contentData.length === 0) {
    return <div>Loading...</div>;
  }

  const leftPost = contentData[leftPostIndex];
  const rightPost = contentData[rightPostIndex];

  return (
    <>
      {/* desktop view */}
      <div className="grid grid-cols-2 relative sm:grid hidden pb-10">
        {/* Left Section (Left Post) */}
        <div
          className="bg-[url('/png/blog-left.png')] bg-contain bg-no-repeat text-white lg:py-12 lg:px-12 px-2 py-8"
          style={{ backgroundSize: "100% 100%" }}
        >
          <div>
            <div className="xl:max-w-[375px] max-w-[195px] relative  left-[5%]">
              <div className="lg:text-sm text-[10px]">
                <span>{moment(leftPost?.date).format("DD-MMM-YYYY")}</span> /
                <span> BY JOSEPH KANE</span>
              </div>
              <h3 className="lg:text-2xl text-sm lg:font-semibold font-[450] mt-2 lg:mb-4 mb-2">
                {leftPost?.title?.rendered.slice(0, 30)}
              </h3>
              <p
                className="lg:mb-4 lg:text-[14px] text-[10px]"
                dangerouslySetInnerHTML={{
                  __html: leftPost?.excerpt?.rendered?.slice(0, 100),
                }}
              ></p>
              <Link href={"https://marketing.cabme.in/"}>
                <span className="text-primary lg:text-md text-xs">
                  READ ARTICLE
                </span>
              </Link>
              <div className="flex justify-between lg:mt-4 mt-2">
                <button
                  onClick={handlePrevLeft}
                  className="flex items-center gap-2"
                  disabled={leftPostIndex === 0}
                >
                  <Image
                    src={"/png/left-arrow.png"}
                    alt="arrow"
                    width={8}
                    height={8}
                    className="lg:w-full w-[7px] h-auto"
                  />
                  <span className="lg:text-[14px] text-xs">Prev</span>
                </button>
                <button
                  onClick={handleNextLeft}
                  className="flex items-center gap-1"
                  disabled={leftPostIndex === contentData.length - 1}
                >
                  <span className="lg:text-[14px] text-xs">Next</span>
                  <Image
                    src={"/png/right-arrow.png"}
                    alt="arrow"
                    width={24}
                    height={24}
                    className="lg:h-[26px] h-auto lg:w-auto w-[18px] mt-1"
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section (Right Post) */}
        <div
          className="bg-[url('/png/blog-right.png')] !text-right bg-contain bg-no-repeat text-white lg:py-12 lg:px-12 py-8 px-2 flex justify-end"
          style={{ backgroundSize: "100% 100%" }}
        >
          <div className="xl:max-w-[375px] max-w-[195px] relative right-[5%]">
            <div className="lg:text-sm text-[10px]">
              <span>{moment(rightPost?.date).format("DD-MMM-YYYY")}</span> /
              <span> BY JOSEPH KANE</span>
            </div>
            <h3 className="lg:text-2xl text-sm lg:font-semibold font-[450] mt-2 lg:mb-4 mb-2">
              {rightPost?.title?.rendered.slice(0, 30)}
            </h3>
            <p
              className="xl:mb-4 xl:text-[14px] text-[10px]"
              dangerouslySetInnerHTML={{
                __html: rightPost?.excerpt?.rendered?.slice(0, 100),
              }}
            ></p>
            <Link href={"https://marketing.cabme.in/"}>
              <span className="text-primary lg:text-md text-xs">
                READ ARTICLE
              </span>
            </Link>
            <div className="flex justify-between lg:mt-4 mt-2">
              <button
                onClick={handlePrevRight}
                className="flex items-center gap-2"
                disabled={rightPostIndex === 0}
              >
                <Image
                  src={"/png/left-arrow.png"}
                  alt="arrow"
                  width={8}
                  height={8}
                  className="lg:w-full w-[7px] h-auto"
                />
                <span className="lg:text-[14px] text-xs">Prev</span>
              </button>
              <button
                onClick={handleNextRight}
                className="flex items-center gap-1"
                disabled={rightPostIndex === contentData.length - 1}
              >
                <span className="lg:text-[14px] text-xs">Next</span>
                <Image
                  src={"/png/right-arrow.png"}
                  alt="arrow"
                  width={24}
                  height={24}
                  className="lg:h-[26px] h-auto lg:w-auto w-[18px] mt-1"
                />
              </button>
            </div>
          </div>
        </div>

        {/* Middle image */}
        <div className="absolute top-0 left-0 right-0 m-auto flex justify-center z-10 w-[500px] h-[410px]">
          <Image
            src={"/png/blog.png"}
            alt="blog"
            width={570}
            height={350}
            className="w-[500px] h-[410px] object-contain xl:block hidden"
          />
        </div>

        {/* Mobile view */}
        <Image
          src={"/png/blog-tab.png"}
          alt="blog"
          width={270}
          height={208}
          className="h-[108%] w-auto absolute top-0 left-0 right-0 m-auto xl:hidden block z-10"
        />
      </div>
    </>
  );
};

export default OurBlogs;
