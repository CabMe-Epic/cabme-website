"use client"
import Image from "next/image"
import Link from "next/link"
import ThemeButton from "../../theme-button/theme-button"
import { useRouter } from "next/navigation"

const Header = () =>{
    const router = useRouter()
    const toggleMenu = (item:string) =>{
        item==="About Us" ? router.push("/about-us") : item==="Contact Us" ? router.push("/contact-us") :  item==="Listing" ? router.push("/car-listing") : ""
    }
    return(
        <>
        <div className="flex justify-between sm:py-4 py-4 sm:px-4 lg:px-8 px-14 items-center shadow-xl">
            <div className="cursor-pointer sm:w-[12%] w-[30%]">
                <Image src={"/logo.svg"} alt="logo" width={170} height={47} className="sm:w-full w-[130px]"onClick={()=>router.push("/")} />
            </div>
            <ul className="sm:flex hidden gap-8">
                {headerMenu?.map((item,index)=>{
                    return(

                        <li key={index} className="cursor-pointer lg:text-md text-sm" onClick={()=>toggleMenu(item?.menu)}>
                            {item?.menu}
                        </li>
                    )
                })}
            </ul>
            <div className="sm:flex hidden items-center gap-6">
                <Link href={"tel:+18001216162"}> <span className="font-semibold text-sm"> +1800 121 6162 </span></Link>
                <ThemeButton text="Sign In" />
            </div>
            <div className="sm:hidden block">
                <Image src={"/svg/nav.svg"} alt="nav" width={26} height={26} />
            </div>
        </div>
        </>
    )
}
export default Header
const headerMenu = [
{
    menu:"About Us"
},
{
    menu:"Contact Us"
},
{
    menu:"Blog"
},
{
    menu:"Listing"
}
]