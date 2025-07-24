import React from "react";

const PriestBios = () => {
  return (
    <div className="space-y-20">
      {priests.map((pri, indx) => {
        return <div key={indx}>{renderPriest({ ...pri, indx: indx })}</div>;
      })}
    </div>
  );
};

export default PriestBios;

type Priest = {
  name: string;
  designation: string;
  bio: string;
  indx: number;
};
const renderPriest = ({ name, designation, bio, indx }: Priest) => {
  return (
    <div>
      <h2 className="font-medium">
        {name}
        <br />
        {designation}
      </h2>

      <div
        key={indx}
        className="flex flex-col-reverse gap-9 xl:grid xl:grid-cols-2 mt-9"
      >
        <div className="w-full">
          <p>{bio}</p>

          <p></p>
        </div>
        <div className="bg-green-400 w-full h-auto">dfkjvlksdvlsd</div>
      </div>
    </div>
  );
};

const priests = [
  {
    name: "Reverend Father Lawrence Azure",
    designation: "Parish Priest",
    bio: "God, infinitely perfect and blessed in himself, in a plan of sheer goodness freely created man to make him share in his own blessed life. For this reason, at every time and in every place, God draws close to man. He calls man to seek him, to know him, to love him with all his strength. He calls together all men, scattered and divided by sin, into the unity of his family, the Church. To accomplish this, when the fullness of time had come, God sent his Son as Redeemer and Savior. In his Son and through him, he invites men to become, in the Holy Spirit, his adopted children and thus heirs of his blessed lif God, infinitely perfect and blessed in himself, in a plan of sheer goodness freely created man to make him share in his own blessed life. For this reason, at every time and in every place, God draws close to man. He calls man to seek him, to know him, to love him with all his strength. He calls together all men, scattered and divided by sin, into the unity of his family, the Church. To accomplish this, when the fullness of time had come, God sent his Son as Redeemer and Savior. In his Son and through him, he invites men to become, in the Holy Spirit, his adopted children and thus heirs of his blessed lif God, infinitely perfect and blessed in himself, in a plan of sheer goodness freely created man to make him share in his own blessed life. For this reason, at every time and in every place, God draws close to man. He calls man to seek him, to know him, to love him with all his strength. He calls together all men, scattered and divided by sin, into the unity of his family, the Church. To accomplish this, when the fullness of time had come, God sent his Son as Redeemer and Savior. In his Son and through him, he invites men to become, in the Holy Spirit, his adopted children and thus heirs of his blessed lif",
  },
  {
    name: "Reverand Father Roch Akolgo",
    designation: "First Curate",
    bio: "God, infinitely perfect and blessed in himself, in a plan of sheer goodness freely created man to make him share in his own blessed life. For this reason, at every time and in every place, God draws close to man. He calls man to seek him, to know him, to love him with all his strength. He calls together all men, scattered and divided by sin, into the unity of his family, the Church. To accomplish this, when the fullness of time had come, God sent his Son as Redeemer and Savior. In his Son and through him, he invites men to become, in the Holy Spirit, his adopted children and thus heirs of his blessed lif God, infinitely perfect and blessed in himself, in a plan of sheer goodness freely created man to make him share in his own blessed life. For this reason, at every time and in every place, God draws close to man. He calls man to seek him, to know him, to love him with all his strength. He calls together all men, scattered and divided by sin, into the unity of his family, the Church. To accomplish this, when the fullness of time had come, God sent his Son as Redeemer and Savior. In his Son and through him, he invites men to become, in the Holy Spirit, his adopted children and thus heirs of his blessed lif God, infinitely perfect and blessed in himself, in a plan of sheer goodness freely created man to make him share in his own blessed life. For this reason, at every time and in every place, God draws close to man. He calls man to seek him, to know him, to love him with all his strength. He calls together all men, scattered and divided by sin, into the unity of his family, the Church. To accomplish this, when the fullness of time had come, God sent his Son as Redeemer and Savior. In his Son and through him, he invites men to become, in the Holy Spirit, his adopted children and thus heirs of his blessed lif",
  },
  {
    name: "Reverand Father Vincent Duk",
    designation: "Second Curate",
    bio: "God, infinitely perfect and blessed in himself, in a plan of sheer goodness freely created man to make him share in his own blessed life. For this reason, at every time and in every place, God draws close to man. He calls man to seek him, to know him, to love him with all his strength. He calls together all men, scattered and divided by sin, into the unity of his family, the Church. To accomplish this, when the fullness of time had come, God sent his Son as Redeemer and Savior. In his Son and through him, he invites men to become, in the Holy Spirit, his adopted children and thus heirs of his blessed lif God, infinitely perfect and blessed in himself, in a plan of sheer goodness freely created man to make him share in his own blessed life. For this reason, at every time and in every place, God draws close to man. He calls man to seek him, to know him, to love him with all his strength. He calls together all men, scattered and divided by sin, into the unity of his family, the Church. To accomplish this, when the fullness of time had come, God sent his Son as Redeemer and Savior. In his Son and through him, he invites men to become, in the Holy Spirit, his adopted children and thus heirs of his blessed lif God, infinitely perfect and blessed in himself, in a plan of sheer goodness freely created man to make him share in his own blessed life. For this reason, at every time and in every place, God draws close to man. He calls man to seek him, to know him, to love him with all his strength. He calls together all men, scattered and divided by sin, into the unity of his family, the Church. To accomplish this, when the fullness of time had come, God sent his Son as Redeemer and Savior. In his Son and through him, he invites men to become, in the Holy Spirit, his adopted children and thus heirs of his blessed lif",
  },
];
