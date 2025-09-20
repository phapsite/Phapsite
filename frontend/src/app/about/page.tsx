"use client";
import { motion } from "framer-motion";
import { Users, Target, LineChart, Mail, Phone } from "lucide-react";
import CardTemplate from "@/components/CardTemplate";

export default function AboutPage() {
  return (

    <div className="min-h-screen bg-gray-50">
 
      {/* Hero Section */}
      <section className="relative mx-auto max-w-6xl px-6 py-16 text-center bg-gray-50">
        <motion.h1
          initial={{ opacity: 0, y: -40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold md:text-6xl "
        >
          About <span className="text-blue">Our Company</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 light-text"
        >
          We are committed to building scalable, user-friendly, and innovative
          digital experiences for everyone.
        </motion.p>
      </section>

      {/* Analytics / Stats Section */}
      <section className="py-16 shadow-inner">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 px-6 md:grid-cols-3">
          {[
            { icon: Users, value: "10k+", label: "Active Users" },
            { icon: Target, value: "95%", label: "Client Satisfaction" },
            { icon: LineChart, value: "120%", label: "Growth Rate" },
          ].map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <CardTemplate>
                <stat.icon className="mb-3 h-10 w-10 icon-blue" />
                <h3 className="text-2xl font-bold content-title">
                  {stat.value}
                </h3>
                <p className="light-text">{stat.label}</p>
              </CardTemplate>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Our Story Section */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold mb-4 text-blue"
        >
          Our Story
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg light-text"
        >
          Founded in 2021, our mission has always been to empower businesses
          with modern digital tools. We believe in transparency, innovation, and
          building long-lasting partnerships with our clients.
        </motion.p>
      </section>

      {/* Contact Form */}
      <section className="py-20 bg-gray-50">
        <div className="mx-auto max-w-4xl rounded-2xl p-8 shadow-lg border">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-6 text-center text-3xl font-bold content-title"
          >
            Get in Touch
          </motion.h2>

          <form className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <label className="block text-sm font-medium light-text">
                  Name
                </label>
                <input
                  type="text"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium light-text">
                  Email
                </label>
                <input
                  type="email"
                  className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium light-text">
                Message
              </label>
              <textarea
                rows={4}
                className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                placeholder="Write your message..."
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full rounded-lg bg-blue-button hover:bg-blue-700 px-6 py-3 font-medium text-white shadow focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Send Message
            </motion.button>
          </form>

          {/* Contact Info */}
          <div className="mt-8 flex flex-col items-center space-y-4 text-gray-600">
            <div className="flex items-center space-x-2">
              <Mail className="h-5 w-5 icon-blue" />
              <span className="light-text">support@mycompany.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-5 w-5 icon-blue" />
              <span className="light-text">+1 (555) 123-4567</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}