/* eslint-disable @next/next/no-img-element */
const Hierarchy = () => {
  return (
    <div className="px-5 lg:px-25 py-25">
      <h3 className="text-primary-900">The Hierarchy</h3>
      <p className="mt-5 text-primary-900">Why is the Church structured as it is?</p>

      <div className="flex xl:flex-row flex-col items-center gap-10 lg:gap-20">
        <img className="xl:hidden pt-7.5 w-full" src="/images/welcome/societies.webp" alt="ola catholic church" />
        <div className="xl:pt-7.5">
          <p className="">Some people object to the Catholic Church because of her hierarchical structure. The Church may seem to be only an external institution, rather than an organic, living body. But the hierarchy of the Church is not simply arbitrary, but comes from Christ himself, who established the apostles as the ones who would pass on the Catholic faith.</p>
          <p className="mt-4">Thus, the Second Vatican II document, Lumen Gentium (the Dogmatic Constitution on the Church), explains, &ldquo;For the discharging of such great duties [passing on the faith], the apostles were enriched by Christ with a special outpouring of the Holy Spirit coming upon them, and they passed on this spiritual gift to their helpers by the imposition of hands, and it has been transmitted down to us in episcopal consecration&rdquo; (art. 21). In other words, Christ himself is the one who ordains his ministers through apostolic succession.</p>

          <p className="mt-4">Thus, the hierarchy of the Church is not imposed or man-made; rather, Christ himself, as the Great High Priest (Hebrews 4:14), established the hierarchy.</p>
        </div>

        <img className="hidden xl:block" src="/images/welcome/societies.webp" alt="ola catholic church" />
      </div>

      <div className="flex xl:flex-row flex-col items-center gap-10 lg:gap-20 mt-20">
        <img className="pt-7.5 w-full" src="/images/welcome/societies.webp" alt="ola catholic church" />
        <div className="xl:pt-7.5">
          <p className="">Moreover, there is collegial union between the Pope and the bishops. The Pope is the visible head of the universal Church, while the individual bishops are the visible head of their own dioceses. </p>
          <p className="mt-4">However, &ldquo;all of them together and with the Pope represent the entire Church in the bond of peace, love and unity&rdquo; (Lumen Gentium, art. 23). For this reason, a &ldquo;particular church&rdquo; cannot depart from the universal Church in its own ideas or practices. The particular churches must remain in union with the universal Church, which means they must remain in union with the Chair of Peter, the Pope. While some may object that this unity means conformity, Lumen Gentium explains, &ldquo;This variety of local churches with one common aspiration is splendid evidence of the catholicity of the undivided Church&rdquo; (Lumen Gentium, art. 23). </p>
        </div>

        {/* <img
          className=""
          src="/images/welcome/societies.webp"
          alt="ola catholic church"
        /> */}
      </div>

      <div className="flex xl:flex-row flex-col items-center gap-10 lg:gap-20 mt-20">
        <img className="xl:hidden pt-7.5 w-full" src="/images/welcome/societies.webp" alt="ola catholic church" />
        <div className="xl:pt-7.5">
          <p className="">The bishops possess the threefold office of sanctifying, teaching and governing: &ldquo;Bishops, in an eminent and visible way, sustain the roles of Christ himself as teacher, shepherd, and high priest&rdquo; (Lumen Gentium, art. 21). Bishops are the image of the Pope for their particular church, and in a special way, the image of Christ. The flock of the church follows the local bishop. He teaches them the way to follow Christ and the way to fulfill their own vocation within the Church, depending on their state in life. He gives them the sacraments, especially the sacrament of the Eucharist, to nourish them and lead them into eternal life.</p>
          <p className="mt-4">Finally, he governs his diocese, and ensures that all are following the law of the Church and the law of Christ. Thus, the bishop holds a very distinguished place in the Church, being a public sign for the faithful of the proper way to know, love, and serve Christ.</p>
        </div>

        <img className="hidden xl:block" src="/images/welcome/societies.webp" alt="ola catholic church" />
      </div>
    </div>
  );
};

export default Hierarchy;
