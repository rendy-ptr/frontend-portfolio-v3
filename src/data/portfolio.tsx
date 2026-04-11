import profileImg from "../assets/image/profile.jpg";
import aromaCoffeeImg from "../assets/image/pos-coffee-shop.png";
import tanyaInImg from "../assets/image/tanya-in.png";
import luminaImg from "../assets/image/Lumina.png";
import watchPartyImg from "../assets/image/watch-party.png";
import portfolioV2Img from "../assets/image/portfolio-website-v2.png";
import portfolioV1Img from "../assets/image/portfolio-website-v1.jpeg";
import imsakiyahScheduleImg from "../assets/image/web-imsakiyah.png";
import qrGeneratorImg from "../assets/image/web-qrku.png";
import { ChartSplineIcon } from "@/components/ui/chart-spline";
import { DatabaseBackupIcon } from "@/components/ui/database-backup";
import { BotIcon } from "@/components/ui/bot";
import { TerminalIcon } from "@/components/ui/terminal";
import { ChartColumnIncreasingIcon } from "@/components/ui/chart-column-increasing";
import { BrainIcon } from "@/components/ui/brain";
import { FileCheck2Icon } from "@/components/ui/file-check-2";
import cvRendy from "../assets/pdf/CV-RENDY.pdf";

export const personal = {
  name: "Rendy Putra",
  role: "Full Stack Developer",
  location: "Indonesia",
  email: "rendyworksspace@email.com",
  availableForWork: true,
  avatar: profileImg,
  cv: cvRendy,
  socials: {
    github: "https://github.com/rendy-ptr",
    linkedin: "https://linkedin.com/in/rendy-putra/",
    instagram: "https://www.instagram.com/rndyptrr_/",
    discord: "https://discord.com/users/718346881528365116",
  },
};

export const experiences = [
  {
    id: 1,
    company: "PT. Kreasi Hexa Indonesia",
    role: "IT Developer",
    period: "October 2025 — April 2026",
    type: "Internship",
    description:
      "Developed an integrated HRIS system, from Figma prototyping and database design to full implementation, effectively optimizing HR administration workflows through collaborative development.",
    tech: ["Figma", "MySQL", "Git", "Vue.js", "Laravel", "Inertia.js"],
    color: "#7C3AED",
  },
  {
    id: 2,
    company: "PT. Jidoka System Indonesia",
    role: "Technical Odoo Developer",
    period: "March 2023 — June 2023",
    type: "Internship",
    description:
      "Successfully completed an intensive programming internship focused on practical development skills and Agile methodologies to deliver effective technical solutions.",
    tech: ["Odoo", "Python", "PostgreSQL", "Agile", "Git"],
    color: "#06B6D4",
  },
];

export const skillCategories = [
  {
    category: "Frontend",
    color: "#7C3AED",
    skills: [
      { name: "React", level: 82 },
      { name: "TypeScript", level: 75 },
      { name: "Vue.js", level: 80 },
      { name: "Next.js", level: 68 },
      { name: "CSS / Tailwind", level: 85 },
      { name: "Framer Motion", level: 55 },
    ],
  },
  {
    category: "Backend",
    color: "#06B6D4",
    skills: [
      { name: "Node.js", level: 65 },
      { name: "Laravel / PHP", level: 82 },
      { name: "Express.js", level: 60 },
      { name: "PostgreSQL", level: 68 },
      { name: "MySQL", level: 80 },
      { name: "REST API", level: 78 },
    ],
  },
  {
    category: "Tools & DevOps",
    color: "#F43F5E",
    skills: [
      { name: "Git / GitHub", level: 88 },
      { name: "Docker", level: 45 },
      { name: "AWS (EC2/S3)", level: 40 },
      { name: "Linux / CLI", level: 65 },
      { name: "Vite / Webpack", level: 70 },
      { name: "Figma", level: 78 },
    ],
  },
];

export const projects = [
  {
    id: 1,
    title: "POS & Inventory Management System",
    description:
      "A point-of-sale system for coffee shops with product and transaction management features.",
    image: aromaCoffeeImg,
    tech: ["React", "TypeScript", "Tailwind CSS", "Node.js", "Express.js", "Prisma", "PostgreSQL"],
    github: "https://github.com/rendy-ptr/pos-coffee-backend",
    isLive: false,
    live: "#",
    isDevelopment: true,
    featured: true,
    color: "#7C3AED",
  },
  {
    id: 2,
    title: "Tanya In — Forum Discussion",
    description:
      "Tanya In is a platform for asking questions and sharing knowledge with other users.",
    image: tanyaInImg,
    tech: ["Blade", "Laravel", "Tailwind CSS", "PostgreSQL"],
    github: "https://github.com/rendy-ptr/tanya.in",
    isLive: false,
    live: "#",
    isDevelopment: false,
    featured: true,
    color: "#06B6D4",
  },
  {
    id: 3,
    title: "Lumina",
    description:
      "Lumina is a blogging platform for writing, reading, and sharing stories or ideas with other users.",
    image: luminaImg,
    tech: ["Blade", "Laravel", "Tailwind CSS", "MySQL"],
    github: "https://github.com/rendy-ptr/Lumina",
    isLive: false,
    live: "#",
    isDevelopment: false,
    featured: false,
    color: "#F59E0B",
  },
  {
    id: 4,
    title: "Watch Party",
    description:
      "A web app for watching videos together in real time with friends.",
    image: watchPartyImg,
    tech: ["Next Js", "TypeScript", "Tailwind CSS", "Node.js", "Firebase"],
    github: "https://github.com/rendy-ptr/watch-party-v1",
    live: "https://watch-party-v1.vercel.app/",
    featured: false,
    isLive: true,
    isDevelopment: false,
    color: "#F43F5E",
  },
  {
    id: 5,
    title: "Portfolio V2",
    description:
      "The first portfolio website I developed, featuring a neobrutalist design and a chatbot.",
    image: portfolioV2Img,
    tech: ["Next Js", "TypeScript", "Tailwind CSS", "Node.js"],
    github: "https://github.com/rendy-ptr/portfolio-website-v2",
    live: "https://portfolio-website-v2-dun.vercel.app/",
    featured: false,
    isLive: true,
    isDevelopment: false,
    color: "#7C3AED",
  },
  {
    id: 6,
    title: "Portfolio V1",
    description: "The first portfolio website I developed using a 3D concept",
    image: portfolioV1Img,
    tech: ["Next Js", "TypeScript", "Three Js", "Tailwind CSS", "Node.js"],
    github: "https://github.com/rendy-ptr/portfolio-website-v1",
    live: "https://portfolio-website-v1-rouge-nu.vercel.app/",
    featured: false,
    isLive: true,
    isDevelopment: false,
    color: "#06B6D4",
  },
  {
    id: 7,
    title: "Imsakiyah Schedule",
    description: "An interactive website for Ramadan fasting schedules.",
    image: imsakiyahScheduleImg,
    tech: ["Next Js", "TypeScript", "Tailwind CSS", "Bun.js"],
    github: "https://github.com/rendy-ptr/Imsakiyah-Schedule",
    live: "#",
    featured: false,
    isLive: false,
    isDevelopment: false,
    color: "#F59E0B",
  },
  {
    id: 8,
    title: "QR Generator",
    description: "A website for creating and sharing QR codes with password protection.",
    image: qrGeneratorImg,
    tech: ["React", "TypeScript", "Tailwind CSS", "Bun.js", "Hono.js", "PostgreSQL"],
    github: "https://github.com/rendy-ptr/qrku",
    live: "#",
    featured: false,
    isLive: false,
    isDevelopment: false,
    color: "#F43F5E",
  },
  {
    id: 9,
    title: "Model Ethereum Fraud Detection",
    description: "A study on the effectiveness of various machine learning models in detecting fraud on the Ethereum blockchain.",
    image: null,
    tech: ["Python", "Scikit-learn", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
    github: "https://github.com/rendy-ptr/ethereum-fraud-detection",
    live: "#",
    featured: false,
    isLive: false,
    isDevelopment: false,
    color: "#7C3AED",
  }
];

export const certificates = [
  {
    id: 1,
    title: "Competency Certificate Junior Web Developer",
    issuer: "BNSP (Badan Nasional Sertifikasi Profesi)",
    date: "June, 2023 - June, 2026",
    credentialId: "TIK.1389.1136.2023",
    color: "#7C3AED",
    icon: FileCheck2Icon,
    url: "https://drive.google.com/file/d/1Uq66qdcf7vRxc5uck_DwIEdTxpyjLaHa/view",
  },
  {
    id: 2,
    title: "Basics of artificial intelligence",
    issuer: "Dicoding",
    date: "January, 2026 - January, 2029",
    credentialId: "1RXYQGVEQZVM",
    color: "#06B6D4",
    icon: BrainIcon,
    url: "https://www.dicoding.com/certificates/1RXYQGVEQZVM",
  },
  {
    id: 3,
    title: "Basics of data visualization",
    issuer: "Dicoding",
    date: "April, 2025 - April, 2028",
    credentialId: "RVZKWJNGMZD5",
    color: "#F59E0B",
    icon: ChartColumnIncreasingIcon,
    url: "https://www.dicoding.com/certificates/RVZKWJNGMZD5",
  },
  {
    id: 4,
    title: "Basics of Python Programming",
    issuer: "Dicoding",
    date: "March, 2025 - March, 2028",
    credentialId: "GRX53W66YZ0M",
    color: "#F43F5E",
    icon: TerminalIcon,
    url: "https://www.dicoding.com/certificates/GRX53W66YZ0M",
  },
  {
    id: 5,
    title: "Basics of machine learning",
    issuer: "Dicoding",
    date: "May, 2025 - May, 2028",
    credentialId: "RVZKWNMQOZD5",
    color: "#8B5CF6",
    icon: BotIcon,
    url: "https://www.dicoding.com/certificates/RVZKWNMQOZD5",
  },
  {
    id: 6,
    title: "Basics of Structured Query Language (SQL)",
    issuer: "Dicoding",
    date: "November, 2024 - November, 2027",
    credentialId: "53XEQ1W5KXRN",
    color: "#06B6D4",
    icon: DatabaseBackupIcon,
    url: "https://www.dicoding.com/certificates/53XEQ1W5KXRN",
  },
  {
    id: 7,
    title: "Basics of Data Science",
    issuer: "Dicoding",
    date: "November, 2024 - November, 2027",
    credentialId: "GRX54JV7YP0M",
    color: "#F59E0B",
    icon: ChartSplineIcon,
    url: "https://www.dicoding.com/certificates/GRX54JV7YP0M",
  }
];
