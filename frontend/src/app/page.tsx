"use client";
import { motion } from "framer-motion";
import { ArrowRight, Users, Shield, Zap, Star, CheckCircle, Headphones} from "lucide-react";
import { useTheme } from "@/components/ThemeProvider";

export default function HomePage() {
  const { isDark } = useTheme();

  // Hero section animations
  const heroVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };
  
  // Define your plans array (same as before)
const plans = [
  {
    name: "Jobseeker",
    price: "$0",
    description: "Perfect for individuals getting started",
    features: ["1 User", "10 Projects", "Basic Support", "5GB Storage"],
    popular: false,
    cta: "Get Started",
    color: "border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/50",
  },
  {
    name: "Recruiter",
    price: "$10",
    description: "Best for growing teams and businesses",
    features: ["Unlimited Users", "Unlimited Projects", "Priority Support", "100GB Storage", "Analytics Dashboard"],
    popular: true,
    cta: "Most Popular",
    color: "border-purple-200 dark:border-purple-800 bg-purple-50 dark:bg-purple-900/50 ring-2 ring-purple-200 dark:ring-purple-800/50",
  },
  {
    name: "Seller",
    price: "$20",
    description: "Complete solution for large organizations",
    features: ["Everything in Pro", "Custom Integrations", "Dedicated Manager", "Unlimited Storage", "Advanced Security"],
    popular: false,
    cta: "Contact Sales",
    color: "border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/50",
  },
  {
    name: "Freelancer",
    price: "$25",
    description: "Complete solution for large organizations",
    features: ["Everything in Pro", "Custom Integrations", "Dedicated Manager", "Unlimited Storage", "Advanced Security"],
    popular: false,
    cta: "Contact Sales",
    color: "border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-900/50",
  },
  {
    name: "Skill Educator",
    price: "$30",
    description: "Complete solution for large organizations",
    features: ["Everything in Pro", "Custom Integrations", "Dedicated Manager", "Unlimited Storage", "Advanced Security"],
    popular: false,
    cta: "Contact Sales",
    color: "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/50",
  },
  {
    name: "Project Manager",
    price: "$30",
    description: "Complete solution for large organizations",
    features: ["Everything in Pro", "Custom Integrations", "Dedicated Manager", "Unlimited Storage", "Advanced Security"],
    popular: false,
    cta: "Contact Sales",
    color: "border-orange-200 dark:border-orange-800 bg-orange-50 dark:bg-orange-900/50",
  },
];

// CTA buttons base
const colorMap = {
  'blue': { bg: 'bg-blue-600', hover: 'hover:bg-blue-700', text: 'text-blue-50' },
  'purple': { bg: 'bg-purple-600', hover: 'hover:bg-purple-700', text: 'text-purple-50' },
  'green': { bg: 'bg-green-600', hover: 'hover:bg-green-700', text: 'text-green-50' },
  'yellow': { bg: 'bg-yellow-600', hover: 'hover:bg-yellow-700', text: 'text-yellow-50' },
  'red': { bg: 'bg-red-600', hover: 'hover:bg-red-700', text: 'text-red-50' },
  'orange': { bg: 'bg-orange-600', hover: 'hover:bg-orange-700', text: 'text-orange-50' },
};

const getPlanButtonClasses = (plan) => {
  const base = "w-full py-2.5 px-4 rounded-lg font-semibold text-sm transition-all duration-300 group flex items-center justify-center gap-2 shadow-lg hover:shadow-xl";
  
  // Extract color from plan.color (look for color names in the class string)
  const colorKey = Object.keys(colorMap).find(key => 
    plan.color.includes(key)
  );
  
  if (plan.popular) {
    // Popular plan uses purple regardless of card color
    return `${base} bg-purple-600 hover:bg-purple-700 text-white`;
  }
  
  if (colorKey && colorMap[colorKey]) {
    // Use card's accent color for button
    const colors = colorMap[colorKey];
    return `${base} ${colors.bg} ${colors.hover} ${colors.text}`;
  }
  
  // Fallback for non-colored cards
  return `${base} bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300`;
};

  return (
      <div className="min-h-screen w-full bg-gray-50"> {/* ✅ Full-screen wrapper */}
   <main className="flex flex-col gap-16 py-8 sm:py-12 lg:py-16 
            bg-gray-50
                 rounded-xl shadow-md dark:shadow-gray-700/50 
                 border dark:border-gray-700">
                        {/* Hero Section */}
<motion.section
  className="text-center py-12 sm:py-16 lg:py-20"
  initial="hidden"
  animate="visible"
  variants={heroVariants}
>
  <motion.div
    variants={itemVariants}
    className="max-w-4xl mx-auto px-4"
  >
    {/* Badge */}
    <motion.div variants={itemVariants}>
      <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm font-medium border border-blue-200 dark:border-blue-800/50">
        🚀 Launching Soon
      </span>
    </motion.div>

    {/* Main Heading */}
    <motion.h1
      variants={itemVariants}
      className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold light-text leading-tight"
    >
      Welcome to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">Phapsite</span>
    </motion.h1>

    {/* Subtitle */}
    <motion.p
      variants={itemVariants}
      className="mt-6 text-xl sm:text-2xl light-text max-w-3xl mx-auto leading-relaxed"
    >
      Build amazing things with the world's most powerful development platform. 
      Start creating today with our intuitive tools and incredible community.
    </motion.p>

    {/* CTA Buttons */}
    <motion.div
      variants={itemVariants}
      className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group bg-blue-button  px-8 py-4 rounded-xl font-semibold text-lg  flex items-center space-x-2"
      >
        <span>Get Started Free</span>
        <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
      </motion.button>
      
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="group border-2 border-gray-200  px-8 py-4 rounded-xl font-semibold text-lg  flex items-center space-x-2 "
      >
        <span className="light-text ">Watch Demo</span>
        <ArrowRight className="h-5 w-5 icon-blue group-hover:translate-x-1 transition-transform group-hover:text-blue-600" />
      </motion.button>
    </motion.div>
  </motion.div>

  {/* Hero Image/Illustration - FIXED CLOSING TAGS */}
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 1, delay: 0.5 }}
    className="mt-12 lg:mt-16"
  >
    <div className="relative max-w-4xl mx-auto">
      <div className=" card-wrapper">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg dark:shadow-gray-700/50">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lightning Fast</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Deploy in seconds</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg dark:shadow-gray-700/50">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Secure</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">Enterprise grade</p>
          </div>
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 text-center shadow-lg dark:shadow-gray-700/50">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/20 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Community</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">100K+ developers</p>
          </div>
        </div>
      </div>
    </div>
  </motion.div>
</motion.section>
{/* Feature Role*/}
<section className="px-4 bg-gray-800 pt-10 pb-10">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="max-w-6xl mx-auto"
  >
    <div className="text-center mb-16">
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-50 mb-4">
        Choose Your Role
      </h2>
      <p className="text-xl text-gray-200 max-w-2xl mx-auto">
        Select the perfect role for your needs. All plans include our world-class support.
      </p>
    </div>

    {/* Horizontal Scroll Container */}
    <div className="relative">
      {/* Scroll Indicator */}
      <div className="absolute -top-8 right-0 w-24 h-1 bg-gradient-to-r from-transparent via-blue-400 to-blue-600 rounded-full"></div>
      
      <div className="hide-scrollbar overflow-x-auto pb-4">
        <div className="flex space-x-6 py-4">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className={`relative min-w-[280px] max-w-[320px] flex-shrink-0 rounded-2xl p-6 border ${plan.color} shadow-lg dark:shadow-gray-700/50 hover:shadow-xl transition-all duration-300`}
            >
              {/* Center Card Highlight - Subtle glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg">
                    {plan.cta}
                  </span>
                </div>
              )}
              
              <div className="text-center relative z-10">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {plan.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-sm leading-relaxed">
                  {plan.description}
                </p>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-5">
                  {plan.price}
                  <span className="text-base font-normal text-gray-600 dark:text-gray-300">/mo</span>
                </div>
                
                <ul className="space-y-2 mb-6 text-left text-sm">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2 text-gray-700 dark:text-gray-300">
                      <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                {/* CTA buttons */}
                <button className={getPlanButtonClasses(plan)}>
                  {plan.cta === "Get Started" && (
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  )}
                  {plan.cta}
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Scroll Navigation Buttons (Optional) */}
      <div className="flex justify-center mt-6 space-x-50">
        <button 
          onClick={() => {
            const container = document.querySelector('.hide-scrollbar');
            container.scrollBy({ left: -300, behavior: 'smooth' });
          }}
          className="p-2 rounded-full bg-blue-button hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <button 
          onClick={() => {
            const container = document.querySelector('.hide-scrollbar');
            container.scrollBy({ left: 300, behavior: 'smooth' });
          }}
          className="p-2 rounded-full bg-blue-button hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors "
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>

    {/* CSS for hiding scrollbar */}
    <style jsx>{`
      .hide-scrollbar {
        -ms-overflow-style: none;
        scrollbar-width: none;
      }
      .hide-scrollbar::-webkit-scrollbar {
        display: none;
      }
    `}</style>
  </motion.div>
</section>

  {/* Features Section */}
<section className="px-4">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6 }}
    viewport={{ once: true }}
    className="max-w-6xl mx-auto"
  >
    <div className="text-center mb-16 card-wrapper">
      <h2 className="text-3xl sm:text-4xl font-bold content-title mb-4">
        Everything you need to build
      </h2>
      <p className="text-xl light-text max-w-2xl mx-auto">
        Powerful tools and features designed to make your development experience incredible.
      </p>
    </div>

    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 light-bg">
      {[
        {
          icon: CheckCircle,
          title: "Real-time Collaboration",
          description: "Work together with your team in real-time with seamless collaboration tools.",
          color: "text-green-600 dark:text-green-400",
        },
        {
          icon: Zap,
          title: "Lightning Fast Performance",
          description: "Built with cutting-edge technology for unmatched speed and efficiency.",
          color: "text-blue-600 dark:text-blue-400",
        },
        {
          icon: Shield,
          title: "Enterprise Security",
          description: "Military-grade encryption and security protocols to protect your data.",
          color: "text-purple-600 dark:text-purple-400",
        },
        {
          icon: Star,
          title: "Unlimited Customization",
          description: "Tailor every aspect of your experience to match your unique workflow.",
          color: "text-yellow-600 dark:text-yellow-400",
        },
        {
          icon: Users,
          title: "Active Community",
          description: "Join thousands of developers sharing knowledge and building together.",
          color: "text-indigo-600 dark:text-indigo-400",
        },
        {
          icon: ArrowRight,
          title: "Easy Integration",
          description: "Connect with all your favorite tools and services in just a few clicks.",
          color: "text-pink-600 dark:text-pink-400",
        },
      ].map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          viewport={{ once: true }}
          whileHover={{ y: -5 }}
          className="group cursor-pointer"
        >
          <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 shadow-xl dark:shadow-gray-800/50 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-300 h-full">
            <div className={`w-12 h-12 rounded-xl bg-${feature.color.replace('text-', '')}-50 dark:bg-${feature.color.replace('text-', '')}-900/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <feature.icon className={`h-6 w-6 ${feature.color}`} />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
              {feature.description}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  </motion.div>
</section>

      {/* About Section */}
      <section className="px-4 card-wrapper py-16 rounded-2xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                About Our Platform
              </h2>
              <p className="text-lg  mb-6 leading-relaxed">
                Founded in 2024, we're on a mission to empower developers worldwide with the 
                most intuitive and powerful tools for building the future. Our platform combines
                cutting-edge technology with a human-centered design approach.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                   <div className="flex items-center gap-2">
                      <Users className="w-6 h-6 text-yellow-400" />
                      <p className="text-white">Over 50,000 developers trust us</p>
                    </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <div className="flex items-center gap-2">
                      <Shield className="w-6 h-6 text-green-400" />
                      <p className="text-white">99.9% uptime guarantee</p>
                </div>
                  
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex items-center gap-2">
                      <Headphones className="w-6 h-6 text-orange-400" />
                      <p className="text-white">24/7 world-class support</p>
                    </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="card-display">
                <div className=" bg-gray-800 rounded-2xl p-8 h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-24 h-24 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/20 dark:to-purple-900/20 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Zap className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Ready to Start?</h3>
                    <p className="text-gray-600 dark:text-gray-300">Your journey begins here</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>


      {/* Final CTA */}
      <section className="px-4 text-center py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Ready to get started?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of developers who are already building amazing things with MyApp.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center space-x-2 mx-auto"
          >
            <span>Start Building Today</span>
            <ArrowRight className="h-5 w-5" />
          </motion.button>
        </motion.div>
      </section>
    </main>
    </div>
  );
}