"use client";

import { useState, useRef, useEffect, FormEvent, ChangeEvent } from "react";
import Image from "next/image";
import { Leaf, Upload, PlusCircle, Trash2, Droplet } from "lucide-react";
import { plantDTO } from "./model";
import { getPlantsByUserId,savePlant,deletePlantById,logWater} from "./service";

interface Props {
  data: {
    plants: plantDTO[];
  };
}

export default function MyPlantsView(props: Props) {
  const { plants } = props.data;
  const [form, setForm] = useState({
    name: "",
    species: "",
    photo: null as string | null,
  });
  const [isAddingPlant, setIsAddingPlant] = useState(false);
  const [waterLogged, setWaterLogged] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: plantDTO = {
      _id: "", // backend will generate ID
      name: form.name,
      species: form.species,
      photo: form.photo ?? "", // fallback
    };
    try {
      await savePlant(data);
      setForm({ name: "", species: "", photo: null });
      setIsAddingPlant(false);
    } catch (error) {
      console.error("Error adding plant:", error);
      alert("Failed to add plant. Please try again.");
    }
  };

  const deletePlant = async (id: string) => {
    try {
      await deletePlantById(id);
    } catch (err) {
      console.error("Error deleting plant:", err);
    }
  };

  const handlePhotoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const reader = new FileReader();
    reader.onload = (event) =>
      setForm((f) => ({ ...f, photo: event.target?.result as string }));
    reader.readAsDataURL(e.target.files[0]);
  };

  const logWatering = async (id: string, name: string) => {
    const response = await logWater(id, name);
    const date = new Date(response);
    const readable = date.toLocaleString();
    setWaterLogged((prev) => [...prev, readable]);
  };

  function checkWaterLogDifference(plant) {
    if (!plant.waterLogged || plant.waterLogged.length < 2) return;

    const logs = plant.waterLogged;
    const lastLog = new Date(logs[logs.length - 1]);
    const prevLog = new Date(logs[logs.length - 2]);
    const diffMs = lastLog.getTime() - prevLog.getTime();
    const diffDays = diffMs / (1000);

    if (diffDays >= 2) {
      const data = getUserByPlantId(plant._id);
      console.log(data);
      notifyService(plant._id); // Call your service here
    }
  }

  useEffect(() => {
    plants.forEach(checkWaterLogDifference);
  }, [plants]);

  return (
    <div className="bg-gray-50 min-h-screen p-4 md:p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
          <Leaf className="text-green-600" /> My Plants
        </h1>
        <button
          onClick={() => setIsAddingPlant(!isAddingPlant)}
          className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500"
        >
          <PlusCircle size={20} />
          {isAddingPlant ? "Cancel" : "Add New Plant"}
        </button>
      </div>

      {/* Add Plant Form */}
      {isAddingPlant && (
        <div className="mb-8 p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Add a New Plant
          </h2>
          <form onSubmit={onSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Plant Name
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="e.g., Ferdinand"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Species
                </label>
                <input
                  type="text"
                  value={form.species}
                  onChange={(e) =>
                    setForm({ ...form, species: e.target.value })
                  }
                  placeholder="e.g., Fiddle Leaf Fig"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                />
              </div>
            </div>

            {/* Upload */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Plant Photo
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-400 px-6 py-10 cursor-pointer hover:border-green-500"
              >
                <div className="text-center">
                  {form.photo ? (
                    <Image
                      src={form.photo}
                      alt="New plant preview"
                      width={200}
                      height={200}
                      className="mx-auto h-32 w-32 object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <p className="mt-2 text-sm text-gray-600">
                        Click to upload a photo
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG, GIF up to 10MB
                      </p>
                    </>
                  )}
                </div>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                onChange={handlePhotoUpload}
                accept="image/*"
                className="hidden"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:ring-2 focus:ring-green-500"
              >
                Add Plant
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Plant List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {plants.map((plant, idx) => (
          <div
            key={idx}
            className="rounded-lg bg-white shadow-md overflow-hidden flex flex-col"
          >
            <div className="relative h-64 w-full">
              <Image
                src={plant.photo || "/vercel.svg"} // put a placeholder image in /public
                alt={plant.name || "No name"}
                fill
                className="object-cover"
              />

              <button
                onClick={() => deletePlant(plant._id)}
                className="absolute top-2 right-2 bg-white/70 rounded-full p-2 text-gray-600 hover:text-red-500 transition"
              >
                <Trash2 size={20} />
              </button>
            </div>
            <div className="p-6 flex-grow flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold text-gray-800">
                  {plant.name}
                </h3>
                <p className="text-md text-gray-600">{plant.species}</p>
                <div>
                  {plant.waterLogged && plant.waterLogged.length > 0 ? (
                    <p>
                      <strong>Last watered: </strong>
                      {new Date(
                        plant.waterLogged[plant.waterLogged.length - 1]
                      ).toLocaleString()}
                    </p>
                  ) : (
                    <p>No water logs yet.</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => logWatering(plant._id, plant.name)}
                className="mt-4 w-full flex items-center justify-center gap-2 rounded-md border border-green-500/50 bg-green-50 px-4 py-2 text-sm font-medium text-green-700 hover:bg-green-100"
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
