"use server"

const baseurl = process.env.NEXT_PUBLIC_SERVER_URL


// read get
export const serverFetch = async (path) => {
    const res = await fetch(`${baseurl}${path}`)
    return  res.json()
}



// post 
export const serverMutation = async (path, data) => {
    const res = await fetch(`${baseurl}${path}`, {
        method: `POST`,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await res.json()
    return result
}