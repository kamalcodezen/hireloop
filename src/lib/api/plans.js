"use server"

import { serverFetch } from "../core/server"

export const getUserPlansById = async (planId) => {
    return serverFetch(`/api/plans?plan_id=${planId}`)
}