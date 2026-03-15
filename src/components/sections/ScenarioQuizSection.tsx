import { useState } from 'react'
import { SectionWrapper } from '../shared/SectionWrapper'

type ScenarioOption = {
  id: string
  label: string
  explanation: string
}

type Scenario = {
  id: string
  scenario: string
  options: ScenarioOption[]
}

const scenarios: Scenario[] = [
  {
    id: 'sc1',
    scenario:
      'בת הזוג מתקשרת מהעבודה, קולה רועד. היא אומרת שהייתה שיחה קשה עם הבוס והיא מרגישה מושפלת. היא מבקשת "פשוט תקשיב לי שתי דקות". מה את/ה עושה?',
    options: [
      {
        id: 'a',
        label: 'מקשיב/ה שתי דקות ואז מציע/ה שתדבר עם הבוס או תחפשי עבודה אחרת',
        explanation:
          'הפתרונות חשובים, אבל לא בהתחלה. ברגע הראשון היא צריכה להרגיש שנשמעת – לא שמישהו "מתקן" את המצב. עדיף להקשיב, להכיר ברגש ("זה נשמע ממש קשה"), ורק אחר כך לשאול אם היא רוצה לחשוב יחד על צעדים.',
      },
      {
        id: 'b',
        label: 'מקשיב/ה בלי לקטוע, אומר/ת "אני איתך" ו"זה נשמע ממש קשה", ושואל/ת אם היא רוצה עוד רגע או משהו אחר',
        explanation:
          'זו תגובה שמעניקה נוכחות אמיתית: הקשבה, הכרה ברגש, ולא קפיצה לפתרונות. היא מרגישה שלא לבד – וזה מה שמביא הקלה ראשונית.',
      },
      {
        id: 'c',
        label: 'מרגיע/ה ואומר/ת "לא נורא, מחר תישכח מזה"',
        explanation:
          '"לא נורא" עלול להרגיש כמו ביטול של מה שהיא מרגישה. ברגע קשה אנשים צריכים שהרגש יקבל מקום – לא שיגידו להם שהוא לא משמעותי.',
      },
      {
        id: 'd',
        label: 'שואל/ת מיד מה בדיוק הבוס אמר ומה היא אמרה בחזרה',
        explanation:
          'פירוט העובדות יכול להרגיש כמו חקירה או כמו התמקדות ב"מי צודק". מה שעוזר קודם הוא להקשיב לרגש – איך היא מרגישה – ורק אחר כך לפרטים אם היא רוצה.',
      },
    ],
  },
  {
    id: 'sc2',
    scenario:
      'בן הזוג חוזר מנסיעה ארוכה, עייף ועצבני. כשאת שואלת איך היה, הוא עונה בקצרה ומתחיל להאשים "את לא מבינה בכלל מה עובר עליי". איך את מגיבה?',
    options: [
      {
        id: 'a',
        label: 'מגיבה בכעס: "אז תסביר לי פעם אחת מה את רוצה ממני"',
        explanation:
          'תגובה בכעס מחמירה את הריחוק. ברגע שהוא מרגיש לא מובן, מה שעוזר הוא דווקא לפתוח מקום – "אני רוצה להבין. מה עובר עליך?" – בלי להגן על עצמך קודם.',
      },
      {
        id: 'b',
        label: 'אומרת "אני רוצה להבין. ספר לי מה קרה ומה היית צריך שאעשה אחרת"',
        explanation:
          'לפתוח מקום להסבר בלי להתגונן – משדר שאכפת לך מהאדם ולא רק מהצדק. זה צעד שמאפשר שיחה אמיתית אחרי רגע קשה.',
      },
      {
        id: 'c',
        label: 'מתעלמת ומכינה אוכל או עוברת לעניין אחר',
        explanation:
          'התעלמות מחזקת את התחושה ש"לא מבינים אותי". עדיף גם משפט אחד: "אני רואה שקשה לך. תרצה לדבר – אני כאן."',
      },
      {
        id: 'd',
        label: 'מזכירה לו כמה את עושה בשבילו ושהוא לא תמיד מבין אותך',
        explanation:
          'השוואה והאשמות מגדילות את המרחק. ברגע קשה עדיף לתת מקום לרגש שלו קודם – ולדבר על הצרכים שלך בהמשך, כשיש רוגע.',
      },
    ],
  },
  {
    id: 'sc3',
    scenario:
      'באמצע הלילה בן הזוג מתעורר עם כאב ראש חזק. הוא מתקשר ואומר שהוא מרגיש רע. את/ה עייף/ה ויש עבודה מוקדם. מה את/ה עושה?',
    options: [
      {
        id: 'a',
        label: 'עונה, שומע דקה, ומציע/ה שיקח כדור וינסה לישון – "נדבר בבוקר"',
        explanation:
          'הוא ביקש נוכחות ברגע חולשה. "נדבר בבוקר" משאיר אותו לבד עם הכאב. גם כמה דקות של "אני על הקו איתך" או התקרבות פיזית משדרות שאכפת.',
      },
      {
        id: 'b',
        label: 'נשאר/ת על הקו או מתקרב/ת אליו, שואל/ת אם צריך משהו ומרגיע/ת "אני לא עוזב/ת"',
        explanation:
          'נוכחות אמיתית – גם בקול – ברגע של חולשה מעבירה מסר ברור: אתה לא לבד. זה מה שמביא הקלה ורוגע יותר מכל פתרון.',
      },
      {
        id: 'c',
        label: 'מציע/ה שיתקשר לרופא או למיון אם ממש גרוע',
        explanation:
          'בדיקה אם יש צורך רפואי דחוף חשובה – אבל אחרי שמראים נוכחות. הסדר: קודם "אני איתך", אחר כך "רוצה שאעזור למצוא עזרה?"',
      },
      {
        id: 'd',
        label: 'מבטיח/ה להתקשר בעוד עשר דקות "אחרי שאסיים משהו"',
        explanation:
          'דחייה גם של עשר דקות ברגע קשה מחזקת את התחושה ש"אני לא באמת חשוב עכשיו". עדיף לדחות משימות ולהיות זמין.',
      },
    ],
  },
  {
    id: 'sc4',
    scenario:
      'אחרי ריב, בת הזוג אומרת בכעס "אתה אף פעם לא שם כשאני צריכה". איך אתה מגיב?',
    options: [
      {
        id: 'a',
        label: '"זה לא נכון – הנה רשימה של פעמים שהייתי שם"',
        explanation:
          'הגנה עם "הוכחות" לא נותנת מקום לרגש שלה. מה שהיא צריכה לשמוע קודם: "אני רואה שזה מה שהרגשת. ספרי לי מתי הרגשת ככה."',
      },
      {
        id: 'b',
        label: '"אני מצטער שאת מרגישה ככה. תספרי לי מתי במיוחד הרגשת שלא הייתי שם – אני רוצה להבין"',
        explanation:
          'הכרה ברגש + פתיחת מקום לשיחה – בלי להתגונן. זה משדר שאכפת לך מהחוויה שלה ומאפשר דיאלוג אמיתי.',
      },
      {
        id: 'c',
        label: '"אם את תמיד תאשימי אותי ככה, אי אפשר לדבר"',
        explanation:
          'תגובה שמסיימת שיחה מגדילה בדידות. גם כשהכעס קשה – עדיף לשאול "מה את צריכה ממני עכשיו?" במקום לסגור.',
      },
      {
        id: 'd',
        label: '"את מגזימה, אנחנו תמיד מדברים"',
        explanation:
          '"את מגזימה" מוחק את החוויה שלה. מה שעוזר הוא לראות את הכאב: "זה נשמע קשה. אני רוצה להבין איך את מרגישה."',
      },
    ],
  },
]

export function ScenarioQuizSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<ScenarioOption | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)

  const current = scenarios[currentIndex]
  const isLast = currentIndex === scenarios.length - 1

  const handleSelect = (opt: ScenarioOption) => {
    setSelectedOption(opt)
    setShowExplanation(true)
  }

  const handleNext = () => {
    setSelectedOption(null)
    setShowExplanation(false)
    setCurrentIndex((prev) => (isLast ? 0 : prev + 1))
  }

  return (
    <SectionWrapper
      id="scenario-quiz"
      title="חידון תרחישים"
      eyebrow="בחר/י תגובה – וקבל/י הסבר קצר"
    >
      <p className="section-intro">
        בכל תרחיש בחר/י את התגובה שהכי מתאימה לך. אחרי הבחירה תוצג הסבר קצר – אין
        תשובה "נכונה" אחת, יש למידה.
      </p>
      <div className="scenario-quiz-card">
        <p className="quiz-progress">
          תרחיש {currentIndex + 1} מתוך {scenarios.length}
        </p>
        <p className="quiz-question scenario-text">{current.scenario}</p>

        {!showExplanation ? (
          <div className="quiz-options">
            {current.options.map((opt) => (
              <button
                key={opt.id}
                type="button"
                className="quiz-option"
                onClick={() => handleSelect(opt)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        ) : (
          <div className="quiz-explanation-card">
            <p className="quiz-explanation-label">הסבר:</p>
            <p className="quiz-explanation-text">
              {selectedOption?.explanation ?? ''}
            </p>
            <button type="button" className="primary-cta quiz-next-button" onClick={handleNext}>
              {isLast ? 'חזרה לתרחיש הראשון' : 'התרחיש הבא →'}
            </button>
          </div>
        )}
      </div>
    </SectionWrapper>
  )
}
