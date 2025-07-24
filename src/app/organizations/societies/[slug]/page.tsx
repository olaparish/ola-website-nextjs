"use client";

import React from "react";
import societyList from "../../../../data/societies_data.json";
import OrganizationTemplate from "@/components/modules/organization/template";
import Link from "next/link";
import { useParams } from "next/navigation";

const Societies = () => {
  const params = useParams();
  const slug = params.slug;

  const society = societyList.find((soc) => soc.slug === slug);
  console.log("Slug", slug);
  console.log("Society", society);

  if (society === undefined) {
    return (
      <div>
        <h2 className="mb-10">Explore our Parish Societies</h2>
        <ul className="flex flex-col gap-4">
          {societyList.map((soc, indx) => {
            return (
              <li key={indx}>
                <Link
                  className="text-primary-900"
                  href={`/societies/${soc.slug}`}
                >
                  {soc.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  return <OrganizationTemplate data={society} />;
};

export default Societies;
