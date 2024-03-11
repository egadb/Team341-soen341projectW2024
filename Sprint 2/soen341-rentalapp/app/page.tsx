import React from 'react';

interface Vehicles {
  id: number;
  urlImage: string;
  typeVehicle: string;
  category: string;
  price: number;
}

const vehicles: Vehicles[] = [
  {
    id: 1,
    urlImage: "https://pngimg.com/d/koenigsegg_PNG14.png",
    typeVehicle: "Car",
    category: "Standard",
    price: 40
  },
  {
    id: 2,
    urlImage: "https://i.pinimg.com/originals/91/06/02/910602979bda92b9f88144d313f52725.png",
    typeVehicle: "Car",
    category: "Standard",
    price: 30
  },
  {
    id: 3,
    urlImage: "https://pngimg.com/d/suzuki_PNG12280.png",
    typeVehicle: "Car",
    category: "Compact",
    price: 30
},
{
    id: 4,
    urlImage: "https://www.terraecar.com/files/terrae-car_ford_fiesta.png",
    typeVehicle: "Car",
    category: "Compact",
    price: 50
},
{
    id: 7,
    urlImage: "https://i.pinimg.com/originals/0c/b6/c0/0cb6c0b9c3ab75fcb96a45bd397ce809.png",
    typeVehicle: "Suv",
    category: "Standard",
    price: 50
},
{
    id: 8,
    urlImage: "https://purepng.com/public/uploads/large/purepng.com-vantruckvehicletransportwhitevanbuscargodeliveryautocommercialcourier-981525067770rld6a.png",
    typeVehicle: "Van",
    category: "Standard",
    price: 60
},
{
    id: 9,
    urlImage: "https://pngimg.com/d/truck_PNG16228.png",
    typeVehicle: "Truck",
    category: "Standard",
    price: 80
},
{
    id: 10,
    urlImage: "https://www.pngall.com/wp-content/uploads/5/Pickup-Truck-PNG-Photo.png",
    typeVehicle: "Truck",
    category: "Standard",
    price: 60
},
{
    id: 11,
    urlImage: "https://cdn.pixabay.com/photo/2015/10/01/17/17/car-967387_1280.png",
    typeVehicle: "Car",
    category: "Standard",
    price: 30
},
{
    id: 12,
    urlImage: "https://www.freeiconspng.com/thumbs/car-png/red-sports-car-png-1.png",
    typeVehicle: "Car",
    category: "Standard",
    price: 30
},
{
    id: 13,
    urlImage: "https://pngimg.com/d/porsche_PNG10622.png",
    typeVehicle: "Car",
    category: "Standard",
    price: 30
},
{
    id: 14,
    urlImage: "https://purepng.com/public/uploads/large/purepng.com-bugatti-chiron-blue-carcarvehicletransportbugatti-961524662978xsltd.png",
    typeVehicle: "Car",
    category: "Standard",
    price: 30
},
{
    id: 15,
    urlImage: "https://pngimg.com/d/hyundai_PNG11233.png",
    typeVehicle: "Car",
    category: "Intermediate",
    price: 45
},
{
    id: 16,
    urlImage: "https://www.nicepng.com/png/full/83-831736_dump-truck-png-howo-dump-truck-png.png",
    typeVehicle: "Truck",
    category: "Standard",
    price: 30
},
];

const VehicleCard: React.FC<{ vehicle: Vehicles }> = ({ vehicle }) => {
  return (
    <div style={{ border: '1px solid #ccc', borderRadius: '5px', padding: '10px', margin: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <img src={vehicle.urlImage} alt={vehicle.typeVehicle} style={{ width: '100%', height: 'auto', marginBottom: '10px' }} />
      <h3>{vehicle.typeVehicle}</h3>
      <p><strong>Category:</strong> {vehicle.category}</p>
      <p><strong>Price:</strong> ${vehicle.price}/day</p>
    </div>
  );
};

export default function Home() {
  return (
    <div>
      <h1 className='font-bold text-7xl text-green-600 text-center'>Welcome to Rent-A-Koenigsegg</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {vehicles.map(vehicle => (
          <VehicleCard key={vehicle.id} vehicle={vehicle} />
        ))}
      </div>
    </div>
  );
}


