export { auth as middleware } from "./lib/auth";

export const config = {
  matcher: ["/catechist/:path*", "/parishioner/:path*"],
};
