import { getUser } from "../auth/login/login.repo.js";

export const getUserService = async (id) => {
    const user = await getUser({ _id: id });
    if (!user) {
        return {
            status: false
        }
    }
    return {
        status: true,
        data: {
            name: user.name,
            email: user.email,
            phone: user.phone,
        }
    }
}