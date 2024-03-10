'use client'
import { useSearchParams } from "next/navigation";
import { vehicles } from "@/models/vehiclesReservationPage"
import Image from 'next/image'
import { FaCartArrowDown } from "react-icons/fa";

export default function ReservationPage(){
    const searchParams = useSearchParams()
    const typeVehicle = searchParams.get('typeVehicle')
    const category = searchParams.get('category')
    const priceRange = searchParams.get('priceRange') as string
    
    const [minString, maxString] = priceRange.split('-');
    const minNumber = parseInt(minString, 10);
    const maxNumber = parseInt(maxString, 10);

    const filteredVehicles = vehicles.filter(vehicle => 
        vehicle.typeVehicle === typeVehicle &&
        vehicle.category === category &&
        vehicle.price >= minNumber &&
        vehicle.price <= maxNumber
    )

    const filteredNum = filteredVehicles.length
    
    console.log(filteredVehicles)
    console.log(typeVehicle, category, priceRange)

    return(
        <div className="bg-sky-100 p-4 h-full">
            <div className="flex flex-col max-w-max mx-auto items-center">
                    <div className="w-full flex justify-between items-center p-8 mb-12">
                        <h1 className="text-4xl font-bold antialiased">Choose your vehicle!</h1>
                        <div className="p-2 bg-gray-200 rounded-lg">
                            <h3 className="font-bold">{filteredNum} Vehicles Found</h3>
                        </div>
                    </div>
                <div className=" w-max">
                <div className="grid grid-rows-3 grid-cols-3 gap-10 items-center">
                    {filteredVehicles.map(vehicle => (
                        <div key={vehicle.id} className="bg-white h-full mx-auto border border-white flex flex-col justify-between gap-6 p-3 rounded-lg hover:shadow-2xl">
                            <div className="flex justify-between">
                                <p className="font-bold">{vehicle.typeVehicle}</p>
                                <div className="">
                                    <div className="">
                                        <button className="text-green-500 text-2xl hover:text-green-400">
                                            <FaCartArrowDown/>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Image loader={() => vehicle.urlImage} src={vehicle.urlImage} alt={`Image of ${vehicle.typeVehicle}`} width={200} height={200} />
                            </div>
                            <div className="flex flex-row justify-between items-center">
                                <div className="bg-gradient-to-r from-sky-300 to-sky-300 p-2 rounded-lg font-bold text-sm">{vehicle.category}</div>
                                <div className="font-bold text-lg">${vehicle.price},00</div>
                            </div>
                        </div>
                    ))}
                </div>
                </div>

            </div>


        </div>
    )
}