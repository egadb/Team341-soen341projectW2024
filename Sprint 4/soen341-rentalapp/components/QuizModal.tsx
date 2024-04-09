import { Dispatch, SetStateAction, useEffect, useState } from "react";
import questions from "../lib/QuizQuestions";

const QuizModal = ({
  isOpen,
  onClose,
  setDiscount,
  quizDone,
}: {
  isOpen: boolean;
  onClose: () => void;
  setDiscount: () => void;
  quizDone: Dispatch<SetStateAction<boolean>>;
}) => {
  const [selectedQuestions, setSelectedQuestions] = useState<
    { id: number; question: string; options: string[]; answer: string }[]
  >([]);
  const [quizStarted, setQuizStarted] = useState(false);
  const getRandomQuestions = (count: number | undefined) => {
    const shuffled = questions.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  useEffect(() => {
    if (isOpen) {
      startQuiz();
    }
  }, [isOpen]);

  const startQuiz = () => {
    const randomQuestions = getRandomQuestions(3);
    setSelectedQuestions(randomQuestions);
    setQuizStarted(true);
  };
  const onSubmit = () => {
    let score = 0;
    selectedQuestions.forEach((question) => {
      const selectedOption = document.querySelector(
        `input[name="question-${question.id}"]:checked`
      ) as HTMLInputElement;
      if (selectedOption && selectedOption.value === question.answer) {
        score++;
      }
      console.log(selectedOption.value);
    });
    if (score === 3) {
      alert(
        `Your score is: ${score}/${selectedQuestions.length}. Congratulations! You get a 10% discount!`
      );
      setDiscount();
    } else {
      alert(
        `Your score is: ${score}/${selectedQuestions.length}. You must get 3/3 to get a discount. Better luck next time!`
      );
    }
    onClose();
    quizDone(true);
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isOpen ? "" : "hidden"}`}>
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div
        className="z-10 rounded bg-white p-6 shadow-lg"
        style={{
          backgroundImage: quizStarted
            ? `url('https://media.giphy.com/media/CbLiD6gmoadi0/giphy.gif')`
            : "",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <h2 className="mb-4 text-lg font-bold text-white">Quiz</h2>
        {selectedQuestions.map((question) => (
          <div key={question.id} className="mb-4">
            <p className="font-bold text-white">{question.question}</p>
            <ul className="ml-8 list-disc">
              {question.options.map((option) => (
                <label key={option} className="ml-2 block text-white">
                  <input
                    type="radio"
                    name={`question-${question.id}`}
                    value={option}
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </ul>
          </div>
        ))}
        <button
          onClick={onSubmit}
          className="ml-2 mt-2 rounded bg-blue-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
        >
          Submit
        </button>
        <button
          onClick={onClose}
          className="ml-2 mt-2 rounded bg-gray-300 px-4 py-2 font-bold text-gray-800 hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default QuizModal;
