import { useState } from "react";
import { VettoLogo } from "@/components/VettoLogo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Bell, Search, Menu, X } from "lucide-react";
import { UserMenu } from "@/components/dashboard/UserMenu";
import { MobileMenu } from "./MobileMenu";

interface HeaderProps {
  mobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

export function Header({ mobileMenuOpen, onMobileMenuToggle }: HeaderProps) {
  return (
    <>
      <header className="h-16 border-b bg-background flex items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-4 flex-1">
          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={onMobileMenuToggle}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Mobile Logo */}
          <div className="lg:hidden">
            <VettoLogo />
          </div>

          {/* Search */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search users, subscriptions..."
                className="pl-10 w-full"
              />
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
          </Button>

          {/* User Menu - Now always visible */}
          <UserMenu />
        </div>
      </header>

      {/* Mobile Menu Component */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={onMobileMenuToggle} />
    </>
  );
}