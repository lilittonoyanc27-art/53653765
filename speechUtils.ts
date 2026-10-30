/**
 * Speech synthesis utility for Spanish language pronunciation practice.
 */

export function speakSpanish(text: string, onEnd?: () => void) {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }

  // Cancel any ongoing speech
  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'es-ES'; // Spanish (Spain)
  utterance.rate = 0.88; // Slightly measured for language learners
  utterance.pitch = 1.0;

  if (onEnd) {
    utterance.onend = onEnd;
    utterance.onerror = onEnd;
  }

  // Pick Spanish voice if available
  const voices = window.speechSynthesis.getVoices();
  const spanishVoice = voices.find(v => v.lang.startsWith('es') || v.lang === 'es-ES');
  if (spanishVoice) {
    utterance.voice = spanishVoice;
  }

  window.speechSynthesis.speak(utterance);
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
