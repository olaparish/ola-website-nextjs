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
          <p>
            Welcome to the online home of Our Lady Queen of Africa (OLA) Parish,
            Bolgatanga. I am Very Reverend Father Lawrence Azure, and it is my
            profound privilege to serve as your Parish Priest and the Vicar
            General of the Navrongo-Bolgatanga Diocese. Whether you are a
            long-standing member of our parish family, a visitor from afar, or
            someone seeking a spiritual home, I extend to you a heartfelt
            welcome in the name of our Lord Jesus Christ. This digital platform
            is designed to be a window into the vibrant life of our community,
            reflecting the warmth, faith, and spirit that define us.
          </p>
          <p className="mt-7.5">
            Here at OLA Parish, we are more than just a congregation; we are a
            family of believers united by our Catholic faith and a shared
            commitment to living out the Gospel in our daily lives. We strive to
            be a beacon of hope and love in Bolgatanga, fostering spiritual
            growth through the celebration of the Holy Eucharist, the
            Sacraments, and fervent prayer. Our mission is to bring the light of
            Christ to all corners of our society, witnessing to His truth through
            our words and actions.
          </p>
          <p className="mt-7.5">
            Our community is alive with the spirit of service and fellowship.
            From our dynamic youth groups and dedicated choirs to our various
            societies and charitable organizations, there is a place for
            everyone to get involved and share their God-given talents. We
            believe that every member has a unique role to play in building up
            the Body of Christ. As we journey together in faith, we encourage
            one another to grow in holiness and to reach out with compassion to
            the poor, the marginalized, and those in need of God&apos;s mercy.
          </p>
          <p className="mt-7.5">
            As the Vicar General of the Diocese, I also see our parish as a
            vital part of the larger diocesan family. We are called to walk in
            synodality with our Bishop and the universal Church, participating
            actively in the mission of evangelization. We are committed to
            nurturing vocations, supporting families, and empowering our laity
            to take up their baptismal responsibility as missionary disciples.
            Together, we strive to create a community where everyone feels
            valued, heard, and loved.
          </p>
          <p className="mt-7.5">
            I invite you to explore our website to learn more about our Mass
            schedules, upcoming events, and the many ways you can participate in
            our parish life. Whether you are joining us for worship, seeking
            sacramental preparation, or looking for opportunities to serve, know
            that our doors are always open to you. May your time here be a
            source of blessing and inspiration, and may the grace of our Lord
            Jesus Christ, the love of God, and the communion of the Holy Spirit
            be with you always.
          </p>
        </div>
        <div className="bg-green-400 w-full h-auto">
          <img src="/images/general/pp.jpg" alt="ola parish priest" />
        </div>
      </div>
    </div>
  );
};

export default Page;
