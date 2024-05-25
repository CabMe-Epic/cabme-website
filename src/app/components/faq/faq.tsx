"use client";
import Image from "next/image";
import { useState } from "react";

interface faqProp {
  key?: any;
  ques?: string;
  ans?: string;
}
const FaqSection = ({ key, ques, ans }: faqProp) => {
  const [showAns, setAns] = useState<string>("");
  const toggleFaq = (value:any) => {
    showAns ==="" ? setAns(value) : showAns !== value ? setAns(value) : setAns("")
  };
  return (
    <div key={key} className={`border-b py-4`}>
      <h3
        className="font-semibold text-md flex justify-between cursor-pointer mb-2"
        onClick={() => toggleFaq(ques)}
      >
        <span>{ques}</span>
        <span>
           
          <Image
            src={showAns !== "" ? "/svg/Chevron-up.svg" : "/svg/Chevron-down.svg"}
            alt="arrow-down"
            width={18}
            height={18}
          />
        </span>
      </h3>
      {showAns === ques && <p className="text-sm">{ans}</p>}
    </div>
  );
};
export default FaqSection;
