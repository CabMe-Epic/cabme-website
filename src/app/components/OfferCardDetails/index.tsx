"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { fetchPromoCodesForWeb } from "../../../../networkRequests/hooks/promocodes";
import { useSelector } from "react-redux";

interface offerProp {
  dailyOffer?: boolean;
  monthlyOffer?: boolean;
  banners?: any;
  isDetails?: boolean;
  getCode?: any;
}

const OfferCardsDetails = ({
  dailyOffer,
  monthlyOffer,
  banners,
  isDetails,
  getCode,
}: offerProp) => {
  const [pickupDate, setPickupDate] = useState<any>();
  const [dropoffDate, setDropoffDate] = useState<any>();
  const [pickupTime, setPickupTime] = useState<any>();
  const [dropoffTime, setDropoffTime] = useState<any>();
  const [duration, setDuration] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);
  const [promoCodesWeb, setPromoCodesWeb] = useState<any>([]);
  const [bookingDays, setBookingDays] = useState<{
    [key: string]: number | null;
  }>({});
  const [days, setDays] = useState();

  const pickupDateRedux = useSelector((state: any) => state.location.pickupDate);
  const dropOffDateRedux = useSelector((state: any) => state.location.dropOffDate);
  const pickupTimeRedux = useSelector((state: any) => state.location.pickupTime);
  const dropoffTimeRedux = useSelector((state: any) => state.location.dropoffTime);
  const tabValueRedux = useSelector((state: any) => state.location.tabValue);
  const radioToggleRedux = useSelector((state: any) => state.location.radioToggle);

  useEffect(() => {
    setPickupDate(pickupDateRedux);
    setDropoffDate(dropOffDateRedux);
    setPickupTime(pickupTimeRedux);
    setDropoffTime(dropoffTimeRedux);

    const pickupDateTime: any = new Date(
      `${pickupDate?.split("-").join("-")}T${pickupTime}:00`
    );
    const droppingDateTime: any = new Date(
      `${dropoffDate?.split("-").join("-")}T${dropoffTime}:00`
    );
    const diffInMs = Math.abs(droppingDateTime - pickupDateTime);
    const diffInSeconds = Math.floor(diffInMs / 1000);
    const days = Math.floor(diffInSeconds / (3600 * 24));
    const hours = Math.floor((diffInSeconds % (3600 * 24)) / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    setDays(days);
  }, [dropoffDate, dropoffTime, pickupDate, pickupTime]);

  useEffect(() => {
    const handleResize = () => {
      setIsTab(window.innerWidth < 1250);
      setIsMobile(window.innerWidth < 800);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const copyToClipboard = (couponCode: string) => {
    if (couponCode) {
      navigator.clipboard
        .writeText(couponCode)
        .then(() => {
          getCode(couponCode);
        })
        .catch((err) => {
          console.error("Failed to copy: ", err);
        });
    }
  };

  const getPromoCodesNew = async () => {
    try {
      const data = await fetchPromoCodesForWeb();
      setPromoCodesWeb(data?.filteredPromocodes || []);
    } catch (error) {
      console.log({ error });
    }
  };

  useEffect(() => {
    getPromoCodesNew();
  }, []);

  useEffect(() => {
    if (promoCodesWeb && banners) {
      console.log(promoCodesWeb, "promoCodesWeb");

      const activePromoDays = banners
        .filter((item) => item.daily === true)
        .reduce((acc, item) => {
          const promo = promoCodesWeb.find(
            (promo) => promo.code === item.couponCode
          );
          if (promo && promo.bookingDays) {
            acc[item.couponCode] = promo.bookingDays;
          }
          return acc;
        }, {} as { [key: string]: number });

      console.log(activePromoDays, "activePromoDays");
      setBookingDays(activePromoDays);
    }
  }, [promoCodesWeb, banners]);

  return (
    <div className="my-4">
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 justify-start flex-row gap-6 w-full h-full 
        ${isDetails && "!w-full"} z-0`}
      >
        {Array.isArray(banners) &&
          (banners.length > 0 ? banners : offerCardsArray)
            .filter((item: any) => item.daily === true)
            .map((item: any, index: number) => {
              return (
                <div key={index}>
                  <div
                    className={`sm:w-[320px] w-[340px] sm:h-[150px] h-[170px] m-auto grid grid-cols-2 justify-between gap-0 border rounded-md p-0 bg-[#fff] transition-all cursor-pointer hover:shadow-[0_20px_50px_rgba(128,_128,_128,_0.7)] ${
                      isDetails ? "!w-[320px] !gap-2" : ""
                    } ${index === 3 ? "" : ""}   ${(bookingDays[item.couponCode] > days) && "brightness-50 hover:shadow-none"} `}
                  >
                    <div className="flex flex-col h-full justify-between bg-white rounded-md">
                      <div className="sm:px-2 sm:py-0 px-2 py-[7px] pt-0">
                        <h3 className="font-bold sm:text-5xl text-3xl sm:mb-2">
                          {item?.percent}{" "}
                          <span className="font-normal text-[22px]">
                            {item?.off}
                          </span>
                        </h3>
                        <div className="text-[12px] font-normal h-fit">
                          {item?.termsCondition}
                        </div>
                        <p className="text-[8px]">{item?.description}</p>
                      </div>
                      <div
                        onClick={() => copyToClipboard(item?.couponCode)}
                        className="bg-primary-color flex-row gap-2 cursor-pointer text-white h-[30px] sm:mt-1 text-center flex justify-center items-center rounded-bl-md"
                      >
                        {item?.couponCode}
                      </div>
                    </div>
                    <div className="w-full sm:h-full h-full flex justify-end">
                      <Image
                        src={item?.image?.url}
                        alt={item?.image?.alt}
                        width={140}
                        height={121}
                        className="w-[160px] h-full object-cover rounded-br-md rounded-tr-md"
                      />
                    </div>
                  </div>
                  {console.log(
                    bookingDays[item.couponCode],
                    "bookingDays[item.couponCode]"
                  )}
                  {(bookingDays[item.couponCode] > days) && (
                    <span className="text-[#ff0000] text-sm font-[600] z-[99] whitespace-nowrap mt-2">
                      Book for {bookingDays[item.couponCode]} days to avail this
                      offer
                    </span>
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default OfferCardsDetails;
