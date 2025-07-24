import Link from "next/link";
import IconFacebookDark from "../ui/icons/socials/facebook-dark";
import IconInstagramDark from "../ui/icons/socials/instagram-dark";
import IconTwitterDark from "../ui/icons/socials/twitter-dark";
import IconYoutubeDark from "../ui/icons/socials/youtube-dark";

const Footer = () => {
  return (
    <footer className="bg-dark-900 px-5 lg:px-44 pt-20 pb-12 text-white">
      <ul className="flex lg:flex-row flex-col justify-between items-center lg:items-start">
        <li>
          <img className="w-25 h-15" src="/logo.webp" alt="ola parish logo" />
        </li>
        <li className="mt-10 lg:mt-0 lg:text-left text-center">
          <h4>Mass Schedule</h4>
          <h5 className="mt-1 lg:mt-5">Sundays</h5>
          <p>English: 7:00am | Gurune: 9:30am</p>

          <h5 className="mt-1 lg:mt-5">Weekdays</h5>
          <p>6:15 am</p>
        </li>
        <li className="mt-10 lg:mt-0 lg:text-left text-center">
          <h4>Office Hours</h4>
          <p className="mt-5 text-[16px]">
            <span className="font-bold"> Weekdays:</span> 8:00am - 5:00pm
          </p>
          <p className="text-[16px]">
            <span className="font-bold"> Weekends:</span> 8:00am - 5:00pm
          </p>
        </li>

        <li className="mt-10 lg:mt-0">
          <h5 className="lg:text-left text-center">Get in Touch</h5>
          <nav className="flex gap-2.5 mt-3.5">
            <Link className="w-6 h-6" href="https://www.facebook.com">
              <IconFacebookDark />
            </Link>
            <Link className="w-6 h-6" href="https://www.instagram.com">
              <IconInstagramDark />
            </Link>
            <Link className="w-6 h-6" href="https://www.x.com">
              <IconTwitterDark />
            </Link>
            <Link className="w-6 h-6" href="https://www.youtube.com">
              <IconYoutubeDark />
            </Link>
          </nav>
        </li>
      </ul>
      <hr className="bg-white mt-25 h-[1px]" />
      <p className="mt-3.5 text-center lg:text-right">
        Ola Parish, Bolgatanga. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
