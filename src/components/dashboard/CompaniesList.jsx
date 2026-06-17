"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Globe,
  MapPin,
  Users,
  CheckCircle2,
  XCircle,
  Clock3,
  Search,
  Inbox,
  ExternalLink,
  UserCheck,
} from "lucide-react";
import { toast } from "react-toastify";

export default function CompaniesList({ initialCompanies = [] }) {
  const [companies, setCompanies] = useState(initialCompanies);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  //  স্ট্যাটাস আপডেট হ্যান্ডলার (তুমি তোমার মঙ্গোডিবি সার্ভার অ্যাকশন বা এপিআই এখানে কল করতে পারো)
  const handleUpdateStatus = async (id, newStatus) => {
    try {
      // লোকাল স্টেট ইনস্ট্যান্ট আপডেট করা হচ্ছে যাতে ইন্টারফেস ফাস্ট লাগে
      setCompanies((prev) =>
        prev.map((company) =>
          company._id === id ? { ...company, status: newStatus } : company,
        ),
      );

      toast.success(`Company status marked as ${newStatus} successfully!`);

      // এখানে তোমার আসল ব্যাকএন্ড অ্যাকশন কল করো:
      // await updateCompanyStatusAction(id, newStatus);
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  // সার্চ এবং ড্রপডাউন ফিল্টারিং লজিক
  const filteredCompanies = companies.filter((company) => {
    const matchesSearch =
      company?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company?.industry?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === "all" ||
      company?.status?.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const statusStyles = {
    approved:
      "bg-green-500/10 text-green-600 dark:text-green-400 border-green-500/20",
    pending: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    rejected: "bg-red-500/10 text-red-500 border-red-500/20",
  };

  return (
    <div className="space-y-4">
      {/* ================= CONTROLS & FILTERS ================= */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-card border border-border p-4 rounded-2xl shadow-sm">
        {/* Search Bar Input */}
        <div className="relative w-full sm:max-w-xs">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
            size={16}
          />
          <input
            type="text"
            placeholder="Search company or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 pl-9 pr-4 rounded-xl bg-background border border-border text-sm text-foreground outline-none focus:border-green-500 transition-colors"
          />
        </div>

        {/* Tab Filter Links Selector */}
        <div className="flex gap-1.5 p-1 bg-muted border border-border/40 rounded-xl w-full sm:w-auto overflow-x-auto">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold capitalize transition-all cursor-pointer whitespace-nowrap ${
                filterStatus === status
                  ? "bg-green-600 text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* ================= MANAGEMENT DATA TABLE ================= */}
      {filteredCompanies.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card p-16 text-center flex flex-col items-center justify-center">
          <Inbox size={32} className="text-muted-foreground mb-3" />
          <h4 className="font-bold text-base">No Records Match</h4>
          <p className="text-xs text-muted-foreground mt-1">
            No company profile matches your query filters.
          </p>
        </div>
      ) : (
        <div className="w-full rounded-2xl border border-border bg-card/60 backdrop-blur-md overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border bg-muted/40 text-xs font-bold uppercase tracking-wider text-muted-foreground">
                  <th className="py-4 px-6">Company Credentials</th>
                  <th className="py-4 px-6 hidden md:table-cell">
                    Meta Logistics
                  </th>
                  <th className="py-4 px-6 hidden lg:table-cell">
                    Recruiter Ownership
                  </th>
                  <th className="py-4 px-6">Status Tag</th>
                  <th className="py-4 px-6 text-right">Moderation Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border/60 text-sm">
                <AnimatePresence mode="popLayout">
                  {filteredCompanies.map((comp) => (
                    <motion.tr
                      key={comp._id}
                      layout
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      className="hover:bg-muted/30 transition-colors group"
                    >
                      {/* ১. কোম্পানি নাম, লোগো এবং ইন্ডাস্ট্রি */}
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-xl border border-border bg-background p-2 shrink-0 flex items-center justify-center shadow-inner">
                            <img
                              src={comp.logo || "https://placehold.co/100"}
                              alt={comp.name}
                              className="max-h-full max-w-full object-contain"
                            />
                          </div>
                          <div className="min-w-0">
                            <h4 className="font-bold text-foreground truncate max-w-[150px] sm:max-w-xs">
                              {comp.name}
                            </h4>
                            <span className="text-xs font-semibold text-muted-foreground/80 mt-0.5 block">
                              {comp.industry || "General Industry"}
                            </span>
                          </div>
                        </div>
                      </td>

                      {/* ২. লজিস্টিকস (ওয়েবসাইট ও লোকেশন) */}
                      <td className="py-4 px-6 hidden md:table-cell">
                        <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1.5">
                            <MapPin
                              size={12}
                              className="opacity-70 text-green-600"
                            />
                            <span className="truncate max-w-[150px]">
                              {comp.location}
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Users
                              size={12}
                              className="opacity-70 text-green-600"
                            />
                            <span>
                              {comp.employeeCount || "1-10"} Employees
                            </span>
                          </div>
                          {comp.website && (
                            <a
                              href={comp.website}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 text-blue-500 font-medium hover:underline mt-0.5"
                            >
                              <Globe size={11} />
                              Visit Website
                              <ExternalLink size={9} />
                            </a>
                          )}
                        </div>
                      </td>

                      {/* ৩. রিক্রুটার আইডি */}
                      <td className="py-4 px-6 hidden lg:table-cell text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <UserCheck
                            size={13}
                            className="text-muted-foreground/60"
                          />
                          <span className="font-mono bg-muted border border-border/60 px-1.5 py-0.5 rounded text-[11px] font-semibold text-foreground truncate max-w-[110px]">
                            {comp.recruiterId || "No Recruiter ID"}
                          </span>
                        </div>
                      </td>

                      {/* ৪. স্ট্যাটাস ব্যাজ */}
                      <td className="py-4 px-6 vertical-align-middle">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-bold rounded-full border tracking-wide capitalize ${
                            statusStyles[comp.status?.toLowerCase()] ||
                            statusStyles.pending
                          }`}
                        >
                          {comp.status?.toLowerCase() === "approved" && (
                            <CheckCircle2 size={12} />
                          )}
                          {comp.status?.toLowerCase() === "rejected" && (
                            <XCircle size={12} />
                          )}
                          {comp.status?.toLowerCase() !== "approved" &&
                            comp.status?.toLowerCase() !== "rejected" && (
                              <Clock3 size={12} />
                            )}
                          {comp.status || "Pending"}
                        </span>
                      </td>

                      {/* ৫. এডমিন মডারেশন অ্যাকশন বাটন প্যানেল */}
                      <td className="py-4 px-6 text-right vertical-align-middle">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Approve Action Button */}
                          {comp.status !== "Approved" && (
                            <button
                              onClick={() =>
                                handleUpdateStatus(comp._id, "Approved")
                              }
                              className="h-8 px-3 rounded-lg bg-green-600 hover:bg-green-700 text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
                              title="Approve Company"
                            >
                              Approve
                            </button>
                          )}

                          {/* Reject Action Button */}
                          {comp.status !== "Rejected" && (
                            <button
                              onClick={() =>
                                handleUpdateStatus(comp._id, "Rejected")
                              }
                              className="h-8 px-3 rounded-lg border border-red-500/20 bg-background hover:bg-red-500/10 text-red-500 text-xs font-semibold transition-all cursor-pointer"
                              title="Reject Company"
                            >
                              Reject
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
