interface buttonProps {
  text?: string;
  onClick?: any;
  className?:string
}
const ThemeButton = ({ text, onClick, className }: buttonProps) => {
  return (
    
      <button className={`bg-red-500 text-white rounded-md px-6 py-[6px] font-normal ${className}`} onClick={onClick}>{text}</button>
    
  );
};
export default ThemeButton;
