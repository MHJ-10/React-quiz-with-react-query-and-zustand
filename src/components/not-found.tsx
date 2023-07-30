import not_found from "/images/not-found.png";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center my-10 text-c1">
      <img src={not_found} alt="not-found" />
      <h1 className="mt-3 py-1  px-2 text-4xl italic uppercase shadow-md shadow-c2  bg-c3 font-bold">
        Page Not Found
      </h1>
    </div>
  );
};

export default NotFound;
