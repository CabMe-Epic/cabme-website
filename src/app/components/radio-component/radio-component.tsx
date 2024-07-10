interface radioProps{
    name?:string,
    id?:string,
    content?:string,
    checked?:boolean,
    onClick?:any,
    className?:string,
}
const RadioButton = ({name,id,content,checked,onClick,className}:radioProps) => {
  return (
    <div className="flex gap-2" onClick={onClick}>
      {id==="self" ?
      <input className="radio-button" type="radio" name={name} id={id} checked />
      :
      <input className="radio-button" type="radio" name={name} id={id} />
      }
      <label htmlFor={id} className={className}>{content}</label>
    </div>
  );
};
export default RadioButton;
