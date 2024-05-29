import Image from "next/image";

interface buttonProps {
  text?: string;
  onClick?: any;
  className?: string;
  image?: string;
}
const ThemeButton = ({ text, onClick, className, image }: buttonProps) => {
  return (
    <>
      <button
        className={`bg-red-500 text-white rounded-md px-6 py-[6px] font-normal flex items-center ${className}`}
        onClick={onClick}
      >
        {" "}
        <span>{text}</span>
        {image && <Image src={image} alt="image" width={115} height={27} />}
      </button>
    </>
  );
};
export default ThemeButton;
