interface RadioProps {
  name?: string;
  id?: string;
  content?: string;
  checked?: boolean;
  onClick?: any;
  className?: string;
}

const RadioButton = ({ name, id, content, checked, onClick, className }: RadioProps) => {
  return (
    <div className="flex gap-2" onClick={onClick} >
      <input
        className="radio-button"
        type="radio"
        name={name}
        id={id}
        checked={checked}
        style={{width:'30px',cursor:"pointer"}}

      />
      <label htmlFor={id}  className={className} style={{cursor:"pointer"}}>{content}</label>
    </div>
  );
};

export default RadioButton;
