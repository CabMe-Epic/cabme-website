import Image from "next/image";

interface buttonProps {
  text?: string;
  onClick?: any;
  className?: string;
  image?: string;
  editIcon?: boolean;
  rightArrowIcon?:boolean
}
const ThemeButton = ({
  text,
  onClick,
  className,
  image,
  editIcon,
  rightArrowIcon
}: buttonProps) => {
  return (
    <>
      <button
        className={`bg-[#FF0000] text-white rounded-md px-6 py-[6px] font-normal flex items-center justify-center ${className}`}
        onClick={onClick}
      >
        {" "}
        <span>{text}</span>
        {image && <Image src={image} alt="image" width={115} height={27} />}
        {editIcon && (
          <Image
            src={"/svg/edit.svg"}
            alt="edit"
            width={12}
            height={12}
            className="ml-[4px]"
          />
        )}
        {rightArrowIcon && (
          <Image
            src={"/gif/right-arr.gif"} 
            alt="edit"
            width={26}
            height={26}
            className="ml-[4px]"
          />
        )}
      </button>
    </>
  );
};
export default ThemeButton;
