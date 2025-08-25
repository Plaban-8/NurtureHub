import { RegisterDTO } from "./model";

export const register = async (data: RegisterDTO)=>{
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    if (!response.ok) {
        alert("Registration failed. Please try again.");
        throw new Error('Registration failed');
    }
    const result = await response.json();
    return result;
}