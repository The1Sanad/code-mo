import React from 'react';
import { Helmet } from 'react-helmet-async';

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Helmet>
        <title>About Me - Code-mo</title>
        <meta name="description" content="Learn more about the developer behind Code-mo, a collection of developer tools." />
      </Helmet>

      <h1 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-blue-500 to-blue-300 bg-clip-text text-transparent">
        About Me
      </h1>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Profile Image Section */}
        <div className="md:col-span-1">
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-xl border border-gray-700">
            {/* Profile image */}
            <div className="aspect-square bg-gray-700 overflow-hidden">
              <img 
                src="/images/mohammed-ismaeel.svg" 
                alt="Mohammed Ismaeel" 
                className="w-full h-full object-cover"
              />  
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-blue-400">Mohammed Ismaeel</h2>
              <p className="text-gray-400">Solutions Architect | AWS Certified</p>
              
              <div className="mt-4 flex space-x-3">
                {/* Social links - update with actual URLs */}
                <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="https://x.com/MoahmmedIsmaeel" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/mohammedismaeell/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bio Section */}
        <div className="md:col-span-2">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg border border-gray-700">
            <h2 className="text-2xl font-bold mb-4 text-blue-400">Hello, I'm Mohammed Ismaeel</h2>
            
            <div className="space-y-4 text-gray-300">
              <p>
                I'm an AWS Certified Solutions Architect with 10+ years of experience in cloud architecture, software development, and technical leadership. 
                I have proven expertise in designing and implementing scalable cloud solutions, infrastructure-as-code, and DevOps practices. 
              </p>
              
              <p>
                Code-mo is my collection of developer utilities designed to make everyday coding tasks easier. 
                Each tool is built with performance and user experience in mind, running entirely in your browser for maximum privacy and convenience.
              </p>

              <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-300">Professional Experience</h3>
              
              <div className="mb-4">
                <h4 className="font-semibold text-blue-400">Solutions Architect</h4>
                <p className="text-sm text-gray-400 mb-2">Polestar Automotive | 11/2022 – Present</p>
                <p className="mb-2">Lead architect responsible for the cloud architecture powering Polestar's commerce sales journey, overseeing three technical teams and ensuring optimal AWS implementation across the organization.</p>
                
                <p className="text-sm font-medium text-blue-300 mt-2">Key Achievements:</p>
                <ul className="list-disc pl-5 space-y-1 text-sm">
                  <li>Architected and implemented scalable cloud solutions for Checkout, Delivery, and Web shop systems, resulting in 50% reduction in time-to-market for new features and 50% increased order intake capacity</li>
                  <li>Redesigned order management system infrastructure, achieving 20% reduction in infrastructure costs and 30% improvement in system performance</li>
                  <li>Led the technical design and implementation for North America wholesale market rollout, generating 30% increase in sales and successful market expansion</li>
                  <li>Established standardized development practices and governance frameworks across teams, significantly improving consistency and development efficiency</li>
                </ul>
              </div>
              
              <div className="mb-4">
                <h4 className="font-semibold text-blue-400">Tech Lead</h4>
                <p className="text-sm text-gray-400 mb-2">Polestar Automotive | 01/2021 – 10/2022</p>
                <p>Led technical decision-making and team management for cloud services implementation, focusing on AWS serverless architecture and DevOps practices.</p>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-300">Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">AWS Lambda</span>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">DynamoDB</span>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">SNS/SQS</span>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">Serverless</span>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">CI/CD</span>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">GitHub</span>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">DevOps</span>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">GraphQL</span>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">React</span>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">TypeScript</span>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">C#</span>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">Event-Driven</span>
                <span className="px-3 py-1 bg-blue-900/30 text-blue-400 rounded-full text-sm">CQRS</span>
              </div>

              <h3 className="text-xl font-semibold mt-6 mb-2 text-blue-300">Get In Touch</h3>
              <p>
                I'm always interested in discussing cloud architecture, serverless solutions, and technical leadership. Feel free to reach out if you'd like to connect or discuss potential collaborations!
              </p>
              <a href="mailto:mohammed.ismaeel@polestar.com" className="inline-block mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition shadow-lg shadow-blue-500/20">
                Contact Me
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}