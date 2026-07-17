import { type NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder-project.supabase.co";
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "placeholder-anon-key";

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options),
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const url = request.nextUrl.clone();
  const { pathname } = url;

  // Protected paths
  const isCustomerRoute = pathname.startsWith("/dashboard");
  const isInstallerRoute =
    pathname.startsWith("/installer-dashboard") || pathname.startsWith("/installer/");
  const isAdminRoute = pathname.startsWith("/admin");

  if (isCustomerRoute || isInstallerRoute || isAdminRoute) {
    if (!user) {
      url.pathname = "/login";
      url.searchParams.set("redirectTo", pathname);
      return NextResponse.redirect(url);
    }

    const role = user.user_metadata?.role || "customer";

    if (isCustomerRoute && role !== "customer") {
      url.pathname = role === "installer" ? "/installer-dashboard" : "/admin/kyc";
      return NextResponse.redirect(url);
    }

    if (isInstallerRoute && role !== "installer") {
      url.pathname = role === "customer" ? "/dashboard" : "/admin/kyc";
      return NextResponse.redirect(url);
    }

    if (isAdminRoute && role !== "admin") {
      url.pathname = role === "customer" ? "/dashboard" : "/installer-dashboard";
      return NextResponse.redirect(url);
    }
  }

  // Redirect authenticated user away from login route
  if (pathname === "/login" && user) {
    const role = user.user_metadata?.role || "customer";
    url.pathname =
      role === "customer"
        ? "/dashboard"
        : role === "installer"
          ? "/installer-dashboard"
          : "/admin/kyc";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - images, icons or other assets with extension
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
