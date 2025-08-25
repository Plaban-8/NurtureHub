"use client";

import { useState, useRef, ChangeEvent, FormEvent } from 'react';
import Image from 'next/image';
import { Leaf, Upload, PlusCircle, Trash2, Droplet } from 'lucide-react';

interface Plant {
  id: number;
  name: string;
  species: string;
  photo: string;
  lastWatered?: string;
}

export default function MyPlantsPage() {
  const [plants, setPlants] = useState<Plant[]>([
    { id: 1, name: 'Ferdinand', species: 'Fiddle Leaf Fig', photo: 'https://placehold.co/600x400.png', lastWatered: '2 days ago' },
    { id: 2, name: 'Spike', species: 'Snake Plant', photo: 'https://placehold.co/600x400.png', lastWatered: '1 week ago' },
  ]);
  const [newPlantName, setNewPlantName] = useState('');
  const [newPlantSpecies, setNewPlantSpecies] = useState('');
  const [newPlantPhoto, setNewPlantPhoto] = useState<string | null>(null);
  const [isAddingPlant, setIsAddingPlant] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewPlantPhoto(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleAddPlant = (e: FormEvent) => {
    e.preventDefault();
    if (newPlantName && newPlantSpecies && newPlantPhoto) {
      const newPlant: Plant = {
        id: Date.now(), // Use timestamp for a unique ID
        name: newPlantName,
        species: newPlantSpecies,
        photo: newPlantPhoto,
        lastWatered: 'Not yet watered',
      };
      // Simulate API call to add a plant
      setPlants(prevPlants => [newPlant, ...prevPlants]);
      
      // Reset form
      setNewPlantName('');
      setNewPlantSpecies('');
      setNewPlantPhoto(null);
      setIsAddingPlant(false);
      if(fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } else {
        alert("Please fill out all fields and upload a photo.")
    }
  };

  const handleDeletePlant = (plantId: number) => {
    // Simulate API call to delete a plant
    setPlants(plants.filter(plant => plant.id !== plantId));
  };

  const handleWaterPlant = (plantId: number) => {
    // Simulate API call to update watering status
    setPlants(plants.map(plant => 
      plant.id === plantId 
        ? { ...plant, lastWatered: new Date().toLocaleDateString() } 
        : plant
    ));
    alert('Watering logged!');
  };
  
  const triggerPhotoUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
            <Leaf className="text-primary" /> My Plants
        </h1>
        <button 
            onClick={() => setIsAddingPlant(!isAddingPlant)}
            className="flex items-center justify-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
            <PlusCircle size={20} />
            {isAddingPlant ? 'Cancel' : 'Add New Plant'}
        </button>
      </div>

      {isAddingPlant && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Add a New Plant</h2>
          <form onSubmit={handleAddPlant} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="plantName" className="block text-sm font-medium text-gray-700">Plant Name</label>
                    <input type="text" id="plantName" value={newPlantName} onChange={(e) => setNewPlantName(e.target.value)} placeholder="e.g., Ferdinand" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                </div>
                <div>
                    <label htmlFor="plantSpecies" className="block text-sm font-medium text-gray-700">Species</label>
                    <input type="text" id="plantSpecies" value={newPlantSpecies} onChange={(e) => setNewPlantSpecies(e.target.value)} placeholder="e.g., Fiddle Leaf Fig" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm" />
                </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Plant Photo</label>
              <div 
                onClick={triggerPhotoUpload} 
                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10 cursor-pointer hover:border-green-500"
              >
                <div className="text-center">
                   {newPlantPhoto ? (
                        <Image src={newPlantPhoto} alt="New plant preview" width={200} height={200} className="mx-auto h-32 w-32 object-cover rounded-lg" />
                   ) : (
                    <>
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="mt-4 flex text-sm leading-6 text-gray-600">
                            <p className="pl-1">Click to upload a photo</p>
                        </div>
                        <p className="text-xs leading-5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                    </>
                   )}
                </div>
              </div>
              <input ref={fileInputRef} type="file" onChange={handlePhotoUpload} accept="image/*" className="hidden" />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="flex items-center justify-center gap-2 rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                Add Plant
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plants.map((plant) => (
          <div key={plant.id} className="rounded-lg bg-white shadow-md overflow-hidden flex flex-col">
            <div className="relative h-64 w-full">
                <Image src={plant.photo} alt={plant.name} layout="fill" objectFit="cover" data-ai-hint="potted plant" />
                 <button onClick={() => handleDeletePlant(plant.id)} className="absolute top-2 right-2 bg-white/70 rounded-full p-2 text-gray-600 hover:text-red-500 hover:bg-white transition-all">
                    <Trash2 size={20} />
                </button>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800">{plant.name}</h3>
                <p className="text-md text-gray-600">{plant.species}</p>
                <p className="text-sm text-gray-500 mt-2">Last watered: {plant.lastWatered}</p>
              </div>
               <button 
                  onClick={() => handleWaterPlant(plant.id)}
                  className="mt-4 w-full flex items-center justify-center gap-2 rounded-md border border-primary/50 bg-primary/10 px-4 py-2 text-sm font-medium text-primary shadow-sm hover:bg-primary/20"
                >
                    <Droplet size={16} />
                    Log Watering
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
