/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Trophy,
  Volume2,
  VolumeX,
  HelpCircle,
  Users,
  Percent,
  CheckCircle2,
  XCircle,
  ChevronRight,
  RotateCcw,
  Languages,
  Sparkles,
  ArrowRight,
  BookOpen,
  Info,
  Award,
  Menu,
  X
} from 'lucide-react';
import { QUESTIONS_DATA, PRIZE_LADDER, QuizQuestion } from './questionsData.ts';
import { sounds } from './soundEffects.ts';
import { speakSpanish, stopSpeaking } from './speechUtils.ts';

export default function App() {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedKey, setSelectedKey] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswerConfirmed, setIsAnswerConfirmed] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [currentScore, setCurrentScore] = useState<number>(0);

  // Translation toggles:
  // - showQuestionTranslation: boolean
  // - revealedOptions: Set of option keys ('A'|'B'|'C'|'D') whose Armenian translations are revealed
  const [showQuestionTranslation, setShowQuestionTranslation] = useState<boolean>(false);
  const [revealedOptions, setRevealedOptions] = useState<Set<string>>(new Set());
  const [showAllTranslations, setShowAllTranslations] = useState<boolean>(false);

  // Lifelines
  const [used5050, setUsed5050] = useState<boolean>(false);
  const [hiddenOptions, setHiddenOptions] = useState<string[]>([]);
  const [usedAudience, setUsedAudience] = useState<boolean>(false);
  const [audienceVotes, setAudienceVotes] = useState<Record<string, number> | null>(null);

  // Audio and UI states
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isLadderOpen, setIsLadderOpen] = useState<boolean>(false);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [speakingText, setSpeakingText] = useState<string>('');
  const [isGameOver, setIsGameOver] = useState<boolean>(false);
  const [userAnswersHistory, setUserAnswersHistory] = useState<
    { questionId: number; chosen: string; correct: string; isCorrect: boolean }[]
  >([]);

  const currentQ: QuizQuestion = QUESTIONS_DATA[currentIndex];

  // Sync mute with sound controller
  useEffect(() => {
    sounds.isMuted = isMuted;
  }, [isMuted]);

  // Reset per question
  useEffect(() => {
    setSelectedKey(null);
    setIsAnswerConfirmed(false);
    setIsCorrect(null);
    setShowQuestionTranslation(showAllTranslations);
    setRevealedOptions(showAllTranslations ? new Set(['A', 'B', 'C', 'D']) : new Set());
    setHiddenOptions([]);
    setAudienceVotes(null);
    stopSpeaking();
    setIsSpeaking(false);
  }, [currentIndex, showAllTranslations]);

  // Toggle individual question translation
  const handleToggleQuestionTranslation = () => {
    setShowQuestionTranslation(prev => !prev);
    sounds.playSelect();
  };

  // Toggle individual option translation
  const handleToggleOptionTranslation = (key: string, e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Avoid triggering answer selection
    }
    sounds.playSelect();
    setRevealedOptions(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  // Toggle global show-all
  const handleToggleShowAll = () => {
    const next = !showAllTranslations;
    setShowAllTranslations(next);
    setShowQuestionTranslation(next);
    setRevealedOptions(next ? new Set(['A', 'B', 'C', 'D']) : new Set());
    sounds.playSelect();
  };

  // Lifeline: 50/50
  const handleUse5050 = () => {
    if (used5050 || isAnswerConfirmed) return;
    setUsed5050(true);
    sounds.playLifeline();

    const incorrectKeys = currentQ.options
      .map(o => o.key)
      .filter(k => k !== currentQ.correct);

    // Shuffle and pick 2 to hide
    const toHide = incorrectKeys.sort(() => Math.random() - 0.5).slice(0, 2);
    setHiddenOptions(toHide);
  };

  // Lifeline: Ask the Audience
  const handleUseAudience = () => {
    if (usedAudience || isAnswerConfirmed) return;
    setUsedAudience(true);
    sounds.playLifeline();

    const keys = ['A', 'B', 'C', 'D'];
    const correctKey = currentQ.correct;

    // Audience favors correct answer (~65-80%)
    const correctPercent = Math.floor(Math.random() * 20) + 65;
    const remaining = 100 - correctPercent;
    const other1 = Math.floor(Math.random() * (remaining - 10)) + 3;
    const other2 = Math.floor(Math.random() * (remaining - other1 - 3)) + 2;
    const other3 = remaining - other1 - other2;

    const wrongPercentages = [other1, other2, other3].sort(() => Math.random() - 0.5);

    const votes: Record<string, number> = {};
    let wrongIdx = 0;
    keys.forEach(k => {
      if (k === correctKey) {
        votes[k] = correctPercent;
      } else {
        votes[k] = wrongPercentages[wrongIdx++];
      }
    });

    setAudienceVotes(votes);
  };

  // Pronounce Spanish text
  const handlePronounce = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSpeakingText(text);
    setIsSpeaking(true);
    speakSpanish(text, () => {
      setIsSpeaking(false);
      setSpeakingText('');
    });
  };

  // Selecting an option
  const handleSelectOption = (key: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswerConfirmed) return;
    setSelectedKey(key);
    sounds.playSelect();
  };

  // Confirming and evaluating the answer
  const handleConfirmAnswer = () => {
    if (!selectedKey || isAnswerConfirmed) return;

    setIsAnswerConfirmed(true);
    const correct = selectedKey === currentQ.correct;
    setIsCorrect(correct);

    setUserAnswersHistory(prev => [
      ...prev,
      {
        questionId: currentQ.id,
        chosen: selectedKey,
        correct: currentQ.correct,
        isCorrect: correct
      }
    ]);

    if (correct) {
      sounds.playCorrect();
      setCorrectCount(prev => prev + 1);
      setCurrentScore(PRIZE_LADDER[currentIndex]);
    } else {
      // User requirement: "и если отвеи неверныц всё равно продолжмиь играть"
      // Play wrong sound, but do NOT end game!
      sounds.playWrong();
    }
  };

  // Advance to next question (or finish if 30th)
  const handleNextQuestion = () => {
    if (currentIndex < QUESTIONS_DATA.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      sounds.playVictory();
      setIsGameOver(true);
    }
  };

  // Retry the current question
  const handleRetryCurrentQuestion = () => {
    setSelectedKey(null);
    setIsAnswerConfirmed(false);
    setIsCorrect(null);
    sounds.playSelect();
  };

  // Restart game
  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedKey(null);
    setIsAnswerConfirmed(false);
    setIsCorrect(null);
    setCorrectCount(0);
    setCurrentScore(0);
    setUsed5050(false);
    setUsedAudience(false);
    setHiddenOptions([]);
    setAudienceVotes(null);
    setUserAnswersHistory([]);
    setIsGameOver(false);
    sounds.playSelect();
  };

  // Jump to specific question
  const handleJumpToQuestion = (idx: number) => {
    if (isAnswerConfirmed && !isGameOver) {
      // Allow jump
      setCurrentIndex(idx);
      setIsLadderOpen(false);
    } else if (!isAnswerConfirmed) {
      setCurrentIndex(idx);
      setIsLadderOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-amber-500 selection:text-slate-950 relative overflow-x-hidden">
      {/* Background ambient lighting */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] animate-studio-pulse" />
        <div className="absolute bottom-10 left-1/4 w-[500px] h-[400px] bg-amber-500/10 rounded-full blur-[160px]" />
        <div className="absolute top-1/3 right-1/4 w-[450px] h-[400px] bg-indigo-600/10 rounded-full blur-[150px]" />
      </div>

      {/* Top Header / TV Show Bar */}
      <header className="relative z-10 border-b border-blue-900/40 bg-slate-950/80 backdrop-blur-md px-4 py-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 via-yellow-400 to-amber-200 p-[2px] shadow-lg shadow-amber-500/20 flex items-center justify-center">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <Trophy className="w-5 h-5 text-amber-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-cinzel text-base sm:text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 tracking-wide">
                  QUIZ DE ESPAÑOL
                </h1>
                <span className="hidden sm:inline-block px-2 py-0.5 text-[11px] font-semibold tracking-wider text-amber-300 bg-amber-500/10 border border-amber-500/30 rounded-full">
                  Ո՞վ է ուզում դառնալ միլիոնատեր
                </span>
              </div>
              <p className="text-xs text-slate-400 font-armenian">
                30 զվարճալի հարց ու պատասխան • A2–B1–B2 մակարդակ
              </p>
            </div>
          </div>

          {/* Quick Controls: Global Translation, Mute, Ladder Toggle */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={handleToggleShowAll}
              title={showAllTranslations ? "Թաքցնել բոլոր թարգմանությունները" : "Ցուցադրել բոլոր թարգմանությունները"}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                showAllTranslations
                  ? 'bg-amber-500/20 border-amber-500/50 text-amber-300'
                  : 'bg-slate-900 border-slate-700/60 text-slate-300 hover:border-slate-500'
              }`}
            >
              <Languages className="w-4 h-4 text-amber-400" />
              <span className="hidden md:inline">
                {showAllTranslations ? "Թաքցնել թարգմանությունները" : "Բոլոր թարգմանությունները"}
              </span>
              <span className="md:hidden">Հայերեն</span>
            </button>

            <button
              onClick={() => setIsMuted(prev => !prev)}
              title={isMuted ? "Միացնել ձայնը" : "Անջատել ձայնը"}
              className="p-2 rounded-lg bg-slate-900 border border-slate-700/60 text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-green-400" />}
            </button>

            <button
              onClick={() => setIsLadderOpen(prev => !prev)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-blue-900/60 to-slate-900 border border-blue-500/40 text-blue-200 text-xs font-semibold hover:border-blue-400 transition-all lg:hidden"
            >
              <Menu className="w-4 h-4" />
              <span>{PRIZE_LADDER[currentIndex].toLocaleString()} €</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Game Arena */}
      <main className="relative z-10 flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-6 items-stretch">
        {/* Left/Center Column: Lifelines, Question, Options, Speaking Practice */}
        <div className="flex-1 flex flex-col justify-between gap-5">
          {/* Lifelines and Progress Info */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/70 border border-blue-900/40 rounded-xl p-3 sm:px-4 backdrop-blur-md">
            {/* Progress Badge */}
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded-md bg-blue-950 border border-blue-700/50 text-blue-300 text-xs font-semibold">
                Հարց {currentIndex + 1} / 30
              </span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                {currentQ.partTitleEs} ({currentQ.partTitleHy})
              </span>
            </div>

            {/* Lifelines (Օգնության հնարավորություններ) */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline mr-1">
                Օգնություն:
              </span>

              {/* 50:50 */}
              <button
                onClick={handleUse5050}
                disabled={used5050 || isAnswerConfirmed}
                title="50:50 — Հեռացնել 2 սխալ պատասխան"
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                  used5050
                    ? 'opacity-30 cursor-not-allowed border-slate-700 bg-slate-800 text-slate-500 line-through'
                    : 'bg-gradient-to-r from-blue-950 to-indigo-950 border-blue-500/50 text-amber-300 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10 active:scale-95'
                }`}
              >
                <Percent className="w-3.5 h-3.5" />
                <span>50:50</span>
              </button>

              {/* Ask the Audience */}
              <button
                onClick={handleUseAudience}
                disabled={usedAudience || isAnswerConfirmed}
                title="Գիտակների / Հանդիսատեսի օգնություն"
                className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                  usedAudience
                    ? 'opacity-30 cursor-not-allowed border-slate-700 bg-slate-800 text-slate-500 line-through'
                    : 'bg-gradient-to-r from-blue-950 to-indigo-950 border-blue-500/50 text-amber-300 hover:border-amber-400 hover:shadow-lg hover:shadow-amber-500/10 active:scale-95'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                <span>Դահլիճ</span>
              </button>

              {/* Listen to Question in Spanish */}
              <button
                onClick={(e) => handlePronounce(currentQ.questionEs, e)}
                title="Լսել հարցի իսպաներեն արտասանությունը"
                className="flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-slate-900 border border-slate-700 text-slate-200 hover:border-blue-400 hover:text-white transition-all active:scale-95"
              >
                <Volume2 className="w-3.5 h-3.5 text-blue-400" />
                <span className="hidden sm:inline">Արտասանել</span>
              </button>
            </div>
          </div>

          {/* Audience Poll Modal/Display if active */}
          {audienceVotes && (
            <div className="bg-slate-900/90 border border-amber-500/40 rounded-xl p-4 shadow-xl shadow-amber-500/5 backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                  <Users className="w-4 h-4" />
                  <span>Հանդիսատեսի քվեարկության արդյունքները (Votos del público)</span>
                </div>
                <button
                  onClick={() => setAudienceVotes(null)}
                  className="text-slate-400 hover:text-white text-xs p-1"
                >
                  ✕ Փակել
                </button>
              </div>
              <div className="grid grid-cols-4 gap-3 text-center">
                {(['A', 'B', 'C', 'D'] as const).map(key => (
                  <div key={key} className="flex flex-col items-center">
                    <div className="text-xs font-bold text-amber-300 mb-1">
                      {audienceVotes[key]}%
                    </div>
                    <div className="w-full bg-slate-800 rounded-t h-20 flex items-end p-1">
                      <div
                        className={`w-full rounded-t transition-all duration-700 ${
                          key === currentQ.correct
                            ? 'bg-gradient-to-t from-green-600 to-emerald-400'
                            : 'bg-gradient-to-t from-blue-700 to-indigo-500'
                        }`}
                        style={{ height: `${audienceVotes[key]}%` }}
                      />
                    </div>
                    <div className="text-xs font-bold text-slate-300 mt-1.5">{key}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Question Card (Millionaire Hexagonal-like Frame) */}
          <div className="relative group">
            {/* Outer golden rim glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-700 via-amber-500/40 to-blue-700 rounded-2xl blur-sm opacity-60 group-hover:opacity-100 transition duration-500" />

            <div
              onClick={handleToggleQuestionTranslation}
              role="button"
              tabIndex={0}
              className="relative cursor-pointer bg-gradient-to-b from-slate-900 via-blue-950/70 to-slate-950 border border-blue-500/50 rounded-2xl p-5 sm:p-7 text-center shadow-2xl transition-all hover:border-amber-400/80"
              title="Սեղմեք իսպաներեն հարցի վրա՝ հայերեն թարգմանությունը բացելու կամ փակելու համար"
            >
              {/* Question Number Ribbon */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/40 border border-blue-500/40 text-amber-300 text-xs font-bold tracking-widest uppercase mb-3">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>ՀԱՐՑ {currentQ.id} • {PRIZE_LADDER[currentIndex].toLocaleString()} €</span>
              </div>

              {/* Spanish Question Text (Click to toggle Armenian translation) */}
              <div className="text-lg sm:text-2xl font-bold leading-relaxed text-white drop-shadow-sm select-text">
                {currentQ.questionEs}
              </div>

              {/* Translation Hint / Interactive Toggle */}
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/80 text-[11px] text-amber-400/90 font-medium hover:border-amber-400 transition-colors">
                  <Languages className="w-3.5 h-3.5" />
                  <span>
                    {showQuestionTranslation ? "Սեղմեք՝ թարգմանությունը ծածկելու համար" : "Սեղմեք իսպաներեն տեքստին՝ հայերեն թարգմանության համար"}
                  </span>
                </span>
                <button
                  onClick={(e) => handlePronounce(currentQ.questionEs, e)}
                  title="Լսել"
                  className="p-1 rounded-full hover:bg-blue-900/50 text-blue-300 hover:text-white transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              </div>

              {/* Revealed Armenian Question Translation */}
              {showQuestionTranslation && (
                <div className="mt-4 pt-4 border-t border-blue-900/50 text-base sm:text-lg text-amber-200/95 font-armenian font-medium leading-relaxed bg-amber-500/5 rounded-xl p-3 animate-in fade-in slide-in-from-top-2 duration-200">
                  {currentQ.questionHy}
                </div>
              )}
            </div>
          </div>

          {/* 4 Options Grid (A, B, C, D) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
            {currentQ.options.map(option => {
              const isHidden = hiddenOptions.includes(option.key);
              if (isHidden) {
                return (
                  <div
                    key={option.key}
                    className="opacity-0 pointer-events-none min-h-[90px] border border-transparent rounded-xl"
                  />
                );
              }

              const isSelected = selectedKey === option.key;
              const isThisCorrect = isAnswerConfirmed && option.key === currentQ.correct;
              const isThisWrong = isAnswerConfirmed && isSelected && !isCorrect;
              const isRevealed = revealedOptions.has(option.key) || showAllTranslations;

              // Compute option card styling
              let cardStyle = 'bg-slate-900/80 border-blue-900/60 hover:border-amber-400/80 hover:bg-slate-900 text-slate-100';
              let badgeStyle = 'bg-blue-950 text-amber-400 border-blue-700/50';

              if (isSelected && !isAnswerConfirmed) {
                // Selected waiting confirmation
                cardStyle = 'bg-amber-950/40 border-amber-500 text-amber-200 shadow-lg shadow-amber-500/20';
                badgeStyle = 'bg-amber-500 text-slate-950 border-amber-400 font-extrabold';
              } else if (isThisCorrect) {
                // Correct answer glows green
                cardStyle = 'bg-emerald-950/60 border-emerald-500 text-emerald-100 shadow-xl shadow-emerald-500/30 neon-correct';
                badgeStyle = 'bg-emerald-500 text-slate-950 border-emerald-400 font-extrabold';
              } else if (isThisWrong) {
                // Wrong answer selected glows red
                cardStyle = 'bg-red-950/60 border-red-500 text-red-100 shadow-xl shadow-red-500/30 neon-wrong';
                badgeStyle = 'bg-red-500 text-white border-red-400 font-extrabold';
              }

              return (
                <div
                  key={option.key}
                  onClick={() => handleSelectOption(option.key)}
                  className={`group relative flex flex-col justify-between p-4 rounded-xl border backdrop-blur-md cursor-pointer transition-all duration-200 ${cardStyle}`}
                >
                  {/* Top row: Key Badge, Spanish Text, Sound, and Translate Button */}
                  <div className="flex items-start gap-3">
                    <span
                      className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center font-cinzel font-bold text-sm border shadow-inner transition-colors ${badgeStyle}`}
                    >
                      {option.key}
                    </span>

                    <div className="flex-1">
                      {/* Spanish option text - Clicking toggles Armenian translation */}
                      <p
                        onClick={(e) => handleToggleOptionTranslation(option.key, e)}
                        className="text-sm sm:text-base font-semibold leading-snug cursor-pointer group-hover:text-amber-100 select-text"
                        title="Սեղմեք տարբերակի իսպաներեն տեքստին՝ հայերեն թարգմանությունը տեսնելու համար"
                      >
                        {option.textEs}
                      </p>
                    </div>

                    {/* Quick action buttons for this option */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={(e) => handlePronounce(option.textEs, e)}
                        title="Լսել արտասանությունը"
                        className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={(e) => handleToggleOptionTranslation(option.key, e)}
                        title={isRevealed ? "Ծածկել թարգմանությունը" : "Բացել հայերեն թարգմանությունը"}
                        className={`p-1.5 rounded-lg text-xs font-medium transition-colors ${
                          isRevealed
                            ? 'text-amber-400 bg-amber-500/10'
                            : 'text-slate-400 hover:text-amber-300 hover:bg-slate-800'
                        }`}
                      >
                        <Languages className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Revealed Armenian translation for this option */}
                  {isRevealed && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      className="mt-3 pt-2.5 border-t border-slate-700/50 text-xs sm:text-sm font-armenian font-medium text-amber-200/90 leading-relaxed bg-amber-500/5 p-2 rounded-lg animate-in fade-in duration-150"
                    >
                      <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400/70 mr-1.5">
                        Հայերեն:
                      </span>
                      {option.textHy}
                    </div>
                  )}

                  {/* Footer status / Confirm indicator */}
                  <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                    <span
                      onClick={(e) => handleToggleOptionTranslation(option.key, e)}
                      className="hover:underline cursor-pointer text-slate-500 hover:text-slate-300 font-armenian"
                    >
                      {isRevealed ? "Փակել թարգմանությունը" : "Սեղմեք թարգմանելու համար"}
                    </span>

                    {isThisCorrect && (
                      <span className="flex items-center gap-1 text-emerald-400 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Ճիշտ է (Correcto)
                      </span>
                    )}
                    {isThisWrong && (
                      <span className="flex items-center gap-1 text-red-400 font-bold">
                        <XCircle className="w-3.5 h-3.5" /> Սխալ է (Incorrecto)
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Action Bar: Confirm Answer / Continue Playing / Feedback Banner */}
          <div className="bg-slate-900/80 border border-blue-900/50 rounded-2xl p-4 sm:p-5 backdrop-blur-md">
            {!isAnswerConfirmed ? (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs sm:text-sm text-slate-300 font-armenian">
                  {selectedKey ? (
                    <span className="text-amber-300 font-semibold">
                      Ընտրված է տարբերակ {selectedKey}: Սեղմեք «Հաստատել պատասխանը» կոճակը։
                    </span>
                  ) : (
                    <span>
                      Ընտրեք ճիշտ տարբերակը (A, B, C կամ D): Ցանկացած տարբերակի կամ հարցի վրա սեղմելով կարող եք բացել հայերեն թարգմանությունը։
                    </span>
                  )}
                </div>

                <button
                  onClick={handleConfirmAnswer}
                  disabled={!selectedKey}
                  className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm tracking-wide transition-all shadow-lg ${
                    selectedKey
                      ? 'bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-600 text-slate-950 hover:brightness-110 active:scale-95 shadow-amber-500/20'
                      : 'bg-slate-800 text-slate-500 border border-slate-700 cursor-not-allowed'
                  }`}
                >
                  ՀԱՍՏԱՏԵԼ ՊԱՏԱՍԽԱՆԸ
                </button>
              </div>
            ) : (
              /* User requirement: "и если отвеи неверныц всё равно продолжмиь играть" */
              <div className="space-y-4 animate-in fade-in duration-200">
                <div
                  className={`p-4 rounded-xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 ${
                    isCorrect
                      ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200'
                      : 'bg-amber-950/40 border-amber-500/40 text-amber-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {isCorrect ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400 shrink-0 mt-0.5" />
                    ) : (
                      <Info className="w-6 h-6 text-amber-400 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <div className="font-bold text-base">
                        {isCorrect
                          ? '🎉 Ճիշտ պատասխան։ Շնորհավորում ենք։'
                          : '💡 Ոչինչ, սխալ պատասխան է, բայց խաղը շարունակվում է։'}
                      </div>
                      <p className="text-xs sm:text-sm opacity-90 font-armenian mt-1">
                        Ճիշտ պատասխանն էր <strong>{currentQ.correct}</strong>:{' '}
                        {currentQ.options.find(o => o.key === currentQ.correct)?.textEs}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                    {!isCorrect && (
                      <button
                        onClick={handleRetryCurrentQuestion}
                        className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-xs font-semibold text-slate-200 transition-colors"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Փորձել նորից</span>
                      </button>
                    )}

                    <button
                      onClick={handleNextQuestion}
                      className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 font-bold text-sm shadow-md active:scale-95 transition-all"
                    >
                      <span>Շարունակել խաղը</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Conversational speaking practice tip as emphasized in prompt */}
                <div className="bg-slate-950/60 border border-blue-900/40 rounded-xl p-3 sm:p-4 text-xs font-armenian text-slate-300">
                  <div className="flex items-center gap-2 text-amber-300 font-semibold mb-1.5">
                    <BookOpen className="w-4 h-4" />
                    <span>🗣️ Խոսակցական մարզում (Práctica oral):</span>
                  </div>
                  <p className="mb-2 text-slate-400">
                    Փորձեք բարձրաձայն բացատրել ձեր ընտրությունը իսպաներենով՝
                  </p>
                  <div className="flex flex-wrap items-center justify-between gap-2 bg-blue-950/40 border border-blue-800/40 rounded-lg p-2.5">
                    <span className="font-mono text-amber-200 text-xs sm:text-sm font-medium">
                      «He elegido esta respuesta porque...»
                    </span>
                    <span className="text-slate-400 text-xs">
                      («Ես ընտրել եմ այս պատասխանը, որովհետև...»)
                    </span>
                    <button
                      onClick={() => speakSpanish('He elegido esta respuesta porque...')}
                      className="p-1 px-2 rounded bg-blue-900/60 hover:bg-blue-800 text-blue-200 text-[11px] flex items-center gap-1"
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>Լսել նախադասությունը</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Millionaire Prize Ladder (Desktop & Drawer for Mobile) */}
        <aside
          className={`fixed lg:static inset-y-0 right-0 z-40 w-72 lg:w-80 bg-slate-950 lg:bg-slate-900/60 border-l lg:border border-blue-900/40 rounded-none lg:rounded-2xl p-4 flex flex-col justify-between backdrop-blur-md transition-transform duration-300 ${
            isLadderOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'
          }`}
        >
          {/* Ladder Header */}
          <div className="flex items-center justify-between border-b border-blue-900/40 pb-3 mb-3">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-amber-400" />
              <div>
                <h3 className="font-cinzel text-sm font-bold text-amber-300">
                  ՄԻԼԻՈՆԱՏԵՐ ՍԱՆԴՂԱԿ
                </h3>
                <p className="text-[10px] text-slate-400 font-armenian">
                  30 մակարդակ • Անձեռնմխելի շեմեր
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsLadderOpen(false)}
              className="lg:hidden p-1 rounded-lg text-slate-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Ladder Rows (Descending order like the TV show) */}
          <div className="flex-1 overflow-y-auto pr-1 space-y-1 text-xs">
            {QUESTIONS_DATA.slice()
              .reverse()
              .map((q, revIdx) => {
                const actualIdx = QUESTIONS_DATA.length - 1 - revIdx;
                const isCurrent = actualIdx === currentIndex;
                const isPassed = actualIdx < currentIndex;
                // Safe havens (5, 10, 15, 20, 25, 30)
                const isSafeHaven = (actualIdx + 1) % 5 === 0;

                const answerRecord = userAnswersHistory.find(h => h.questionId === q.id);

                let rowBg = 'text-slate-400 hover:bg-slate-800/40';
                if (isCurrent) {
                  rowBg = 'bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold shadow-md';
                } else if (isPassed) {
                  rowBg = answerRecord?.isCorrect
                    ? 'text-emerald-400 font-semibold bg-emerald-950/20'
                    : 'text-amber-400/80 font-medium bg-amber-950/10';
                } else if (isSafeHaven) {
                  rowBg = 'text-white font-bold bg-blue-950/30';
                }

                return (
                  <div
                    key={q.id}
                    onClick={() => handleJumpToQuestion(actualIdx)}
                    className={`flex items-center justify-between px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${rowBg}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 text-right font-mono text-[11px] opacity-80">
                        {actualIdx + 1}
                      </span>
                      {isCurrent ? (
                        <span className="w-2 h-2 rounded-full bg-slate-950 animate-ping" />
                      ) : isPassed ? (
                        answerRecord?.isCorrect ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        ) : (
                          <span className="text-[10px] text-amber-400">●</span>
                        )
                      ) : (
                        <span className="w-2 h-2 rounded-full bg-slate-700/60" />
                      )}
                      <span className="truncate max-w-[110px] text-[11px]">
                        {q.partTitleEs.split('.')[1] || `Հարց ${q.id}`}
                      </span>
                    </div>

                    <span className="font-cinzel font-bold tracking-wider">
                      {PRIZE_LADDER[actualIdx].toLocaleString()} €
                    </span>
                  </div>
                );
              })}
          </div>

          {/* Ladder Footer / Current Bank */}
          <div className="border-t border-blue-900/40 pt-3 mt-3">
            <div className="flex items-center justify-between text-xs mb-1">
              <span className="text-slate-400">Շահում (Premio):</span>
              <span className="text-amber-300 font-bold font-cinzel text-sm">
                {currentScore.toLocaleString()} €
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Ճիշտ պատասխաններ:</span>
              <span className="text-white font-semibold">
                {correctCount} / {currentIndex + (isAnswerConfirmed ? 1 : 0)}
              </span>
            </div>
          </div>
        </aside>
      </main>

      {/* Backdrop for mobile ladder */}
      {isLadderOpen && (
        <div
          onClick={() => setIsLadderOpen(false)}
          className="fixed inset-0 bg-slate-950/80 z-30 lg:hidden backdrop-blur-sm"
        />
      )}

      {/* Footer info bar */}
      <footer className="relative z-10 border-t border-blue-900/30 bg-slate-950/70 text-slate-500 text-xs py-3 px-4 text-center font-armenian">
        <p>
          Quiz de Español • Իսպաներենի ուսուցման ինտերակտիվ խաղ • Հարցերի և տարբերակների վրա սեղմելով տեսեք թարգմանությունը
        </p>
      </footer>

      {/* Game Over / Victory Modal */}
      {isGameOver && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md animate-in fade-in duration-300">
          <div className="max-w-xl w-full bg-slate-900 border border-amber-500/50 rounded-2xl p-6 sm:p-8 text-center shadow-2xl shadow-amber-500/20 relative">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 p-1 flex items-center justify-center shadow-xl shadow-amber-500/30">
              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center">
                <Trophy className="w-10 h-10 text-amber-400" />
              </div>
            </div>

            <h2 className="font-cinzel text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-500 mb-2">
              ¡FELICITACIONES!
            </h2>
            <h3 className="font-armenian text-lg font-bold text-slate-200 mb-4">
              Դուք ավարտեցիք բոլոր 30 հարցերը։
            </h3>

            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="p-3 rounded-xl bg-slate-950 border border-blue-900/40">
                <div className="text-xs text-slate-400 font-armenian mb-1">Վերջնական շահում</div>
                <div className="font-cinzel text-xl font-bold text-amber-400">
                  {currentScore.toLocaleString()} €
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-950 border border-blue-900/40">
                <div className="text-xs text-slate-400 font-armenian mb-1">Ճիշտ պատասխաններ</div>
                <div className="text-xl font-bold text-emerald-400">
                  {correctCount} / 30
                </div>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-300 font-armenian mb-6 leading-relaxed">
              Հիանալի աշխատանք։ Դուք յուրացրեցիք առօրյա իրավիճակների, ճանապարհորդության և հումորային զրույցների իսպաներեն արտահայտությունները։
            </p>

            <button
              onClick={handleRestart}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-yellow-400 to-amber-500 text-slate-950 font-bold text-base shadow-xl hover:brightness-110 active:scale-95 transition-all"
            >
              ԽԱՂԱԼ ԿՐԿԻՆ (Jugar de nuevo)
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
