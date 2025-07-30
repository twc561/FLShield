// Helper function to analyze officer's approach
export function analyzeOfficerApproach(message: string): {
  tone: 'professional' | 'aggressive' | 'empathetic' | 'rushed' | 'commanding';
  techniques: string[];
} {
  const msg = message.toLowerCase();
  let tone: 'professional' | 'aggressive' | 'empathetic' | 'rushed' | 'commanding' = 'professional';
  const techniques: string[] = [];

  // Tone analysis
  if (msg.includes('now!') || msg.includes('do it now') || msg.split('!').length > 2) {
    tone = 'aggressive';
  } else if (/\b(get on the ground|show me your hands|turn around)\b/.test(msg)) {
    tone = 'commanding';
  } else if (msg.includes('understand') || msg.includes('sorry') || msg.includes('help')) {
    tone = 'empathetic';
  } else if (msg.length < 20 || msg.split(' ').length < 4) {
    tone = 'rushed';
  }

  // Technique identification
  if (msg.includes('understand') || msg.includes('feel')) {
    techniques.push('empathy');
  }
  if (msg.includes('can you') || msg.includes('would you')) {
    techniques.push('open-ended questions');
  }
  if (msg.includes('let me') || msg.includes('help')) {
    techniques.push('assistance');
  }
  if (msg.includes('what happened') || msg.includes('tell me')) {
    techniques.push('active listening');
  }
  if (msg.includes('okay') || msg.includes('i see')) {
    techniques.push('acknowledgment');
  }
  if (msg.includes('calm') || msg.includes('relax')) {
    techniques.push('de-escalation');
  }

  return { tone, techniques };
}
