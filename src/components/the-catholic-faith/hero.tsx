const Hero = () => {
  return (
    <div className="grid grid-rows-[1fr_auto] hero-h">
      <div className="relative">
        <img
          src="/images/catholic-faith/hero.webp"
          className="z-10 absolute w-full h-full object-cover"
        />
        <div className="z-20 absolute bg-brown-950/20 w-full h-full"></div>
        <div className="top-1/2 left-1/2 z-30 absolute justify-between items-center px-5 lg:px-25 w-full text-white text-center -translate-1/2 transform">
          <h1 className="lg:mt-5">What is the Catholic Church?</h1>
          <p className="lg:mt-5">
            <span className="block mx-auto lg:w-200">
              "Go, therefore, and make disciples of all nations, baptizing them
              in the name of the Father, and of the Son, and of the Holy
              Spirit."
            </span>
            <span className="mt-5">- Matthew 28:19</span>
          </p>
        </div>
      </div>
      <div className="mx-auto px-5 py-8 w-auto lg:w-260 text-center">
        <p className="font-semibold">
          "God, infinitely perfect and blessed in himself, in a plan of sheer
          goodness freely created man to make him share in his own blessed life.
          For this reason, at every time and in every place, God draws close to
          man. He calls man to seek him, to know him, to love him with all his
          strength. He calls together all men, scattered and divided by sin,
          into the unity of his family, the Church. To accomplish this, when the
          fullness of time had come, God sent his Son as Redeemer and Savior. In
          his Son and through him, he invites men to become, in the Holy Spirit,
          his adopted children and thus heirs of his blessed life." 
        </p>
        <p>(Catechism of the Catholic Church)</p>
      </div>
    </div>
  );
};

export default Hero;
