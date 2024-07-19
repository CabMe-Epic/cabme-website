import Image from "next/image";
import Link from "next/link";

const OurBlogs = () => {
  return (
    <>
       {/* desktop view */}
      <div className="grid grid-cols-2 relative sm:grid hidden">
        <div
          className="bg-[url('/png/blog-left.png')] bg-contain bg-no-repeat text-white lg:py-12 lg:px-12 px-2 py-8"
          style={{ backgroundSize: "100% 100%" }}
        >
          <div className="xl:max-w-[375px] max-w-[195px] relative left-[10%]">
            <div className="lg:text-sm text-[10px]">
              <span>APRIL 25, 2020 </span>/<span> BY JOSEPH KANE</span>
            </div>
            <h3 className="lg:text-2xl text-sm lg:font-semibold font-[450] mt-2 lg:mb-4 mb-2">
              The Best Fastest & Most Powerful Road Car
            </h3>
            <p className="lg:mb-4 lg:text-[14px] text-[10px]">
              Created firmament hath first very. Very doesn&apos;t face meat
              rule life wherein him above beast also lesser very abundantly...
            </p>
            <Link href={"#"}>
              {" "}
              <span className="text-primary lg:text-md text-xs"> READ ARTICLE</span>
            </Link>
            <div className="flex justify-between lg:mt-4 mt-2">
              <button className="flex items-center gap-2">
                <Image
                  src={"/png/left-arrow.png"}
                  alt="arrow"
                  width={8}
                  height={8}
                  className="lg:w-full w-[7px] h-auto"

                />
                <span className="lg:text-[14px] text-xs">Prev</span>
              </button>
              <button className="flex items-center gap-1">
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
        <div
          className="bg-[url('/png/blog-right.png')] bg-contain bg-no-repeat text-white lg:py-12 lg:px-12 py-8 px-2 flex justify-end"
          style={{ backgroundSize: "100% 100%" }}
        >
          <div className="xl:max-w-[375px] max-w-[195px] relative right-[10%]">
            <div className="lg:text-sm text-[10px]">
              <span>APRIL 25, 2020 </span>/<span> BY JOSEPH KANE</span>
            </div>
            <h3 className="lg:text-2xl text-sm lg:font-semibold font-[450] mt-2 lg:mb-4 mb-2">
              The Best Fastest & Most Powerful Road Car
            </h3>
            <p className="xl:mb-4 xl:text-[14px] text-[10px]">
              Created firmament hath first very. Very doesn&apos;t face meat
              rule life wherein him above beast also lesser very abundantly...
            </p>
            <Link href={"#"}>
              {" "}
              <span className="text-primary lg:text-md text-xs"> READ ARTICLE</span>
            </Link>
            <div className="flex justify-between lg:mt-4 mt-2">
              <button className="flex items-center gap-2">
                <Image
                  src={"/png/left-arrow.png"}
                  alt="arrow"
                  width={8}
                  height={8}
                  className="lg:w-full w-[7px] h-auto"
                />
                <span className="lg:text-[14px] text-xs">Prev</span>
              </button>
              <button className="flex items-center gap-1">
                <span className="lg:text-[14px] text-xs">Next</span>
                <Image
                  src={"/png/right-arrow.png"}
                  alt="arrow"
                  width={24}
                  height={24}
                  className="h-[26px] lg:w-auto w-[18px] h-auto mt-1"
                />
              </button>
            </div>
          </div>
        </div>
        <Image
          src={"/png/blog.png"}
          alt="blog"
          width={570}
          height={350}
          className="h-[400px] absolute top-0 left-0 right-0 m-auto xl:block hidden"
        />
        <Image
          src={"/png/blog-tab.png"}
          alt="blog"
          width={270}
          height={208}
          className="h-[108%] w-auto absolute top-0 left-0 right-0 m-auto xl:hidden block"
        />
      </div>
       {/* mobile view */}
      <div className="sm:hidden block">
        <div className="relative">
          <Image
            src={"/png/our-blog.png"}
            alt="blogs"
            width={600}
            height={400}
            className="w-full h-auto"
          />
          <h2 className="text-white absolute top-[30%] left-8 text-2xl font-semibold">
            Our Blogs
          </h2>
        </div>
        <div className="relative">
          <Image
            src={"/png/our-blog-02.png"}
            alt="blogs"
            width={600}
            height={400}
            className="w-full h-auto z-[9] relative"
          />
          <Image
            src={"/png/our-blog-01.png"}
            alt="blogs"
            width={200}
            height={400}
            className=" h-auto absolute left-0 top-0"
          />

          <div className="max-w-[320px] absolute text-white z-[9] bottom-6 left-[15%]">
            <div className="text-sm">
              <span>APRIL 25, 2020 </span>/<span> BY JOSEPH KANE</span>
            </div>
            <h3 className="text-xl font-semibold mt-2 mb-2">
              The Best Fastest & Most Powerful Road Car
            </h3>
            <p className="mb-2 text-xs">
              Created firmament hath first very. Very doesn&apos;t face meat
              rule life wherein him above beast also lesser very abundantly...
            </p>
            <Link href={"#"}>
              {" "}
              <span className="text-primary text-xs"> READ ARTICLE</span>
            </Link>
            <div className="flex justify-between max-w-[250px]">
              <button className="flex items-center gap-2">
                <Image
                  src={"/png/left-arrow.png"}
                  alt="arrow"
                  width={8}
                  height={8}
                 

                />
                <span>Prev</span>
              </button>
              <button className="flex items-center gap-1">
                <span>Next</span>
                <Image
                  src={"/png/right-arrow.png"}
                  alt="arrow"
                  width={24}
                  height={24}
                  className="h-[26px] mt-1"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default OurBlogs;
