import Cookies from 'js-cookie';
import { cookies } from 'next/headers';

export const tokenManagementService = (token: string)=>{
    try {
        Cookies.remove("token");
        Cookies.set("token", token, {expires: 1});
    } catch (error) {
        console.error("Error setting token:", error);
    }
}

export const getToken = async ()=>{
    try{
    const cookieStore = await cookies();
    return cookieStore.get("token")?.value;
    }catch (error) {
        console.error("Error retrieving token:", error);
        return null;
    }
}