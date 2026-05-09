import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, XCircle, ChevronRight, ChevronLeft, RotateCcw, Award, ListChecks } from 'lucide-react';
import { questions } from '../data/questions';
import { QuizResult, Question } from '../types';

export default function Quiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [results, setResults] = useState<QuizResult[]>([]);
  const [isFinished, setIsFinished] = useState(false);
  const [showExplanation, setShowExplanation] = useState(false);

  const currentQuestion = useMemo(() => questions[currentIdx], [currentIdx]);
  const progress = ((currentIdx + 1) / questions.length) * 100;

  const score = results.filter(r => r.isCorrect).length;

  const handleOptionSelect = (optionText: string) => {
    if (selectedOption !== null) return;
    
    setSelectedOption(optionText);
    const isCorrect = optionText === currentQuestion.correctAnswer;
    
    setResults(prev => [
      ...prev.filter(r => r.questionId !== currentQuestion.id),
      { questionId: currentQuestion.id, selectedOption: optionText, isCorrect }
    ]);
    
    setShowExplanation(true);
  };

  const nextQuestion = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOption(null);
      setShowExplanation(false);
    } else {
      setIsFinished(true);
    }
  };

  const restartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setResults([]);
    setIsFinished(false);
    setShowExplanation(false);
  };

  if (isFinished) {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto p-6 bg-white rounded-3xl shadow-xl border border-slate-100 text-center"
      >
        <Award className="w-20 h-20 text-sky-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-slate-800 mb-2">Quiz Completed!</h2>
        <p className="text-slate-500 mb-8">You have successfully finished the medical examination.</p>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="p-6 bg-sky-50 rounded-2xl border border-sky-100">
            <p className="text-sm font-medium text-sky-600 uppercase tracking-wider mb-1">Score</p>
            <p className="text-4xl font-bold text-sky-700">{score} / {questions.length}</p>
          </div>
          <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100">
            <p className="text-sm font-medium text-emerald-600 uppercase tracking-wider mb-1">Accuracy</p>
            <p className="text-4xl font-bold text-emerald-700">{Math.round((score / questions.length) * 100)}%</p>
          </div>
        </div>

        <div className="space-y-3">
          <button 
            onClick={restartQuiz}
            className="w-full py-4 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-sky-200 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Try Again
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto w-full">
      {/* Header & Progress */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white rounded-lg shadow-sm border border-slate-200">
            <ListChecks className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-slate-800">Qbank Module</h1>
            <p className="text-xs text-slate-500 font-medium">Topic: Infectious Diseases</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-slate-700">Question {currentIdx + 1} of {questions.length}</p>
          <div className="w-32 h-1.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
            <motion.div 
              className="h-full bg-sky-500"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIdx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 mb-6"
        >
          <span className="inline-block px-3 py-1 bg-sky-50 text-sky-700 text-[10px] font-bold uppercase tracking-widest rounded-full mb-4">
            Clinical Case
          </span>
          <h2 className="text-2xl font-bold text-slate-800 leading-tight mb-8">
            {currentQuestion.text}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = selectedOption === option.text;
              const isCorrect = option.text === currentQuestion.correctAnswer;
              
              let variantClasses = "border-slate-200 hover:border-sky-200 hover:bg-sky-50/30";
              if (selectedOption) {
                if (isCorrect) variantClasses = "border-emerald-500 bg-emerald-50 text-emerald-700 ring-2 ring-emerald-500 ring-offset-2";
                else if (isSelected) variantClasses = "border-rose-500 bg-rose-50 text-rose-700 ring-2 ring-rose-500 ring-offset-2";
                else variantClasses = "border-slate-100 opacity-50 grayscale";
              }

              return (
                <button
                  key={option.id}
                  disabled={selectedOption !== null}
                  onClick={() => handleOptionSelect(option.text)}
                  className={`w-full p-5 flex items-center text-left text-lg font-medium rounded-2xl border-2 transition-all duration-200 ${variantClasses}`}
                >
                  <span className="w-8 h-8 rounded-full flex items-center justify-center bg-slate-100 text-slate-500 text-sm font-bold mr-4 shrink-0">
                    {option.id}
                  </span>
                  <span className="flex-1">{option.text}</span>
                  {selectedOption && isCorrect && <CheckCircle2 className="w-6 h-6 text-emerald-500 ml-3" />}
                  {selectedOption && isSelected && !isCorrect && <XCircle className="w-6 h-6 text-rose-500 ml-3" />}
                </button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Footer Controls */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={() => currentIdx > 0 && setCurrentIdx(currentIdx - 1)}
          disabled={currentIdx === 0}
          className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-100 disabled:opacity-30 rounded-xl transition-colors flex items-center gap-2"
        >
          <ChevronLeft className="w-5 h-5" />
          Previous
        </button>
        
        <button
          onClick={nextQuestion}
          className={`flex-1 max-w-xs py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 ${
            selectedOption 
              ? "bg-slate-900 text-white shadow-slate-300 hover:bg-slate-800" 
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
          }`}
          disabled={!selectedOption}
        >
          {currentIdx === questions.length - 1 ? "Finish Quiz" : "Next Question"}
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
