"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  Trash2,
  Edit3,
  Calendar,
  Phone,
  Mail,
  ExternalLink,
  Inbox,
} from "lucide-react";
import Link from "next/link";

export default function ApplicationsList({ initialApplications = [] }) {
  const [applications, setApplications] = useState(initialApplications);

  // ডামি ডিলিট হ্যান্ডলার (তুমি তোমার সার্ভার অ্যাকশন বা এপিআই এখানে লিংক করতে পারো)
  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to withdraw this application?")) {
      setApplications(applications.filter((app) => app._id !== id));
    }
  };

  // স্ট্যাটাস ব্যাজের সুন্দর কালার ম্যাপিং
  const statusStyles = {
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    approved:
      "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  if (applications.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded border border-dashed border-border bg-card p-16 text-center flex flex-col items-center justify-center shadow-sm"
      >
        <div className="w-14 h-14 bg-muted text-muted-foreground rounded-2xl flex items-center justify-center mb-4">
          <Inbox size={28} />
        </div>
        <h3 className="text-xl font-bold">No Applications Yet</h3>
        <p className="text-sm text-muted-foreground mt-1 max-w-sm">
          You haven't submitted any job applications yet. Explore available jobs
          and jumpstart your career.
        </p>
        <Link
          href="/jobs"
          className="mt-5 inline-flex h-10 px-5 items-center justify-center bg-green-600 hover:bg-green-700 text-white rounded-xl text-sm font-semibold transition-colors"
        >
          Explore Jobs
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="w-full rounded border border-border bg-card/60 backdrop-blur-md overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-border bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              <th className="py-4 px-6">Company & Position</th>
              <th className="py-4 px-6 hidden sm:table-cell">
                Applicant Details
              </th>
              <th className="py-4 px-6">Status</th>
              <th className="py-4 px-6 hidden lg:table-cell">Applied Date</th>
              <th className="py-4 px-6 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-border/60 text-sm">
            <AnimatePresence mode="popLayout">
              {applications.map((app) => (
                <motion.tr
                  key={app._id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ type: "spring", stiffness: 300, damping: 26 }}
                  className="hover:bg-muted/30 transition-colors group"
                >
                  {/* ১. কোম্পানি ও পজিশন (লোগো সহ বামপাশে) */}
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="h-12 w-12 rounded-xl border border-border bg-background p-2 shrink-0 flex items-center justify-center shadow-inner">
                        <img
                          src={app.companyLogo || "https://placehold.co/100"}
                          alt={app.companyName}
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-foreground truncate max-w-[160px] sm:max-w-xs">
                          {app.companyName}
                        </h4>
                        <span className="text-xs font-medium text-muted-foreground inline-flex items-center gap-1.5 mt-0.5">
                          ID:{" "}
                          <span className="text-foreground/80 font-semibold truncate max-w-[90px]">
                            {app.jobId}
                          </span>
                        </span>
                      </div>
                    </div>
                  </td>

                  {/* ২. গুরুত্বপূর্ণ ডিটেইলস (নাম, ফোন, ইমেইল, সিভি লিংক) */}
                  <td className="py-4 px-6 hidden sm:table-cell">
                    <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground text-sm">
                        {app.fullName}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <Mail size={12} className="opacity-70" />
                        <span>{app.applicantEmail}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Phone size={12} className="opacity-70" />
                        <span>{app.phone}</span>
                      </div>
                      {app.resumeUrl && (
                        <a
                          href={app.resumeUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-1 inline-flex items-center gap-1 text-green-600 dark:text-green-400 font-bold hover:underline"
                        >
                          <FileText size={12} />
                          View Submitted CV
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </td>

                  {/* ৩. স্ট্যাটাস ব্যাজ */}
                  <td className="py-4 px-6 vertical-align-middle">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 text-xs font-bold rounded-full border ${
                        statusStyles[app.status?.toLowerCase()] ||
                        statusStyles.pending
                      }`}
                    >
                      {app.status || "Pending"}
                    </span>
                  </td>

                  {/* ৪. ডেট কলাম */}
                  <td className="py-4 px-6 hidden lg:table-cell text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={13} className="opacity-70" />
                      <span>
                        {new Date(app.createdAt).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </td>

                  {/* ৫. অ্যাকশন বাটনসমূহ (ডানপাশে এডিট ও ডিলিট) */}
                  <td className="py-4 px-6 text-right vertical-align-middle">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Edit Button */}
                      <Link
                        href={`/dashboard/seeker/applications/edit/${app._id}`}
                        className="p-2 rounded-xl border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-all cursor-pointer"
                        title="Edit Application"
                      >
                        <Edit3 size={15} />
                      </Link>

                      {/* Delete Button */}
                      <button
                        onClick={() => handleDelete(app._id)}
                        className="p-2 rounded-xl border border-red-500/10 bg-background hover:bg-red-500/10 text-muted-foreground hover:text-red-500 transition-all cursor-pointer"
                        title="Withdraw Application"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </AnimatePresence>
          </tbody>
        </table>
      </div>
    </div>
  );
}
