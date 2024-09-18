"use client";
import Image from "next/image";
import Link from "next/link";
import ThemeButton from "../../theme-button/theme-button";
import { useParams, usePathname, useRouter } from "next/navigation";
import { useState } from "react";

const Header = () => {
  const [mobileMenu, setMobileMenu] = useState(false);
  const router = useRouter();
  const toggleMenu = (item: string, e: any) => {
    e.preventDefault();
    item === "About Us"
      ? router.push("/about-us")
      : item === "Contact Us"
      ? router.push("/contact-us")
      : item === "Our Blogs"
      ? router.push("https://marketing.cabme.in/")
      : "";
  };
  const url = usePathname();

  console.log(url, "url");
  return (
    <>
      <div className="flex justify-between sm:py-4 py-4 sm:px-4 lg:px-8 px-4 items-center shadow-xl sticky top-0 z-[99999] bg-white">
        <div className="cursor-pointer sm:w-[12%] w-[30%]">
          <Image
            src={"/logo.svg"}
            alt="logo"
            width={170}
            height={47}
            className="sm:w-full w-[130px]"
            onClick={() => router.push("/")}
          />
        </div>
        {url === "/check-out" ? (
          <div className="flex items-center gap-2">
            <Image src={"/svg/lock.svg"} alt="lock" width={16} height={22} />
            <span className="font-semibold">Secure Checkout</span>
          </div>
        ) : (
          <ul className="sm:flex hidden gap-8">
            {headerMenu?.map((item, index) => {
              return (
                <li
                  key={index}
                  className="cursor-pointer lg:text-md text-sm"
                  onClick={(e) => toggleMenu(item?.menu, e)}
                >
                  {item?.menu}
                </li>
              );
            })}
          </ul>
        )}
        <div className="sm:flex hidden items-center gap-2">
          <Image src={"/svg/phone-red.svg"} alt="phone" width={12} height={12} />
          <Link href={"tel:18001216162"}>
            {" "}
            <span className="font-semibold text-sm"> 1800 121 6162 </span>
          </Link>
          {/* <ThemeButton text="Sign In" /> */}
        </div>
        {url==="/check-out" ? "" :
         <div
         className="sm:hidden block"
         onClick={() => setMobileMenu(!mobileMenu)}
       >
         <Image
           src={mobileMenu === true ? "/svg/close-red.svg" : "/svg/nav.svg"}
           alt="nav"
           width={26}
           height={26}
         />
         {mobileMenu && (
           <div className="fixed top-14 right-0 z-[99]">
             <div className=" z-[10] right-0 bg-white w-[200px] px-4 pb-4 h-[100vh] border-b">
              {headerMenu?.map((value,index)=>{
                return(
                  <p key={index} className="text-sm mb-4" onClick={(e)=>toggleMenu(value?.menu, e)}>{value?.menu}</p>

                )
              })}
               
             </div>
           </div>
         )}
       </div>
        }
       
      </div>
    </>
  );
};
export default Header;
const headerMenu = [
  {
    menu: "About Us",
  },
  {
    menu: "Contact Us",
  },
  {
    menu: "Our Blogs",
  },
  // {
  //     menu:"Listing"
  // }
];
