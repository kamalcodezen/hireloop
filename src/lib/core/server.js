"use server"

const baseurl = process.env.NEXT_PUBLIC_SERVER_URL


// read get
export const serverFetch = async (path) => {
    const res = await fetch(`${baseurl}${path}`)
    return await res.json()
}

// post 
export const serverMutation = async (path, data, method = "POST") => {
    const res = await fetch(`${baseurl}${path}`, {
        method: method,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await res.json()
    return result
}