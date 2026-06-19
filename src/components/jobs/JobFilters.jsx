"use client";

import { TextField, InputGroup, Select, ListBox } from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";
import { motion } from "framer-motion";

const categories = [
  "Software Development",
  "Human Resources",
  "Design",
  "Marketing",
  "Finance",
  "Artificial Intelligence",
  "Cyber Security",
];

// 🎭 মোশন ভেরিয়েন্ট ১: পুরো লিস্টের মেইন কন্টেইনারের জন্য (Stagger Children)
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05, // ⚡ জাদুর লাইন: একটার পর একটা আইটেম ০.০৫ সেকেন্ড পর পর নামবে
    },
  },
};

// 🎭 মোশন ভেরিয়েন্ট ২: প্রতিটা আলাদা আলাদা লিস্ট আইটেমের জন্য
const itemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function JobFilters({
  searchQuery,
  setSearchQuery,
  selectedType,
  setSelectedType,
  selectedCategory,
  setSelectedCategory,
  isRemoteOnly,
  setIsRemoteOnly,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="bg-card/80 backdrop-blur-xl border border-border rounded p-6 mb-3 shadow-[0_4px_30px_rgba(0,0,0,0.03)] dark:shadow-[0_4px_30px_rgba(34,197,94,0.02)]"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-end">
        {/* ১. Search Field */}
        <div className="lg:col-span-5 flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground pl-1">
            Search Jobs
          </label>
          <TextField
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
            aria-label="search jobs"
            className="w-full"
          >
            <InputGroup className="bg-background border border-border rounded-xl transition-all duration-300 focus-within:!border-green-500 focus-within:!outline-none focus-within:!ring-2 focus-within:!ring-green-500/20 focus-within:!shadow-[0_0_15px_rgba(34,197,94,0.12)]">
              <InputGroup.Prefix className="pl-4 pr-1 text-muted-foreground/70">
                <Magnifier className="w-4 h-4" />
              </InputGroup.Prefix>
              <InputGroup.Input
                suppressHydrationWarning
                placeholder="Title, company, or keywords..."
                className="bg-transparent text-foreground placeholder-muted-foreground/50 text-sm h-12 outline-none w-full border-0 !focus:ring-0 !focus:outline-none px-2"
              />
            </InputGroup>
          </TextField>
        </div>

        {/* ২. Job Type Select (একটার পর একটা নামার মোশন ফিক্সড) */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground pl-1">
            Job Type
          </label>
          <Select
            selectedKey={selectedType}
            onSelectionChange={(key) => setSelectedType(key)}
            aria-label="Filter jobs by type"
          >
            <Select.Trigger
              suppressHydrationWarning
              className="w-full h-12 flex items-center justify-between rounded-xl border border-border bg-background px-4 text-sm text-foreground hover:border-muted-foreground/30 focus:!border-green-500 focus-within:!border-green-500 focus:!outline-none focus:!ring-2 focus:!ring-green-500/20 focus:!shadow-[0_0_15px_rgba(34,197,94,0.12)] transition-all duration-300"
            >
              <Select.Value>
                {selectedType === "all" || !selectedType
                  ? "All Types"
                  : selectedType}
              </Select.Value>
              <span className="flex items-center text-muted-foreground/70">
                <ChevronDown className="w-4 h-4" />
              </span>
            </Select.Trigger>

            <Select.Popover className="bg-transparent border-0 shadow-none mt-2 overflow-hidden z-50">
              {/* 🎯 মেইন লিস্ট কন্টেইনারে অ্যানিমেশন Variants দেওয়া হলো */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-card border border-border rounded-xl shadow-xl overflow-hidden p-1.5 min-w-[200px] bg-background"
              >
                <ListBox className="p-0 m-0 border-0 shadow-none bg-transparent gap-1">
                  {[
                    "all",
                    "Full-Time",
                    "Part-Time",
                    "Contract",
                    "Internship",
                  ].map((type) => (
                    <ListBox.Item
                      key={type}
                      id={type}
                      textValue={type === "all" ? "All Types" : type}
                      className="p-0 m-0 bg-transparent"
                    >
                      {/* 🎯 প্রতিটা আইটেম এখন আলাদা করে উপর থেকে স্লাইড হয়ে নামবে */}
                      <motion.div
                        variants={itemVariants}
                        className="flex items-center text-foreground hover:!bg-green-600 hover:!text-white rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors w-full h-full"
                      >
                        {type === "all" ? "All Types" : type}
                      </motion.div>
                    </ListBox.Item>
                  ))}
                </ListBox>
              </motion.div>
            </Select.Popover>
          </Select>
        </div>

        {/* ৩. Category Select (একটার পর একটা নামার মোশন ফিক্সড) */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground pl-1">
            Category
          </label>
          <Select
            selectedKey={selectedCategory}
            onSelectionChange={(key) => setSelectedCategory(key)}
            aria-label="Filter jobs by category"
          >
            <Select.Trigger
              suppressHydrationWarning
              className="w-full h-12 flex items-center justify-between rounded-xl border border-border bg-background px-4 text-sm text-foreground hover:border-muted-foreground/30 focus:!border-green-500 focus-within:!border-green-500 focus:!outline-none focus:!ring-2 focus:!ring-green-500/20 focus:!shadow-[0_0_15px_rgba(34,197,94,0.12)] transition-all duration-300"
            >
              <Select.Value>
                {selectedCategory === "all" || !selectedCategory
                  ? "All Categories"
                  : selectedCategory}
              </Select.Value>
              <span className="flex items-center text-muted-foreground/70">
                <ChevronDown className="w-4 h-4" />
              </span>
            </Select.Trigger>

            <Select.Popover className="bg-transparent border-0 shadow-none mt-2 overflow-hidden z-50">
              {/* 🎯 ক্যাটাগরি লিস্টের জন্যও একই ডাইনামিক একটার পর একটা নামার অ্যানিমেশন */}
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="bg-card border border-border rounded-xl shadow-xl overflow-hidden p-1.5 min-w-[220px] max-h-[300px] overflow-y-auto bg-background"
              >
                <ListBox className="p-0 m-0 border-0 shadow-none bg-transparent gap-1">
                  <ListBox.Item
                    id="all"
                    textValue="All Categories"
                    className="p-0 m-0 bg-transparent"
                  >
                    <motion.div
                      variants={itemVariants}
                      className="flex items-center text-foreground hover:!bg-green-600 hover:!text-white rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors w-full h-full"
                    >
                      All Categories
                    </motion.div>
                  </ListBox.Item>

                  {categories.map((category) => (
                    <ListBox.Item
                      key={category}
                      id={category}
                      textValue={category}
                      className="p-0 m-0 bg-transparent"
                    >
                      <motion.div
                        variants={itemVariants}
                        className="flex items-center text-foreground hover:!bg-green-600 hover:!text-white rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors w-full h-full"
                      >
                        {category}
                      </motion.div>
                    </ListBox.Item>
                  ))}
                </ListBox>
              </motion.div>
            </Select.Popover>
          </Select>
        </div>

        {/* ৪. Remote Checkbox */}
        <div className="lg:col-span-1 flex items-center justify-start lg:justify-center h-12 pb-1">
          <label className="group flex items-center gap-2.5 cursor-pointer select-none">
            <div className="relative flex items-center">
              <input
                type="checkbox"
                checked={isRemoteOnly}
                onChange={(e) => setIsRemoteOnly(e.target.checked)}
                className="peer accent-green-600 w-4.5 h-4.5 rounded border-border bg-background cursor-pointer transition-all focus:ring-0"
              />
            </div>
            <span className="text-sm font-medium text-foreground group-hover:text-green-500 transition-colors duration-200">
              Remote
            </span>
          </label>
        </div>
      </div>
    </motion.div>
  );
}
