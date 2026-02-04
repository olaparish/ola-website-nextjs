export { auth as proxy } from "./lib/auth";

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/parishioner/:path*",
    "/catechist/:path*",
    "/parish-group/:path*",
    "/accountant/:path*",
    "/parish-council-chairman/:path*",
    "/parish-priest/:path*",
    "/priest/:path*",
    "/parish-youth/:path*",
  ],
};
