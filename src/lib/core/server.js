"use server"

import { redirect } from "next/navigation"
import { getUserToken } from "./session"

const baseurl = process.env.NEXT_PUBLIC_SERVER_URL

// user token
export const authHeader = async () => {
    const token = await getUserToken()
    const header = token ? {
        authorization: `Bearer ${token}`
    } : {}
    return header
}




// read get
export const serverFetch = async (path) => {
    const res = await fetch(`${baseurl}${path}`)
    return await handleStatusCode(res)

}


// protect api send headers authorization
export const protectServer = async (path) => {
    const res = await fetch(`${baseurl}${path}`, {
        headers: await authHeader()
    })
    // handle 401,403
    return await handleStatusCode(res)

}




// post 
export const serverMutation = async (path, data, method = "POST") => {
    const res = await fetch(`${baseurl}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json",
            ... await authHeader()
        },
        body: JSON.stringify(data)
    })
    // handle 401,403
    return await handleStatusCode(res)
}


// handle status code
export const handleStatusCode = async (res) => {
    if (res.status === 401) {
        redirect("/login")
    }
    if (res.status === 403) {
        redirect("/unauthorized")
    }
    return await res.json()
}