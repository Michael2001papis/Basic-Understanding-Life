import type { ReactNode } from 'react'
import type { ViewId } from '../viewConfig'
import { HeroSection } from '../components/sections/HeroSection'
import { IntroSection } from '../components/sections/IntroSection'
import { PresenceMeaningSection } from '../components/sections/PresenceMeaningSection'
import { BodyMindSection } from '../components/sections/BodyMindSection'
import { AngerExplanationSection } from '../components/sections/AngerExplanationSection'
import { CommonMistakesSection } from '../components/sections/CommonMistakesSection'
import { CorrectResponseSection } from '../components/sections/CorrectResponseSection'
import { LifeSituationsSection } from '../components/sections/LifeSituationsSection'
import { QuizSection } from '../components/sections/QuizSection'
import { ScenarioQuizSection } from '../components/sections/ScenarioQuizSection'
import { RepeatingPatternsSection } from '../components/sections/RepeatingPatternsSection'
import { EmotionalNeedsSection } from '../components/sections/EmotionalNeedsSection'
import { FAQSection } from '../components/sections/FAQSection'
import { FinalMessageSection } from '../components/sections/FinalMessageSection'

type Props = {
  viewId: ViewId
}

function ViewWrapper({ children, viewId }: { children: ReactNode; viewId: ViewId }) {
  return <div className={`view-content view-${viewId}`}>{children}</div>
}

export function ViewContent({ viewId }: Props) {
  switch (viewId) {
    case 'home':
      return (
        <ViewWrapper viewId={viewId}>
          <HeroSection />
          <IntroSection />
          <PresenceMeaningSection />
          <BodyMindSection />
          <AngerExplanationSection />
          <CommonMistakesSection />
          <CorrectResponseSection />
        </ViewWrapper>
      )
    case 'quiz':
      return (
        <ViewWrapper viewId={viewId}>
          <QuizSection />
        </ViewWrapper>
      )
    case 'scenario-quiz':
      return (
        <ViewWrapper viewId={viewId}>
          <ScenarioQuizSection />
        </ViewWrapper>
      )
    case 'life-situations':
      return (
        <ViewWrapper viewId={viewId}>
          <LifeSituationsSection />
        </ViewWrapper>
      )
    case 'patterns-needs':
      return (
        <ViewWrapper viewId={viewId}>
          <RepeatingPatternsSection />
          <EmotionalNeedsSection />
        </ViewWrapper>
      )
    case 'faq-final':
      return (
        <ViewWrapper viewId={viewId}>
          <FAQSection />
          <FinalMessageSection />
        </ViewWrapper>
      )
    default:
      return (
        <ViewWrapper viewId="home">
          <HeroSection />
        </ViewWrapper>
      )
  }
}
