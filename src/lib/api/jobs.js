"use server"
const baseurl = process.env.NEXT_PUBLIC_SERVER_URL;

export const getCompaniesJobs = async (companyId, status = "active") => {

    const res = await fetch(`${baseurl}/api/jobs?companyId=${companyId}&status=${status}`)
    return await res.json()

}