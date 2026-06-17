"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";

// FIXED: Seeker এবং Recruiter এর জন্য প্রয়োজনীয় সব আইকন একসঙ্গে ইম্পোর্ট করা হয়েছে
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  Building2,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Search,
  Bookmark,
  CreditCard,
  BriefcaseBusiness,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { toast } from "react-toastify";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const { data: session } = authClient.useSession();
  const user = session?.user;

  // logout function
  const handleSignOut = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("See you soon! 👋 Logged out successfully", {
            position: "top-right",
            autoClose: 2000,
          });
          router.push("/");
          router.refresh();
        },
      },
    });
  };

  // Recruiter Dashboard Links
  const recruiterNavLinks = [
    {
      title: "Home",
      href: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    {
      title: "Jobs",
      href: "/dashboard/recruiter/jobs",
      icon: Briefcase,
    },
    {
      title: "Post A Job",
      href: "/dashboard/recruiter/jobs/new",
      icon: FileText,
    },
    {
      title: "Company Profile",
      href: "/dashboard/recruiter/company",
      icon: Building2,
    },
    {
      title: "Applicants",
      href: "/dashboard/recruiter",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/dashboard/recruiter",
      icon: Settings,
    },
  ];

  // Seeker Dashboard Links
  const seekerNavLinks = [
    {
      title: "Dashboard",
      href: "/dashboard/seeker",
      icon: LayoutDashboard,
    },
    {
      title: "Jobs",
      href: "/jobs",
      icon: Search,
    },
    {
      title: "Saved Jobs",
      href: "/dashboard/seeker/saved-jobs",
      icon: Bookmark,
    },
    {
      title: "Applications",
      href: "/dashboard/seeker/applications",
      icon: FileText,
    },
    {
      title: "Billing",
      href: "/dashboard/seeker/billing",
      icon: CreditCard,
    },
    {
      title: "Settings",
      href: "/dashboard/seeker/settings",
      icon: Settings,
    },
  ];

    // Admin Dashboard Links
  const adminNavLinks = [
    {
      title: "Dashboard",
      href: "/dashboard/admin",
      icon: LayoutDashboard,
    },
    {
      title: "Users",
      href: "/dashboard/admin/users",
      icon: Users,
    },
    {
      title: "Companies",
      href: "/dashboard/admin/companies",
      icon: Building2,
    },
    {
      title: "Jobs",
      href: "/dashboard/admin/jobs",
      icon: BriefcaseBusiness,
    },
    {
      title: "Payments",
      href: "/dashboard/admin/payments",
      icon: CreditCard,
    },
    {
      title: "Settings",
      href: "/dashboard/admin/settings",
      icon: Settings,
    },
  ];

  const dashboardNavLinks = {
    seeker: seekerNavLinks,
    recruiter: recruiterNavLinks,
    admin: adminNavLinks,
  };

  // ইউজারের রোল অনুযায়ী মেনু সিলেক্ট করা (ডিফল্ট: seeker)
  const menus = dashboardNavLinks[user?.role || "seeker"];

  return (
    <>
      {/* ================= FIXED: MOBILE TOPBAR ================= */}
      <div className="lg:hidden h-16 border-b border-border bg-card px-4 flex items-center justify-between sticky top-0 z-40">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          <Link href="/">
            Hire<span className="text-green-600 dark:text-green-400">Edge</span>
          </Link>
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="w-10 h-10 rounded-xl border border-border bg-background flex items-center justify-center text-foreground cursor-pointer hover:bg-muted transition-colors"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/50 dark:bg-black/70 backdrop-blur-sm z-[45]"
        />
      )}

      {/* ================= FIXED: MOBILE DRAWER ================= */}
      <div
        className={`lg:hidden fixed top-0 left-0 w-[280px] h-screen bg-card border-r border-border z-50 transition-transform duration-300 flex flex-col ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-5 flex items-center justify-between border-b border-border">
          <h2 className="text-2xl font-black tracking-tight text-foreground">
            Hire<span className="text-green-600 dark:text-green-400">Edge</span>
          </h2>

          <button
            onClick={() => setOpen(false)}
            className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Links Navigation */}
        <div className="p-4 space-y-1.5 flex-1 overflow-y-auto">
          {menus.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-muted-foreground hover:bg-green-500/10 hover:text-green-600 dark:hover:text-green-400"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-white" : "opacity-80"}
                />
                {item.title}
              </Link>
            );
          })}
        </div>

        {/* Logout Button Mobile */}
        <div className="p-4 border-t border-border/60">
          <button className="w-full h-11 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 flex items-center justify-center gap-2 font-semibold text-sm transition-colors cursor-pointer">
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </div>

      {/* ================= FIXED: DESKTOP SIDEBAR ================= */}
      <aside className="hidden lg:flex flex-col w-[280px] h-screen sticky top-0 bg-card border-r border-border p-6 shadow-[4px_0_30px_rgba(0,0,0,0.01)] dark:shadow-[4px_0_30px_rgba(34,197,94,0.005)]">
        <div>
          <h2 className="text-3xl font-black tracking-tight text-foreground">
            <Link href="/">
              Hire
              <span className="text-green-600 dark:text-green-400">Edge</span>
            </Link>
          </h2>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mt-1.5 pl-0.5">
            Dashboard Panel
          </p>
        </div>

        {/* Desktop Links */}
        <div className="mt-10 space-y-1.5 flex-1 overflow-y-auto">
          {menus.map((item,ind) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={ind}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                  isActive
                    ? "bg-green-600 text-white shadow-[0_4px_15px_rgba(34,197,94,0.15)]"
                    : "text-muted-foreground hover:bg-green-500/10 hover:text-green-600 dark:hover:text-green-400"
                }`}
              >
                <Icon
                  size={18}
                  className={isActive ? "text-white" : "opacity-80"}
                />
                {item.title}
              </Link>
            );
          })}
        </div>

        {/* Logout Button Desktop */}
        <div className="mt-auto pt-4 border-t border-border/60">
          <button
            onClick={handleSignOut}
            type="submit"
            className="w-full h-11 rounded-xl border border-red-500/20 text-red-500 hover:bg-red-500/10 flex items-center justify-center gap-2 font-semibold text-sm transition-colors cursor-pointer"
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
