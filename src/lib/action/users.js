"use server"

import { headers } from "next/headers";
import { auth } from "../auth";
import { revalidatePath } from "next/cache";

export const updateUserRole = async (userId, role) => {
    // 🚀 BetterAuth-এর এডমিন মেথড দিয়ে ডাটাবেজে রোল আপডেট করা হচ্ছে
    const data = await auth.api.setRole({
        body: {
            userId: userId,
            role: role, // required
        },
        // BetterAuth সিকিউরিটি ও ভ্যালিডেশনের জন্য কুকি হেডার পাস করা হচ্ছে
        headers: await headers(),
    });

    // 🎯 জাদুর লাইন সচল করা হলো: এটি সার্ভার সাইডে এডমিন ইউজার পেজের ওল্ড ক্যাশ ক্লিয়ার করে দেবে
    revalidatePath("/dashboard/admin/users");

    // প্রসেস হওয়া ডাটা রেসপন্স আকারে ফ্রন্টএন্ডে রিটার্ন করা হলো
    return data;
}