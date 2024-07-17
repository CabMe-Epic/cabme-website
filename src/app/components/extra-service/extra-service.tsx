const ExtraService = () =>{
    return(
        <div className="bg-[#FBFBFB] py-4 px-6">
            <h3 className="font-semibold text-2xl pb-2 border-b">Extra Service</h3>
            <div className="grid grid-cols-2 gap-8 mt-6">
                <div className="w-full flex justify-between">
                    <span>Extra Service</span>
                    <span className="text-primary">300 kms/day</span>
                </div>
                <div className="w-full flex justify-between">
                    <span>Insurance</span>
                    <span className="text-primary">Included</span>
                </div>
                <div className="w-full flex justify-between">
                    <span>Free kms for rental</span>
                    <span className="text-primary">900kms</span>
                </div>
                <div className="w-full flex justify-between">
                    <span>Road Side Assistance</span>
                    <span className="text-primary">Included</span>
                </div>
                <div className="w-full flex justify-between">
                    <span>Extra km charges at</span>
                    <span className="text-primary">9/km</span>
                </div>
                <div className="w-full flex justify-between">
                    <span>Baby Seat</span>
                    <span className="text-primary">₹350/-</span>
                </div>
            </div>
        </div>
    )
}
export default ExtraService