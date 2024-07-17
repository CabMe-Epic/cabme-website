const UserDetails = () =>{
    return(
        <div className="bg-[#FBFBFB] py-4 px-6">
            <h3 className="text-2xl font-semibold">Personal Details</h3>
            <div className="mt-4">
                <div className="grid grid-cols-[1fr_5fr] my-2 gap-2 text-sm text-[#676464]">
                    <p>Name:</p>
                    <p>Abhishek Kumar</p>
                </div>
                <div className="grid grid-cols-[1fr_5fr] my-2 gap-2 text-sm text-[#676464]">
                    <p>Email Address:</p>
                    <p>Abhishek Kumar21@gmail.com</p>
                </div>
                <div className="grid grid-cols-[1fr_5fr] my-2 gap-2 text-sm text-[#676464]">
                    <p>Mobile Number:</p>
                    <p>987674859</p>
                </div>
                <div className="grid grid-cols-[1fr_5fr] my-2 gap-2 text-sm text-[#676464]">
                    <p>Address:</p>
                    <p>B-21,Plot no -115,Street4 near Bansal Hospital Noida,201031</p>
                </div>
                <div className="grid grid-cols-[1fr_5fr] my-2 gap-2 text-sm text-[#676464]">
                    <p>City:</p>
                    <p>Noida</p>
                </div>
                <div className="grid grid-cols-[1fr_5fr] my-2 gap-2 text-sm text-[#676464]">
                    <p>State:</p>
                    <p>Uttar Pradesh</p>
                </div>
                <div className="grid grid-cols-[1fr_5fr] my-2 gap-2 text-sm text-[#676464]">
                    <p>Pincode:</p>
                    <p>201301</p>
                </div>
            </div>
        </div>
    )
}
export default UserDetails