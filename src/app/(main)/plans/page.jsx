"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  HelpCircle,
  ChevronDown,
  Rocket,
  ShieldCheck,
  Briefcase,
} from "lucide-react";

// ================= DATA STRUCTURES =================
const seekerPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/forever",
    desc: "Perfect for getting started and exploring new opportunities.",
    features: [
      "Browse & save up to 10 jobs",
      "Apply to up to 3 jobs per month",
      "Basic profile visibility",
      "Email job alerts",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    price: "$19",
    period: "/month",
    desc: "Boost your job hunt with advanced tracking and insights.",
    features: [
      "Apply to up to 30 jobs per month",
      "Unlimited saved jobs",
      "Application tracking pipeline",
      "In-depth salary insights",
    ],
    cta: "Upgrade to Pro",
    popular: true,
  },
  {
    name: "Premium",
    price: "$39",
    period: "/month",
    desc: "Maximum visibility and unlimited power for your career.",
    features: [
      "Everything in Pro",
      "Unlimited job applications",
      "Profile boost to top recruiters",
      "Early access to new jobs",
      "Priority 24/7 support",
    ],
    cta: "Go Premium",
    popular: false,
  },
];

const recruiterPlans = [
  {
    name: "Free",
    price: "$0",
    period: "/forever",
    desc: "Great for a company's first year of hiring and basic needs.",
    features: [
      "Up to 3 active job posts",
      "Basic applicant management",
      "Standard listing visibility",
    ],
    cta: "Start Free",
    popular: false,
  },
  {
    name: "Growth",
    price: "$49",
    period: "/month",
    desc: "Scale your hiring process with advanced tracking tools.",
    features: [
      "Up to 10 active job posts",
      "Full applicant tracking (ATS)",
      "Basic recruitment analytics",
      "Standard email support",
    ],
    cta: "Choose Growth",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "$149",
    period: "/month",
    desc: "Complete hiring suite with custom tools for large teams.",
    features: [
      "Up to 50 active job posts",
      "Advanced analytics dashboard",
      "Featured job listings (Top)",
      "Team collaboration accounts",
      "Custom employer branding",
      "Dedicated priority support",
    ],
    cta: "Contact Enterprise",
    popular: false,
  },
];

const faqs = [
  {
    question: "Can I cancel my subscription anytime?",
    answer:
      "Yes, absolutely! You can cancel your subscription at any time from your billing dashboard. You will retain access to your plan's premium features until the end of your current billing cycle.",
  },
  {
    question: "How do refunds work?",
    answer:
      "We offer a 7-day money-back guarantee for our Pro and Growth monthly plans if you are not satisfied. Please reach out to our support team to initiate a refund request.",
  },
  {
    question: "What payment methods do you support?",
    answer:
      "We accept all major credit and debit cards (Visa, Mastercard, American Express), Stripe, PayPal, and regional digital wallets depending on your location.",
  },
  {
    question: "Can I switch between Job Seeker and Recruiter plans?",
    answer:
      "Plans are bound to your account type (Role). If you accidentally registered with the wrong account type, please contact support to update your role before purchasing a plan.",
  },
];

// ================= COMPONENT =================
export default function PlansPage() {
  const [activeTab, setActiveTab] = useState("seeker"); // 'seeker' or 'recruiter'
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const currentPlans = activeTab === "seeker" ? seekerPlans : recruiterPlans;

  return (
    <div className="w-full min-h-screen bg-background text-foreground py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-green-500/5 blur-[120px] rounded-full dark:bg-green-500/10 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Title Section */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="text-4xl md:text-5xl font-semibold ">
            Simple, Transparent{" "}
            <span className="text-green-600 dark:text-green-400">Pricing</span>
          </h1>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Choose the perfect plan tailored to your journey. Whether you are
            searching for your dream career or building a world-class team, we
            have you covered.
          </p>
        </div>

        {/* ================= TOGGLE SWITCH ================= */}
        <div className="flex justify-center mb-16">
          <div className="relative p-1.5 bg-card border border-border rounded-2xl flex items-center shadow-sm">
            {/* Sliding Background Indicator */}
            <motion.div
              layout
              className="absolute top-1.5 bottom-1.5 bg-green-600 rounded-xl"
              initial={false}
              animate={{
                left: activeTab === "seeker" ? "6px" : "154px",
                width: activeTab === "seeker" ? "148px" : "148px",
              }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
            />

            {/* Seeker Button */}
            <button
              onClick={() => setActiveTab("seeker")}
              className={`relative z-10 w-[148px] h-11 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer ${
                activeTab === "seeker"
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Briefcase size={16} />
              For Job Seekers
            </button>

            {/* Recruiter Button */}
            <button
              onClick={() => setActiveTab("recruiter")}
              className={`relative z-10 w-[148px] h-11 text-sm font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors duration-200 cursor-pointer ${
                activeTab === "recruiter"
                  ? "text-white"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Rocket size={16} />
              For Recruiters
            </button>
          </div>
        </div>

        {/* ================= PRICING CARDS GRID ================= */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          {currentPlans.map((plan, index) => (
            <div
              key={index}
              className={`relative flex flex-col rounded-md border p-8 bg-card transition-all duration-300 ${
                plan.popular
                  ? "border-green-500 shadow-[0_15px_40px_rgba(34,197,94,0.08)] lg:-translate-y-2"
                  : "border-border shadow-sm hover:border-muted-foreground/20"
              }`}
            >
              {/* Popular Batch Tag */}
              {plan.popular && (
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-green-600 text-white text-xs font-bold uppercase tracking-widest px-4 py-1 rounded-full shadow-md">
                  Most Popular
                </span>
              )}

              {/* Card Meta */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-2 text-xs text-muted-foreground min-h-[32px] leading-relaxed">
                  {plan.desc}
                </p>
              </div>

              {/* Pricing View */}
              <div className="flex items-baseline gap-1 mb-6 border-b border-border pb-6">
                <span className="text-5xl font-bold text-foreground tracking-tight">
                  {plan.price}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {plan.period}
                </span>
              </div>

              {/* Key Features List */}
              <div className="space-y-4 flex-1 mb-8">
                {plan.features.map((feature, fIndex) => (
                  <div key={fIndex} className="flex items-start gap-3 text-sm">
                    <div className="mt-0.5 rounded-full p-0.5 bg-green-500/10 text-green-600 dark:text-green-400 shrink-0">
                      <Check size={14} className="stroke-[3]" />
                    </div>
                    <span className="text-muted-foreground leading-normal">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Action Button */}
              <button
                className={`w-full h-12 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                  plan.popular
                    ? "bg-green-600 hover:bg-green-700 text-white shadow-[0_4px_20px_rgba(34,197,94,0.2)]"
                    : "bg-muted hover:bg-border border border-border text-foreground"
                }`}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </motion.div>

        {/* ================= FAQ ACCORDION SECTION ================= */}
        <div className="mt-32 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex p-2 rounded-xl bg-muted text-green-600 dark:text-green-400 mb-3">
              <HelpCircle size={20} />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
              Have questions about billing or plan capabilities? Find clear
              answers below.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="border border-border bg-card rounded-2xl overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left font-semibold text-base text-foreground cursor-pointer group"
                  >
                    <span>{faq.question}</span>
                    <ChevronDown
                      size={18}
                      className={`text-muted-foreground transition-transform duration-300 group-hover:text-foreground ${
                        isOpen ? "rotate-180 text-green-500" : ""
                      }`}
                    />
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-5 text-sm text-muted-foreground leading-relaxed border-t border-border/40 pt-3">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
