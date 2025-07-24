import { Fragment } from "react/jsx-runtime";
import Hero from "./hero";
import GodsLove from "./Gods-love";
import Sacraments from "./sacraments";
import YearlyTheme from "./yearly-theme";
import Societies from "./societies";
import JoinUs from "./join-us";
import Gallery from "./gallery";

export function Welcome() {
  return (
    <Fragment>
      <Hero />
      <GodsLove />
      <Sacraments />
      <YearlyTheme />
      <Societies />
      <JoinUs />
      <Gallery />
    </Fragment>
  );
}

/**
 * header - 91  - 11svh
 * image - 565  - 68svh
 * timer - 177  - 21svh
 *
 * Total - 833  - 100svh
 */
