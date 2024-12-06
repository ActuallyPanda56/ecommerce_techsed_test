import Link from "next/link";
import Image from "next/image";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";

const footerLinks = [
  { label: "Home", href: "/" },
  {
    label: "About",
    href: "/about",
    subLinks: [
      { label: "Company", href: "/about/company" },
      { label: "Team", href: "/about/team" },
      { label: "History", href: "/about/history" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
    subLinks: [
      { label: "Support", href: "/contact/support" },
      { label: "Sales", href: "/contact/sales" },
      { label: "General Inquiries", href: "/contact/general" },
    ],
  },
  {
    label: "Services",
    href: "#",
    subLinks: [
      { label: "Web Development", href: "/services/web-development" },
      { label: "App Development", href: "/services/app-development" },
      { label: "SEO Optimization", href: "/services/seo" },
      { label: "Consulting", href: "/services/consulting" },
    ],
  },
  {
    label: "Blog",
    href: "/blog",
    subLinks: [
      { label: "Tech News", href: "/blog/tech-news" },
      { label: "Tutorials", href: "/blog/tutorials" },
      { label: "Company Updates", href: "/blog/company-updates" },
    ],
  },
  {
    label: "Careers",
    href: "/careers",
    subLinks: [
      { label: "Open Positions", href: "/careers/open-positions" },
      { label: "Internships", href: "/careers/internships" },
      { label: "Life at Company", href: "/careers/life-at-company" },
    ],
  },
];

const socialLinks = [
  { platform: "facebook", icon: <FaFacebook /> },
  { platform: "twitter", icon: <FaTwitter /> },
  { platform: "linkedin", icon: <FaLinkedin /> },
  { platform: "instagram", icon: <FaInstagram /> },
];

export default function MainFooter() {
  return (
    <div className="bg-background py-16 flex justify-center">
      <div className="max-w-screen-xl px-4">
        <div className="flex flex-wrap justify-between mb-8">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <Image src="/assets/logo.svg" alt="Logo" width={120} height={40} />
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-8">
          {footerLinks.slice(1).map((link) => (
            <div key={link.label} className="flex flex-col space-y-4">
              <h3 className="font-semibold text-lg text-gray-700">
                {link.label}
              </h3>
              {link.subLinks &&
                link.subLinks.map((subLink) => (
                  <Link
                    key={subLink.label}
                    href={subLink.href}
                    className="text-sm text-gray-700 hover:text-gray-500"
                  >
                    {subLink.label}
                  </Link>
                ))}
            </div>
          ))}
        </div>
        <div className="flex justify-center space-x-6 mt-6 sm:col-span-2 lg:mt-0 w-full">
          {socialLinks.map((social) => (
            <Link
              key={social.platform}
              href="#"
              className="text-2xl text-gray-700 hover:text-gray-500"
            >
              {social.icon}
            </Link>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p>
            &copy; {new Date().getFullYear()} Your Company. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
