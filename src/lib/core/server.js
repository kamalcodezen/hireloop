"use server"

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
    return await res.json()
}


// protect api send headers authorization
export const protectServer = async (path) => {
    const res = await fetch(`${baseurl}${path}`, {
        headers: await authHeader()
    })
    return await res.json()
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
    const result = await res.json()
    return result
}