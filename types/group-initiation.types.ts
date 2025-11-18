export type CreateInitiationDto = {
  initiationDate: Date;
  numberOfParishioners: number;
  parishioners: string[];
};

export type GroupInitiation = {
  id: string;
  initiationDate: Date;
  numberOfParishioners: number;
  parishGroupId: string;
};
