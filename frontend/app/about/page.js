import { Mail, Github, Twitter, Linkedin } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gray-900 border border-gray-800 rounded-lg p-8">
          <div className="flex flex-col md:flex-row gap-8 items-center mb-8">
            {/* Profile Image Placeholder */}
            <div className="w-48 h-48 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center text-6xl text-white font-bold">
              JD
            </div>

            <div className="text-center md:text-left">
              <h1 className="text-4xl font-bold text-white mb-2">Maruf Rahman</h1>
              <p className="text-xl text-cyan-400 mb-4">
                Cybersecurity Researcher & Penetration Tester
              </p>
              
              {/* Social Links */}
              <div className="flex gap-4 justify-center md:justify-start">
                <a 
                  href="https://github.com/marufrahmangit" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition"
                >
                  <Github size={24} />
                </a>
                <a 
                  href="https://linkedin.com/in/marufrahmanpro" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition"
                >
                  <Linkedin size={24} />
                </a>
              </div>
            </div>
          </div>

          <div className="text-gray-300 space-y-4">
            <h2 className="text-2xl font-bold text-white mb-4">About Me</h2>
            <p>
              I'm a passionate cybersecurity researcher with over 8 years of experience 
              in penetration testing, vulnerability research, and security assessment. 
              My work focuses on web application security, network penetration testing, 
              and red team operations.
            </p>
            <p>
              This blog serves as a platform to share my findings, techniques, and 
              insights from various security assessments, bug bounty programs, and 
              Capture The Flag (CTF) challenges. I believe in the importance of 
              knowledge sharing within the security community.
            </p>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Certifications</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>Offensive Security Certified Professional (OSCP)</li>
              <li>Certified Ethical Hacker (CEH)</li>
              <li>GIAC Web Application Penetration Tester (GWAPT)</li>
            </ul>

            <h2 className="text-2xl font-bold text-white mt-8 mb-4">Contact</h2>
            <div className="flex items-center gap-2">
              <Mail className="text-cyan-400" size={20} />
              <a 
                href="mailto:marufrahman.work@gmail.com"
                className="text-cyan-400 hover:text-cyan-300"
              >
                marufrahman.work@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}