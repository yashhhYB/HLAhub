# ElevenLabs AI Integration for HLAhub

This document explains how to set up and use the ElevenLabs AI features in your HLAhub healthcare platform.

## Features

### 🎙️ Voice AI Capabilities
- **Text-to-Speech**: Convert medical content to natural-sounding speech
- **Medical Pronunciation**: Accurate pronunciation of medical terminology
- **Multilingual Support**: Support for English, Spanish, Hindi, French, German, Chinese, and Japanese
- **Voice Presets**: Specialized voices for medical professionals and patient communication
- **Real-time Speech**: Live voice generation for consultations

### 🔧 Components Added

1. **ElevenLabs Integration** (`lib/elevenlabs.ts`)
   - Core ElevenLabs API wrapper
   - Voice presets for medical use cases
   - HLA-specific speech generation
   - Medical terminology pronunciation

2. **Voice AI Hook** (`hooks/use-voice-ai.ts`)
   - React hook for voice functionality
   - Audio playback management
   - Settings management
   - Error handling

3. **Voice Controls Component** (`components/voice-ai-controls.tsx`)
   - Voice playback controls
   - Settings configuration
   - Language selection
   - Speech speed control

## Setup Instructions

### 1. Get ElevenLabs API Key
1. Visit [ElevenLabs](https://elevenlabs.io/)
2. Create an account or sign in
3. Go to Settings → API Keys
4. Generate a new API key

### 2. Configure Environment Variables
```bash
# Copy the example file
cp .env.example .env.local

# Add your ElevenLabs API key
NEXT_PUBLIC_ELEVENLABS_API_KEY=your_api_key_here
```

### 3. Install Dependencies
The ElevenLabs package is already added to package.json:
```bash
npm install
```

### 4. Test the Integration
1. Start the development server: `npm run dev`
2. Navigate to any page with voice controls
3. Click the voice/speaker icon to test text-to-speech

## Usage Examples

### Basic Voice Control
```tsx
import { VoiceAIControls } from '@/components/voice-ai-controls'

<VoiceAIControls 
  text="Your HLA test results are ready for review"
  compact={true}
/>
```

### Using the Voice Hook
```tsx
import { useVoiceAI } from '@/hooks/use-voice-ai'

function MyComponent() {
  const { speak, isPlaying, settings } = useVoiceAI()
  
  const handleSpeak = async () => {
    await speak("Hello, this is a medical announcement", {
      voicePreset: 'medical_professional',
      language: 'en'
    })
  }
  
  return (
    <button onClick={handleSpeak} disabled={isPlaying}>
      Speak
    </button>
  )
}
```

### HLA Results Speech
```tsx
const { speakHLAResults } = useVoiceAI()

const hlaData = {
  A: ["A*02:01", "A*24:02"],
  B: ["B*15:01", "B*51:01"],
  DR: ["DRB1*04:01", "DRB1*13:02"],
  compatibility: 95
}

await speakHLAResults(hlaData, 'en')
```

## Voice Presets

### Medical Professional
- Professional male voice
- Clear, authoritative tone
- Ideal for medical explanations

### Patient Friendly
- Warm, empathetic female voice
- Reassuring tone
- Best for patient communication

### Multilingual
- Supports multiple languages
- Consistent quality across languages
- Perfect for international patients

## Supported Languages

- **English** (en) - Default
- **Spanish** (es) - Español
- **Hindi** (hi) - हिंदी
- **French** (fr) - Français
- **German** (de) - Deutsch
- **Chinese** (zh) - 中文
- **Japanese** (ja) - 日本語

## Medical Terminology

The system automatically handles pronunciation of medical terms:
- HLA → "H-L-A"
- Leukocyte → "LOO-koh-site"
- Antigen → "AN-ti-jen"
- Immunology → "im-yoo-NOL-oh-jee"
- And many more...

## Integration Points

### Lab Booking Page
- Voice descriptions of lab services
- Spoken booking confirmations
- Audio instructions for patients

### Consultation Page
- Voice AI consultations with doctors
- Multilingual doctor information
- Real-time medical guidance

### Donor Matching
- Spoken compatibility results
- HLA profile announcements
- Match explanation in patient's language

## Best Practices

1. **Always provide visual text alongside audio**
2. **Use appropriate voice presets for context**
3. **Test with multiple languages if supporting international users**
4. **Handle errors gracefully when API is unavailable**
5. **Respect user preferences for auto-play**

## Troubleshooting

### Common Issues

1. **No audio playback**
   - Check API key configuration
   - Verify browser audio permissions
   - Ensure HTTPS in production

2. **Voice quality issues**
   - Try different voice presets
   - Adjust speech speed settings
   - Check network connectivity

3. **Language not working**
   - Verify language code format
   - Use 'multilingual' preset for non-English
   - Check ElevenLabs language support

### Error Messages

- "ElevenLabs API key not configured" → Add API key to environment
- "Failed to generate speech" → Check API quota and network
- "Audio context suspended" → User interaction required for audio

## Cost Optimization

1. **Cache frequently used audio**
2. **Use appropriate audio quality settings**
3. **Implement usage limits per user**
4. **Monitor API usage in ElevenLabs dashboard**

## Security Notes

- API keys are handled securely through environment variables
- Audio is generated on-demand, not stored
- Patient data is never sent to ElevenLabs
- All voice generation is anonymous

## Support

For technical issues:
1. Check the browser console for errors
2. Verify API key and quota in ElevenLabs dashboard
3. Test with different browsers
4. Review the ElevenLabs documentation

For feature requests or bugs, please open an issue in the project repository.