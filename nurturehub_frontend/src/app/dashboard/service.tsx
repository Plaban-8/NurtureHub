import { getToken } from "../tokenManagement/service"
import { userDTO } from "./model";

export const getUserData = async () => {
    const token = await getToken();
    console.log(token)
    const response = await fetch('http://localhost:4000/profile', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error('Failed to fetch user data');   
    }

    const result = await response.json();
    console.log(result)
    return result.data as userDTO;
}