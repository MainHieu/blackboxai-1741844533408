import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Navigation = ({ currentQuestion, totalQuestions, onNext, onPrev }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200">
      <div className="max-w-2xl mx-auto px-4 py-4 flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={currentQuestion === 0}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-colors ${
            currentQuestion === 0
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-white text-blue-600 hover:bg-blue-50 border-2 border-blue-600'
          }`}
        >
          <FaArrowLeft />
          <span className="font-medium">Previous</span>
        </button>

        <div className="text-gray-600 font-medium">
          Question {currentQuestion + 1} of {totalQuestions}
        </div>

        <button
          onClick={onNext}
          disabled={currentQuestion === totalQuestions - 1}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-lg transition-colors ${
            currentQuestion === totalQuestions - 1
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          <span className="font-medium">Next</span>
          <FaArrowRight />
        </button>
      </div>
    </div>
  );
};

export default Navigation;
