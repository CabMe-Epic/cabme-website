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

const Specifications = ({spec}: any) => {
    return (
        <div className="sm:max-w-[600px] lg:max-w-full m-auto shadow-md p-6 border border-gray-300 rounded-lg">
            <h2 className="sm:text-2xl text-xl font-semibold border-b pb-2 mb-5">Specifications</h2>
            <div className="grid lg:grid-cols-4 sm:grid-cols-3 grid-cols-2 justify-between items-center gap-2  ">
                <div><IconComponent title="Body" subtitle={spec?.body} imageSrc="/carDetails/body.png" /></div>
                <div><IconComponent title="Make" subtitle={spec?.make} imageSrc="/carDetails/make.png" /></div>
                <div><IconComponent title="Transmission" subtitle={spec?.transmission} imageSrc="/carDetails/transmission.png" /></div>
                <div><IconComponent title="VIN" subtitle={spec?.vin} imageSrc="/carDetails/vin.png" /></div>
                <div><IconComponent title="Year" subtitle={spec?.year} imageSrc="/carDetails/year.png" /></div>
                <div><IconComponent title="Mileage" subtitle={spec?.mileage} imageSrc="/carDetails/mileage.png" /></div>
                <div><IconComponent title="Fuel Type" subtitle={spec?.fuelType} imageSrc="/carDetails/fuel.png" /></div>
                <div><IconComponent title="Engine(HP)" subtitle={spec?.engine} imageSrc="/carDetails/engine.png" /></div>
                <div><IconComponent title="Door" subtitle={spec?.door} imageSrc="/carDetails/door.png" /></div>
                <div><IconComponent title="Brake" subtitle={spec?.brake} imageSrc="/carDetails/brake.png" /></div>
                <div><IconComponent title="Drivetrain" subtitle={spec?.driveTrain} imageSrc="/carDetails/drive.png" /></div>
                <div><IconComponent title="AC" subtitle={spec?.AC} imageSrc="/carDetails/ac.png" /></div>
            </div>
        </div>
    );
};

export default Specifications;
export { IconComponent };
