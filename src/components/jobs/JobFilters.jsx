"use client";

import { TextField, InputGroup, Select, ListBox } from "@heroui/react";
import { Magnifier, ChevronDown } from "@gravity-ui/icons";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  "Software Development",
  "Human Resources",
  "Design",
  "Marketing",
  "Finance",
  "Artificial Intelligence",
  "Cyber Security",
];

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
        {/* ১. Search Field - Span 5 columns */}
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
            <InputGroup className="bg-background border border-border rounded-xl transition-all duration-300 focus-within:border-green-500 focus-within:shadow-[0_0_15px_rgba(34,197,94,0.12)]">
              <InputGroup.Prefix className="pl-4 pr-1 text-muted-foreground/70">
                <Magnifier className="w-4 h-4" />
              </InputGroup.Prefix>
              <InputGroup.Input
                suppressHydrationWarning
                placeholder="Title, company, or keywords..."
                className="bg-transparent text-foreground placeholder-muted-foreground/50 text-sm h-12 outline-none w-full"
              />
            </InputGroup>
          </TextField>
        </div>

        {/* ২. Job Type Select - Span 3 columns */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground pl-1">
            Job Type
          </label>
          <Select
            selectedKey={selectedType}
            onSelectionChange={setSelectedType}
            aria-label="Filter jobs by type"
          >
            <Select.Trigger
              suppressHydrationWarning
              className="w-full h-12 flex items-center justify-between rounded-xl border border-border bg-background px-4 text-sm text-foreground hover:border-muted-foreground/30 focus:border-green-500 outline-none transition-all duration-300"
            >
              <Select.Value>
                {selectedType === "all" || !selectedType
                  ? "All Types"
                  : selectedType}
              </Select.Value>
              <Select.Indicator>
                <ChevronDown className="w-4 h-4 text-muted-foreground/70" />
              </Select.Indicator>
            </Select.Trigger>

            <Select.Popover className="bg-card border border-border rounded-xl shadow-xl mt-2 overflow-hidden z-50">
              <ListBox className="p-1.5 min-w-[200px]">
                <ListBox.Item
                  id="all"
                  className="flex items-center text-foreground hover:bg-green-600 hover:text-white rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors"
                >
                  All Types
                </ListBox.Item>
                <ListBox.Item
                  id="Full-Time"
                  className="flex items-center text-foreground hover:bg-green-600 hover:text-white rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors"
                >
                  Full-Time
                </ListBox.Item>
                <ListBox.Item
                  id="Part-Time"
                  className="flex items-center text-foreground hover:bg-green-600 hover:text-white rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors"
                >
                  Part-Time
                </ListBox.Item>
                <ListBox.Item
                  id="Contract"
                  className="flex items-center text-foreground hover:bg-green-600 hover:text-white rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors"
                >
                  Contract
                </ListBox.Item>
                <ListBox.Item
                  id="Internship"
                  className="flex items-center text-foreground hover:bg-green-600 hover:text-white rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors"
                >
                  Internship
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* ৩. Category Select - Span 3 columns */}
        <div className="lg:col-span-3 flex flex-col gap-2">
          <label className="text-sm font-medium text-muted-foreground pl-1">
            Category
          </label>
          <Select
            selectedKey={selectedCategory}
            onSelectionChange={setSelectedCategory}
            aria-label="Filter jobs by category"
          >
            <Select.Trigger className="w-full h-12 flex items-center justify-between rounded-xl border border-border bg-background px-4 text-sm text-foreground hover:border-muted-foreground/30 focus:border-green-500 outline-none transition-all duration-300">
              <Select.Value>
                {selectedCategory === "all" || !selectedCategory
                  ? "All Categories"
                  : selectedCategory}
              </Select.Value>
              <Select.Indicator>
                <ChevronDown className="w-4 h-4 text-muted-foreground/70" />
              </Select.Indicator>
            </Select.Trigger>

            <Select.Popover className="bg-card border border-border rounded-xl shadow-xl mt-2 overflow-hidden z-50">
              <ListBox className="p-1.5 min-w-[220px] max-h-[300px] overflow-y-auto">
                <ListBox.Item
                  id="all"
                  className="flex items-center text-foreground hover:bg-green-600 hover:text-white rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors"
                >
                  All Categories
                </ListBox.Item>
                {categories.map((category) => (
                  <ListBox.Item
                    key={category}
                    id={category}
                    className="flex items-center text-foreground hover:bg-green-600 hover:text-white rounded-lg px-3 py-2.5 text-sm cursor-pointer transition-colors"
                  >
                    {category}
                  </ListBox.Item>
                ))}
              </ListBox>
            </Select.Popover>
          </Select>
        </div>

        {/* ৪. Remote Checkbox - Span 1 column */}
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
