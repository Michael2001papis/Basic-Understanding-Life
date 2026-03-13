import { useState } from 'react'
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

export function QuizSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [finished, setFinished] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string>>({})

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
        </div>
      )}
    </SectionWrapper>
  )
}

