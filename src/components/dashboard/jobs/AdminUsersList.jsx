"use client";

import React, { useState, useMemo, useEffect } from "react";
// 🎯 প্রজেক্টে ইতিমধ্যেই ইনস্টল থাকা lucide-react আইকনসমূহ
import {
  Users,
  User,
  Building2,
  Shield,
  Search,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle,
} from "lucide-react";

import { updateUserRole } from "@/lib/action/users";
import { useRouter } from "next/navigation";

export default function AdminUsersList({ users: initialUsers = [] }) {
  const router = useRouter();

  //  সার্চ, ফিল্টার এবং মডাল ট্র্যাকিং স্টেটসমূহ
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [pendingChange, setPendingChange] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  //  লাইভ ডাটা রিফ্রেশ ট্র্যাকিং লোকাল স্টেট (UI ফ্রোজেন হওয়া ঠেকাতে)
  const [localUsers, setLocalUsers] = useState(initialUsers);

  //  যখনই router.refresh() সার্ভার থেকে নতুন ডাটা আনবে, এটি লোকাল স্টেটকে সিঙ্ক করবে
  useEffect(() => {
    setLocalUsers(initialUsers);
  }, [initialUsers]);

  //  MongoDB ISO ডেট ফরমেট করার হেল্পার ফাংশন
  const formatDate = (dateObj) => {
    if (!dateObj) return "N/A";
    const dateStr = dateObj.$date ? dateObj.$date : dateObj;
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    });
  };


  //  useMemo দিয়ে লাইভ সার্চ ও ফিল্টারিং 
  const filteredUsers = useMemo(() => {
    return localUsers.filter((user) => {
      const matchesSearch =
        user.name?.toLowerCase().includes(search.toLowerCase()) ||
        user.email?.toLowerCase().includes(search.toLowerCase());

      const matchesRole = roleFilter === "all" || user.role === roleFilter;
      return matchesSearch && matchesRole;
    });
  }, [localUsers, search, roleFilter]);


  //  মডাল পপআপ ট্রিগার করার ফাংশন
  const initiateRoleChange = (userId, userName, newRole) => {
    setPendingChange({ userId, userName, newRole });
    setIsConfirmOpen(true);
  };

  // কনফার্ম বাটনে চাপ দিলে রোল আপডেট এক্সিকিউট করার মূল ফাংশন
  const confirmRoleChange = async () => {
    if (!pendingChange) return;

    setIsUpdating(true);
    try {
      const { userId, newRole } = pendingChange;

      // await updateUserRole(userId, newRole);

      setLocalUsers((prev) =>
        prev.map((u) =>
          getUserId(u) === userId ? { ...u, role: newRole } : u,
        ),
      );

      setIsConfirmOpen(false);
      setPendingChange(null);

      router.refresh();
    } catch (error) {
      console.error("Failed to update user role:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="relative w-full space-y-8 text-white">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          User Management
        </h1>
        <p className="text-sm text-white/50 mt-2">
          Manage all platform users, recruiters and permissions clearance.
        </p>
      </div>

      {/*  Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
        <div className="rounded-xl border border-white/10 bg-[#051610] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <Users className="text-green-500 w-5 h-5" />
          </div>
          <h2 className="text-3xl font-bold mt-4 text-white">
            {localUsers.length}
          </h2>
          <p className="text-white/50 mt-1 text-sm">Total Users</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#051610] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <Building2 className="text-blue-500 w-5 h-5" />
          </div>
          <h2 className="text-3xl font-bold mt-4 text-white">
            {localUsers.filter((u) => u.role === "recruiter").length}
          </h2>
          <p className="text-white/50 mt-1 text-sm">Recruiters</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#051610] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <User className="text-amber-500 w-5 h-5" />
          </div>
          <h2 className="text-3xl font-bold mt-4 text-white">
            {localUsers.filter((u) => u.role === "seeker").length}
          </h2>
          <p className="text-white/50 mt-1 text-sm">Job Seekers</p>
        </div>
        <div className="rounded-xl border border-white/10 bg-[#051610] p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <Shield className="text-red-500 w-5 h-5" />
          </div>
          <h2 className="text-3xl font-bold mt-4 text-white">
            {localUsers.filter((u) => u.role === "admin").length}
          </h2>
          <p className="text-white/50 mt-1 text-sm">Admins</p>
        </div>
      </div>

      {/*  search and filter */}
      <div className="rounded-xl border border-white/10 bg-[#051610] p-5 shadow-xl">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40"
            />
            <input
              type="text"
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-12 rounded-xl border border-white/10 bg-white/[0.02] pl-11 pr-4 outline-none text-white focus:border-green-500/50 transition-colors text-sm"
            />
          </div>
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            className="h-12 px-4 rounded-xl border border-white/10 bg-white/[0.02] text-white/70 outline-none text-sm cursor-pointer focus:border-green-500/50 transition-colors"
          >
            <option value="all" className="bg-[#051610]">
              All Roles
            </option>
            <option value="admin" className="bg-[#051610]">
              Admin
            </option>
            <option value="recruiter" className="bg-[#051610]">
              Recruiter
            </option>
            <option value="seeker" className="bg-[#051610]">
              Seeker
            </option>
          </select>
        </div>
      </div>

      {/*  mai data table */}
      <div className="w-full bg-[#051610] border border-white/10 rounded-xl overflow-hidden shadow-2xl font-sans">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left text-sm text-white/70">
            <thead>
              <tr className="border-b border-white/10 text-white/60 font-medium select-none bg-white/[0.02]">
                <th className="py-5 px-6 font-semibold">User</th>
                <th className="py-5 px-6 font-semibold">Email</th>
                <th className="py-5 px-6 font-semibold">Role</th>
                <th className="py-5 px-6 font-semibold">Joined</th>
                <th className="py-5 px-6 font-semibold">Plan</th>
                <th className="py-5 px-6 font-semibold text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-white/10 bg-[#051610]">
              {filteredUsers.map((user) => {
                const userId = getUserId(user);
                const userRole = user.role?.toLowerCase() || "seeker";

                return (
                  <tr
                    key={userId}
                    className="hover:bg-white/[0.01] transition-all duration-150"
                  >
                    {/* Avatar + Name */}
                    <td className="py-4 px-6 font-medium text-white whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-xs text-white font-bold tracking-wider border border-white/5">
                          {user.name
                            ? user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()
                            : "U"}
                        </div>
                        <span>{user.name || "Unknown User"}</span>
                      </div>
                    </td>

                    {/* Email */}
                    <td className="py-4 px-6 text-white/70 whitespace-nowrap">
                      {user.email}
                    </td>

                    {/* Role Badges */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      {userRole === "recruiter" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                          <Building2 size={12} />
                          Recruiter
                        </span>
                      ) : userRole === "admin" ? (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-red-500/10 text-red-400 border border-red-500/20 capitalize">
                          <Shield size={12} />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                          <User size={12} />
                          Seeker
                        </span>
                      )}
                    </td>

                    {/* Join Date */}
                    <td className="py-4 px-6 text-white/50 whitespace-nowrap">
                      {formatDate(user.createdAt)}
                    </td>

                    {/* Plan */}
                    <td className="py-4 px-6 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 text-xs font-medium rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wide">
                        {user.plan || "free"}
                      </span>
                    </td>

                    {/* 🛠️ ইন-লাইন কুইক অ্যাকশন বাটনসমূহ */}
                    <td className="py-4 px-6 text-right whitespace-nowrap text-xs font-medium">
                      <div className="flex items-center justify-end gap-4">
                        {userRole !== "admin" && (
                          <button
                            onClick={() =>
                              initiateRoleChange(userId, user.name, "admin")
                            }
                            className="text-white/50 hover:text-white transition-colors cursor-pointer"
                          >
                            Make Admin
                          </button>
                        )}
                        {userRole !== "recruiter" && (
                          <button
                            onClick={() =>
                              initiateRoleChange(userId, user.name, "recruiter")
                            }
                            className="text-white/50 hover:text-white transition-colors cursor-pointer"
                          >
                            Make Recruiter
                          </button>
                        )}
                        {userRole !== "seeker" && (
                          <button
                            onClick={() =>
                              initiateRoleChange(userId, user.name, "seeker")
                            }
                            className="text-white/50 hover:text-white transition-colors cursor-pointer"
                          >
                            Make Seeker
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-white/10 text-xs text-white/40 select-none bg-white/[0.01]">
          <div>
            Showing 1 to {filteredUsers.length} of {localUsers.length} users
          </div>
          <div className="flex items-center gap-1">
            <button className="p-1 hover:text-white transition-colors cursor-pointer">
              <ChevronLeft size={16} />
            </button>
            <button className="w-6 h-6 flex items-center justify-center bg-green-600 text-white rounded font-medium">
              1
            </button>
            <button className="p-1 hover:text-white transition-colors cursor-pointer">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* search data not found */}
      {filteredUsers.length === 0 && (
        <div className="rounded-3xl border border-dashed border-white/10 py-20 text-center bg-[#051610]">
          <h3 className="text-xl font-semibold text-white/80">
            No Users Found
          </h3>
          <p className="text-white/40 mt-2 text-sm">
            Try changing your search or filter options.
          </p>
        </div>
      )}

      {/* modal */}
      {isConfirmOpen && pendingChange && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
          <div className="w-full max-w-sm bg-[#051610] border border-white/10 rounded-2xl p-6 shadow-2xl space-y-6 relative animate-in fade-in zoom-in-95 duration-150">
            {/* modal close button */}
            <button
              onClick={() => {
                setIsConfirmOpen(false);
                setPendingChange(null);
              }}
              className="absolute top-4 right-4 text-white/40 hover:text-white p-1 rounded-lg hover:bg-white/5 cursor-pointer"
            >
              <X size={16} />
            </button>

            {/* body */}
            <div className="space-y-2">
              <h3 className="text-base font-bold text-white">
                Confirm Role Change
              </h3>
              <p className="text-xs text-white/60 leading-relaxed">
                Are you sure you want to change the role of{" "}
                <span className="text-green-400 font-medium">
                  {pendingChange?.userName}
                </span>{" "}
                to{" "}
                <span className="text-green-400 font-medium capitalize">
                  {pendingChange?.newRole}
                </span>
                ? This alters system access permissions immediately.
              </p>
            </div>

            {/* footer action buttons */}
            <div className="flex items-center justify-end gap-3 text-xs font-medium pt-2 border-t border-white/5">
              <button
                disabled={isUpdating}
                onClick={() => {
                  setIsConfirmOpen(false);
                  setPendingChange(null);
                }}
                className="px-4 py-2 text-white/70 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl transition-colors disabled:opacity-50 cursor-pointer"
              >
                Cancel
              </button>
              <button
                disabled={isUpdating}
                onClick={confirmRoleChange}
                className="px-4 py-2 text-white bg-green-600 hover:bg-green-700 rounded-xl transition-colors shadow-lg shadow-green-600/10 disabled:opacity-50 min-w-[76px] flex items-center justify-center cursor-pointer font-semibold active:scale-95 transition-all"
              >
                {isUpdating ? (
                  <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <CheckCircle size={14} className="mr-1" />
                    Confirm
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
