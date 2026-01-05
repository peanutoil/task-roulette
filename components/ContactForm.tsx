"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label
          htmlFor="name"
          className="block text-xs font-bold mb-2 uppercase tracking-wider"
          style={{ color: '#4d2d52' }}
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full"
          placeholder="ENTER NAME"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-xs font-bold mb-2 uppercase tracking-wider"
          style={{ color: '#4d2d52' }}
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full"
          placeholder="ENTER EMAIL"
        />
      </div>

      <div>
        <label
          htmlFor="message"
          className="block text-xs font-bold mb-2 uppercase tracking-wider"
          style={{ color: '#4d2d52' }}
        >
          Message
        </label>
        <textarea
          id="message"
          required
          rows={5}
          value={formData.message}
          onChange={(e) =>
            setFormData({ ...formData, message: e.target.value })
          }
          className="w-full"
          placeholder="ENTER MESSAGE"
        />
      </div>

      {status === "success" && (
        <div className="inset-panel border-l-4" style={{ borderColor: '#ff85c0' }}>
          <p className="text-xs uppercase tracking-wider font-bold" style={{ color: '#ff4da6' }}>
            MESSAGE SUCCESSFUL • RESPONSE PENDING
          </p>
        </div>
      )}

      {status === "error" && (
        <div className="inset-panel border-l-4" style={{ borderColor: '#ff4da6' }}>
          <p className="text-xs uppercase tracking-wider font-bold" style={{ color: '#ff4da6' }}>
            MESSAGE FAILED • PLEASE TRY AGAIN
          </p>
        </div>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full metal-button text-center"
      >
        {status === "submitting" ? "TRANSMITTING..." : "SEND MESSAGE"}
      </button>
    </form>
  );
}
