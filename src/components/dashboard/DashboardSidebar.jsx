"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  User,
  FileText,
  Briefcase,
  Users,
  Settings,
  Menu,
  X,
  LogOut,
  Building2,
} from "lucide-react";

const DashboardSidebar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const menus = [
    {
      title: "Home",
      href: "/dashboard/recruiter",
      icon: LayoutDashboard,
    },
    // {
    //   title: "Jobs",
    //   href: "/dashboard/recruiter/jobs",
    //   icon: User,
    // },
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
      href: "/dashboard/applicants",
      icon: Users,
    },
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <>
      {/* ================= MOBILE TOPBAR ================= */}

      <div
        className="
        lg:hidden
        h-16
        border-b
        border-gray-200
        dark:border-white/10
        bg-white
        dark:bg-[#081C15]
        px-4
        flex
        items-center
        justify-between
        
      "
      >
        <h2 className="text-xl font-bold">
          Hire
          <span className="text-green-600">Edge</span>
        </h2>

        <button
          onClick={() => setOpen(true)}
          className="
          w-10
          h-10
          rounded-lg
          border
          border-gray-200
          dark:border-white/10
          flex
          items-center
          justify-center cursor-pointer
        "
        >
          <Menu size={20} />
        </button>
      </div>

      {/* ================= MOBILE OVERLAY ================= */}

      {open && (
        <div
          onClick={() => setOpen(false)}
          className="
          lg:hidden
          fixed
          inset-0
          bg-black/50
          z-40
        "
        />
      )}

      {/* ================= MOBILE DRAWER ================= */}

      <div
        className={`
        lg:hidden
        fixed
        top-0
        left-0
        w-[280px]
        h-screen
        bg-white
        dark:bg-[#081C15]
        border-r
        border-gray-200
        dark:border-white/10
        z-50
        transition-all
        duration-300
        ${open ? "translate-x-0" : "-translate-x-full"}
      `}
      >
        <div
          className="
          p-5
          flex
          items-center
          justify-between
          border-b
          border-gray-200
          dark:border-white/10
        "
        >
          <h2 className="text-2xl font-bold">
            Hire
            <span className="text-green-600">Edge</span>
          </h2>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        <div className="p-4 space-y-2">
          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition-all
                  ${
                    pathname === item.href
                      ? "bg-green-600 text-white"
                      : "hover:bg-green-500/10"
                  }
                `}
              >
                <Icon size={20} />
                {item.title}
              </Link>
            );
          })}
        </div>

        <div className="absolute bottom-6 left-4 right-4">
          <button
            className="
            w-full
            h-11
            rounded-xl
            border
            border-red-500/20
            text-red-500
            hover:bg-red-500/10
            flex
            items-center
            justify-center
            gap-2
          "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* ================= DESKTOP SIDEBAR ================= */}

      <aside
        className="
        hidden
        lg:flex
        flex-col
        w-[280px]
        h-screen
        sticky
        top-0
        bg-white
        dark:bg-[#081C15]
        border-r
        border-gray-200
        dark:border-white/10
        p-6
        
      "
      >
        <div>
          <h2 className="text-3xl font-bold">
            Hire
            <span className="text-green-600">Edge</span>
          </h2>

          <p className="text-sm text-muted-foreground mt-1">Dashboard Panel</p>
        </div>

        <div className="mt-10 space-y-2">
          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex
                  items-center
                  gap-3
                  px-4
                  py-3
                  rounded-xl
                  transition-all
                  ${
                    pathname === item.href
                      ? "bg-green-600 text-white"
                      : "hover:bg-green-500/10"
                  }
                `}
              >
                <Icon size={20} />
                {item.title}
              </Link>
            );
          })}
        </div>

        <div className="mt-auto">
          <button
            className="
            w-full
            h-11
            rounded-xl
            border
            border-red-500/20
            text-red-500
            hover:bg-red-500/10
            flex
            items-center
            justify-center
            gap-2 cursor-pointer
          "
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default DashboardSidebar;
