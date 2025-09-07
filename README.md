# EaseForm AI

**EaseForm AI** is a smart, interactive feedback form built with **Next.js**, **Tailwind CSS**, and **Framer Motion**. It integrates AI-powered suggestions using a Gemini-like API and enables sending feedback emails using **EmailJS**. This project is designed for modern web applications where user feedback and AI assistance are required.

---

## Features

- **AI-powered suggestions:** Generate suggestions, continue stories, fix grammar, and apply writing tones.
- **Customizable feedback form:** Includes name, email, and message fields.
- **Dynamic, animated UI:** Built with Tailwind CSS and Framer Motion for interactive floating elements and gradients.
- **Email sending:** Send user feedback directly to a support team using EmailJS.
- **Clipboard integration:** Copy AI suggestions and replies easily.
- **Tone selection:** Apply Formal, Casual, Friendly, Professional, or Enthusiastic tones to messages.
- **History tracking:** Maintain a local history of AI suggestions.

---

## Tech Stack

- **Frontend:** Next.js 13+ (App Router), React, Tailwind CSS, Framer Motion, Lucide Icons
- **AI Integration:** Gemini API (or mock implementation)
- **Email Service:** EmailJS
- **Backend (optional):** Firebase Functions for email processing

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/REPO_NAME.git
cd REPO_NAME
Install dependencies:

bash
Copy code
npm install
Configure EmailJS:

Sign up at EmailJS

Create a service, template, and obtain your public key

Replace placeholders in FeedbackForm.js:

javascript
Copy code
const serviceId = "your_service_id";
const templateId = "your_template_id";
const publicKey = "your_public_key";
Configure Gemini API:

Replace the mock Gemini integration in gemini.js with your real API calls.

Example structure:

javascript
Copy code
export async function askGemini(prompt) {
  // Call your AI API and return suggestions
}
Run the project locally:

bash
Copy code
npm run dev
Open your browser at http://localhost:3000.

Usage
Fill in your Name, Email, and Message.

Select a Tone if desired.

Use AI tools:

Get AI Suggestion

Apply Tone

Fix Grammar

Continue Story

Click Submit Feedback to send via EmailJS.

Copy AI suggestions or replies using the copy buttons.


Contributing
Contributions are welcome! Feel free to:

Improve AI suggestions

Add more interactive UI components

Integrate a real Gemini API

License
This project is licensed under the MIT License.

sql
Copy code
MIT License

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

