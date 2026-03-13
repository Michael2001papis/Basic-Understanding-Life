/* Built by Michael Papismedov – MP */
import { AppLayout } from './components/layout/AppLayout'
import { HeroSection } from './components/sections/HeroSection'
import { IntroSection } from './components/sections/IntroSection'
import { PresenceMeaningSection } from './components/sections/PresenceMeaningSection'
import { BodyMindSection } from './components/sections/BodyMindSection'
import { AngerExplanationSection } from './components/sections/AngerExplanationSection'
import { CommonMistakesSection } from './components/sections/CommonMistakesSection'
import { CorrectResponseSection } from './components/sections/CorrectResponseSection'
import { RepeatingPatternsSection } from './components/sections/RepeatingPatternsSection'
import { EmotionalNeedsSection } from './components/sections/EmotionalNeedsSection'
import { QuizSection } from './components/sections/QuizSection'
import { FAQSection } from './components/sections/FAQSection'
import { FinalMessageSection } from './components/sections/FinalMessageSection'

export function App() {
  return (
    <AppLayout>
      <HeroSection />
      <IntroSection />
      <PresenceMeaningSection />
      <BodyMindSection />
      <AngerExplanationSection />
      <CommonMistakesSection />
      <CorrectResponseSection />
      <QuizSection />
      <RepeatingPatternsSection />
      <EmotionalNeedsSection />
      <FAQSection />
      <FinalMessageSection />
    </AppLayout>
  )
}

