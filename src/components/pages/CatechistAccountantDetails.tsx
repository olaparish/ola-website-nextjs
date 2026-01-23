import Image from "next/image";
import { AccountantUser, CatechistUser } from "../../../types";
import { IconCloseRounded } from "../icons/icon-close-rounded";

type Props = { user: AccountantUser | CatechistUser; onClose?: () => void };

const CatechistAccountantDetails = ({ user }: Props) => {
  return (
    <div className="w-197.5 max-w-197.5">
      <div className="flex justify-end mb-6">
        <IconCloseRounded color="white" className="size-12" />
      </div>
      <div className="bg-gold-200 p-[5px] rounded-t-[50px]">
        <div className="bg-gold-200 border-[0.5px] border-secondary-900 rounded-t-[50px] overflow-hidden">
          <div className="relative bg-secondary-900 h-33">
            <div className="-bottom-16.25 left-12 absolute border-[5px] border-secondary-900 size-28 overflow-hidden">
              <Image
                width={110}
                height={110}
                className="w-28 h-28 object-cover"
                src={user.user.avatar || ""}
                alt={
                  user.user.firstName +
                  " " +
                  user.user.lastName +
                  " " +
                  user.user.otherNames
                }
              />
            </div>
          </div>
          <div className="px-12 pt-20">
            <h3>John Doe</h3>
            <p className="mt-1.5">
              <span>
                {user.user.role.toLowerCase().charAt(0).toUpperCase() +
                  user.user.role.toLowerCase().slice(1)}
              </span>
              {" | "}| ID: <span>{user.userId.slice(0, 8)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatechistAccountantDetails;
