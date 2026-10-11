import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-background flex min-h-screen flex-col">
      {/* Skip Link */}
      <a
        href="#main-content"
        className="focus:bg-primary focus:text-primary-foreground sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:rounded-lg focus:px-4 focus:py-2 focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="border-border bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur-sm">
        <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-primary text-xl font-bold tracking-tight">
              Gridless <span className="text-secondary-foreground">Africa</span>
            </span>
          </Link>

          <nav className="hidden space-x-6 md:flex" aria-label="Main Navigation">
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

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="text-muted-foreground hover:text-foreground focus-visible:ring-ring inline-flex items-center justify-center rounded-md p-2 focus-visible:ring-2 focus-visible:outline-none md:hidden"
              aria-label="Toggle navigation menu"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <svg
                className="size-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-border bg-muted/30 border-t">
        <div className="container mx-auto max-w-6xl px-4 py-8 md:py-12">
          {/* Newsletter Signup Row */}
          <div className="border-border/60 mb-8 border-b pb-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <h3 className="text-foreground text-base font-semibold">
                  Stay updated on solar pricing &amp; market intel
                </h3>
                <p className="text-muted-foreground text-sm">
                  Subscribe to receive weekly equipment price benchmarks and renewable energy
                  updates.
                </p>
              </div>
              <form
                className="flex w-full flex-col gap-2 sm:flex-row sm:items-center md:w-auto"
                action="#"
              >
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  required
                  aria-label="Email address for newsletter"
                  className="border-input bg-background placeholder:text-muted-foreground focus-visible:border-primary focus-visible:ring-primary/20 h-9 w-full rounded-md border px-3 text-sm focus-visible:ring-2 focus-visible:outline-none sm:w-64"
                />
                <button
                  type="submit"
                  className="bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:ring-ring h-9 shrink-0 rounded-md px-4 text-sm font-medium transition-colors focus-visible:ring-2 focus-visible:outline-none"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>

          {/* Social Media Links Row */}
          <div className="border-border/40 mb-8 flex flex-wrap items-center justify-between gap-4 border-b pb-6">
            <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
              Follow Gridless Africa
            </span>
            <div className="flex items-center space-x-4" aria-label="Social media links">
              <a
                href="#"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                aria-label="Twitter / X"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.53 1.53 0 1 0 0-3.06 1.53 1.53 0 0 0 0 3.06m1.39 9.74v-8.37H5.07v8.37h2.78z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg className="size-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Main Footer Grid */}
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
                  <span className="block">Lagos &amp; Oyo State, Nigeria</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Trust Badges Row */}
          <div className="border-border/60 mt-10 border-t pt-6">
            <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
              <div className="border-border/80 bg-background/60 text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                <svg
                  className="text-primary size-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                <span>Paystack Verified Merchant</span>
              </div>

              <div className="border-border/80 bg-background/60 text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                <svg
                  className="text-primary size-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span>SSL Secured</span>
              </div>

              <div className="border-border/80 bg-background/60 text-muted-foreground inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium">
                <svg
                  className="text-primary size-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>CAC Registered</span>
              </div>
            </div>
          </div>

          {/* Copyright & Proudly Nigerian */}
          <div className="border-border text-muted-foreground mt-6 flex flex-col items-center justify-between gap-2 border-t pt-6 text-center text-xs sm:flex-row sm:text-left">
            <div>&copy; {new Date().getFullYear()} Gridless Africa. All rights reserved.</div>
            <div className="font-medium">Proudly Nigerian 🇳🇬</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
