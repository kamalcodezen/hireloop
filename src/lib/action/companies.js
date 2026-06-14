"use server"
import { serverMutation } from "../core/server"

// companies data post
export const createCompany = async (companyData) => {
    return serverMutation("/api/companies", companyData)
}


// export const createCompany = async (companyData) => {
//     const res = await fetch(`${baseurl}/api/companies`, {
//         method: `POST`,
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(companyData)
//     })
//     const data = await res.json()

//     console.log(data, "after company post")
//     return data

// }