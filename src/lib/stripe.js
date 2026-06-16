import 'server-only'

import Stripe from 'stripe'

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export const PLAN_PRICE_ID = {
    "seeker_pro": "price_1TiqSyJybuqq1j3tehCkmr54",
    "seeker_premium": "price_1TirUxJybuqq1j3taLITOUoe",
    "recruiter_growth": "price_1TirWMJybuqq1j3tfj76yb7z",
    "recruiter_enterprise": "price_1TirXSJybuqq1j3t1Fq3M7zW"
}