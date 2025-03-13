import { useState } from 'react';

const MultipleChoice = ({ question, options, isMultiple, onAnswer }) => {
  const [selected, setSelected] = useState(isMultiple ? [] : '');

  const handleChange = (option) => {
    if (isMultiple) {
      const newSelected = selected.includes(option)
        ? selected.filter(item => item !== option)
        : [...selected, option];
      setSelected(newSelected);
      onAnswer(newSelected);
    } else {
      setSelected(option);
      onAnswer(option);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">{question}</h2>
      <div className="space-y-3">
        {options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-4 rounded-lg border-2 transition-all cursor-pointer
              ${isMultiple 
                ? selected.includes(option)
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                : selected === option
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
              }`}
          >
            <input
              type={isMultiple ? "checkbox" : "radio"}
              checked={isMultiple ? selected.includes(option) : selected === option}
              onChange={() => handleChange(option)}
              className={`h-5 w-5 ${isMultiple ? 'rounded' : 'rounded-full'} border-gray-300 text-blue-600 focus:ring-blue-500`}
            />
            <span className="ml-3 text-lg text-gray-700">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const TrueFalse = ({ question, onAnswer }) => {
  return (
    <MultipleChoice
      question={question}
      options={['True', 'False']}
      isMultiple={false}
      onAnswer={onAnswer}
    />
  );
};

const FillInBlank = ({ question, onAnswer }) => {
  const [answer, setAnswer] = useState('');

  const handleChange = (e) => {
    setAnswer(e.target.value);
    onAnswer(e.target.value);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">{question}</h2>
      <input
        type="text"
        value={answer}
        onChange={handleChange}
        placeholder="Type your answer here..."
        className="w-full p-4 text-lg border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  );
};

const MatchingTerms = ({ question, terms, definitions, onAnswer }) => {
  const [matches, setMatches] = useState({});

  const handleMatch = (term, definition) => {
    setMatches(prev => {
      const updated = { ...prev, [term]: definition };
      onAnswer(updated);
      return updated;
    });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800">{question}</h2>
      <div className="space-y-4">
        {terms.map((term, index) => (
          <div key={index} className="p-4 bg-white rounded-lg border-2 border-gray-200">
            <p className="font-medium text-lg mb-2">{term}</p>
            <select
              value={matches[term] || ''}
              onChange={(e) => handleMatch(term, e.target.value)}
              className="w-full p-3 text-gray-700 border-2 border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a match</option>
              {definitions.map((def, idx) => (
                <option key={idx} value={def}>{def}</option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
};

const Question = ({ data, onAnswer }) => {
  switch (data.type) {
    case 'multiple-choice':
      return (
        <MultipleChoice
          question={data.question}
          options={data.options}
          isMultiple={data.isMultiple}
          onAnswer={onAnswer}
        />
      );
    case 'true-false':
      return (
        <TrueFalse
          question={data.question}
          onAnswer={onAnswer}
        />
      );
    case 'fill-in-blank':
      return (
        <FillInBlank
          question={data.question}
          onAnswer={onAnswer}
        />
      );
    case 'matching':
      return (
        <MatchingTerms
          question={data.question}
          terms={data.terms}
          definitions={data.definitions}
          onAnswer={onAnswer}
        />
      );
    default:
      return <div className="text-red-600">Unsupported question type</div>;
  }
};

export default Question;
