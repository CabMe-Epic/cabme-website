import Image from "next/image";
import Link from "next/link";

const OurBlogs = () => {
  return (
    <>
       {/* desktop view */}
      <div className="grid grid-cols-2 relative sm:grid hidden">
        <div
          className="bg-[url('/png/blog-left.png')] bg-contain bg-no-repeat text-white p-12"
          style={{ backgroundSize: "100% 100%" }}
        >
          <div className="max-w-[375px] relative left-[10%]">
            <div className="text-sm">
              <span>APRIL 25, 2020 </span>/<span> BY JOSEPH KANE</span>
            </div>
            <h3 className="text-2xl font-semibold mt-2 mb-4">
              The Best Fastest & Most Powerful Road Car
            </h3>
            <p className="mb-4">
              Created firmament hath first very. Very doesn&apos;t face meat
              rule life wherein him above beast also lesser very abundantly...
            </p>
            <Link href={"#"}>
              {" "}
              <span className="text-red-500"> READ ARTICLE</span>
            </Link>
            <div className="flex justify-between mt-4">
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
        <div
          className="bg-[url('/png/blog-right.png')] bg-contain bg-no-repeat text-white p-12 flex justify-end"
          style={{ backgroundSize: "100% 100%" }}
        >
          <div className="max-w-[375px] relative right-[10%]">
            <div className="text-sm">
              <span>APRIL 25, 2020 </span>/<span> BY JOSEPH KANE</span>
            </div>
            <h3 className="text-2xl font-semibold mt-2 mb-4">
              The Best Fastest & Most Powerful Road Car
            </h3>
            <p className="mb-4">
              Created firmament hath first very. Very doesn&apos;t face meat
              rule life wherein him above beast also lesser very abundantly...
            </p>
            <Link href={"#"}>
              {" "}
              <span className="text-red-500"> READ ARTICLE</span>
            </Link>
            <div className="flex justify-between mt-4">
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
        <Image
          src={"/png/blog.png"}
          alt="blog"
          width={570}
          height={350}
          className="h-[400px] absolute top-0 left-0 right-0 m-auto"
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
              <span className="text-red-500 text-xs"> READ ARTICLE</span>
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
