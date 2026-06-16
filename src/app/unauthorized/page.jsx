"use client";

import Link from "next/link";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";
import * as motion from "framer-motion/client"; // Next.js App Router Server friendly import

const Unauthorized = () => {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Glow Effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/5 blur-[130px] rounded-full dark:bg-red-500/10 pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 25 }}
        className="max-w-md w-full rounded-[32px] border border-border bg-card/90 backdrop-blur-xl p-8 sm:p-10 text-center shadow-[0_20px_50px_rgba(0,0,0,0.02)] dark:shadow-[0_20px_50px_rgba(239,68,68,0.01)] relative z-10"
      >
        {/* Shield Alert Icon Area */}
        <motion.div
          initial={{ rotate: -10, scale: 0.9 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: 0.1,
          }}
          className="w-16 h-16 mx-auto rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center"
        >
          <ShieldAlert size={36} className="stroke-[2]" />
        </motion.div>

        {/* Error Code Badge */}
        <div className="mt-6 inline-flex items-center px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-xs font-bold text-red-500">
          Error 403: Forbidden
        </div>

        {/* Main Headings */}
        <h1 className="mt-4 text-2xl sm:text-3xl font-black tracking-tight text-foreground">
          Access Restricted
        </h1>

        <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
          You don't have permission to access this page. Your account role does
          not clear the authorization criteria required for this directory.
        </p>

        {/* Divider Line */}
        <div className="my-6 border-t border-border/60" />

        {/* Action Button Triggers */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => window.history.back()}
            className="w-full h-11 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_4px_15px_rgba(34,197,94,0.15)] cursor-pointer"
          >
            <ArrowLeft size={16} />
            Go Back
          </button>

          <Link
            href="/"
            className="w-full h-11 rounded-xl border border-border bg-background hover:bg-muted text-foreground font-medium text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Home size={16} className="text-muted-foreground" />
            Back to Home
          </Link>
        </div>

        {/* Footer Support Message */}
        <p className="mt-6 text-xs text-muted-foreground">
          Think this is a mistake? Please contact{" "}
          <a
            href="mailto:support@yourdomain.com"
            className="font-semibold text-green-600 dark:text-green-400 hover:underline"
          >
            Support
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Unauthorized;
