/* eslint-disable @next/next/no-img-element */
import React from "react";

const JoinUs = () => {
  return (
    <div className="bg-gold-200 px-5 lg:px-25 pt-10 pb-20">
      <h2 className="text-primary-900 text-center">Join Us For Mass</h2>
      <p className="mx-auto mt-5 w-auto lg:w-200 text-center">
        We invite you to join us in the celebration of the Eucharist. Whether you
        are a long-time parishioner or visiting for the first time, you are
        warmly welcome to share in our worship and community life.{" "}
      </p>
      <img
        className="mx-auto mt-10 w-full lg:w-200 h-75 lg:h-auto object-cover"
        src="/images/welcome/mass.webp"
        alt="ola parish"
      />
      <ul className="flex flex-wrap lg:justify-center gap-17 mt-20">
        {services.map((service, indx) => {
          return (
            <li className="max-w-70" key={indx}>
              <h5 className="text-primary-900">{service.name}</h5>
              <div className="mt-4">
                {service.services.map((se, ind) => {
                  return (
                    <p className="" key={ind}>
                      <span className="font-medium">{se.name}</span>
                      {`: `}
                      <span>{se.time}</span>
                    </p>
                  );
                })}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const services = [
  {
    name: "Sunday Mass Schedule",
    services: [
      {
        name: "English Mass",
        time: "7:00 am",
      },
      {
        name: "Gurune Mass",
        time: "9:30 am",
      },
    ],
  },

  {
    name: "Daily Mass Schedule",
    services: [
      {
        name: "Daily Mass",
        time: "6:15 am",
      },
    ],
  },

  {
    name: "Sacrament of Reconcilisation (Confession)",
    services: [
      {
        name: "Wednesday & Fridays",
        time: "7:00 am at Parish House",
      },
    ],
  },
  {
    name: "Benediction",
    services: [
      {
        name: "Thursdays",
        time: "4:30 pm",
      },
    ],
  },
];

export default JoinUs;
