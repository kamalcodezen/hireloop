"use server"

import { serverFetch } from "../core/server";

const baseurl = process.env.NEXT_PUBLIC_SERVER_URL;


// get all jobs
export const getAllJobs = async () => {
    return await serverFetch("/api/jobs")
}



// find get jobs recruiterID
export const getCompaniesJobs = async (companyId, status = "active") => {
    const res = await fetch(`${baseurl}/api/jobs?companyId=${companyId}&status=${status}`)
    return await res.json()

}