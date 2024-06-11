"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { getBreadcrumbs } from '../../utils/breadcrumbs';
import Image from 'next/image';
import CardListingCards from '@/app/components/card-listing-cards/card-listing-cards';

const CarListing = () => {
    const pathname = usePathname();
    const breadcrumbs = getBreadcrumbs(pathname);

    return (
        <div>
            <main className='m-8'>
                {/* breadcrumbs */}
                <div className=" text-[#5F5D5D]" >
                    <nav aria-label="breadcrumb" >
                        <ol className='flex flex-row'>
                            {breadcrumbs.map((breadcrumb: any, index: number) => (
                                <li key={index} >
                                    {"/"}
                                    <Link href={breadcrumb.href}>
                                        {breadcrumb.label}
                                    </Link>
                                </li>
                            ))}
                        </ol>
                    </nav>
                </div>
                {/* breadcrumbs */}
                {/* heading  */}
                <div className="m-auto mt-5 flex justify-center items-center">
                    <h1 className="text-[48px] font-bold text-[#FF0000]">Car Listing</h1>
                </div>
                {/* heading  */}

                {/* filters */}
                <div className="flex my-10 flex-row items-center text-[#5F5D5D]  justify-between">
                    <div>
                        Showing 1-8 of 10 Results
                    </div>
                    {/*  */}
                    <div className="flex flex-row items-center gap-4">
                        <div>Show:</div>
                        <div >
                            <select name="" id="" className='bg-[#fff] border-[#DDD9D9] border-[2px] rounded-md p-3 w-[78px]'>
                                <option value="5">5</option>
                            </select>
                        </div>
                        <div >
                            <select name="" id="" className='bg-[#fff] border-[#DDD9D9] border-[2px] rounded-md p-3 w-[154px]'>
                                <option value="low-to-high">Low to High</option>
                            </select>
                        </div>
                        <div >
                            <select name="" id="" className='bg-[#fff] border-[#DDD9D9] border-[2px] rounded-md p-3 w-[315px]'>
                                <option value="popular">Popular</option>
                            </select>
                        </div>
                    </div>
                    {/*  */}
                    <div className="flex flex-row items-center gap-2">

                        <div className='cursor-pointer'>
                            <Image
                                src="/carListing/filterIconRed.png"
                                width={42}
                                height={42}
                                alt="Filter Icon"
                            />
                        </div>
                        <div className='cursor-pointer'>
                            <Image
                                src="/carListing/filterIconGrey.png"
                                width={42}
                                height={42}
                                alt="Filter Icon"
                            />
                        </div>

                    </div>
                </div>
                {/* filters */}

                <section className="flex flex-row items-start justify-center gap-10 mx-4">
                    <aside className="basis-1 w-[300px] h-full shadow-md p-8 ">
                        <div><h1 className="text-center font-bold">What Are You Looking For</h1></div>
                        <div className="relative flex flex-row items-center !justify-center w-[234px] mt-6" >
                            <input type="text" placeholder="Search" className="w-[234px] h-[45px] rounded-md pl-3  border-[#DDD9D9] border-2 outline-0"  />
                            <Image
                                src="/carListing/search.png"
                                width={20}
                                objectFit={"contain"}
                                height={20}
                                alt="bluetooth"
                                className="absolute right-2 top-3 cursor-pointer"
                            />
                        </div>
                        <hr className='border-[1px] my-4' />

                        <div>
                            <div className='flex flex-row items-center justify-between'>
                            <span className="font-bold">Car Category</span>
                            <Image
                                src="/carListing/blackArrow.svg"
                                width={20}
                                objectFit={"contain"}
                                height={20}
                                alt="bluetooth"
                            />
                            </div>
                            <div className='h-[221px] overflow-auto force-overflow'>
                            <div className="flex flex-row gap-2 my-4">
                                <input type="checkbox" className='accent-[#ff0000] p-2 size-5' checked/>
                                <span className="text-[15px] text-[#555151]">Tesla</span>
                            </div>
                            <div className="flex flex-row gap-2 my-4">
                                <input type="checkbox" className='accent-[#ff0000] p-2 size-5' />
                                <span className="text-[15px] text-[#555151]">Ford</span>
                            </div>
                            <div className="flex flex-row gap-2 my-4">
                                <input type="checkbox" className='accent-[#ff0000] p-2 size-5' />
                                <span className="text-[15px] text-[#555151]">Tata Motors</span>
                            </div>
                            <div className="flex flex-row gap-2 my-4">
                                <input type="checkbox" className='accent-[#ff0000] p-2 size-5' />
                                <span className="text-[15px] text-[#555151]">Audi</span>
                            </div>
                            <div className="flex flex-row gap-2 my-4">
                                <input type="checkbox" className='accent-[#ff0000] p-2 size-5' />
                                <span className="text-[15px] text-[#555151]">Kia</span>
                            </div>
                            <div className="flex flex-row gap-2 my-4">
                                <input type="checkbox" className='accent-[#ff0000] p-2 size-5' />
                                <span className="text-[15px] text-[#555151]">Hyundai</span>
                            </div>
                            <div className="flex flex-row gap-2 my-4">
                                <input type="checkbox" className='accent-[#ff0000] p-2 size-5' checked/>
                                <span className="text-[15px] text-[#555151]">Tesla</span>
                            </div>
                            <div className="flex flex-row gap-2 my-4">
                                <input type="checkbox" className='accent-[#ff0000] p-2 size-5' />
                                <span className="text-[15px] text-[#555151]">Ford</span>
                            </div>
                            <div className="flex flex-row gap-2 my-4">
                                <input type="checkbox" className='accent-[#ff0000] p-2 size-5' />
                                <span className="text-[15px] text-[#555151]">Tata Motors</span>
                            </div>
                            <div className="flex flex-row gap-2 my-4">
                                <input type="checkbox" className='accent-[#ff0000] p-2 size-5' />
                                <span className="text-[15px] text-[#555151]">Audi</span>
                            </div>
                            <div className="flex flex-row gap-2 my-4">
                                <input type="checkbox" className='accent-[#ff0000] p-2 size-5' />
                                <span className="text-[15px] text-[#555151]">Kia</span>
                            </div>
                            <div className="flex flex-row gap-2 my-4">
                                <input type="checkbox" className='accent-[#ff0000] p-2 size-5' />
                                <span className="text-[15px] text-[#555151]">Hyundai</span>
                            </div>
                            </div>
                            <hr className="my-5" />
                        </div>

                    </aside>
                    <div className="basis-2/3">
                        <CardListingCards />
                        <CardListingCards />
                        <CardListingCards />
                        <CardListingCards />
                    </div>
                </section>

            </main>
        </div>
    );
};

export default CarListing;
