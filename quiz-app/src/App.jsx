import QuizContainer from './components/QuizContainer';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-6">
          <h1 className="text-2xl font-bold text-gray-800">
            Interactive Quiz Application
          </h1>
        </div>
      </header>
      <main>
        <QuizContainer />
      </main>
    </div>
  );
}

export default App;
