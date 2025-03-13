import { useState } from 'react';
import Question from './Question';
import Navigation from './Navigation';
import Timer from './Timer';

// Sample questions data
const sampleQuestions = [
  {
    type: 'multiple-choice',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    isMultiple: false,
    correctAnswer: 'Paris'
  },
  {
    type: 'true-false',
    question: 'The Earth is flat.',
    correctAnswer: 'False'
  },
  {
    type: 'fill-in-blank',
    question: 'The process of converting water vapor into liquid water is called ________.',
    correctAnswer: 'condensation'
  },
  {
    type: 'matching',
    question: 'Match the following scientific terms with their definitions:',
    terms: ['Photosynthesis', 'Osmosis', 'Mitosis'],
    definitions: [
      'Process by which plants convert light energy into chemical energy',
      'Movement of water molecules across a membrane',
      'Cell division resulting in identical daughter cells'
    ],
    correctAnswer: {
      'Photosynthesis': 'Process by which plants convert light energy into chemical energy',
      'Osmosis': 'Movement of water molecules across a membrane',
      'Mitosis': 'Cell division resulting in identical daughter cells'
    }
  },
  {
    type: 'multiple-choice',
    question: 'Which of the following are primary colors? (Select all that apply)',
    options: ['Red', 'Green', 'Blue', 'Yellow'],
    isMultiple: true,
    correctAnswer: ['Red', 'Blue', 'Yellow']
  }
];

const QuizContainer = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (answer) => {
    setAnswers(prev => ({
      ...prev,
      [currentQuestion]: answer
    }));
  };

  const handleNext = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Timer />
      
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
          <Question
            data={sampleQuestions[currentQuestion]}
            onAnswer={handleAnswer}
          />
        </div>

        <div className="mt-8">
          <Navigation
            currentQuestion={currentQuestion}
            totalQuestions={sampleQuestions.length}
            onNext={handleNext}
            onPrev={handlePrev}
          />
        </div>
      </div>
    </div>
  );
};

export default QuizContainer;
