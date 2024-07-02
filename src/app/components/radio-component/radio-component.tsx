interface radioProps{
    name?:string,
    id?:string,
    content?:string,
    checked?:boolean,
    onClick?:any
}
const RadioButton = ({name,id,content,checked,onClick}:radioProps) => {
  return (
    <div className="flex gap-2" onClick={onClick}>
      <input className="radio-button" type="radio" name={name} id={id} />
      <label htmlFor={id}>{content}</label>
    </div>
  );
};
export default RadioButton;
