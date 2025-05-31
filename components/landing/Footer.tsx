import {
  ArrowUp,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  Twitter,
} from "lucide-react";
import Link from "next/link";

interface Props {
  scrollToSection: (sectionId: string) => void;
}
export const Footer: React.FC<Props> = ({ scrollToSection }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gray-900">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 pt-16 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-8">
          {/* Logo & Description */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 text-white mb-4">
              <div className="flex items-center justify-center h-8 w-8 bg-green-600 rounded-full">
                <ArrowUpRight className="h-5 w-5 transform rotate-12" />
              </div>
              <span className="text-xl font-bold">UpHero</span>
            </div>
            <p className="text-gray-400 mb-4">
              Empowering freelancers to succeed with AI-powered tools and expert
              guidance.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:support@uphero.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">PRODUCT</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#features"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#pricing"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="#faq"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">COMPANY</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">LEGAL</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/privacy"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Terms
                </Link>
              </li>
              <li>
                <Link
                  href="/security"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Security
                </Link>
              </li>
              <li>
                <Link
                  href="/cookies"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Cookies
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="col-span-1">
            <h3 className="text-white font-semibold mb-4">SUPPORT</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/help"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href="/status"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Status
                </Link>
              </li>
              <li>
                <Link
                  href="/api"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  API
                </Link>
              </li>
              <li>
                <Link
                  href="/community"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row items-center justify-between">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 UpHero. All rights reserved.
          </div>

          <div className="flex items-center space-x-8">
            <button
              onClick={scrollToTop}
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowUp className="w-5 h-5 mr-2" />
              Back to top
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
