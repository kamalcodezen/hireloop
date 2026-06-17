"use client";

import { useState } from "react";
import {
  Building2,
  Globe,
  MapPin,
  Users,
  Pencil,
  Upload,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";
import { createCompany } from "@/lib/action/companies";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function CompanyProfile({ recruiter, recruiterCompany }) {
  const [company, setCompany] = useState(recruiterCompany);
  const [isEditing, setIsEditing] = useState(false);

  //  ট্রিক ১: যদি আগে থেকে কোম্পানির লোগো থাকে, তবে সেটি ডিফল্ট স্টেট হিসেবে সেট থাকবে
  const [logoUrl, setLogoUrl] = useState(recruiterCompany?.logo || "");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogoUpload = async (e) => {
    const image = e.target.files[0];
    if (!image) return;

    setLoading(true);
    const formData = new FormData();
    formData.append("image", image);

    try {
      const res = await fetch(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_SERVER_IMAGE_UPLOAD_URL}`,
        {
          method: "POST",
          body: formData,
        },
      );

      const data = await res.json();
      if (data.success) {
        setLogoUrl(data.data.url);
        // toast.success("Logo uploaded successfully!");
      }
    } catch (error) {
      // console.log(error);
      toast.error("Logo upload failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = new FormData(e.target);

    const companyData = {
      name: form.get("name"),
      website: form.get("website"),
      industry: form.get("industry"),
      location: form.get("location"),
      employeeCount: form.get("employeeCount"),
      description: form.get("description"),
      logo: logoUrl || company?.logo, //  ট্রিক ২: নতুন লোগো আপলোড না করলে পুরোনো লোগোটিই থাকবে
      status: company?.status || "Pending", // আগের স্ট্যাটাসটি ধরে রাখবে
      recruiterId: recruiter?.id,
    };

    const payload = await createCompany(companyData);

    if (payload.insertedId || payload.modifiedCount || payload.success) {
      //  ট্রিক ৩: ডাটাবেজ থেকে নতুন আইডি আসলে বা সাকসেস হলে ইনস্ট্যান্ট লোকাল স্টেট আপডেট
      const newCompany = {
        ...companyData,
        _id: payload.insertedId || company?._id,
      };

      setCompany(newCompany);
      setIsEditing(false);
      toast.success(
        company?._id
          ? "Company Updated Successfully"
          : "Company Created Successfully",
      );

      // জাদুর লাইন: এটি রিফ্রেশ ছাড়া ব্যাকগ্রাউন্ডে Next.js-এর সার্ভার ক্যাশ রিফ্রেশ করে দেয়
      router.refresh();
    } else {
      toast.error("Something went wrong");
    }
  };

  const getStatusBadge = (status) => {
    if (status === "Approved") {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-500 dark:text-green-400">
          <CheckCircle2 size={16} />
          Approved
        </div>
      );
    }

    if (status === "Rejected") {
      return (
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 dark:text-red-400">
          <XCircle size={16} />
          Rejected
        </div>
      );
    }

    return (
      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400">
        <Clock3 size={16} />
        Pending
      </div>
    );
  };

  /* =========================
     NO COMPANY REGISTERED
  ========================== */
  if (!company?._id && !isEditing) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl border border-border bg-card p-10 text-center shadow-sm">
            <div className="w-20 h-20 mx-auto rounded-3xl bg-green-500/10 flex items-center justify-center mb-6">
              <Building2
                className="text-green-500 dark:text-green-400"
                size={40}
              />
            </div>

            <h1 className="text-4xl font-bold tracking-tight">
              Register Your Company
            </h1>
            <p className="text-muted-foreground mt-4 max-w-xl mx-auto text-sm leading-relaxed">
              Create your company profile to start posting jobs, manage
              applicants and grow your employer brand.
            </p>

            <button
              onClick={() => setIsEditing(true)}
              className="mt-8 px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 font-semibold text-white shadow-sm transition-all cursor-pointer"
            >
              Register Company
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     REGISTER / EDIT FORM
  ========================== */
  if (!company?._id || isEditing) {
    return (
      <div className="min-h-screen bg-background text-foreground p-6">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
            <h1 className="text-3xl font-bold tracking-tight">
              {company?._id ? "Edit Company" : "Register Company"}
            </h1>
            <p className="text-sm text-muted-foreground mb-8">
              Complete your company profile details.
            </p>

            <form onSubmit={handleSubmit}>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 text-sm font-medium text-muted-foreground">
                    Company Name
                  </label>
                  <input
                    name="name"
                    required
                    defaultValue={company?.name}
                    placeholder="Google"
                    className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground outline-none focus:border-green-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-muted-foreground">
                    Website
                  </label>
                  <input
                    name="website"
                    required
                    defaultValue={company?.website}
                    placeholder="https://company.com"
                    className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground outline-none focus:border-green-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-muted-foreground">
                    Industry
                  </label>
                  <input
                    name="industry"
                    required
                    defaultValue={company?.industry}
                    placeholder="Technology"
                    className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground outline-none focus:border-green-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-muted-foreground">
                    Location
                  </label>
                  <input
                    name="location"
                    required
                    defaultValue={company?.location}
                    placeholder="California, USA"
                    className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground outline-none focus:border-green-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-muted-foreground">
                    Employee Count
                  </label>
                  <select
                    name="employeeCount"
                    defaultValue={company?.employeeCount}
                    className="w-full h-12 px-4 rounded-xl bg-background border border-border text-foreground outline-none focus:border-green-500 transition-colors"
                  >
                    <option value="1-10">1-10 employees</option>
                    <option value="11-50">11-50 employees</option>
                    <option value="51-200">51-200 employees</option>
                    <option value="201-500">201-500 employees</option>
                    <option value="500+">500+ employees</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-muted-foreground">
                    Company Logo
                  </label>
                  <label className="h-12 px-4 rounded-xl bg-background border border-border flex items-center gap-3 cursor-pointer hover:border-green-500 text-muted-foreground transition-colors">
                    <Upload size={18} />
                    <span className="text-sm font-medium">
                      {loading
                        ? "Uploading..."
                        : logoUrl
                          ? "Change Logo"
                          : "Upload Logo"}
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Logo Preview Area */}
              {logoUrl && (
                <div className="mt-6 flex flex-col gap-2">
                  <span className="text-xs font-semibold text-muted-foreground">
                    Logo Preview:
                  </span>
                  <img
                    src={logoUrl}
                    alt="logo preview"
                    className="w-24 h-24 object-contain rounded-xl p-2 border border-border bg-muted/30"
                  />
                </div>
              )}

              <div className="mt-6">
                <label className="block mb-2 text-sm font-medium text-muted-foreground">
                  Description
                </label>
                <textarea
                  name="description"
                  rows="5"
                  required
                  defaultValue={company?.description}
                  placeholder="Tell us about your company mission, values and work culture..."
                  className="w-full rounded-2xl bg-background border border-border p-4 text-foreground outline-none focus:border-green-500 transition-colors resize-none"
                />
              </div>

              <div className="flex gap-4 mt-8">
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 h-12 rounded-xl bg-green-600 hover:bg-green-700 disabled:opacity-50 font-semibold text-white shadow-sm transition-all cursor-pointer"
                >
                  {company?._id ? "Update Company" : "Create Company"}
                </button>

                {company?._id && (
                  <button
                    type="button"
                    onClick={() => {
                      setIsEditing(false);
                      setLogoUrl(company.logo || ""); // রিসেট লোগো স্টেট
                    }}
                    className="px-8 h-12 rounded-xl border border-border bg-background hover:bg-muted text-foreground font-medium transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     COMPANY PROFILE VIEW
  ========================== */
  return (
    <div className="min-h-screen bg-background text-foreground p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Profile Header Card */}
        <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
            <div className="flex items-center gap-5">
              <div className="w-24 h-24 rounded-2xl border border-border bg-background p-3 flex items-center justify-center shadow-inner shrink-0">
                <img
                  src={company.logo || "https://placehold.co/150x150"}
                  alt={company.name}
                  className="max-h-full max-w-full object-contain"
                />
              </div>

              <div>
                <h1 className="text-3xl font-black tracking-tight">
                  {company.name}
                </h1>
                <div className="mt-3">{getStatusBadge(company.status)}</div>
              </div>
            </div>

            <button
              onClick={() => {
                setIsEditing(true);
                setLogoUrl(company.logo || "");
              }}
              className="px-5 h-11 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400 flex items-center gap-2 hover:bg-green-500/20 font-semibold text-sm transition-colors cursor-pointer"
            >
              <Pencil size={14} />
              Edit Profile
            </button>
          </div>
        </div>

        {/* Stats Information Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
            <div className="p-2 w-10 h-10 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center">
              <Globe size={20} />
            </div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-4">
              Website
            </p>
            <a
              href={company.website}
              target="_blank"
              rel="noreferrer"
              className="font-bold text-sm text-foreground mt-1 block hover:text-green-600 dark:hover:text-green-400 truncate hover:underline"
            >
              {company.website}
            </a>
          </div>

          <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
            <div className="p-2 w-10 h-10 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center">
              <Building2 size={20} />
            </div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-4">
              Industry
            </p>
            <h3 className="font-bold text-sm text-foreground mt-1 truncate">
              {company.industry}
            </h3>
          </div>

          <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
            <div className="p-2 w-10 h-10 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center">
              <MapPin size={20} />
            </div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-4">
              Location
            </p>
            <h3 className="font-bold text-sm text-foreground mt-1 truncate">
              {company.location}
            </h3>
          </div>

          <div className="rounded-2xl bg-card border border-border p-5 shadow-sm">
            <div className="p-2 w-10 h-10 rounded-xl bg-green-500/10 text-green-600 dark:text-green-400 flex items-center justify-center">
              <Users size={20} />
            </div>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mt-4">
              Employees
            </p>
            <h3 className="font-bold text-sm text-foreground mt-1 truncate">
              {company.employeeCount} Members
            </h3>
          </div>
        </div>

        {/* About Card Panel */}
        <div className="rounded-3xl bg-card border border-border p-8 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-4">
            About Company
          </h2>
          <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {company.description}
          </p>
        </div>
      </div>
    </div>
  );
}
