"use server"

import { protectServer} from "../core/server"

export const getApplicationByApplicant = async (applicantId) => {
    return protectServer(`/api/application?applicantId=${applicantId}`)

}