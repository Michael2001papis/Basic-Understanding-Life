import { useEffect, useMemo, useRef, useState } from 'react'
import { shuffle } from '../../utils/shuffle'
import { SectionWrapper } from '../shared/SectionWrapper'

type Option = {
  id: string
  label: string
  explanation: string
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
      {
        id: 'a',
        label: 'להסביר למה זה לא כזה נורא',
        explanation:
          'הסברים בשלב הראשון יכולים להרגיש כמו ביטול של מה שהצד השני מרגיש. ברגע קושי האדם צריך קודם להרגיש שמישהו רואה אותו.',
      },
      {
        id: 'b',
        label: 'לשאול שאלות ולנסות להבין מה קרה',
        explanation:
          'שאלות עדינות שמראות שאכפת לך עוזרות לאדם להרגיש שלא הוא לבד. הקשבה אמיתית היא צעד ראשון טוב לפני פתרונות.',
      },
      {
        id: 'c',
        label: 'להוכיח שלא הייתה כוונה לפגוע',
        explanation:
          'הכוונה חשובה, אבל ברגע של כאב הצד השני צריך קודם להרגיש שהכאב שלו נראה ומתקבל. ההסבר יכול לחכות.',
      },
      {
        id: 'd',
        label: 'להחליף נושא כדי לא להכביד',
        explanation:
          'החלפת נושא עלולה להשאיר את הצד השני עם תחושה שהקושי שלו לא מקום. לפעמים דווקא "להישאר בזה" מרגיע.',
      },
    ],
  },
  {
    id: 'q2',
    text: 'ברגע של מצוקה, מה האדם בדרך כלל מחפש יותר?',
    options: [
      {
        id: 'a',
        label: 'פתרון מהיר שיסגור את השיחה',
        explanation:
          'פתרונות חשובים בהמשך, אבל בתחילה רוב האנשים מחפשים בעיקר לא להיות לבד עם מה שקשה.',
      },
      {
        id: 'b',
        label: 'הרגשה שמישהו נשאר איתו והוא לא לבד',
        explanation:
          'נוכחות אמיתית – לדעת שמישהו איתך ולא עוזב – היא פעמים רבות מה שמביא הקלה ראשונית יותר מכל פתרון.',
      },
      {
        id: 'c',
        label: 'ניתוח הגיוני של המצב',
        explanation:
          'לוגיקה עוזרת אחר כך. ברגע של הצפה רגשית או חולשה גופנית, האדם צריך קודם להרגיש מוחזק ורק אחר כך לחשוב.',
      },
      {
        id: 'd',
        label: 'רשימה של מה הוא עשה לא נכון',
        explanation:
          'ביקורת ברגע קושי מגדילה בדידות. מה שעוזר הוא להרגיש שמישהו בצד שלך, לא שופט.',
      },
    ],
  },
  {
    id: 'q3',
    text: 'כשהכאב יוצא ככעס, מה יכול לעזור לראות מתחת לפני השטח?',
    options: [
      {
        id: 'a',
        label: 'את השאלה "מי צודק"',
        explanation:
          'מתמקדים בצדק מפספסים את הרגש. הכעס לרוב מכסה פחד, אכזבה או בדידות – וזה מה שכדאי לראות.',
      },
      {
        id: 'b',
        label: 'את הפחד, האכזבה והבדידות שמסתתרים מאחוריו',
        explanation:
          'כשאנחנו רואים את הרגש שמתחת לכעס, אפשר להגיב למה שבאמת כואב – וזה מביא הרבה פעמים לרוגע ולתקשורת טובה יותר.',
      },
      {
        id: 'c',
        label: 'את הטון בלבד',
        explanation:
          'הטון חשוב, אבל אם נעצרים רק בו אנחנו עלולים לפספס את המסר – מה האדם באמת צריך עכשיו.',
      },
      {
        id: 'd',
        label: 'רק את מה שנאמר במילים המדויקות',
        explanation:
          'המילים הן רק חלק מהתמונה. הרגש שמאחוריהן – הפחד, הכאב, הצורך בנוכחות – הוא מה שמנחה תגובה מיטיבה.',
      },
    ],
  },
  {
    id: 'q4',
    text: 'מה מבדיל בין טעות חד־פעמית לבין דפוס שחוזר על עצמו?',
    options: [
      {
        id: 'a',
        label: 'האם הצד הפגוע הגיב בשקט או בכעס',
        explanation:
          'התגובה של הצד הפגוע לא מגדירה אם זו טעות או דפוס. מה שמגדיר הוא האם חוויית הבדידות או הפגיעה חוזרת שוב ושוב.',
      },
      {
        id: 'b',
        label: 'האם חוויית הבדידות חוזרת שוב ושוב לאורך זמן',
        explanation:
          'כשאותה חוויה של "נשארתי לבד" חוזרת במצבים דומים, זה כבר דפוס. זיהוי שלו מאפשר לעבוד על שינוי אמיתי.',
      },
      {
        id: 'c',
        label: 'האם הייתה התנצלות אחת לפחות',
        explanation:
          'התנצלות חשובה אבל לא מספיקה להבחין בין טעות לדפוס. גם בדפוס יש לפעמים התנצלויות – השאלה היא האם משהו משתנה בהתנהגות.',
      },
      {
        id: 'd',
        label: 'האם קרה אירוע אחד בלבד',
        explanation:
          'אירוע אחד יכול להיות טעות. אבל אם האופן שבו הגבנו דומה לאופן שבו הגבנו בעבר במצוקה – ייתכן שיש דפוס.',
      },
    ],
  },
  {
    id: 'q5',
    text: 'מהי דרך טובה לסיים רגע קשה אחרי שנרגעים?',
    options: [
      {
        id: 'a',
        label: 'לא לדבר על זה יותר כדי "לא לפתוח שוב"',
        explanation:
          'להתעלם אחרי רגע קשה עלול להשאיר את הצד השני עם תחושה שהנושא לא נסגר. שיחה קצרה על מה עזר ומה יעזור בפעם הבאה מחזקת את הקשר.',
      },
      {
        id: 'b',
        label: 'לשאול מה הצד השני הרגיש ומה יעזור בפעם הבאה',
        explanation:
          'לשאול בכנות "מה הרגשת?" ו"מה יעזור בפעם הבאה?" מראה שאכפת ומאפשר ללמוד אחד מהשני – וזה בונה אמון ורוגע.',
      },
      {
        id: 'c',
        label: 'להדגיש שוב שלא הייתה כוונה רעה',
        explanation:
          'הכוונה כבר הוזכרה. בשלב הסיום עדיף לתת מקום לרגשות של הצד השני ולתוכניות משותפות להמשך.',
      },
      {
        id: 'd',
        label: 'להזכיר כמה דברים טובים אחרים בקשר',
        explanation:
          'דברים טובים חשובים, אבל אם לא נותנים מקום לרגע הקשה שנחתם, הצד הפגוע עלול להרגיש שהכאב שלו "נמחק" לפני שהתקבל.',
      },
    ],
  },
  {
    id: 'q6',
    text: 'בן או בת הזוג מתקשרים באמצע לילה ואומרים שהם מרגישים רע. מה הכי חשוב לעשות קודם?',
    options: [
      {
        id: 'a',
        label: 'להציע שידברו מחר כשכולם ערים',
        explanation:
          'דחייה ל"מחר" עלולה להרגיש כמו נטישה ברגע שהם הכי צריכים. גם כמה דקות של נוכחות עכשיו יכולות לשנות.',
      },
      {
        id: 'b',
        label: 'להישאר על הקו או להתקרב ולהיות איתם כמה שאפשר',
        explanation:
                          'במצוקה לילית האדם צריך בעיקר לדעת שהוא לא לבד. נוכחות – גם בקול – מעבירה את המסר שאכפת ואתה שם.',
      },
      {
        id: 'c',
        label: 'לשאול אם הם צריכים רופא או אמבולנס',
        explanation:
          'בדיקה אם יש צורך רפואי דחוף חשובה, אבל אחרי שמרגיעים ומראים נוכחות. הסדר חשוב: קודם "אני איתך", אחר כך פתרונות.',
      },
      {
        id: 'd',
        label: 'להגיד שתחזור אליהם כשתסיים משהו',
        explanation:
          'להשאיר אותם לבד "לזמן קצר" ברגע קשה מחזק את תחושת הבדידות. עדיף לדחות משימות ולהיות זמין.',
      },
    ],
  },
  {
    id: 'q7',
    text: 'איך עדיף להגיב כשהצד השני אומר "אתה לא מבין אותי"?',
    options: [
      {
        id: 'a',
        label: 'להסביר שאתה כן מבין ולפרט למה',
        explanation:
          'הסבר "אני מבין" עלול להישמע כמו התגוננות. לפעמים עדיף פשוט לשאול: "תגיד/י לי יותר, אני רוצה להבין."',
      },
      {
        id: 'b',
        label: 'לשאול "מה ייעזור לך שאבין יותר?" או "ספר/י לי"',
        explanation:
                          'לפתוח מקום להסבר במקום להגן – נותן לצד השני להרגיש שנשמעים. זה צעד שמחזק הבנה אמיתית.',
      },
      {
        id: 'c',
        label: 'להרגיע ולוודא שהכל יהיה בסדר',
        explanation:
                          '"הכל יהיה בסדר" עלול לסגור שיחה במקום לפתוח. מה שעוזר הוא להקשיב למה שבאמת קשה כרגע.',
      },
      {
        id: 'd',
        label: 'להזכיר פעמים שבהן כן הרגשת שמבינים',
        explanation:
                          'הזכרת הצלחות עבר יכול להרגיש כמו ביטול של מה שהם מרגישים עכשיו. עדיף להתמקד ברגע הנוכחי.',
      },
    ],
  },
  {
    id: 'q8',
    text: 'מה הכי חשוב לזכור כשבן או בת הזוג כועסים אחרי רגע של חולשה או מצוקה?',
    options: [
      {
        id: 'a',
        label: 'להגיב באותו כוח כדי שלא ינצחו',
        explanation:
                          'תגובה באותו כוח מחמירה בדרך כלל את המצב. מה שמביא רוגע הוא דווקא לא להיכנס למאבק ולתת מקום לרגש.',
      },
      {
        id: 'b',
        label: 'לזכור שהכעס לרוב מכסה פחד או כאב – ולשאול מה באמת קשה',
        explanation:
                          'כשאנחנו רואים את האדם שמאחורי הכעס ומזמינים אותו לדבר על מה שכואב – התקשורת משתנה והרוגע חוזר.',
      },
      {
        id: 'c',
        label: 'להסביר שוב שלא התכוונת לפגוע',
        explanation:
                          'הכוונה כבר ידועה. ברגע של כעס הצד השני צריך להרגיש שהכאב שלו נלקח ברצינות, לא עוד הסבר.',
      },
      {
        id: 'd',
        label: 'להמתין שהם יירגעו ורק אז לדבר',
        explanation:
                          'לפעמים הפסקה קצרה עוזרת, אבל להמתין בלי להראות שאכפת עלול להרגיש כמו נטישה. עדיף להציע: "אני כאן כשתרצה לדבר."',
      },
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
  quizStartTime?: number
  openAnswerTimestamp?: number
  questions: StoredQuestion[]
}

const STORAGE_KEY = 'quizState'
/** כתובת ל־mailto בלבד – לא להציג בממשק (עקרון 14.4: שמירת חוויית משתמש טבעית ואותנטית) */
const QUIZ_EMAIL = 'dvnka2@gmail.com'

function formatDuration(ms: number): string {
  const sec = Math.floor(ms / 1000)
  const min = Math.floor(sec / 60)
  if (min > 0) return `${min} דקות ו־${sec % 60} שניות`
  return `${sec} שניות`
}

function buildEmailBody(answers: Record<string, string>, openAnswer: string, startTime?: number): string {
  const lines: string[] = ['תוצאות משחקון – להיות שם באמת', '', '--- תשובות ---']
  questions.forEach((q) => {
    const optId = answers[q.id]
    const opt = q.options.find((o) => o.id === optId)
    lines.push(`שאלה: ${q.text}`)
    lines.push(`תשובה: ${opt ? opt.label : '-'}`)
    lines.push('')
  })
  if (startTime) {
    const duration = Date.now() - startTime
    lines.push(`זמן מילוי: ${formatDuration(duration)}`)
    lines.push('')
  }
  if (openAnswer.trim()) {
    lines.push('--- תשובה פתוחה ---')
    lines.push(openAnswer.trim())
  }
  return lines.join('\n')
}

export function QuizSection() {
  const [shuffleKey, setShuffleKey] = useState(0)
  const shuffledQuestions = useMemo(
    () =>
      questions.map((q) => ({
        ...q,
        options: shuffle([...q.options]),
      })),
    [shuffleKey],
  )

  const [currentIndex, setCurrentIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})
  const [openAnswer, setOpenAnswer] = useState('')
  const [showExplanation, setShowExplanation] = useState<string | null>(null)
  const [lastSelectedOption, setLastSelectedOption] = useState<Option | null>(null)
  const [emailThankYou, setEmailThankYou] = useState(false)
  const quizStartTimeRef = useRef<number | null>(null)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as Partial<QuizState> & { answers?: Record<string, string> }
      const restoredAnswers: Record<string, string> = {}
      if (parsed.questions && Array.isArray(parsed.questions)) {
        parsed.questions.forEach((q) => {
          if (q && q.id && q.selectedOptionId) restoredAnswers[q.id] = q.selectedOptionId
        })
      } else if (parsed.answers) {
        Object.assign(restoredAnswers, parsed.answers)
      }
      if (typeof parsed.currentIndex === 'number') setCurrentIndex(parsed.currentIndex)
      if (typeof parsed.finished === 'boolean') setFinished(parsed.finished)
      if (parsed.openAnswer) setOpenAnswer(parsed.openAnswer)
      if (typeof parsed.quizStartTime === 'number') quizStartTimeRef.current = parsed.quizStartTime
      if (Object.keys(restoredAnswers).length > 0) setAnswers(restoredAnswers)
    } catch {
      // ignore invalid storage
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
      quizStartTime: quizStartTimeRef.current ?? undefined,
      openAnswerTimestamp: Date.now(),
      questions: storedQuestions,
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [currentIndex, finished, answers, openAnswer])

  const current = shuffledQuestions[currentIndex]

  const handleSelect = (questionId: string, option: Option) => {
    if (quizStartTimeRef.current === null) quizStartTimeRef.current = Date.now()
    const updated = { ...answers, [questionId]: option.id }
    setAnswers(updated)
    setLastSelectedOption(option)
    setShowExplanation(option.id)
  }

  const handleNextAfterExplanation = () => {
    setShowExplanation(null)
    setLastSelectedOption(null)
    if (currentIndex === questions.length - 1) {
      setFinished(true)
    } else {
      setCurrentIndex((prev) => prev + 1)
    }
  }

  const handleBackToPrevious = () => {
    setShowExplanation(null)
    setLastSelectedOption(null)
    setCurrentIndex((prev) => Math.max(0, prev - 1))
  }

  const handleResetQuiz = () => {
    window.localStorage.removeItem(STORAGE_KEY)
    quizStartTimeRef.current = null
    setCurrentIndex(0)
    setFinished(false)
    setAnswers({})
    setOpenAnswer('')
    setShowExplanation(null)
    setLastSelectedOption(null)
    setEmailThankYou(false)
    setShuffleKey((k) => k + 1)
  }

  const handleSendEmail = () => {
    const startTime = quizStartTimeRef.current ?? 0
    const body = buildEmailBody(answers, openAnswer, startTime)
    const subject = encodeURIComponent('תוצאות משחקון – להיות שם באמת')
    const bodyEnc = encodeURIComponent(body)
    window.open(`mailto:${QUIZ_EMAIL}?subject=${subject}&body=${bodyEnc}`, '_blank', 'noopener,noreferrer')
    setEmailThankYou(true)
  }

  const showQuestion = !finished && !showExplanation

  return (
    <SectionWrapper
      id="quiz"
      title="משחקון קצר – רגעים שקובעים"
      eyebrow="דרך קלילה להתחבר לנושא"
    >
      {showQuestion && (
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
                onClick={() => handleSelect(current.id, opt)}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="quiz-nav-actions">
            {currentIndex > 0 && (
              <button
                type="button"
                className="secondary-cta quiz-back-button"
                onClick={handleBackToPrevious}
              >
                ← חזרה לשאלה קודמת
              </button>
            )}
            <button
              type="button"
              className="quiz-reset-button"
              onClick={handleResetQuiz}
            >
              איפוס החידון
            </button>
          </div>
        </div>
      )}

      {showExplanation && lastSelectedOption && (
        <div className="quiz-card quiz-explanation-card">
          <p className="quiz-explanation-label">הסבר קצר:</p>
          <p className="quiz-explanation-text">{lastSelectedOption.explanation}</p>
          <div className="quiz-explanation-actions">
            {currentIndex > 0 && (
              <button
                type="button"
                className="secondary-cta quiz-back-button"
                onClick={handleBackToPrevious}
              >
                ← חזרה לשאלה קודמת
              </button>
            )}
            <button
              type="button"
              className="primary-cta quiz-next-button"
              onClick={handleNextAfterExplanation}
            >
              {currentIndex === questions.length - 1 ? 'לסיום החידון' : 'השאלה הבאה →'}
            </button>
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
              onChange={(e) => setOpenAnswer(e.target.value)}
              placeholder="מוזמנת לכתוב כאן באופן חופשי לגמרי. התשובה נשארת אצלך, ורק אם תבחרי לשתף היא תישלח הלאה."
            />
            <div className="quiz-actions">
              <button
                type="button"
                className="primary-cta quiz-finish-button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                סיימתי את החידון 🙂
              </button>
              <button
                type="button"
                className="secondary-cta"
                onClick={handleSendEmail}
                disabled={emailThankYou}
              >
                {emailThankYou ? 'תודה ששיתפת!' : 'שלח/י תוצאות למייל'}
              </button>
              <button
                type="button"
                className="quiz-reset-button"
                onClick={handleResetQuiz}
              >
                איפוס החידון
              </button>
            </div>
            {emailThankYou && (
              <p className="quiz-thank-you-msg">
                תודה! חלון המייל נפתח – אם תרצי לשלוח, לחצי שליחה באפליקציית הדוא"ל.
              </p>
            )}
            <p className="quiz-note">
              כל הבחירות והתשובה הפתוחה נשמרות באופן מקומי בדפדפן שלך. שליחת
              התוצאות למייל פותחת את אפליקציית הדוא"ל עם הנתונים – השליחה בידייך.
            </p>
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}
