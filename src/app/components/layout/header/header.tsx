import Image from "next/image"
import Link from "next/link"
import ThemeButton from "../../theme-button/theme-button"

const Header = () =>{
    return(
        <>
        <div className="flex justify-between py-8 px-14 items-center shadow-xl">
            <div className="cursor-pointer">
                <Image src={"/logo.svg"} alt="logo" width={170} height={47} />
            </div>
            <ul className="flex gap-8">
                {headerMenu?.map((item,index)=>{
                    return(

                        <li key={index}>
                            <Link href={"#"}>{item?.menu}</Link>
                        </li>
                    )
                })}
            </ul>
            <div className="flex items-center gap-6">
                <Link href={"tel:+18001216162"}> <span className="font-semibold text-sm"> +1800 121 6162 </span></Link>
                <ThemeButton text="Sign In" />
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
    menu:"Faq’s"
}
]