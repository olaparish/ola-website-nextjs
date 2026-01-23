export { auth as proxy } from "./lib/auth";

export const config = {
  matcher: [
    "/parishioner/:path*",
    "/catechist/:path*",
    "/parish-group/:path*",
    "/accountant/:path*",
    "/parish-council-chairman/:path*",
    "/parish-priest/:path*",
    "/priest/:path*",
  ],
};
