import Link from "next/link";
import { useRouter } from "next/router";
import { VettoLogo } from "@/components/VettoLogo";
import { NavigationSection } from "./NavigationSection";
import { navigationConfig } from "./navigationConfig";

export function Sidebar() {
  const router = useRouter();

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:border-r lg:bg-muted/10">
      <div className="flex items-center gap-2 h-16 px-6 border-b">
        <VettoLogo />
      </div>
      
      <nav className="flex-1 overflow-y-auto p-4">
        <ul className="space-y-1">
          {navigationConfig.mainItems.map((item) => {
            const Icon = item.icon;
            const isActive = router.pathname === item.href;
            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  {item.name}
                </Link>
              </li>
            );
          })}
          
          {navigationConfig.sections.map((section) => (
            <NavigationSection
              key={section.title}
              title={section.title}
              items={section.items}
            />
          ))}
        </ul>
      </nav>

      {/* User Section removed - now in Header */}
    </aside>
  );
}