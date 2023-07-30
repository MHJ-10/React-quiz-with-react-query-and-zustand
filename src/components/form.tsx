import { Link } from "react-router-dom";
import { category } from "../services/questionCategory";
import useQuizStore from "../store/store";

const Form = () => {
  const { quiz, setName, setAmount, setCategory } = useQuizStore();

  const enabled: boolean =
    !!quiz.name &&
    !!quiz.amount &&
    !!quiz.category &&
    quiz.amount <= 20 &&
    quiz.amount >= 5;

  return (
    <form className="text-center w-1/2 sm:w-11/12 md:w-9/12 lg:w-7/12 xl:w-6/12 mx-auto my-20 text-c1  bg-c1 py-5 rounded-3xl border-4 border-double border-c3">
      <h1 className="text-4xl font-bold bg-c3 inline-block my-3 py-2 px-2 rounded-3xl border-4 border-c2">
        Quiz Form
      </h1>

      <div className="py-2">
        <label className="text-2xl text-c4" htmlFor="name">
          Name:
        </label>
        <input
          id="name"
          type="text"
          className="rounded-md py-1 ms-2 ps-2"
          onChange={(e) => setName(e.currentTarget.value)}
        />
      </div>
      <div className="py-2">
        <label className="text-2xl text-c4" htmlFor="category">
          Category:
        </label>

        <select
          id="category"
          className="rounded-md py-2 ms-2 ps-2"
          onChange={(e) => setCategory(parseInt(e.currentTarget.value))}
        >
          {category.map((item) => (
            <option key={item.value} value={item.value}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="py-2">
        <label className="text-2xl text-c4" htmlFor="question">
          Number of Questions:
        </label>
        <input
          id="question"
          className="rounded-md py-1 ms-2 ps-2"
          type="number"
          min="5"
          max="20"
          onChange={(e) => setAmount(parseInt(e.currentTarget.value))}
        />
      </div>
      <Link to={"/quiz"}>
        <button
          className="bg-c3 hover:bg-c2 border-4 border-c2 rounded-lg py-1 px-5 font-bold disabled:opacity-70"
          disabled={!enabled}
        >
          Start
        </button>
      </Link>
    </form>
  );
};

export default Form;
