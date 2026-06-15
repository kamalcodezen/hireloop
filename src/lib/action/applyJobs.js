"use server"

import { serverMutation } from "../core/server"
// user application submit 
export const submitJobApplication = async (applicationData) => {
    return  serverMutation(`/api/application`, applicationData)

}