import communities from "./communities_data.json";
import societies from "./societies_data.json";
import outstations from "./outstations_data.json";

export const societiesData = {
  name: "Societies",
  matcher: "/organizations",
  options: societies.map((soc) => {
    return {
      name: soc.name,
      to: soc.link,
    };
  }),
};

export const communitiesData = {
  name: "Communities",
  matcher: "/organizations",
  options: communities.map((com) => {
    return {
      name: com.name,
      to: com.link,
    };
  }),
};

export const outstationsData = {
  name: "Out Stations",
  matcher: "/organizations",
  options: outstations.map((sta) => {
    return {
      name: sta.name,
      to: sta.link,
    };
  }),
};
