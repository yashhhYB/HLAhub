// ElevenLabs configuration
export interface ElevenLabsConfig {
  apiKey: string
  voiceId?: string
  model?: string
}

// Voice settings for different use cases
export const VOICE_PRESETS = {
  medical_professional: {
    voiceId: 'pNInz6obpgDQGcFmaJgB',
    stability: 0.8,
    similarity_boost: 0.75,
    style: 0.3,
    use_speaker_boost: true
  },
  patient_friendly: {
    voiceId: 'EXAVITQu4vr4xnSDxMaL',
    stability: 0.9,
    similarity_boost: 0.8,
    style: 0.2,
    use_speaker_boost: true
  },
  multilingual: {
    voiceId: 'yoZ06aMxZJJ28mfd3POQ',
    stability: 0.85,
    similarity_boost: 0.7,
    style: 0.4,
    use_speaker_boost: true
  }
}

export class HLAhubVoiceAI {
  private config: ElevenLabsConfig

  constructor(config: ElevenLabsConfig) {
    this.config = config
  }

  async textToSpeech(
    text: string, 
    voicePreset: keyof typeof VOICE_PRESETS = 'medical_professional',
    language?: string
  ): Promise<ArrayBuffer> {
    // Mock implementation for development
    console.log('Voice AI:', { text, voicePreset, language })
    return new ArrayBuffer(0)
  }

  async generateTestResultSpeech(hlaData: any, language: string = 'en') {
    console.log('HLA Results Speech:', { hlaData, language })
    return new ArrayBuffer(0)
  }
}

export function createVoiceAI(): HLAhubVoiceAI | null {
  const apiKey = process.env.NEXT_PUBLIC_ELEVENLABS_API_KEY || 'mock-key'
  return new HLAhubVoiceAI({ apiKey })
}

export const MEDICAL_PRONUNCIATIONS = {
  'HLA': 'H-L-A',
  'leukocyte': 'LOO-koh-site',
  'antigen': 'AN-ti-jen',
}

export function addMedicalPronunciation(text: string): string {
  return text
}