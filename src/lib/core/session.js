"use server"

import { headers } from "next/headers"
import { auth } from "../auth"
import { redirect } from "next/navigation"

export const getUserSession = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session?.user;
}


// user session token generate
export const getUserToken = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })

    return session?.session?.token || null

}





// role based require
export const requireAccessRole = async (role) => {
    const user = await getUserSession()

    if (!user) {
        redirect("/login")
    }

    if (user?.role !== role) {
        return redirect("/unauthorized")
    }
    return user
}