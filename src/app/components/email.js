"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Loader2, Send, Wand2, MessageSquare, CheckCircle, AlertCircle, Copy, X } from "lucide-react";
import emailjs from "@emailjs/browser";

// Optional: init EmailJS once at the top
// emailjs.init("YOUR_PUBLIC_KEY");

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
    if (name === "message") setCharacterCount(value.length);
  };

  const handleFocus = (fieldName) => setActiveField(fieldName);
  const handleBlur = () => setActiveField("");

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
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setSubmitStatus("error");
      setLoading(false);
      return;
    }

    try {
      // Replace these with your actual EmailJS values
      const serviceId = "service_xxxxx";   // from dashboard
      const templateId = "template_xxxxx"; // from dashboard
      const publicKey = "pK_xxxxx";        // from dashboard

      // Template parameters — must match template variable names
      const templateParams = {
        from_name: form.name,
        from_email: form.email,
        message: form.message,
        to_name: "Support Team",
      };

      console.log("Sending email with params:", templateParams);

      const response = await emailjs.send(
        serviceId,
        templateId,
        templateParams,
        publicKey
      );

      console.log("EmailJS response:", response);

      const thankYou = `Thank you ${form.name} for visiting Easeform! We'll receive your message and will get back to you at ${form.email} soon with our suggestion.`;
      setAiReply(thankYou);

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

  // …the rest of your JSX stays the same below ↓
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* background & form JSX unchanged */}
      {/* paste the JSX from your previous file here */}
    </div>
  );
}
