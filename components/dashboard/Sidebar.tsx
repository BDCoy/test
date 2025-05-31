import { Logo } from "../ui/Logo";
import { Settings, LogOut, X, Menu } from "lucide-react";
import { sidebarLinks } from "./navigation";
import { useTourStore } from "@/lib/store/tour";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface SidebarProps {
  onClose?: () => void;
  onSignOut: () => void;
}

export function Sidebar({ onClose, onSignOut }: SidebarProps) {
  const pathname = usePathname();
  const { startTour, hasCompletedTour } = useTourStore();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!hasCompletedTour) {
      startTour();
    }
  }, [hasCompletedTour, startTour]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md"
        onClick={toggleMobileMenu}
      >
        {isMobileMenuOpen ? (
          <X className="w-6 h-6 text-gray-600" />
        ) : (
          <Menu className="w-6 h-6 text-gray-600" />
        )}
      </button>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={toggleMobileMenu}
        />
      )}

      <aside
        className={`w-64 h-screen bg-white border-r border-gray-100 flex flex-col shrink-0 fixed z-40 transition-transform duration-300 ease-in-out lg:translate-x-0 lg:sticky lg:top-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <button
            onClick={() => {
              onClose?.();
              // optionally: reset mobile menu state on logo click
              setIsMobileMenuOpen(false);
            }}
            className="hover:opacity-80 transition-opacity"
          >
            <Logo />
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close sidebar</span>
            </button>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 py-6 px-4 overflow-y-auto">
          <ul className="space-y-1">
            {sidebarLinks.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <li key={item.name}>
                  <Link
                    href={item.path}
                    onClick={() => {
                      onClose?.();
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-green-50 text-green-700"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Icon
                      className={`w-5 h-5 flex-shrink-0 ${
                        isActive ? "text-green-600" : "text-gray-500"
                      }`}
                    />
                    {item.name}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <ul className="space-y-1">
            <li>
              <Link
                href="/dashboard/settings"
                onClick={() => {
                  onClose?.();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <Settings className="w-5 h-5 text-gray-500" />
                Settings
              </Link>
            </li>
            <li>
              <button
                onClick={() => {
                  onSignOut();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <LogOut className="w-5 h-5 text-gray-500" />
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
}
