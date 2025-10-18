import { MemberNavigation } from "@/components/layout/navigations/Navigation";
import React from "react";

const Page = () => {
  return (
    <div>
      <MemberNavigation
        items={[
          {
            name: "Parishioner Sign Up Form",
            href: "new-parishioner",
          },
        ]}
      />
    </div>
  );
};

export default Page;
