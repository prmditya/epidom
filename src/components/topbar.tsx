"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "./auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Menu } from "lucide-react";
import { Sidebar } from "./sidebar";
import { useI18n } from "./lang/i18n-provider";
import LangSwitcher from "./lang/lang-switcher";
import { LogOut } from "lucide-react";

export function Topbar() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useI18n();

  return (
    <header
      role="banner"
      className="sticky top-0 z-40 w-full bg-primary text-primary-foreground shadow rounded-none"
    >
      <div className="mx-auto max-w-7xl px-3">
        <div className="grid h-14 grid-cols-[1fr_minmax(220px,720px)_1fr] items-center gap-3">
          {/* Left: Mobile menu + Logo */}
          <div className="flex items-center gap-2">
            <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-primary-foreground hover:bg-white/10"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] p-0 h-[100dvh]">
                <Sidebar mode="mobile" />
              </SheetContent>
            </Sheet>
            <div className="flex h-8 w-14 items-center justify-center rounded-md bg-transparent">
              <Image
                src="/images/logo2.png"
                alt="EPIDOM logo"
                width={56}
                height={24}
                className="h-5 w-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Center: Search (hidden on mobile, centered on md+) */}
          <div className="flex w-full items-center justify-center hidden md:flex">
            <div className="relative w-80 max-w-xl sm:max-w-2xl">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-black" />
              <Input
                placeholder={t("actions.searchPlaceholder")}
                aria-label={t("actions.searchPlaceholder")}
                className="h-9 w-full rounded-full bg-white pl-9 text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>

          {/* Right: language, profile, logout */}
          <div className="ml-auto flex items-center justify-end gap-2">
            {/* Language switcher */}
            <LangSwitcher className="hidden sm:inline-block bg-white text-foreground border" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="gap-2 text-primary-foreground hover:bg-white/10"
                >
                  <Avatar className="size-6">
                    <AvatarFallback className="text-xs bg-white text-foreground">
                      {user?.name?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">
                    {user?.name ?? "User"}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="max-w-[220px] truncate">
                  {user?.email}
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => router.push("/profile")}>
                  {t("nav.profile")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => router.push("/dashboard")}>
                  {t("nav.dashboard")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => {
                logout();
                router.replace("/login");
              }}
            >
              <LogOut className="size-4 mr-1" />
              {t("actions.logout")}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
