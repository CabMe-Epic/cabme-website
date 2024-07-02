import React from 'react'
import InputField from '@/app/components/input-field/input-field';
import ThemeButton from '@/app/components/theme-button/theme-button';
import CountryInput from '@/app/components/country-input/country-Input';

function extra() {
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 sm:gap-0 gap-0 mt-10 m-auto sm:m-[10px]'>
                    <section className="mx-auto">
                        <div className='my-6 w-[390px] h-[415px] sm:h-[500px] sm:w-[550px] p-10 border flex flex-col items-center justify-center gap-10 rounded-lg shadow-md'>
                            <div className=''>
                                <h1 className="text-[36px] font-bold">SIGN IN</h1>
                            </div>
                            <div className="w-[300px] sm:w-[494px] sm:h-[68px]">
                                {/* <InputField type="text" placeholder="Enter Phone Number" /> */}
                                <CountryInput />
                            </div>
                            <div className="w-[300px] sm:w-[494px] sm:h-[68px] ">
                                <InputField type="text" placeholder="Enter 4 Digit OTP" />
                            </div>
                            <div>
                                <ThemeButton text="Sign In" className='w-[221px] h-[55px] flex flex-row justify-center items-center font-semibold !drop-shadow-md !rounded-full !text-center bg-gradient-to-b text-[24px] from-[#F1301E] to-[#FA4F2F]' />
                            </div>

                        </div>
                    </section>
                    </div>
    </div>
  )
}

export default extra
