"use server"

import { serverMutation } from "../core/server"

export const createJobs = async (newJobsData) => {
    return serverMutation("/api/jobs", newJobsData)
}

// const baseurl = process.env.NEXT_PUBLIC_SERVER_URL

// export const createJobs = async (newJobsData) => {

//     const res = await fetch(`${baseurl}/api/jobs`, {
//         method: `POST`,
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify(newJobsData)
//     })
//     const data = await res.json()

//     // console.log(data, "after jobs post")

//     return data;

// }