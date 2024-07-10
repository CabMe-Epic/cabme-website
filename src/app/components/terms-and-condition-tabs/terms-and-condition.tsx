const TermsAndConditions = ()=>{
    return(
        <div>
            <ul className="grid grid-cols-4 list-disc gap-8 ml-4">
                {conditionsCollection?.map((item,index)=>{
                    return(

                        <li className="text-xs fontsemibold" key={index}>{item?.content}</li>
                    )
                })}
            </ul>
        </div>
    )
}
export default TermsAndConditions
const conditionsCollection = [
    {
        content:"Minimum permissible age of renting is 21 years"
    },
    {
        content:"DL of the renter should be minimum one year old as on rental start date"
    },
    {
        content:"Few cars may be limited to 80 KMs/hr for your safety"
    },
    {
        content:"Cancellation charges applicable"
    },
]