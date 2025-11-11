import SignoutBtn from "@/components/common/signout-btn";
import { IconEditThin } from "@/components/icons/icon-edit-thin";
import IconSolarLogout from "@/components/icons/icon-logout";
import NavSelect from "@/components/ui/NavSelect";
import { auth, signOut } from "@/lib/auth";
import React from "react";

const Page = async () => {
  const session = await auth();
  return (
    <div className="">
      <div className="flex justify-end-safe pt-4.75">
        <NavSelect
          name="Add"
          items={[{ name: "Initation", href: "/society/new-initation" }]}
        />
      </div>

      <header>
        <h2 className="font-normal">Catholic Women Association</h2>
        <p className="text-secondary-900">All your details</p>
      </header>

      <div className="gap-6 grid grid-cols-[auto_1fr] mt-10">
        <div className="flex flex-col gap-4 w-20">
          <span className="block bg-primary-100 py-2.75 pr-8 pl-5 w-fit font-medium">
            Bio
          </span>
          <button
            className="flex justify-between hover:bg-primary-100 px-2 py-2.75 w-full cursor-pointer"
            type="button"
          >
            <IconEditThin
              className="text-secondary-900/70"
              width={20}
              height={20}
            />
            <span className="font-medium">Edit</span>
          </button>
        </div>
        <div>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatu
            nesciunt omnis, ratione placeat amet doloribus assumenda, quasi
            ullamsimilique offic ia ad ipsum veritatis itaque nobis temporibus
            ut quisquam ab debitis, saepe non? Tempore cupiditate provident
            architecto, unde exvoluptatibus aliquid consequatur, at nobis illum
            distinctio animi id hiceos soluta sed sunt placeat reprehenderit
            officiis omnis incidunt amet sapiente tempora. Fugiat quae deserunt
            delectus, aspernatur at nesciunt dicta odio ipsam! Eaque, neque
            eveniet. Qui praesentium porro quisquam modi rem ducimus aut
            perferendis commodi quod illo quo quibusdam dolore ab
          </p>
          <p>
            Pariatur inventore ullam deserunt hic quod ratione debitis quis,
            ipsa autem? Laboriosam laborum illo id doloremque, temporibus omnis
            dolorem sequi veniam voluptate quos consequuntur doloribus. Aliquam
            commodi nemo obcaecati, culpa dolorem vitae quod. Magni non
            reprehenderit quaeratnostrum sint, laborum ipsum maiores commodi
            quidem minima numqua doloribus, tempore, ipsam inventore officiis
            assumenda modi impedit abrepellendus similique aliquam.
            Necessitatibus, dolorum nisi eligendiquaerat quasi blanditiis
            ratione amet facilis dignissimos laboriosam dolorem aliquam
            excepturi officia repudiandae cupiditate ducimus
          </p>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aspernatu
            nesciunt omnis, ratione placeat amet doloribus assumenda, quasi
            ullamsimilique offic ia ad ipsum veritatis itaque nobis temporibus
            ut quisquam ab debitis, saepe non? Tempore cupiditate provident
            architecto, unde exvoluptatibus aliquid consequatur, at nobis illum
            distinctio animi id hiceos soluta sed sunt placeat reprehenderit
            officiis omnis incidunt amet sapiente tempora. Fugiat quae deserunt
            delectus, aspernatur at nesciunt dicta odio ipsam! Eaque, neque
            eveniet. Qui praesentium porro quisquam modi rem ducimus aut
            perferendis commodi quod illo quo quibusdam dolore ab
          </p>
          <p>
            Pariatur inventore ullam deserunt hic quod ratione debitis quis,
            ipsa autem? Laboriosam laborum illo id doloremque, temporibus omnis
            dolorem sequi veniam voluptate quos consequuntur doloribus. Aliquam
            commodi nemo obcaecati, culpa dolorem vitae quod. Magni non
            reprehenderit quaeratnostrum sint, laborum ipsum maiores commodi
            quidem minima numqua doloribus, tempore, ipsam inventore officiis
            assumenda modi impedit abrepellendus similique aliquam.
            Necessitatibus, dolorum nisi eligendiquaerat quasi blanditiis
            ratione amet facilis dignissimos laboriosam dolorem aliquam
            excepturi officia repudiandae cupiditate ducimus
          </p>
        </div>
      </div>
      <SignoutBtn />
    </div>
  );
};

export default Page;
