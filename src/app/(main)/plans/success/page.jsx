import { stripe } from "@/lib/stripe";
import { redirect } from "next/navigation";
import Link from "next/link";
import {
  CheckCircle,
  ArrowRight,
  ShoppingBag,
  Mail,
  ShieldCheck,
  Download,
  Sparkles,
} from "lucide-react";
import * as motion from "framer-motion/client";
import { email } from "zod";
import { metadata } from "@/app/layout";
import { submitSubscriptionByInfo } from "@/lib/action/subscription";

export default async function Success({ searchParams }) {
  const { session_id } = await searchParams;

  if (!session_id) {
    throw new Error("Please provide a valid session_id");
  }

  const {
    status,
    customer_details: { email: customerEmail },
    metadata,
  } = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["line_items", "payment_intent"],
  });

  if (status === "open") {
    return redirect("/");
  }

  if (status === "complete") {
    const subsInfo = {
      email: customerEmail,
      planId: metadata.planId,
    };

    const result = await submitSubscriptionByInfo(subsInfo);
    console.log(result);

    return (
      <section className="relative min-h-screen overflow-hidden bg-background text-foreground flex items-center justify-center px-4 py-10">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        <div className="absolute top-1/2 left-1/2 h-[700px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-500/10 blur-[150px]" />
        <div className="absolute top-20 right-20 h-52 w-52 rounded-full bg-emerald-500/10 blur-[120px]" />
        <div className="absolute bottom-20 left-20 h-52 w-52 rounded-full bg-cyan-500/10 blur-[120px]" />
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 250,
            damping: 24,
          }}
          className="relative z-10 w-full max-w-2xl rounded-[36px] border border-border/60 bg-card/80 backdrop-blur-2xl p-8 md:p-10 shadow-[0_20px_80px_rgba(0,0,0,0.08)]"
        >
          {/* Success Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 0.15,
              type: "spring",
              stiffness: 300,
            }}
            className="mx-auto flex h-24 w-24 items-center justify-center rounded-3xl bg-green-500/10 text-green-500 shadow-inner"
          >
            <CheckCircle size={52} />
          </motion.div>

          {/* Badge */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2 text-xs font-semibold">
              <ShieldCheck size={14} />
              Payment Verified
            </div>
          </div>

          {/* Title */}
          <h1 className="mt-6 text-center text-4xl md:text-5xl font-bold tracking-tight">
            Payment Successful 🎉
          </h1>

          <p className="mt-3 text-center text-muted-foreground max-w-lg mx-auto">
            Thank you for your purchase. Your payment has been processed
            successfully and your account has been upgraded instantly.
          </p>

          {/* Premium Activated */}
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-green-500/20 bg-green-500/10 px-4 py-2">
              <Sparkles size={16} />
              Premium Membership Activated
            </div>
          </div>

          {/* Email Card */}
          {customerEmail && (
            <div className="mt-8 rounded-2xl border border-border bg-muted/40 p-4">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-background">
                  <Mail size={18} />
                </div>

                <div>
                  <p className="text-xs text-muted-foreground">
                    Confirmation Email Sent
                  </p>

                  <p className="font-semibold">{customerEmail}</p>
                </div>
              </div>
            </div>
          )}

          {/* Order Summary */}
          <div className="mt-8 rounded-2xl border border-border p-5">
            <h3 className="font-semibold text-lg">Order Summary</h3>

            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Product</span>
                <span className="font-medium">Premium Subscription</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-semibold text-green-500">Paid</span>
              </div>

              <div className="flex justify-between">
                <span className="text-muted-foreground">Session ID</span>
                <span className="truncate max-w-[180px]">{session_id}</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="mt-6 rounded-2xl border border-border p-5">
            <h3 className="font-semibold">What happens next?</h3>

            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>✅ Premium access activated instantly</li>
              <li>✅ Invoice delivered to your email</li>
              <li>✅ Dashboard features unlocked</li>
              <li>✅ Full account access enabled</li>
            </ul>
          </div>

          {/* Buttons */}
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            <Link
              href="/dashboard"
              className="h-12 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2 transition-all"
            >
              Dashboard
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/jobs"
              className="h-12 rounded-xl border border-border bg-background hover:bg-muted flex items-center justify-center gap-2"
            >
              <ShoppingBag size={16} />
              Explore Jobs
            </Link>

            <Link
              href={`/api/invoice/${session_id}`}
              className="h-12 rounded-xl border border-border bg-background hover:bg-muted flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Invoice
            </Link>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-xs text-muted-foreground">
            Need help with onboarding or billing?
            <a
              href="mailto:support@yourdomain.com"
              className="ml-1 font-semibold text-green-500 hover:underline"
            >
              Contact Support
            </a>
          </p>
        </motion.div>
      </section>
    );
  }

  return redirect("/");
}
