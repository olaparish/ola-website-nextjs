/* eslint-disable @next/next/no-img-element */
const Page = () => {
  return (
    <div className="space-y-12">
      {StaffDirectory.map((staff, indx) => {
        return (
          <div key={indx}>
            <h2 className="mb-5 font-medium">{staff.office}</h2>
            <ul className="flex flex-wrap gap-15">
              {staff.staff.map((st, indx2) => {
                return <div key={indx2}>{StaffCard(st)}</div>;
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default Page;

type CardProps = {
  name: string;
  designation: string;
  phone: string;
  email?: string;
  src: string;
};
const StaffCard = ({ name, designation, phone, email, src }: CardProps) => {
  return (
    <div className="flex gap-7.5 bg-primary-900 pt-4 pr-20 pb-8 pl-4 w-102 h-58">
      <img className="w-30 h-full" src={src} alt={name} />
      <div className="space-y-4 text-white">
        <h3>{name}</h3>
        <p className="font-semibold">{designation}</p>
        <p className="font-medium">{phone}</p>
        {email && <p>{email}</p>}
      </div>
    </div>
  );
};

const StaffDirectory = [
  {
    office: "Parish Office",
    staff: [
      {
        name: "Rev. Fr. Lawrence Azure",
        designation: "Parish Priest of Ola Catholic Church",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
      },
      {
        name: "Reverand Father Roch Akolgo",
        designation: "First Curate",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
      },
      {
        name: "Reverand Father Vincent Duk",
        designation: "Second Curate",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
      },
    ],
  },
  {
    office: "Secretariat for Administration",
    staff: [
      {
        name: "John Doe",
        designation: "Staffing Coordinator",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
      },
      {
        name: "John Doe",
        designation: "Staffing Coordinator",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
      },
      {
        name: "John Doe",
        designation: "Staffing Coordinator",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
        email: "example@gmail.com",
      },
      {
        name: "John Doe",
        designation: "Staffing Coordinator",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
      },
      {
        name: "John Doe",
        designation: "Staffing Coordinator",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
      },
      {
        name: "John Doe",
        designation: "Staffing Coordinator",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
        email: "example@gmail.com",
      },
    ],
  },
  {
    office: "Office of Communications",
    staff: [
      {
        name: "John Doe",
        designation: "Staffing Coordinator",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
        email: "example@gmail.com",
      },
      {
        name: "John Doe",
        designation: "Staffing Coordinator",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
      },
      {
        name: "John Doe",
        designation: "Staffing Coordinator",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
      },
      {
        name: "John Doe",
        designation: "Staffing Coordinator",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
        email: "example@gmail.com",
      },
    ],
  },
  {
    office: "Parish Youth",
    staff: [
      {
        name: "John Doe",
        designation: "Youth Chairman",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
      },
      {
        name: "John Doe",
        designation: "Staffing Coordinator",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
        email: "example@gmail.com",
      },
      {
        name: "John Doe",
        designation: "Staffing Coordinator",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
      },
      {
        name: "John Doe",
        designation: "Staffing Coordinator",
        phone: "(233) 25 872 0976",
        src: "/images/general/pp.jpg",
        email: "example@gmail.com",
      },
    ],
  },
];
