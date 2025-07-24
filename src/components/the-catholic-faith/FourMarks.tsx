"use client";
/* eslint-disable @next/next/no-img-element */

import Link from "next/link";
import { useState } from "react";

type TabNames = "One" | "Holy" | "Catholic" | "Apostolic";
const FourMarks = ({ className }: { className: string }) => {
  const [currentTab, setCurrentTab] = useState<TabNames>("One");
  const changeTab = (newTab: TabNames) => {
    setCurrentTab(newTab);
  };
  return (
    <div className={`bg-white relative ${className}`}>
      <img
        className="lg:hidden top-10 md:top-12 left-0 absolute opacity-15 w-full h-full object-contain"
        src="/images/general/mary-full.jpg"
        alt="ola parish mary"
      />
      <nav className="grid grid-cols-4">
        <NavItem
          isActive={currentTab === "One"}
          name="One"
          onChange={changeTab}
        />
        <NavItem
          isActive={currentTab === "Holy"}
          name="Holy"
          onChange={changeTab}
        />
        <NavItem
          isActive={currentTab === "Catholic"}
          name="Catholic"
          onChange={changeTab}
        />
        <NavItem
          isActive={currentTab === "Apostolic"}
          name="Apostolic"
          onChange={changeTab}
        />
      </nav>
      <div className="px-5 lg:px-17.5 pt-15 pb-15 lg:pb-25">
        {data[currentTab]}
      </div>
    </div>
  );
};

interface Props {
  isActive: boolean;
  name: TabNames;
  onChange: (name: TabNames) => void;
}
const NavItem = ({ name, onChange, isActive }: Props) => {
  return (
    <div
      className={`flex justify-center items-center bg-primary-900 w-auto h-12.5 font-semibold cursor-pointer ${
        isActive ? "bg-transparent text-black" : "text-white"
      }`}
      onClick={() => onChange(name)}
    >
      {name}
    </div>
  );
};

const data = {
  One: (
    <>
      <p>
        The Church is &ldquo;one&quot; because her founder is{" "}
        <strong>Christ himself</strong>.
      </p>
      <br />
      <p>
        &quot;There is one body and one Spirit, just as you were called to the
        one hope that belongs to your call, one Lord, one faith, one baptism,
        one God and Father of us all, who is above all and through all and in
        all&quot; (Ephesians 4:5). In Christ, we are united by our profession of
        one faith, our common celebration of worship and apostolic succession
        (CCC, 815).
      </p>
      <br />
      <p>
        Saint Paul describes the Church as a body. Bodies have many different
        parts that make up the whole (1 Corinthians 12:14-18). Without the
        veins, the heart cannot function. Without blood, neither the heart nor
        the veins can function. Without the heart, the whole body cannot live.
        In a similar way, the Church is comprised of many members, all of whom
        serve different roles (1 Corinthians 12:28-30). The Pope is the visible
        head of the Church on earth, the bishops and the priests are her
        ministers, the consecrated and religious men and women serve the Church
        through vows of poverty, chastity and obedience, and the laity fulfill
        their own mission while pursuing temporal affairs.
      </p>
    </>
  ),

  Holy: (
    <>
      <p>
        The Church is not holy because of her members. She is holy because her
        founder, Jesus Christ, is holy and He made her an instrument of
        sanctification.
      </p>
      <br />
      <p>
        Because Christ alone is all-holy, and Christ is the head of the Church,
        the Church is therefore also holy. The Second Vatican Council document
        Lumen Gentium explains:
        <strong>
          &quot;The Church on earth is endowed already with a sanctity that is
          real though imperfect&quot; (art. 48).
        </strong>
      </p>
      <br />
      <p>
        The Church here on earth is pilgrimaging toward heaven, where she will
        be made perfect. Therefore, while the Church possesses sanctity here on
        earth, for she has Christ as her head, she is still on a journey toward
        perfect sanctity, which will be found in Heaven.
      </p>
      <br />
      <p>
        The Catholic Church is one in its faith (doctrine): the Church professes
        the one faith that has been passed down from the Apostles (what we
        Catholics refer to as the deposit of faith).
      </p>
      <br />
      <p>
        The Church is one in its worship (sacraments): the Church celebrates in
        common the seven sacraments that were instituted by Christ, especially
        the Eucharist.
      </p>
      <br />
      <p>
        The Church is one in its leadership (the pope): through the sacrament of
        Holy Orders, the Church’s apostolic succession ensures uninterrupted
        continuity with the teaching and leadership of St. Peter (the pope) and
        the Apostles (the bishops) in union with him.
        <Link className="text-primary-900" href="www.catholic.com">
          (catholic.com)
        </Link>
      </p>
      <br />{" "}
    </>
  ),
  Catholic: (
    <>
      <p>
        The word &quot;<strong>catholic</strong>&quot;means
        &quot;universal&quot; (CCC, 830).
      </p>
      <br />
      <p>
        Christ is her head, such that his presence also indicates the presence
        of the Church. Second, the Church is universal in that she is meant to
        preach the Gospel to all nations: &quot;Go therefore and make disciples
        of all nations, baptizing them in the name of the Father and of the Son
        and of the Hoy Spirit&quot; (Matthew 28:19). Christ gave the universal
        command that all the members of his Body are meant to spread his Gospel
        throughout the world. Through her internal and external works, the
        Church reveals to the world the Gospel of Christ, which means that the
        Church reveals the new law of love.
      </p>
      <br />
      <p>
        Catholic comes from the Greek <strong>katholikos</strong>, the
        combination of two words, <strong>kata</strong>(concerning), and
        <strong>holos</strong>(whole). According to the Oxford Dictionary of
        English Etymology, the word catholic comes from a Greek word meaning
        “regarding the whole,” or, more simply, “universal” or “general.” The
        word church comes from the Greek<strong>ecclesia</strong>, which means
        “those called out,” as in those summoned out of the world at large to
        form a distinct society. So the Catholic Church is made up of those
        called out and gathered into the universal society founded by Christ.
        <Link className="text-primary-900" href="www.catholic.com">
          (catholic.com)
        </Link>
      </p>
    </>
  ),
  Apostolic: (
    <>
      <p>
        The Church is apostolic because of the apostles. We can say she is
        apostolic in three ways:
      </p>
      <br />
      <ul className="ml-8 list-disc">
        <li>
          she remains built on the foundation of the apostles through apostolic
          succession;
        </li>
        <li>through the Holy Spirit, she continues to pass on the faith;</li>
        <li>
          and she continue to be sanctified through the successors to the
          apostles, namely, the priests, the college of bishops, and the Pope as
          her head (see CCC, 857).
        </li>
      </ul>
      <br />
      <p>
        The history of the Catholic Church from St. Peter, the first Pontiff, to
        Pope Francis, the current head of the Church, is an example of its
        &quot;Apostolicity,&quot; since there is no break in the line of
        succession.
      </p>
      <br />
      <p>
        <strong>You can read more about &quot;Apostolicity&quot; here</strong>:{" "}
        <Link
          className="text-primary-900"
          href="https://www.catholic.com/encyclopedia/apostolicity"
        >
          https://www.catholic.com/encyclopedia/apostolicity
        </Link>
      </p>
    </>
  ),
};

export default FourMarks;
