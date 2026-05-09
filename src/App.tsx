/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, GraduationCap, Play, ShieldAlert, Sparkles, Stethoscope } from 'lucide-react';
import Quiz from './components/Quiz.tsx';

export default function App() {
  const [view, setView] = useState<'landing' | 'quiz'>('landing');

  return (
    <div className="min-h-screen bg-slate-50 selection:bg-sky-100 selection:text-sky-900">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-bottom border-slate-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center shadow-lg shadow-sky-100">
              <Stethoscope className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600">
              MedExam Pro
            </span>
          </div>
          
          {view === 'quiz' && (
            <button 
              onClick={() => setView('landing')}
              className="text-sm font-bold text-slate-500 hover:text-slate-900 flex items-center gap-2 px-4 py-2 hover:bg-slate-100 rounded-lg transition-all"
            >
              Exit Exam
            </button>
          )}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {view === 'landing' ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="grid lg:grid-cols-2 gap-16 items-center pt-8"
            >
              <div className="space-y-8">
                <div className="space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                    <Sparkles className="w-4 h-4" />
                    <span className="text-xs font-bold uppercase tracking-wider">Professional Qbank</span>
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-bold text-slate-900 leading-[1.1] tracking-tight">
                    Master Medical <br />
                    <span className="text-sky-600">Diagnostics.</span>
                  </h1>
                  <p className="text-xl text-slate-500 leading-relaxed max-w-lg">
                    Advanced examination platform for infectious diseases, internal medicine, and pediatrics. 
                    Prepare with high-yield questions used by top medical professionals.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={() => setView('quiz')}
                    className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-800 transition-all shadow-xl shadow-slate-200"
                  >
                    <Play className="fill-current w-5 h-5" />
                    Start Full Session
                  </button>
                  <button className="px-8 py-4 bg-white text-slate-700 border-2 border-slate-100 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-slate-50 transition-all">
                    <BookOpen className="w-5 h-5" />
                    Browse Library
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-8 pt-8">
                  <div>
                    <p className="text-4xl font-bold text-slate-900 mb-1">90+</p>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Questions</p>
                  </div>
                  <div>
                    <p className="text-4xl font-bold text-slate-900 mb-1">100%</p>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Professional</p>
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-sky-200 rounded-full blur-[120px] opacity-20 -z-10" />
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <FeatureCard 
                      icon={<GraduationCap className="w-6 h-6" />}
                      title="Clinical Cases"
                      desc="Real-world scenarios"
                    />
                    <FeatureCard 
                      icon={<ShieldAlert className="w-6 h-6" />}
                      title="Deep Analysis"
                      desc="Instant feedback"
                    />
                  </div>
                  <div className="space-y-4 pt-12">
                    <FeatureCard 
                      icon={<Stethoscope className="w-6 h-6" />}
                      title="Diagnostics"
                      desc="Differential focus"
                    />
                    <div className="bg-sky-600 p-8 rounded-3xl text-white">
                      <p className="text-sm font-medium opacity-80 mb-2 uppercase tracking-wider">Success Rate</p>
                      <p className="text-3xl font-bold">+15.4%</p>
                      <p className="text-xs opacity-70 mt-4 leading-relaxed italic">
                        Average improvement after 3 modules
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="quiz"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <Quiz />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="mt-24 border-t border-slate-200 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-slate-500 text-sm">© 2026 MedExam Professional Platform. Developed for High-Yield Learning.</p>
          <div className="flex items-center gap-6 text-sm font-bold text-slate-400">
            <a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-900 transition-colors">Contact Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-lg border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all">
      <div className="w-12 h-12 bg-sky-50 text-sky-600 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-lg font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-500 leading-relaxed font-medium">{desc}</p>
    </div>
  );
}
