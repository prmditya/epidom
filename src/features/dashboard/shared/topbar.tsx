"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { useI18n } from "../../../components/lang/i18n-provider";
import LangSwitcher from "../../../components/lang/lang-switcher";
import { LogOut } from "lucide-react";
import { useUser } from "@/lib/auth-client";
import { signOut } from "next-auth/react";

export function Topbar() {
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useI18n();

  const { user, loading } = useUser();

  if (loading) return null;

  return (
    <header
      role="banner"
      className="bg-primary text-primary-foreground navbar-no-transition navbar-static sticky top-0 z-10 w-full rounded-none shadow"
      style={{
        animation: "none !important",
        transition: "none !important",
        transform: "none !important",
        opacity: "1 !important",
      }}
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
                  className="text-primary-foreground hover:bg-white/10 md:hidden"
                >
                  <Menu className="size-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="h-[100dvh] w-[280px] p-0">
                <Sidebar mode="mobile" />
              </SheetContent>
            </Sheet>
            <div className="flex w-auto items-center justify-center rounded-md bg-transparent">
              <Image
                src="/images/logo-white.png"
                alt="EPIDOM logo"
                width={90}
                height={24}
                className="w-auto object-contain"
                priority
              />
            </div>
          </div>

          {/* Center: Search (hidden on mobile, centered on md+) */}
          <div className="hidden w-full items-center justify-center md:flex">
            <div className="relative w-80 max-w-xl sm:max-w-2xl">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-black" />
              <Input
                placeholder={t("actions.searchPlaceholder")}
                aria-label={t("actions.searchPlaceholder")}
                className="text-foreground placeholder:text-muted-foreground h-9 w-full rounded-full bg-white pl-9"
              />
            </div>
          </div>

          {/* Right: language, profile, logout */}
          <div className="ml-auto flex items-center justify-end gap-2">
            {/* Language switcher */}
            <LangSwitcher className="text-foreground hidden border bg-white sm:inline-block" />
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="text-primary-foreground gap-2 hover:bg-white/10 hover:text-white"
                >
                  <Avatar className="size-6">
                    <AvatarFallback className="text-foreground bg-white text-xs">
                      {user?.name?.[0]?.toUpperCase() ?? user?.email?.[0]?.toUpperCase() ?? "U"}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">{user?.name ?? user?.email}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel className="max-w-[220px] truncate">
                  {user?.name ?? user?.email}
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
                signOut();
              }}
            >
              <LogOut className="mr-1 size-4" />
              {t("actions.logout")}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
