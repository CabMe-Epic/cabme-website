import Image from "next/image";

interface buttonProps {
  text?: string;
  onClick?: any;
  className?: string;
  image?: string;
  editIcon?: boolean;
}
const ThemeButton = ({
  text,
  onClick,
  className,
  image,
  editIcon,
}: buttonProps) => {
  return (
    <>
      <button
        className={`bg-red-500 text-white rounded-md px-6 py-[6px] font-normal flex items-center justify-center ${className}`}
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
      </button>
    </>
  );
};
export default ThemeButton;
