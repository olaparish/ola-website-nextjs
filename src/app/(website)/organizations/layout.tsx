"use client";
/* eslint-disable @next/next/no-img-element */
import OrgNavItem from "@/components/modules/organization/org-nav-link";
import { useParams, usePathname } from "next/navigation";

const routeNames: Record<string, string> = {
  societies: "Societies",
  communities: "Communities",
  outstations: "Outstations",
};

const AboutLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const params = useParams();
  const slug = params.slug as string;
  const pathname = usePathname();
  const pageTitle =
    slug
      ?.split("-")
      .map((name) => name.charAt(0).toLocaleUpperCase() + name.slice(1))
      .join(" ") ||
    routeNames[pathname.split("/")[1]] ||
    "OLA Parish";

  return (
    <div>
      <header className="flex justify-center items-center bg-gold-200 h-36">
        <h2 className="text-primary-900 text-center">{pageTitle}</h2>
      </header>

      <div className="flex lg:flex-row flex-col-reverse gap-15 mx-5 lg:mx-20 py-25">
        <div className="relative">
          <nav className="z-20 lg:relative flex flex-col bg-gold-200 px-12.5 pt-10 pb-20 w-full lg:w-78 h-fit">
            <OrgNavItem to="/societies/default" title="Societies" />
            <OrgNavItem to="/communities/default" title="Communities" />
            <OrgNavItem to="/outstations/default" title="Outstations" />
          </nav>
          <img
            className="hidden lg:block top-0 -left-20 z-10 absolute opacity-15"
            src="/images/general/mary.png"
            alt="mary"
          />
        </div>
        <>{children}</>
      </div>
    </div>
  );
};

export default AboutLayout;
