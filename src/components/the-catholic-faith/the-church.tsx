import FourMarks from "./FourMarks";

const TheChurch = () => {
  return (
    <div className="relative gap-13 lg:grid lg:grid-cols-[auto_1fr] bg-gold-200 px-5 pt-15 lg:pr-25 lg:pb-20 lg:pl-0">
      <img
        className="hidden md:block opacity-15 h-100%"
        src="/images/general/mary.png"
        alt="ola parish mary"
      />
      <div>
        <h3 className="text-primary-900">The Church</h3>
        <p className="mt-5 text-primary-900">
          The church is described as one having four marks: One, Holy, Catholic
          and Apostolic
        </p>
        <FourMarks className="mt-7.5" />
      </div>
    </div>
  );
};

export default TheChurch;
