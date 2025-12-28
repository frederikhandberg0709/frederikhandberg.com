import NavbarLink from "./NavbarLink";

export interface NavLink {
  href: string;
  text: string;
  sectionId?: string;
}

interface PillNavbarMenuProps {
  links: NavLink[];
  activeSection?: string;
  onNavLinkClick?: (sectionId: string) => void;
  className?: string;
}

export default function PillNavbarMenu({
  links,
  activeSection = "",
  onNavLinkClick,
  className = "",
}: PillNavbarMenuProps) {
  const linkClass = (sectionId: string) =>
    `${
      activeSection === sectionId
        ? "text-black dark:text-white"
        : "text-black/50 hover:text-black dark:text-white/50 dark:hover:text-white"
    }`;

  const handleNavLinkClick = (sectionId: string) => {
    if (onNavLinkClick) {
      onNavLinkClick(sectionId);
      return;
    }

    const section = document.getElementById(sectionId);
    if (section) {
      const yOffset = 5;
      const y =
        section.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div
      className={`pointer-events-auto relative rounded-full border border-black/5 bg-white/50 p-2 shadow-lg backdrop-blur-xl dark:border-white/5 dark:bg-black/20 ${className}`}
    >
      <div className="flex gap-2.5">
        {links.map((link) => (
          <NavbarLink
            key={link.sectionId || link.href}
            href={link.href}
            text={link.text}
            className={link.sectionId ? linkClass(link.sectionId) : undefined}
            onClick={
              link.sectionId
                ? (e) => {
                    e.preventDefault();
                    handleNavLinkClick(link.sectionId!);
                  }
                : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
