"use client";
import React from "react";
import communityList from "../../../../../data/communities_data.json";
import Link from "next/link";
import OrganizationTemplate from "@/components/modules/organization/template";
import { useParams } from "next/navigation";

const Communities = () => {
  const params = useParams();
  const slug = params.slug;

  const community = communityList.find((com) => com.slug === slug);

  if (community === undefined) {
    return (
      <div>
        <h2 className="mb-10">Explore our Parish Communities</h2>
        <ul className="flex flex-col gap-4">
          {communityList.map((com, indx) => {
            return (
              <li key={indx}>
                <Link
                  className="text-primary-900"
                  href={`/communities/${com.slug}`}
                >
                  {com.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
  return <OrganizationTemplate data={community} />;
};

export default Communities;
