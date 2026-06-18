"use server"

import { protectServer, serverFetch } from "../core/server"
import { getUserSession } from "../core/session"


// get all companies data 
export const getAllCompanies = async () => {
    return protectServer(`/api/companies`)
}



// get recruiter company data
export const getRecruiterCompany = async (recruiterId) => {
    return serverFetch(`/api/my/companies?recruiterId=${recruiterId}`)

}

// logged recruiter company same way 
export const getLoggedRecruiterCompany = async () => {
    const user = await getUserSession()
    return getRecruiterCompany(user?.id)
} 