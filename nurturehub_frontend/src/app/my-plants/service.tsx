"use server"

import { getToken } from '../tokenManagement/service';
import { plantDTO } from './model';

export const savePlant = async (data: plantDTO) => {
    const token = await getToken();
    const response = await fetch('http://localhost:4000/myplant', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            authorization: "Bearer " + token,
        },
        body: JSON.stringify(data),
    })
    console.log('Response:', response);
    if (!response.ok) {
        throw new Error('Failed to save plant');
    }
    return await response.json();
};

export const getPlantsByUserId = async () => {
    const token = await getToken();

    const response = await fetch(`http://localhost:4000/myplant`, {
        method: 'GET',
        headers: {
            authorization: "Bearer " + token,
        },
    });
    if (!response.ok) {
        alert('Failed to fetch plants. Please try again.');
        throw new Error('Failed to fetch plants');
    }
    const plants = await response.json();
    return plants.data;
}
