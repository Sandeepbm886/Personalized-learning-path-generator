import { NextResponse } from "next/server";
import crypto from "crypto";
import { db } from "../../../../configs/db";
import { Users } from "../../../../configs/schema";
import { sql } from "drizzle-orm";

import { getAuth } from "@clerk/nextjs/server";
export async function POST(request) {
    try {
        const { userId } = getAuth(request);
        console.log("🆔 Clerk userId =>", userId);

        if (!userId) {
            return NextResponse.json({
                success: false,
                error: "Unauthenticated"
            }, { status: 401 });
        }

        const {
            razorpay_order_id,
            razorpay_payment_id,
            razorpay_signature,
            amount,
        } = await request.json();

        
        const generated_signature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex");

        if (generated_signature !== razorpay_signature) {
            return NextResponse.json({ success: false }, { status: 400 });
        }

        
        
        let purchasedCredits = 0;
        if (amount == 100) purchasedCredits = 10;
        else if (amount == 399) purchasedCredits = 25;
        else if (amount == 999) purchasedCredits = 50;

        if (!purchasedCredits) {
            return NextResponse.json({
                success: false,
                error: "Invalid plan amount"
            }, { status: 400 });
        }

        
        await db
            .insert(Users)
            .values({ clerkUserId: userId, courseLimit: 5 + purchasedCredits })
            .onConflictDoUpdate({
                target: Users.clerkUserId,
                set: { courseLimit: sql`${Users.courseLimit} + ${purchasedCredits}` },
            });

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
