"use server"

import { serverMutation } from "../core/server"

export const submitSubscriptionByInfo = async (subsInfo) => {
    return serverMutation("/api/subscription", subsInfo)
}