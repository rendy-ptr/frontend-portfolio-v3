import { HomeIcon } from "@/components/ui/home";
import { FolderCodeIcon } from "@/components/ui/folder-code";
import { ClockIcon } from "@/components/ui/clock";
import { MessageSquareIcon } from "@/components/ui/message-square";
import type { TFunction } from "i18next";
import { projects, experiences, certificates } from "@/data/portfolio.tsx";
import { FileTextIcon } from "@/components/ui/file-text";

const mockMessages = 3;

export const getDashboardNav = (t: TFunction) => {
  return [
    {
      path: "/dashboard",
      label: t("dashboard.nav.overview"),
      icon: <HomeIcon size={18} />,
    },
    {
      path: "/dashboard/projects",
      label: t("dashboard.nav.projects"),
      icon: <FolderCodeIcon size={18} />,
    },
    {
      path: "/dashboard/experience",
      label: t("dashboard.nav.experience"),
      icon: <ClockIcon size={18} />,
    },
    {
      path: "/dashboard/certificates",
      label: t("dashboard.nav.certificates"),
      icon: <FileTextIcon size={18} />,
    },
    {
      path: "/dashboard/messages",
      label: t("dashboard.nav.messages"),
      icon: <MessageSquareIcon size={18} />,
    },
  ];
};

export const getDashboardStats = (t: TFunction) => {
  return [
    {
      label: t("dashboard.overview.stats.projects"),
      value: projects.length,
      icon: <FolderCodeIcon size={20} />,
      color: "var(--accent)",
      bg: "var(--accent-soft)",
    },
    {
      label: t("dashboard.overview.stats.experience"),
      value: experiences.length,
      icon: <ClockIcon size={20} />,
      color: "var(--info)",
      bg: "var(--info-soft)",
    },
    {
      label: t("dashboard.overview.stats.certificates"),
      value: certificates.length,
      icon: <FileTextIcon size={20} />,
      color: "var(--warm)",
      bg: "var(--warm-soft)",
    },
    {
      label: t("dashboard.overview.stats.messages"),
      value: mockMessages,
      icon: <MessageSquareIcon size={20} />,
      color: "var(--success)",
      bg: "var(--success-soft)",
    },
  ];
};
