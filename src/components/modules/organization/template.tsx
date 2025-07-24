/* eslint-disable @next/next/no-img-element */
import React from "react";
import communities from "../../../data/communities_data.json";
import societies from "../../../data/societies_data.json";
import outstations from "../../../data/outstations_data.json";

type Props = {
  data:
    | (typeof societies)[0]
    | (typeof communities)[0]
    | (typeof outstations)[0];
};

const OrganizationTemplate = ({ data }: Props) => {
  console.log("Hero image: ", data.heroImage);
  return (
    <div className="lg:mt-10">
      {/* <h2 className="mb-10 text-primary-900 text-center">{data.name}</h2> */}
      <img
        className="bg-green w-full lg:max-h-200 object-cover"
        src={data.heroImage}
        alt={`${data.name} ola parish bolga`}
      />

      <div className="flex flex-col gap-4 mt-10">
        {data.writeup.map((wri, indx) => (
          <p key={indx}>{wri}</p>
        ))}
      </div>
      <h5 className="mt-6 text-primary-900">Contact Us</h5>
      <p>
        <strong>Phone: </strong>
        {data.contactDetails.phone}
      </p>
      <p>
        <strong>Address: </strong>
        {data.contactDetails.address}
      </p>
    </div>
  );
};

export default OrganizationTemplate;
