"use client"

import { calculateCarRent, generateCarImageUrl } from '@/utils';
import Image from 'next/image';
import { type } from 'os';
import React, { useState } from 'react'
import { CarDetails, CustomButton } from '.';

export type CarProps = {
    city_mpg: number;
    class: string;
    combination_mpg: number;
    cylinders: number;
    displacement: number;
    drive: string;
    fuel_type: string;
    highway_mpg: number;
    make: string;
    model: string;
    transmission: string;
    year: number;
}
interface CarCardProps {
    car: CarProps;
}

function CarCard({ car }: CarCardProps) {
    const { city_mpg, year, make, model, transmission, drive } = car;
    const [isOpen, setIsOpen] = useState(false);

    const carRent = calculateCarRent(city_mpg, year);
    return (
        <div className='car-card group'>
            <div className='car-card__content'>
                {make} {model}
            </div>
            <p className='flex mt-6 text-[32px] font-extrabold'>
                <span className='self-start text-[14px] font-semibold'>
                    $
                </span>
                {carRent}
                <span className='self-end text-[14px] font-medium'>
                    /day
                </span>
            </p>
            <div className='relative w-full h-40 my-3 object-contain'>
                <Image src={generateCarImageUrl(car)} alt='car model' fill priority className="object-contain" />
            </div>
            <div className='relative flex w-full mt-2'>
                <div className='flex group-hover:invisible w-full justify-between text-grey'>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src='/steering-wheel.svg' width={20} height={20} alt={'steering wheel'} />
                        <p className='text-[14px]'>
                            {transmission === 'a' ? 'Automatic' : 'Manual'}
                        </p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src='/tire.svg' width={20} height={20} alt={'tire'} />
                        <p className='text-[14px]'>
                            {drive.toUpperCase()}
                        </p>
                    </div>
                    <div className='flex flex-col justify-center items-center gap-2'>
                        <Image src='/gas.svg' width={20} height={20} alt={'gas'} />
                        <p className='text-[14px]'>
                            {city_mpg} MPG
                        </p>
                    </div>
                </div>
                <div className="car-card__btn-container">
                    <CustomButton
                        title='View More'
                        containerStyles='w-full py-[16px] rounded-full bg-primary-blue'
                        textStyles='text-white text-[14px] leading-[17px] font-bold'
                        rightIcon='/right-arrow.svg'
                        handleClick={() => setIsOpen(true)}
                    />
                </div>
                <CarDetails isOpen={isOpen} closeModal={() =>
                    setIsOpen(false)} car={car} />
            </div>

        </div>
    )
}

export default CarCard