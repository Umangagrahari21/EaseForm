"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Send, Wand2, MessageSquare, CheckCircle, AlertCircle, Copy, X } from "lucide-react";

// Mock EmailJS for demo - replace with actual import in your project
const emailjs = {
  send: async (serviceId, templateId, templateParams, publicKey) => {
    console.log('EmailJS send called with:', { serviceId, templateId, templateParams, publicKey });
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    // Simulate success
    return { status: 200, text: 'OK' };
  }
};

export default function FeedbackForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [suggestion, setSuggestion] = useState("");
  const [suggestionHistory, setSuggestionHistory] = useState([]);
  const [tone, setTone] = useState("Formal");
  const [aiReply, setAiReply] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeField, setActiveField] = useState("");
  const [submitStatus, setSubmitStatus] = useState("");
  const [copiedText, setCopiedText] = useState("");
  const [characterCount, setCharacterCount] = useState(0);

  const tones = ["Formal", "Casual", "Friendly", "Professional", "Enthusiastic"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (name === "message") {
      setCharacterCount(value.length);
    }
  };

  const handleFocus = (fieldName) => {
    setActiveField(fieldName);
  };

  const handleBlur = () => {
    setActiveField("");
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(""), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const handleSuggestion = async () => {
    if (!form.message.trim()) return;
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      const text = `Thank you for your feedback regarding "${form.message.substring(0, 30)}...". We appreciate your input and will review it carefully.`;
      setSuggestion(text);
      setSuggestionHistory(prev => [...prev, { text, type: "suggestion", timestamp: Date.now() }]);
    } catch (error) {
      console.error("Error getting suggestion:", error);
    }
    setLoading(false);
  };

  const handleTone = async () => {
    if (!form.message.trim()) return;
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      const rewritten = `[${tone} tone applied] ${form.message}`;
      setForm(prev => ({ ...prev, message: rewritten }));
      setCharacterCount(rewritten.length);
      setSubmitStatus(`Applied ${tone} tone successfully!`);
      setTimeout(() => setSubmitStatus(""), 3000);
    } catch (error) {
      console.error("Error rewriting tone:", error);
    }
    setLoading(false);
  };

  const handleFixSentence = async () => {
    if (!form.message.trim()) return;
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const fixed = `[Grammar Fixed] ${form.message}`;
      setSuggestion(fixed);
      setSuggestionHistory(prev => [...prev, { text: fixed, type: "grammar", timestamp: Date.now() }]);
    } catch (error) {
      console.error("Error fixing sentence:", error);
    }
    setLoading(false);
  };

  const handleContinueStory = async () => {
    if (!form.message.trim()) return;
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1800));
      const story = `${form.message} ...and then the adventure continued with unexpected twists and turns, leading to discoveries that would change everything.`;
      setSuggestion(story);
      setSuggestionHistory(prev => [...prev, { text: story, type: "story", timestamp: Date.now() }]);
    } catch (error) {
      console.error("Error continuing story:", error);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    setLoading(true);
    setSubmitStatus("");

    // Validate form fields
    if (!form.name.trim()) {
      setSubmitStatus("error");
      setLoading(false);
      return;
    }
    
    if (!form.email.trim()) {
      setSubmitStatus("error");
      setLoading(false);
      return;
    }
    
    if (!form.message.trim()) {
      setSubmitStatus("error");
      setLoading(false);
      return;
    }

    try {
      // EmailJS configuration - replace with your actual values
      const serviceId = "your_service_id";
      const templateId = "your_template_id";
      const publicKey = "your_public_key";

      // Template parameters
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_name: "Support Team",
      };

      console.log("Sending email with params:", templateParams);

      // Send email via EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log("EmailJS response:", response);

      // AI-style thank you message
      const thankYou = `Thank you ${form.name} for your valuable feedback! We've received your message and will get back to you at ${form.email} soon.`;
      setAiReply(thankYou);

      // Reset form
      setForm({ name: "", email: "", message: "" });
      setCharacterCount(0);
      setSuggestion("");
      setSubmitStatus("success");

    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus("error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic Interactive Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-pink-900/50 via-purple-800/50 to-blue-900/50"
          animate={{
            background: [
              "linear-gradient(45deg, rgba(219, 39, 119, 0.5), rgba(147, 51, 234, 0.5), rgba(30, 58, 138, 0.5))",
              "linear-gradient(90deg, rgba(147, 51, 234, 0.5), rgba(30, 58, 138, 0.5), rgba(219, 39, 119, 0.5))",
              "linear-gradient(135deg, rgba(30, 58, 138, 0.5), rgba(219, 39, 119, 0.5), rgba(147, 51, 234, 0.5))"
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating Interactive Elements */}
        {Array.from({ length: 15 }, (_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10 backdrop-blur-sm"
            style={{
              width: Math.random() * 100 + 50,
              height: Math.random() * 100 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 200 - 100],
              y: [0, Math.random() * 200 - 100],
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5
            }}
          />
        ))}

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="h-full w-full"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px'
            }}
          />
        </div>
      </div>

      {/* Main Form Container */}
      <div className="relative z-10 max-w-3xl mx-auto p-6">
        <motion.div 
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/95 backdrop-blur-2xl shadow-2xl rounded-3xl overflow-hidden border border-white/30"
        >
          {/* Enhanced Header */}
          <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-700 p-8 text-white overflow-hidden">
            <motion.div
              animate={{
                background: [
                  "linear-gradient(45deg, #4f46e5, #7c3aed, #1d4ed8)",
                  "linear-gradient(90deg, #7c3aed, #1d4ed8, #4f46e5)",
                  "linear-gradient(135deg, #1d4ed8, #4f46e5, #7c3aed)"
                ]
              }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute inset-0"
            />
            
            <div className="relative z-10 text-center">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="inline-block mb-4"
              >
                <MessageSquare className="w-12 h-12 mx-auto" />
              </motion.div>
              <h1 className="text-4xl font-black text-white mb-2 tracking-tight">
                EaseForm AI
              </h1>
              <p className="text-xl font-bold text-blue-100">
                Smart Feedback Form with AI Assistance
              </p>
            </div>
          </div>

          {/* Status Messages */}
          <AnimatePresence>
            {submitStatus && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`px-8 py-4 font-black text-lg ${
                  submitStatus === "success" 
                    ? "bg-green-100 border-l-8 border-green-600 text-green-900"
                    : submitStatus === "error"
                    ? "bg-red-100 border-l-8 border-red-600 text-red-900" 
                    : "bg-blue-100 border-l-8 border-blue-600 text-blue-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  {submitStatus === "success" ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : submitStatus === "error" ? (
                    <AlertCircle className="w-6 h-6" />
                  ) : (
                    <Sparkles className="w-6 h-6" />
                  )}
                  {submitStatus === "success" ? "Form submitted successfully!" :
                   submitStatus === "error" ? "Error submitting form. Please check your input and try again." : submitStatus}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="p-8 space-y-8">
            {/* Name Field */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <label className="block text-lg font-black text-gray-900 mb-3">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={form.name}
                onChange={handleChange}
                onFocus={() => handleFocus("name")}
                onBlur={handleBlur}
                className="w-full p-5 border-3 border-gray-600 rounded-2xl transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-200 focus:outline-none bg-white text-gray-900 font-bold placeholder-gray-600 text-lg shadow-lg"
              />
              {activeField === "name" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-4 top-16"
                >
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-ping" />
                </motion.div>
              )}
            </motion.div>

            {/* Email Field */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <label className="block text-lg font-black text-gray-900 mb-3">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={handleChange}
                onFocus={() => handleFocus("email")}
                onBlur={handleBlur}
                className="w-full p-5 border-3 border-gray-600 rounded-2xl transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-200 focus:outline-none bg-white text-gray-900 font-bold placeholder-gray-600 text-lg shadow-lg"
              />
              {activeField === "email" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-4 top-16"
                >
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-ping" />
                </motion.div>
              )}
            </motion.div>

            {/* Message Field */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="relative group"
            >
              <label className="block text-lg font-black text-gray-900 mb-3">
                Your Message
              </label>
              <textarea
                name="message"
                placeholder="Write your feedback, suggestion, or message here..."
                value={form.message}
                onChange={handleChange}
                onFocus={() => handleFocus("message")}
                onBlur={handleBlur}
                className="w-full p-5 border-3 border-gray-600 rounded-2xl h-48 transition-all duration-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-200 focus:outline-none resize-none bg-white text-gray-900 font-bold placeholder-gray-600 text-lg leading-relaxed shadow-lg"
              />
              <div className="absolute bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full text-sm font-black shadow-lg">
                {characterCount} characters
              </div>
              {activeField === "message" && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute right-4 top-16"
                >
                  <div className="w-4 h-4 bg-blue-600 rounded-full animate-ping" />
                </motion.div>
              )}
            </motion.div>

            {/* Tone Selector */}
            <motion.div className="space-y-4">
              <h3 className="text-lg font-black text-gray-900 text-center">Select Writing Tone:</h3>
              <div className="flex flex-wrap gap-3 justify-center">
                {tones.map((t) => (
                  <motion.button
                    key={t}
                    type="button"
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setTone(t)}
                    className={`px-6 py-3 rounded-2xl text-base font-black transition-all duration-300 shadow-lg ${
                      tone === t 
                        ? "bg-blue-700 text-white shadow-blue-500/50 ring-4 ring-blue-300" 
                        : "bg-gray-200 text-gray-900 hover:bg-gray-300 hover:shadow-xl"
                    }`}
                  >
                    {t}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* AI Tools */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.button
                type="button"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSuggestion}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white px-6 py-4 rounded-2xl text-base font-black disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl transition-all duration-300"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Sparkles className="w-5 h-5" />}
                Get AI Suggestion
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleTone}
                disabled={loading}
                className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white px-6 py-4 rounded-2xl text-base font-black disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl transition-all duration-300"
              >
                <Wand2 className="w-5 h-5" />
                Apply {tone} Tone
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleFixSentence}
                disabled={loading}
                className="bg-gradient-to-r from-yellow-600 to-orange-700 hover:from-yellow-700 hover:to-orange-800 text-white px-6 py-4 rounded-2xl text-base font-black disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl transition-all duration-300"
              >
                ✍️ Fix Grammar
              </motion.button>

              <motion.button
                type="button"
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContinueStory}
                disabled={loading}
                className="bg-gradient-to-r from-pink-600 to-red-700 hover:from-pink-700 hover:to-red-800 text-white px-6 py-4 rounded-2xl text-base font-black disabled:opacity-50 flex items-center justify-center gap-3 shadow-xl transition-all duration-300"
              >
                📖 Continue Story
              </motion.button>
            </div>

            {/* Suggestion Display */}
            <AnimatePresence>
              {suggestion && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.95 }}
                  className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-3 border-blue-300 rounded-2xl shadow-xl"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="text-lg font-black text-blue-900 mb-4 flex items-center gap-3">
                        <motion.span
                          animate={{ rotate: [0, 360] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        >
                          <Sparkles className="w-6 h-6" />
                        </motion.span>
                        AI Suggestion:
                      </div>
                      <p className="text-gray-900 font-bold text-lg leading-relaxed mb-6">
                        {suggestion}
                      </p>
                      <div className="flex gap-4">
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            setForm(prev => ({ ...prev, message: suggestion }));
                            setCharacterCount(suggestion.length);
                          }}
                          className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 rounded-xl text-base font-black shadow-lg"
                        >
                          Use This Suggestion
                        </motion.button>
                        <motion.button
                          type="button"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => copyToClipboard(suggestion)}
                          className="bg-gray-700 hover:bg-gray-800 text-white px-6 py-3 rounded-xl text-base font-black flex items-center gap-2 shadow-lg"
                        >
                          <Copy className="w-4 h-4" />
                          {copiedText === suggestion ? "Copied!" : "Copy"}
                        </motion.button>
                      </div>
                    </div>
                    <motion.button
                      type="button"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSuggestion("")}
                      className="ml-4 text-gray-600 hover:text-gray-800"
                    >
                      <X className="w-8 h-8" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="button"
              onClick={handleSubmit}
              whileHover={{ scale: 1.02, y: -4 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full bg-gradient-to-r from-green-700 to-blue-800 hover:from-green-800 hover:to-blue-900 text-white py-6 rounded-2xl font-black text-xl disabled:opacity-50 transition-all duration-300 flex items-center justify-center gap-4 shadow-2xl"
            >
              {loading ? (
                <>
                  <Loader2 className="w-8 h-8 animate-spin" />
                  Sending Your Message...
                </>
              ) : (
                <>
                  <Send className="w-8 h-8" />
                  Submit Feedback
                </>
              )}
            </motion.button>

            {/* AI Reply */}
            <AnimatePresence>
              {aiReply && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-3 border-green-400 rounded-2xl shadow-xl"
                >
                  <div className="text-lg font-black text-green-900 mb-4 flex items-center gap-3">
                    <CheckCircle className="w-6 h-6" />
                    AI Generated Thank You:
                  </div>
                  <p className="text-gray-900 font-bold text-lg leading-relaxed mb-4">
                    {aiReply}
                  </p>
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => copyToClipboard(aiReply)}
                    className="text-green-800 hover:text-green-900 text-base font-black flex items-center gap-2"
                  >
                    <Copy className="w-5 h-5" />
                    {copiedText === aiReply ? "Copied!" : "Copy Reply"}
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
}