"use server"

import { serverFetch } from "../core/server"
import { getUserSession } from "../core/session"


// get recruiter company data
export const getRecruiterCompany = async (recruiterId) => {
    return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`)

}

// logged recruiter company same way 
export const getLoggedRecruiterCompany = async () => {
    const user = await getUserSession()
    return getRecruiterCompany(user?.id)
} 