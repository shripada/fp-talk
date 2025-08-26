'use client';
import { useState } from 'react';

const questions = [
  {
    question: 'What is a pure function?',
    options: [
      'A function that modifies global variables',
      'A function that always returns the same output for the same input and has no side effects',
      'A function that prints to the console',
      'A function that uses loops',
    ],
    answer: 1,
  },
  {
    question:
      'Which of the following is NOT a characteristic of functional programming?',
    options: [
      'Immutability',
      'First-class functions',
      'Shared mutable state',
      'Higher-order functions',
    ],
    answer: 2,
  },
  {
    question: "What does 'immutability' mean in functional programming?",
    options: [
      'Variables can be changed anytime',
      'Data cannot be changed after it is created',
      'Functions can modify their arguments',
      'None of the above',
    ],
    answer: 1,
  },
  {
    question:
      'Which function is commonly used to transform each item in a list into a new list?',
    options: ['filter', 'map', 'reduce', 'forEach'],
    answer: 1,
  },
  {
    question: 'What is a higher-order function?',
    options: [
      'A function that returns a string',
      'A function that takes another function as an argument or returns a function',
      'A function that only works with numbers',
      'A function that runs faster',
    ],
    answer: 1,
  },
  // New questions below
  {
    question: 'Which of the following is an example of a side effect?',
    options: [
      'Returning a value from a function',
      'Modifying a global variable',
      'Passing a function as an argument',
      'Using only local variables',
    ],
    answer: 1,
  },
  {
    question: 'What does the map function do in functional programming?',
    options: [
      'Filters elements from an array',
      'Reduces an array to a single value',
      'Transforms a given array into a target array',
      'Sorts the array',
    ],
    answer: 2,
  },
  {
    question: 'Point free functions are created using',
    options: [
      'map function',
      'map, filter and then reduce',
      'currying and partial application',
      'reduce function',
    ],
    answer: 2,
  },
  {
    question: 'Currying is a process',
    options: [
      'of converting a given function into a nested sequence of functions where each function takes next argument and the final one takes last argument and implements the logic',
      'of creating a composition of function calls that will call the original function',
      'of partially applying a nested sequence of functions until we get the result',
      'none of the above',
    ],
    answer: 0,
  },
  {
    question:
      'Which method is used to combine all elements of an array into a single value?',
    options: ['map', 'filter', 'reduce', 'forEach'],
    answer: 2,
  },
];

function getResultMessage(score: number, total: number) {
  if (score === total) return '🎉 Excellent! All answers are correct.';
  if (score >= 3) return '👍 Good job! Review the ones you missed.';
  return 'Keep practicing functional programming concepts!';
}

export default function QuizApp() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [wasCorrect, setWasCorrect] = useState<boolean | null>(null);

  const [retryCount, setRetryCount] = useState(0);

  const handleOption = (idx: number) => {
    setSelected(idx);
    setShowFeedback(true);
    setWasCorrect(idx === questions[current].answer);
  };

  const handleRetry = () => {
    setSelected(null);
    setShowFeedback(false);
    setWasCorrect(null);
    setRetryCount(retryCount + 1);
  };

  const handleNext = () => {
    if (selected === null) return;
    const newAnswers = [...answers, selected];
    setAnswers(newAnswers);
    setSelected(null);
    setShowFeedback(false);
    setWasCorrect(null);
    setRetryCount(0);
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrent(0);
    setSelected(null);
    setAnswers([]);
    setShowResult(false);
    setShowFeedback(false);
    setWasCorrect(null);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-8 flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-6 text-indigo-700 tracking-tight">
          Functional Programming Quiz
        </h1>
        {!showResult ? (
          <>
            <div className="w-full mb-4">
              <div className="text-lg font-semibold mb-2 text-gray-800">
                Question {current + 1} of {questions.length}
              </div>
              <div className="text-xl font-medium mb-4 text-gray-900">
                {questions[current].question}
              </div>
              <div className="flex flex-col gap-3">
                {questions[current].options.map((opt, idx) => (
                  <button
                    key={idx}
                    className={`rounded-lg border px-4 py-2 text-left transition-all duration-150 font-medium text-base shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-400/60
                      ${
                        selected === idx
                          ? idx === questions[current].answer
                            ? 'bg-green-100 border-green-400 text-green-800'
                            : 'bg-red-100 border-red-400 text-red-800'
                          : 'bg-white border-gray-300 hover:bg-indigo-50 text-gray-900'
                      }`}
                    onClick={() => !showFeedback && handleOption(idx)}
                    disabled={showFeedback}
                  >
                    {opt}
                  </button>
                ))}
              </div>
              {showFeedback && (
                <div className="mt-4 flex flex-col items-start gap-2">
                  <div
                    className={`text-lg font-semibold ${
                      wasCorrect ? 'text-green-600' : 'text-red-600'
                    }`}
                  >
                    {wasCorrect
                      ? 'Correct!'
                      : `Wrong! The correct answer is: "${
                          questions[current].options[questions[current].answer]
                        }"`}
                  </div>
                  {!wasCorrect && (
                    <button
                      className="mt-2 bg-yellow-100 border border-yellow-400 text-yellow-800 font-medium px-4 py-1 rounded-lg shadow-sm hover:bg-yellow-200 transition-all duration-150"
                      onClick={handleRetry}
                    >
                      Retry
                    </button>
                  )}
                </div>
              )}
            </div>
            <button
              className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-all duration-150 disabled:opacity-50"
              onClick={handleNext}
              disabled={!showFeedback}
            >
              {current === questions.length - 1 ? 'See Results' : 'Next'}
            </button>
          </>
        ) : (
          <div className="flex flex-col items-center w-full">
            <div className="text-2xl font-bold text-indigo-700 mb-2">
              You scored{' '}
              {answers.filter((a, i) => a === questions[i].answer).length} out
              of {questions.length}
            </div>
            <div className="text-lg text-gray-700 mb-6">
              {getResultMessage(
                answers.filter((a, i) => a === questions[i].answer).length,
                questions.length
              )}
            </div>
            <button
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition-all duration-150"
              onClick={handleRestart}
            >
              Restart Quiz
            </button>
          </div>
        )}
      </div>
      <footer className="mt-8 text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} CodeCraft Technologies, Pvt Ltd
      </footer>
    </div>
  );
}
