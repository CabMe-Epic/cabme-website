"use client"
import React, {useState} from 'react'
import 'react-phone-input-2/lib/style.css';
import PhoneInput from 'react-phone-input-2';
const CountryInput = () => {
    const [phone, setPhone] = useState('');

  return (
    <div>
       <PhoneInput
                country={'in'}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                containerStyle={{ width: '494px' , height:'58px',  borderRadius: '8px',border: 0,  background: "#FCFBFB"}}
                inputStyle={{ width: '100%' ,height:'58px', paddingLeft: 50, borderRadius: '8px',  background: "#FCFBFB" }}
                buttonStyle={{border: 0,borderRadius: '8px', width: "50px",padding: "10px",background:"transparent" }}
                dropdownStyle={{borderRadius: '8px', border: 0}}
                searchStyle={{borderRadius: '8px'}}
            />
    </div>
  )
}
export default CountryInput;