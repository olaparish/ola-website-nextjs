"use client";
import React from "react";
import outstationList from "../../../../../data/outstations_data.json";
import OrganizationTemplate from "@/components/modules/organization/template";
import Link from "next/link";
import { useParams } from "next/navigation";

const Outstations = () => {
  const params = useParams();
  const slug = params.slug;
  const outstation = outstationList.find((out) => out.slug === slug);

  if (outstation === undefined) {
    return (
      <div>
        <h2 className="mb-10">Explore our Parish Outstations</h2>
        <ul className="flex flex-col gap-4">
          {outstationList.map((out, indx) => {
            return (
              <li key={indx}>
                <Link
                  className="text-primary-900"
                  href={`/outstations/${out.slug}`}
                >
                  {out.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  return <OrganizationTemplate data={outstation} />;
};

export default Outstations;
