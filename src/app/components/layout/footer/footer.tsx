"use client";
import { link } from "fs";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Footer = () => {
  const router = useRouter();


  const handleClick = (value: any, e: any) => {

    if (value === "About") {
      router.push("/about-us")
    }
    if (value === "Contact") {
      router.push("/contact-us")
    }
    if (value === "Blogs") {
      router.push("https://marketing.cabme.in/")
    }
    if (value === "Customer Login") {
      router.push("https://admin.cabme.in/auth/customer-login")
    }
    if(value === "Terms & Conditions"){
      router.push("/terms-and-conditions")
    }
    if(value === "Privacy Policy"){
      router.push("/privacy-policy")
    }
    if(value === "Refund Policy"){
      router.push("/refund-policy")
    }
    if(value === "Shipping Policy"){
      router.push("/shipping-policy")
    }
    {value=== "FAQs" && router.push("/faq")}
  }
const url = usePathname();
// console.log(url, "footer");
  return (
    <>
    {url==="/check-out" ? 
    
    ""

    : 
      <div className="sm:p-12 p-8 bg-[#FBFDFF] sm:grid grid-cols-[1fr_2fr] gap-8">
      <div className="max-w-[330px] m-auto sm:text-left text-center">
        <Image
          src={"/logo.svg"}
          alt="logo"
          width={178}
          height={48}
          className="sm:m-0 m-auto sm:w-[50%] w-[50%]"
        />
        <p className="mt-6">
          We are India&apos;s leading Car Rental Company with an innovative
          way of servicing the requirements{" "}
        </p>
        <div className="flex gap-6 my-6 sm:justify-start justify-center">
          <Image
            src={"/svg/twitter.svg"}
            alt="twitter"
            width={24}
            height={24}
            onClick={() => window.open("https://x.com/cabmeindia", "_blank")}
            className="cursor-pointer"
          />
          <Image
            src={"/svg/linkedIn.svg"}
            alt="linkedIn"
            width={24}
            height={24}
            onClick={() =>
              window.open(
                "https://www.linkedin.com/company/cabmeindia/?originalSubdomain=in",
                "_blank"
              )
            }
            className="cursor-pointer"
          />
          <Image
            src={"/svg/facebook.svg"}
            alt="facebook"
            width={24}
            height={24}
            onClick={() =>
              window.open(
                "https://www.facebook.com/cabmeindia/?_rdr",
                "_blank"
              )
            }
            className="cursor-pointer"
          />
          <Image
            src={"/svg/youtube.svg"}
            alt="youtube"
            width={24}
            height={24}
            onClick={() =>
              window.open("https://www.youtube.com/@cabmeindia4053", "_blank")
            }
            className="cursor-pointer"
          />
        </div>
        <div className="sm:flex gap-4 hidden">
          <Image
            src={"/png/play-store.png"}
            alt="play-store"
            onClick={() =>
              window.open(
                "https://play.google.com/store/apps/details?id=com.cabme.in&hl=en_IN",
                "_blank"
              )
            }
            width={97}
            height={39}
            className="cursor-pointer"
          />
          <Image
            src={"/png/apple.png"}
            alt="play-store"
            width={97}
            height={39}
            className="cursor-pointer"
            onClick={() =>
              window.open(
                "https://apps.apple.com/in/app/cabme-self-drive-car-rentals/id1670293597",
                "_blank"
              )
            }
          />
        </div>
      </div>
      <div className="grid sm:grid-cols-[1fr_1fr_1.2fr] grid-cols-2 sm:gap-0 gap-4 sm:mt-4 mt-12">
        {footerCollection?.map((item: any, index: number) => {
          return (
            <div key={index}>
              <h3 className="font-bold text-md mb-6">{item?.footerHead}</h3>
              <ul>
                {item?.links?.map((value: any, ind: number) => {
                  return (
                    <li
                      className="text-sm mb-4 flex items-center gap-2 cursor-pointer"
                      key={ind}
                      onClick={(e) => handleClick(value?.link, e)}
                    >
                      <Image
                        src={"/png/right.png"}
                        alt="right"
                        width={7}
                        height={8}
                        className="w-[7px] h-[8px]"
                      />

                      {value?.link}
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
              <div
                className="w-[18px] h-[18px] flex-none"
                style={{ width: "18px !important" }}
              >
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
              <Link href={"mailto:support@cabme.in"} className="text-sm">
                support@cabme.in
              </Link>
            </li>
            <li className="flex gap-2 sm:justify-start justify-center">
              <div className="flex-none">
                <Image
                  src={"/png/call.png"}
                  alt="call"
                  width={18}
                  height={18}
                />
              </div>
              <div className="lg:flex gap-2 text-sm">
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
    }


      
      <p className="p-4 bg-primary-color text-white font-semibold text-center sm:text-md text-xs">
        Copyright, Cabme 2024. All Right Reserved.
      </p>
      <div className="fixed z-[999] center bottom-6 left-6 w-12 h-12 bg-black rounded-full flex items-center justify-center">
      <a href="tel:18001216162">
        <Image
          src="/svg/outgoing-call-icon.svg"
          alt="phone"
          width={30}
          height={30}
          className="circle pulse !w-[30px] !h-[30px]"
        />
      </a>
    </div>
    <Link href={"https://wa.link/l86m7r"}>
      <div className="fixed z-[999] center bottom-6 right-6 w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
        <Image
          src={"/svg/whatsapp-white.svg"}
          alt="phone"
          width={30}
          height={30}
          className="circle pulse"
        />
      </div>
      </Link>
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
        href:"#"
      },
      {
        link: "Terms & Conditions",
        href:"#"
      },
      {
        link: "Privacy Policy",
        href:"privacy-policy"
      },
      {
        link: "Refund Policy",
        href:"/refund-policy"
      },
      {
        link:"Shipping Policy",
        href:"/shipping-policy"
      }
    ],
  },
  {
    footerHead: "Helpful Links",
    links: [
      // {
      //   link: "Rentals",
      // },
      {
        link: "About",
        href:"/about-us"

      },
      {
        link: "Contact",

      },
      {
        link: "Blogs",
        href:"#"

      },
      {
        link: "Customer Login",
        href:'https://admin.cabme.in/auth/customer-login'
      }
    ]
  },
];
