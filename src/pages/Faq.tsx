import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function Faq() {
  const faqs = [
    {
      question: "Are these tools free to use?",
      answer: "Yes, all tools on code-mo.com are completely free to use. We believe in providing high-quality developer tools accessible to everyone."
    },
    {
      question: "Is my data secure?",
      answer: "Absolutely. All tools run entirely in your browser - no data is ever sent to our servers. Your privacy and security are our top priorities."
    },
    {
      question: "Do the tools work offline?",
      answer: "Once loaded, most tools work completely offline. You can even use them without an internet connection."
    },
    {
      question: "Can I use these tools for commercial projects?",
      answer: "Yes, you can use our tools for any purpose, including commercial projects. No attribution required."
    },
    {
      question: "How often are new tools added?",
      answer: "We regularly add new tools and improve existing ones based on user feedback and needs. Follow our changelog to stay updated."
    },
    {
      question: "Are there any usage limits?",
      answer: "No, there are no usage limits. Use the tools as much as you need."
    },
    {
      question: "Can I request a new tool?",
      answer: "Yes! We welcome suggestions. Contact us through our support page with your ideas."
    },
    {
      question: "Do you offer API access?",
      answer: "Currently, we focus on providing browser-based tools. API access may be considered in the future based on demand."
    },
    {
      question: "How do I report bugs or issues?",
      answer: "Please report any bugs through our support page. Include as much detail as possible to help us investigate."
    },
    {
      question: "Are the tools mobile-friendly?",
      answer: "Yes, all our tools are responsive and work well on mobile devices, though some are better suited for desktop use."
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4">
      <Helmet>
        <title>FAQ - Code-mo Developer Tools</title>
        <meta name="description" content="Frequently asked questions about Code-mo's developer tools and utilities." />
      </Helmet>

      <div className="bg-gray-900 rounded-lg p-8">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-semibold text-blue-400 mb-3">
                {faq.question}
              </h2>
              <p className="text-gray-300">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-blue-500/10 border border-blue-500/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-blue-400 mb-3">
            Still have questions?
          </h2>
          <p className="text-gray-300 mb-4">
            Can't find the answer you're looking for? Please reach out to our support team.
          </p>
          <a 
            href="/support"
            className="inline-block bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg transition"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
}