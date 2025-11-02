export type ParishGroup = {
  id: string;
  name: string;
  email: string;
  heroImage: string;
  otherImages: string[];
  writeup: string[];
  contactDetails: {
    phone: string;
    address: string;
    social: {
      facebook: string;
      website: string;
    };
  };
  otherInfo: {
    founded: string;
    memberCount: number;
    region: string;
  };
  slug: string;
  link: string;
};

export type ParishGroupResponse = {
  communities: ParishGroup[];
  societies: ParishGroup[];
  outstations: ParishGroup[];
};
