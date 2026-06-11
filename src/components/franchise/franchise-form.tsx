"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "submitting" | "ok" | "error";

export function FranchiseForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Form states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [location, setLocation] = useState("");
  const [investmentAmount, setInvestmentAmount] = useState("");
  const [message, setMessage] = useState("");

  const investmentOptions = [
    { label: ">100K-150K", value: ">100K-150K" },
    { label: ">151K-200K Over", value: ">151K-200K Over" },
    { label: ">201K Over", value: ">201K Over" },
  ];

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!firstName || !lastName || !phone || !email || !location || !investmentAmount) {
      setErrorMessage("Please fill out all required fields.");
      setStatus("error");
      return;
    }

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch("/api/franchise-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName,
          lastName,
          phone,
          email,
          location,
          investmentAmount,
          message,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit enquiry. Please try again.");
      }

      setStatus("ok");
      // Reset form
      setFirstName("");
      setLastName("");
      setPhone("");
      setEmail("");
      setLocation("");
      setInvestmentAmount("");
      setMessage("");
    } catch (error: any) {
      console.error("Franchise form submission error:", error);
      setErrorMessage(error.message || "Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const [isHovered, setIsHovered] = useState(false);

  const inputClass =
    "w-full appearance-none rounded-[4px] border border-gray-300 bg-white px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-disabled/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors duration-300 disabled:opacity-50";

  return (
    <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
      {/* Name row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="flex flex-col gap-1.5 w-full">
          <span className="font-body text-xs font-semibold text-text-primary">
            Your Name <span className="text-accent">*</span>
          </span>
          <input
            type="text"
            required
            disabled={status === "submitting" || status === "ok"}
            placeholder="John"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 w-full">
          <span className="font-body text-xs font-semibold text-text-primary">
            Last Name <span className="text-accent">*</span>
          </span>
          <input
            type="text"
            required
            disabled={status === "submitting" || status === "ok"}
            placeholder="Doe"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      {/* Contact row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="flex flex-col gap-1.5 w-full">
          <span className="font-body text-xs font-semibold text-text-primary">
            Phone Number <span className="text-accent">*</span>
          </span>
          <input
            type="tel"
            required
            disabled={status === "submitting" || status === "ok"}
            placeholder="+44 2072194272"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={inputClass}
          />
        </label>
        <label className="flex flex-col gap-1.5 w-full">
          <span className="font-body text-xs font-semibold text-text-primary">
            Email <span className="text-accent">*</span>
          </span>
          <input
            type="email"
            required
            disabled={status === "submitting" || status === "ok"}
            placeholder="john.doe@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
          />
        </label>
      </div>

      {/* Location */}
      <label className="flex flex-col gap-1.5 w-full">
        <span className="font-body text-xs font-semibold text-text-primary">
          Location <span className="text-accent">*</span>
        </span>
        <input
          type="text"
          required
          disabled={status === "submitting" || status === "ok"}
          placeholder="London - Camden Town"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={inputClass}
        />
      </label>

      {/* Investment Options */}
      <div className="flex flex-col gap-2 w-full">
        <span className="font-body text-xs font-semibold text-text-primary">
          Available investment amount? <span className="text-accent">*</span> £
        </span>
        <div className="flex flex-wrap gap-x-6 gap-y-2 mt-1">
          {investmentOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 cursor-pointer group select-none"
            >
              <input
                type="radio"
                name="investmentAmount"
                required
                disabled={status === "submitting" || status === "ok"}
                checked={investmentAmount === option.value}
                onChange={() => setInvestmentAmount(option.value)}
                className="sr-only"
              />
              <span
                className={`w-4 h-4 border flex items-center justify-center rounded-[2px] transition-all duration-200 ${
                  investmentAmount === option.value
                    ? "border-accent bg-accent text-white"
                    : "border-gray-300 bg-white group-hover:border-gray-400"
                }`}
              >
                {investmentAmount === option.value && (
                  <svg
                    className="w-2.5 h-2.5 fill-current"
                    viewBox="0 0 20 20"
                  >
                    <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                  </svg>
                )}
              </span>
              <span className="font-body text-xs text-text-secondary group-hover:text-text-primary transition-colors duration-200">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Message Textarea */}
      <label className="flex flex-col gap-1.5 w-full">
        <span className="font-body text-xs font-semibold text-text-primary">
          Location And Your Message
        </span>
        <textarea
          rows={5}
          disabled={status === "submitting" || status === "ok"}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full appearance-none rounded-[4px] border border-gray-300 bg-white px-4 py-3 font-body text-sm text-text-primary placeholder:text-text-disabled/60 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-colors duration-300 disabled:opacity-50 resize-y min-h-[120px]"
        />
      </label>

      {/* Submit Button & Messages */}
      <div className="flex flex-col items-start gap-4 pt-2">
        <button
          type="submit"
          disabled={status === "submitting" || status === "ok"}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{ backgroundColor: isHovered ? "#485336" : "#596643" }}
          className="inline-flex h-12 min-w-[150px] items-center justify-center rounded-full px-10 font-display text-xs font-bold uppercase tracking-button text-white transition-all duration-300 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-md hover:shadow-lg"
        >
          {status === "submitting" ? "Submitting..." : "Submit"}
        </button>

        {status === "ok" && (
          <p
            style={{ color: "#596643" }}
            className="font-body text-sm font-semibold mt-1 transition-all duration-300"
          >
            Thank you! Your franchise enquiry has been successfully submitted. We will be in touch shortly.
          </p>
        )}

        {status === "error" && (
          <p className="font-body text-sm text-accent font-semibold mt-1 transition-all duration-300">
            {errorMessage}
          </p>
        )}
      </div>
    </form>
  );
}
