"use server"
const baseurl = process.env.NEXT_PUBLIC_SERVER_URL

export const createCompany = async (companyData) => {
    const res = await fetch(`${baseurl}/api/companies`, {
        method: `POST`,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(companyData)
    })
    const data = await res.json()

    console.log(data, "after company post")
    return data

}