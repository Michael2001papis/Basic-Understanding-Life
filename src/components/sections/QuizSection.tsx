import { useEffect, useState } from 'react'
import { SectionWrapper } from '../shared/SectionWrapper'

type Option = {
  id: string
  label: string
}

type Question = {
  id: string
  text: string
  options: Option[]
}

const questions: Question[] = [
  {
    id: 'q1',
    text: 'כשבן או בת הזוג מספרים על רגע קושי גופני או רגשי, מה הכי חשוב בשלב הראשון?',
    options: [
      { id: 'a', label: 'להסביר למה זה לא כזה נורא' },
      { id: 'b', label: 'לשאול שאלות ולנסות להבין מה קרה' },
      { id: 'c', label: 'להוכיח שלא הייתה כוונה לפגוע' },
      { id: 'd', label: 'להחליף נושא כדי לא להכביד' },
    ],
  },
  {
    id: 'q2',
    text: 'ברגע של מצוקה, מה האדם בדרך כלל מחפש יותר?',
    options: [
      { id: 'a', label: 'פתרון מהיר שיסגור את השיחה' },
      { id: 'b', label: 'הרגשה שמישהו נשאר איתו והוא לא לבד' },
      { id: 'c', label: 'ניתוח הגיוני של המצב' },
      { id: 'd', label: 'רשימה של מה הוא עשה לא נכון' },
    ],
  },
  {
    id: 'q3',
    text: 'כשהכאב יוצא ככעס, מה יכול לעזור לראות מתחת לפני השטח?',
    options: [
      { id: 'a', label: 'את השאלה “מי צודק”' },
      { id: 'b', label: 'את הפחד, האכזבה והבדידות שמסתתרים מאחוריו' },
      { id: 'c', label: 'את הטון בלבד' },
      { id: 'd', label: 'רק את מה שנאמר במילים המדויקות' },
    ],
  },
  {
    id: 'q4',
    text: 'מה מבדיל בין טעות חד־פעמית לבין דפוס שחוזר על עצמו?',
    options: [
      { id: 'a', label: 'האם הצד הפגוע הגיב בשקט או בכעס' },
      { id: 'b', label: 'האם חוויית הבדידות חוזרת שוב ושוב לאורך זמן' },
      { id: 'c', label: 'האם הייתה התנצלות אחת לפחות' },
      { id: 'd', label: 'האם קרה אירוע אחד בלבד' },
    ],
  },
  {
    id: 'q5',
    text: 'מהי דרך טובה לסיים רגע קשה אחרי שנרגעים?',
    options: [
      { id: 'a', label: 'לא לדבר על זה יותר כדי “לא לפתוח שוב”' },
      { id: 'b', label: 'לשאול מה הצד השני הרגיש ומה יעזור בפעם הבאה' },
      { id: 'c', label: 'להדגיש שוב שלא הייתה כוונה רעה' },
      { id: 'd', label: 'להזכיר כמה דברים טובים אחרים בקשר' },
    ],
  },
]

type StoredQuestion = {
  id: string
  text: string
  options: Option[]
  selectedOptionId?: string
}

type QuizState = {
  currentIndex: number
  finished: boolean
  openAnswer: string
  openAnswerTimestamp?: number
  questions: StoredQuestion[]
}

const STORAGE_KEY = 'quizState'

export function QuizSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [openAnswer, setOpenAnswer] = useState('')

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as Partial<QuizState> & {
        // תמיכה לאחור בגרסאות ישנות יותר
        answers?: Record<string, string>
      }

      const restoredAnswers: Record<string, string> = {}

      if (parsed.questions && Array.isArray(parsed.questions)) {
        parsed.questions.forEach((q) => {
          if (q && q.id && q.selectedOptionId) {
            restoredAnswers[q.id] = q.selectedOptionId
          }
        })
      } else if (parsed.answers) {
        Object.assign(restoredAnswers, parsed.answers)
      }

      if (typeof parsed.currentIndex === 'number') {
        setCurrentIndex(parsed.currentIndex)
      }
      if (typeof parsed.finished === 'boolean') {
        setFinished(parsed.finished)
      }
      if (parsed.openAnswer) {
        setOpenAnswer(parsed.openAnswer)
      }
      if (Object.keys(restoredAnswers).length > 0) {
        setAnswers(restoredAnswers)
      }
    } catch {
      // אם יש נתון פגום באחסון, מתעלמים ממנו וממשיכים כרגיל
    }
  }, [])

  useEffect(() => {
    const storedQuestions: StoredQuestion[] = questions.map((q) => ({
      id: q.id,
      text: q.text,
      options: q.options,
      selectedOptionId: answers[q.id],
    }))

    const state: QuizState = {
      currentIndex,
      finished,
      openAnswer,
      openAnswerTimestamp: Date.now(),
      questions: storedQuestions,
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [currentIndex, finished, answers, openAnswer])

  const current = questions[currentIndex]

  const handleSelect = (questionId: string, optionId: string) => {
    const updated = { ...answers, [questionId]: optionId }
    setAnswers(updated)

    if (currentIndex === questions.length - 1) {
      setFinished(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  return (
    <SectionWrapper
      id="quiz"
      title="משחקון קצר – רגעים שקובעים"
      eyebrow="דרך קלילה להתחבר לנושא"
    >
      {!finished && (
        <div className="quiz-card">
          <p className="quiz-progress">
            שאלה {currentIndex + 1} מתוך {questions.length}
          </p>
          <p className="quiz-question">{current.text}</p>
          <div className="quiz-options">
            {current.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className="quiz-option"
                onClick={() => handleSelect(current.id, opt.id)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
      {finished && (
        <div className="quiz-finish">
          <p>
            תודה שהקדשתם רגע לעצור ולחשוב דרך המשחקון הזה. אין כאן תשובות
            &quot;נכונות&quot; או &quot;לא נכונות&quot; – יש הזדמנות לראות איך אתם
            חושבים על נוכחות, על כאב ועל רגעים קטנים שנחרטים עמוק.
          </p>
          <p>
            אם תרצו, אפשר לחזור לשאלות בראש ולשאול: איפה זה פוגש אותי? איפה זה פגש
            את מי שאני אוהב או אוהבת?
          </p>
          <div className="quiz-open-question">
            <p className="quiz-question">
              ואם נעצור רגע בשבילך – איך את באמת מרגישה בתוך הקשר שלך? עד כמה יש שם
              ביטחון, חופש, אהבה ותמיכה, ומה בכל זאת עובד טוב בשבילך?
            </p>
            <textarea
              className="quiz-textarea"
              rows={5}
              value={openAnswer}
              onChange={(e) => {
                setOpenAnswer(e.target.value)
              }}
              placeholder="מוזמנת לכתוב כאן באופן חופשי לגמרי. התשובה נשארת אצלך, ורק אם תבחרי לשתף היא תישלח הלאה."
            />
            <div className="quiz-actions">
              <button
                type="button"
                className="primary-cta quiz-finish-button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                סיימתי את החידון 🙂
              </button>
            </div>
            <p className="quiz-note">
              כל הבחירות והתשובה הפתוחה נשמרות באופן מקומי בדפדפן שלך, כך שאפשר
              לחזור אליהן גם בהמשך.
            </p>
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}

