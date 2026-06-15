"use server"

import { serverFetch } from "../core/server"

export const getApplicationByApplicant = async (applicantId) => {
    return serverFetch(`/api/application?applicantId=${applicantId}`)

}