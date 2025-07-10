import React, { useState } from 'react';
import Header from '../components/Header';
import emailjs from '@emailjs/browser';

const whatsappNumber = "917298317489"; // Replace with your WhatsApp number (country code + number)
const whatsappMessage = encodeURIComponent("Hello! I'm interested in your rental properties.");

function ContactUs() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setSuccess(null);

    emailjs.send(
      'service_hycylsa',      // Replace with your EmailJS service ID
      'template_kz5pve6',     // Replace with your EmailJS template ID
      form,
      'Tu4RB1DjlWYP-0Ejo'     // Replace with your EmailJS public key
    )
      .then(() => {
        setSuccess('Message sent successfully!');
        setForm({ name: '', email: '', message: '' });
      })
      .catch(() => {
        setSuccess('Failed to send message. Please try again.');
      })
      .finally(() => setSending(false));
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header />
      <div className="max-w-xl mx-auto mt-10 bg-white rounded-xl shadow p-8 flex flex-col items-center">
        <h2 className="text-2xl font-bold text-blue-600 mb-4 text-center">Contact Us</h2>
        <p className="text-gray-600 mb-8 text-center">
          Have questions or want to get in touch? Reach out to us via the form below or connect with us on social media!
        </p>
        <form className="w-full flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your Name"
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="Your Email"
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Your Message"
            rows={4}
            required
            className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white rounded-md px-6 py-2 font-semibold hover:bg-blue-700 transition disabled:opacity-60"
            disabled={sending}
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
        {success && (
          <div className={`mb-4 text-center ${success.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
            {success}
          </div>
        )}
        <div className="flex gap-6 justify-center mb-6">
          <a
            href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            {/* WhatsApp SVG */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.52 3.48A11.93 11.93 0 0012 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.18-1.62A11.93 11.93 0 0012 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.67-.5-5.23-1.44l-.37-.22-3.67.96.98-3.58-.24-.37A9.94 9.94 0 012 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.7.9-.86 1.08-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.41-.83-.74-1.39-1.65-1.56-1.93-.16-.28-.02-.43.12-.57.13-.13.28-.34.42-.51.14-.17.18-.29.28-.48.09-.18.05-.36-.02-.5-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.62-.47-.16-.01-.36-.01-.56-.01-.2 0-.52.07-.8.34-.28.28-1.06 1.04-1.06 2.54 0 1.5 1.09 2.95 1.24 3.16.15.21 2.14 3.28 5.19 4.47.73.3 1.3.48 1.74.61.73.23 1.39.2 1.91.12.58-.09 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.19-.53-.33z" />
            </svg>
            WhatsApp
          </a>
          <a
            href="https://facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            {/* Facebook SVG */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M22.675 0h-21.35C.595 0 0 .592 0 1.326v21.348C0 23.406.595 24 1.326 24H12.82v-9.294H9.692v-3.622h3.127V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.797.143v3.24l-1.918.001c-1.504 0-1.797.715-1.797 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116C23.406 24 24 23.406 24 22.674V1.326C24 .592 23.406 0 22.675 0"/>
            </svg>
            Facebook
          </a>
          <a
            href="https://instagram.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-lg font-semibold transition"
          >
            {/* Instagram SVG */}
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608.974-.974 2.241-1.246 3.608-1.308C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.425 3.678 1.406 2.697 2.387 2.403 3.499 2.344 4.78.013 8.332 0 8.741 0 12c0 3.259.013 3.668.072 4.948.059 1.281.353 2.393 1.334 3.374.981.981 2.093 1.275 3.374 1.334C8.332 23.987 8.741 24 12 24c3.259 0 3.668-.013 4.948-.072 1.281-.059 2.393-.353 3.374-1.334.981-.981 1.275-2.093 1.334-3.374.059-1.28.072-1.689.072-4.948 0-3.259-.013-3.668-.072-4.948-.059-1.281-.353-2.393-1.334-3.374-.981-.981-2.093-1.275-3.374-1.334C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/>
            </svg>
            Instagram
          </a>
        </div>
        {/* Google Map */}
        <div className="w-full mt-8 rounded-lg overflow-hidden shadow">
          <iframe
            title="Office Location"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.625810764905!2d75.78727007538246!3d26.86160106241806!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db5d1e2e7c6b3%3A0x7e7c2e2e2e2e2e2e!2sJaipur%2C%20Rajasthan!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
            width="100%"
            height="250"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
        <p className="text-gray-400 text-xs mt-4 text-center">
          &copy; {new Date().getFullYear()} Rental Ease. All rights reserved.
        </p>
      </div>
    </div>
  );
}

export default ContactUs;