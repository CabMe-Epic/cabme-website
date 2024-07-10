"use client"
import { link } from "fs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter()
  return (
    <>
    <div className="sm:p-12 p-8 bg-[#FBFDFF] sm:grid grid-cols-[1fr_2fr] gap-8">
      <div className="max-w-[330px] m-auto sm:text-left text-center">
        <Image src={"/logo.svg"} alt="logo" width={178} height={48} className="sm:m-0 m-auto sm:w-[50%] w-[50%]" />
        <p className="mt-6">
          We are India&apos;s leading Car Rental Company with an innovative way of
          servicing the requirements{" "}
        </p>
        <div className="flex gap-6 my-6 sm:justify-start justify-center">
          <Image
            src={"/svg/twitter.svg"}
            alt="twitter"
            width={24}
            height={24}
          />
          <Image
            src={"/svg/linkedIn.svg"}
            alt="linkedIn"
            width={24}
            height={24}
          />
          <Image
            src={"/svg/facebook.svg"}
            alt="facebook"
            width={24}
            height={24}
          />
          <Image
            src={"/svg/youtube.svg"}
            alt="youtube"
            width={24}
            height={24}
          />
        </div>
        <div className="sm:flex gap-4 hidden">
          <Image
            src={"/png/play-store.png"}
            alt="play-store"
            width={97}
            height={39}
          />
          <Image
            src={"/png/apple.png"}
            alt="play-store"
            width={97}
            height={39}
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-[1fr_1fr_1.2fr] grid-cols-2 sm:gap-0 gap-4 sm:mt-4 mt-12">
        {footerCollection?.map((item, index) => {
          return (
            <div key={index}>
              <h3 className="font-bold text-md mb-6">{item?.footerHead}</h3>
              <ul>
                {item?.links?.map((value, ind) => {
                  return (
                    <li
                      className="text-sm mb-4 flex items-center gap-2"
                      key={ind}
                    >
                      <Image
                        src={"/png/right.png"}
                        alt="right"
                        width={7}
                        height={8}
                        className="w-[7px] h-[8px]"
                      />
                      <Link href={"#"}>{value?.link}</Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          );
        })}
        <div className="sm:w-full sm:text-left text-center w-[80vw]">
          <h3 className="font-bold text-md mb-6">Reach Us</h3>
          <ul className="grid gap-4">
            <li className="flex gap-2 justify-center">
              <div className="w-[18px] h-[18px] flex-none" style={{width:"18px !important"}}>
                <Image
                  src={"/png/locate.png"}
                  alt="location"
                  width={16}
                  height={16}
                  className=""
                />
              </div>
              <p className="text-sm">
                1/3 Army Welfare Housing Organization Pocket-B Sector-2,
                Vidyadhar Nagar, Jaipur-302039
              </p>
            </li>
            <li className="flex gap-2 sm:justify-start justify-center items-center">
              <div className="h-fit">
                <Image
                  src={"/png/mail.png"}
                  alt="mail"
                  width={18}
                  height={18}
                />
              </div>
              <Link href={"mailto:support@cabme.in"} className="text-sm">support@cabme.in</Link>
            </li>
            <li className="flex gap-2 sm:justify-start justify-center">
              <Image src={"/png/call.png"} alt="call" width={18} height={18} />
              <div className="flex gap-2 text-sm">
                <Link href={"tel:18001216162"}>
                  <span className="text-sm">1800 121 6162 ,</span>{" "}
                </Link>
                <Link href={"tel:7240004072"}>
                  <span className="text-sm">7240004072</span>
                </Link>
              </div>
            </li>
          </ul>
          <div className="flex gap-4 sm:hidden block justify-center mt-8">
          <Image
            src={"/png/play-store.png"}
            alt="play-store"
            width={97}
            height={39}
          />
          <Image
            src={"/png/apple.png"}
            alt="play-store"
            width={97}
            height={39}
          />
        </div>
        </div>
      </div>
    </div>
    <p className="p-4 bg-primary-color text-white font-semibold text-center sm:text-md text-xs">Copyright,  Cabme 2024. All Right Reserved.</p>
    </>
  );
};
export default Footer;
const footerCollection = [
  {
    footerHead: "Important Links",
    links: [
      {
        link: "FAQs",
      },
      {
        link: "Terms & Conditions",
      },
      {
        link: "Privacy Policy",
      },
      {
        link: "Privacy Policy",
      },
    ],
  },
  {
    footerHead: "Helpful Links",
    links: [
      {
        link: "Rentals",
      },
      {
        link: "About",
      },
      {
        link: "Contact",
      },
      {
        link: "Blogs",
      },
      {
        link: "Deals",
      },
    ],
  },
];





