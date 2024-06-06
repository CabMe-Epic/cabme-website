import Image from "next/image";

const ContactUs = () => {
  return (
    <div className="py-6">
      <div className="sm:flex hidden px-16 text-[#5F5D5D]">
        <span className="cursor-pointer">Home</span>/
        <span className="cursor-pointer">Contact us</span>
      </div>
      <div className="text-4xl text-center">
        <h2 className="font-semibold text-red-500 mb-2">Contact Us</h2>
        <p>Anytime</p>
      </div>
      <div className="grid grid-cols-4 gap-10 max-w-[1250px] m-auto w-full text-center">
        {contactCollection?.map((item, index) => {
          return (
            <div key={index} className="border rounded-xl px-4 py-6 shadow-xl">
              <div>
                <Image
                  src={item?.imageUrl}
                  alt="image"
                  width={76}
                  height={76}
                  className="m-auto"
                />
              </div>
              <h3 className="text-xl font-semibold mt-4 mb-2">{item?.headline}</h3>
              <p>{item?.value}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
export default ContactUs;
const contactCollection = [
  {
    imageUrl: "/contact/whatsapp.png",
    headline: "WhatsApp Number",
    value: "+91 7240004072",
  },
  {
    imageUrl: "/contact/mail.png",
    headline: "Email Address",
    value: "support@cabme.in",
  },
  {
    imageUrl: "/contact/phone.png",
    headline: "Toll-Free Number",
    value: "1800 121 6162",
  },
  {
    imageUrl: "/contact/support.png",
    headline: "Customer Support",
    value: "24 Hours × 7 Days",
  },
];
