import React from "react";

type Props = {
  title: string;
  subtitle: string;
};
const DashboardCard = ({ title, subtitle }: Props) => {
  return (
    <div className="bg-primary-100 px-5.5 py-4 w-70">
      <p className="block mb-3 font-light">{title}</p>
      <p className="font-medium">{subtitle}</p>
    </div>
  );
};

export default DashboardCard;
