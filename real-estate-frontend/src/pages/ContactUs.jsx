import React, { useState } from "react";
import Header from "../components/Header";
import emailjs from "@emailjs/browser";

const whatsappNumber = "917298317489";
const whatsappMessage = encodeURIComponent(
  "Hello! I'm interested in your rental properties."
);

function ContactUs() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess(null);

    emailjs
      .send(
        "service_hycylsa",
        "template_kz5pve6",
        form,
        "Tu4RB1DjlWYP-0Ejo"
      )
      .then(() => {
        setSuccess("Message sent successfully!");
        setForm({ name: "", email: "", message: "" });
      })
      .catch(() => {
        setSuccess("Failed to send message. Please try again.");
      })
      .finally(() => setSending(false));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-3xl mx-auto mt-10 bg-white rounded-2xl shadow-xl p-8 md:p-12 flex flex-col gap-6">
        <h2 className="text-3xl md:text-4xl font-bold text-blue-700 text-center">
          Contact Us
        </h2>
        <p className="text-gray-600 text-center text-lg">
          Have questions or want to get in touch? Reach out to us via the form
          below or connect with us on social media!
        </p>

        <form
          className="w-full flex flex-col gap-5"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={5}
            required
            className="rounded-md border border-gray-300 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600 text-gray-700"
          />
          <button
            type="submit"
            disabled={sending}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-6 py-3 transition duration-300 disabled:opacity-60"
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>

        {success && (
          <div
            className={`text-center font-medium ${
              success.includes("success")
                ? "text-green-600"
                : "text-red-600"
            }`}
          >
            {success}
          </div>
        )}

        {/* Social buttons */}
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="..." />
            </svg>
            WhatsApp
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="..." />
            </svg>
            Facebook
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="..." />
            </svg>
            Instagram
          </a>
        </div>

        {/* Embedded Map */}
        <div className="w-full mt-6 rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.625810764905!2d75.78727007538246!3d26.86160106241806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5d1e2e7c6b3%3A0x7e7c2e2e2e2e2e2e!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
            width="100%"
            height="250"
            allowFullScreen=""
            loading="lazy"
            style={{ border: 0 }}
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <p className="text-gray-400 text-xs mt-6 text-center">
          &copy; {new Date().getFullYear()} Rental Ease. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default ContactUs;
