import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-border bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-primary text-xl font-bold tracking-tight">
              Gridless <span className="text-secondary-foreground">Africa</span>
            </span>
          </Link>

          <nav className="hidden space-x-6 md:flex">
            <Link
              href="/calculator"
              className="hover:text-primary/80 text-sm font-medium transition-colors"
            >
              Solar Calculator
            </Link>
            <Link
              href="/marketplace"
              className="hover:text-primary/80 text-sm font-medium transition-colors"
            >
              Marketplace
            </Link>
            <Link
              href="/installers"
              className="hover:text-primary/80 text-sm font-medium transition-colors"
            >
              Verified Installers
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link href="/login" className={buttonVariants({ variant: "ghost" })}>
              Sign In
            </Link>
            <Link href="/calculator" className={buttonVariants()}>
              Get Quotes
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="border-border bg-muted/30 border-t">
        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="space-y-4">
              <span className="text-primary text-lg font-bold tracking-tight">
                Gridless <span className="text-secondary-foreground">Africa</span>
              </span>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Nigeria&apos;s trusted solar marketplace connecting residential and commercial users
                with vetted renewable energy solutions.
              </p>
            </div>
            <div>
              <h3 className="text-foreground mb-3 text-sm font-semibold">Platform</h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>
                  <Link href="/calculator" className="hover:text-foreground">
                    Savings Calculator
                  </Link>
                </li>
                <li>
                  <Link href="/marketplace" className="hover:text-foreground">
                    Equipment Catalogue
                  </Link>
                </li>
                <li>
                  <Link href="/installers" className="hover:text-foreground">
                    Verified Installers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-foreground mb-3 text-sm font-semibold">Portals</h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>
                  <Link href="/login" className="hover:text-foreground">
                    Customer Portal
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-foreground">
                    Installer Portal
                  </Link>
                </li>
                <li>
                  <Link href="/login" className="hover:text-foreground">
                    Admin Command Center
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-foreground mb-3 text-sm font-semibold">Contact</h3>
              <ul className="text-muted-foreground space-y-2 text-sm">
                <li>
                  <a href="mailto:support@gridless.africa" className="hover:text-foreground">
                    support@gridless.africa
                  </a>
                </li>
                <li>
                  <span className="block">Lagos & Oyo State, Nigeria</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-border text-muted-foreground mt-8 border-t pt-6 text-center text-xs">
            &copy; {new Date().getFullYear()} Gridless Africa. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
