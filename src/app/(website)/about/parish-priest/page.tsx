/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import React from "react";

const Page = () => {
  return (
    <div className="w-full">
      <div className="gap-9 grid grid-cols-2">
        <img className="hidden md:block w-72" src="/logo.webp" alt="ola parish" />
        <div>
          <p className="mb-3.75">Reverend Father Lawrence Azure</p>
          <p className="mb-2.75">Office of Ola Parish</p>
          <Link className="mb-2.5" href={"mailto:olaparishbolga@gmail.com"}>
            olaparishbolga@gmail.com
          </Link>
          <br />
          <Link href={"tel:+233258720976"}>(233) 25 872 0976</Link>
        </div>
      </div>
      <div className="flex flex-col-reverse gap-9 xl:grid xl:grid-cols-2 mt-9">
        <div className="w-full">
          <p>&quot;God, infinitely perfect and blessed in himself, in a plan of sheer goodness freely created man to make him share in his own blessed life. For this reason, at every time and in every place, God draws close to man. He calls man to seek him, to know him, to love him with all his strength. He calls together all men, scattered and divided by sin, into the unity of his family, the Church. To accomplish this, when the fullness of time had come, God sent his Son as Redeemer and Savior. In his Son and through him, he invites men to become, in the Holy Spirit, his adopted children and thus heirs of his blessed lif</p>
          <p className="mt-7.5">&quot;God, infinitely perfect and blessed in himself, in a plan of sheer goodness freely created man to make him share in his own blessed life. For this reason, at every time and in every place, God draws close to man. He calls man to seek him, to know him, to love him with all his strength. He calls together all men, scattered and divided by sin, into the unity of his family, the Church. To accomplish this, when the fullness of time had come, God sent his Son as Redeemer and Savior. In his Son and through him, he invites men to become, in the Holy Spirit, his adopted children and thus heirs of his blessed lif</p>
          <p className="mt-7.5">&quot;God, infinitely perfect and blessed in himself, in a plan of sheer goodness freely created man to make him share in his own blessed life. For this reason, at every time and in every place, God draws close to man. He calls man to seek him, to know him, to love him with all his strength. He calls together all men, scattered and divided by sin, into the unity of his family, the Church. To accomplish this, when the fullness of time had come, God sent his Son as Redeemer and Savior. In his Son and through him, he invites men to become, in the Holy Spirit, his adopted children and thus heirs of his blessed lif</p>
        </div>
        <div className="bg-green-400 w-full h-auto">
          <img src="/images/general/pp.jpg" alt="ola parish priest" />
        </div>
      </div>
    </div>
  );
};

export default Page;
