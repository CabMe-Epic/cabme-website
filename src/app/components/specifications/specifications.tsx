import Image from "next/image";

const IconComponent = ({ title, subtitle, imageSrc }: any) => {
    return (

        <div className="flex flex-row items-center justify-start gap-2 w-full">
            <div className="flex justify-center items-center sm:w-16 sm:h-16 w-8 h-8 border-[1px] border-gray-100 rounded-lg flex-none">
                <Image src={imageSrc} width={30} height={30} alt={title} className="sm:w-[60%] w-[50%]" />
            </div>
            <div className="text-left">
                <div className="text-[14px] font-semibold text-black">{title}</div>
                <div className="text-[10px] text-gray-500">{subtitle}</div>
            </div>
        </div>
    );
};

const Specifications = () => {
    return (
        <div className=" shadow-md p-6 border border-gray-300 rounded-lg">
            <h2 className="text-2xl font-semibold border-b pb-2 mb-5">Specifications</h2>
            <div className="grid sm:grid-cols-4 grid-cols-2 justify-between items-center gap-2  ">
                <div><IconComponent title="Body" subtitle="Sedan" imageSrc="/carDetails/body.png" /></div>
                <div><IconComponent title="Make" subtitle="Nissan" imageSrc="/carDetails/make.png" /></div>
                <div><IconComponent title="Transmission" subtitle="Automatic" imageSrc="/carDetails/transmission.png" /></div>
                <div><IconComponent title="VIN" subtitle="64674773" imageSrc="/carDetails/vin.png" /></div>
                <div><IconComponent title="Year" subtitle="2018" imageSrc="/carDetails/year.png" /></div>
                <div><IconComponent title="Mieage" subtitle="16km" imageSrc="/carDetails/mileage.png" /></div>
                <div><IconComponent title="Fuel Type" subtitle="Diesel" imageSrc="/carDetails/fuel.png" /></div>
                <div><IconComponent title="Engine(HP)" subtitle="3,000" imageSrc="/carDetails/engine.png" /></div>
                <div><IconComponent title="Door" subtitle="4 Doors" imageSrc="/carDetails/door.png" /></div>
                <div><IconComponent title="Brake" subtitle="ABS" imageSrc="/carDetails/brake.png" /></div>
                <div><IconComponent title="Drivetrain" subtitle="Front Wheel" imageSrc="/carDetails/drive.png" /></div>
                <div><IconComponent title="AC" subtitle="Air Condition" imageSrc="/carDetails/ac.png" /></div>
            </div>
        </div>
    );
};

export default Specifications;
export { IconComponent };
