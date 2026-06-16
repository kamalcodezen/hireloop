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