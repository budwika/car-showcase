"use client";

import { CarCard, CustomButton, CustomeFilter, Hero, SearchBar } from '@/components'
import { fetchCars } from '@/utils';
import Image from 'next/image'
import { FilterProps } from '@/utils';
import { fuels, yearsOfProduction } from '@/constants';
import ShowMore from '@/components/ShowMore';
import { useEffect, useState } from 'react';

export default function Home() {
  const [allCars, setAllCars] = useState([]);
  const [loading, setLoading] = useState(false);

  //search states
  const [manufacturer, setManufacturer] = useState("");
  const [model, setModel] = useState("");

  //filter states
  const [fuel, setfuel] = useState("");
  const [year, setyear] = useState(2022)

  //filter states
  const [limit, setlimit] = useState(10);

  const getCars = async () => {
    setLoading(true);
    try {
      const result = await fetchCars({
        manufacturer: manufacturer || '',
        year: year || 2022,
        fuel: fuel || '',
        limit: limit || 10,
        model: model || '',
      });
      setAllCars(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {

    getCars();
  }, [fuel, year, limit, manufacturer, model])

  const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className='mt-12 padding-x padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4x1 font-extrabold'>Car Caralogue</h1>
          <p>Explore the cars you might like</p>
        </div>
        <div className='home__filters'>
          <SearchBar setManufacturer={setManufacturer}
            setModel={setModel} />
          <div className='home__filter-container'>
            <CustomeFilter title="fuel" options={fuels} setFilter={setfuel} />
            <CustomeFilter title="year" options={yearsOfProduction} setFilter={setyear} />
          </div>

        </div>
        {allCars.length > 0 ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
            {loading && (
              <div className='mt-16 w-full flex-center'>
                <Image src="/loader.svg"
                  alt="loader"
                  width={50}
                  height={50}
                  className='object-contain'
                />
              </div>
            )}

            <ShowMore
              pageNumber={(limit || 10) / 10}
              isNext={limit > allCars.length}
              setLimit={setlimit}
            />
          </section>
        ) : (
          <div className='home__error-container'>
            <h2 className='text-black text-xl font-bold'>Oops, no results</h2>
            {/* <p>{allCars?.message}</p> */}
          </div>
        )}
      </div>
    </main>
  )
}