"use server"
const baseurl = process.env.NEXT_PUBLIC_SERVER_URL;

export const companiesData = async (company, status = "active") => {

    const res = await fetch(`${baseurl}/api/jobs?company=${company}&status=${status}`)
    return await res.json()

}