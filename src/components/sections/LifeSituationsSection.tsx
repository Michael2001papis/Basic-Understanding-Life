import { SectionWrapper } from '../shared/SectionWrapper'
import { QuoteBlock } from '../shared/QuoteBlock'

type Situation = {
  id: string
  title: string
  situation: string
  whatHurtPersonFeels: string
  wrongResponses: string[]
  correctResponse: string
}

const situations: Situation[] = [
  {
    id: 's1',
    title: 'שיחה באמצע הלילה',
    situation:
      'בן או בת הזוג מתעוררים עם מיגרנה או בחילה חזקה ומתקשרים בשעה 02:00. הצד השני עונה, שומע כמה דקות, ואז אומר "תנסי לישון, דברי איתי בבוקר".',
    whatHurtPersonFeels:
      'בדיוק ברגע שהגוף והראש הכי חלשים, נשארים לבד. התחושה ש"הוא/היא רצו לחזור לישון" חזקה יותר מהמילים "אני איתך".',
    wrongResponses: [
      '"תנסי לישון, דברי איתי בבוקר"',
      '"תקחי כדור ותשתדלי להירדם"',
      '"אין מה לעשות עכשיו, נדבר מחר"',
    ],
    correctResponse:
      'להישאר על הקו או להתקרב פיזית. "אני לא עוזב/ת, אני איתך. רוצה שאשאר על הקו עד שתרגישי יותר טוב?" – נוכחות אמיתית משדרת שאכפת יותר מכל פתרון.',
  },
  {
    id: 's2',
    title: 'רגע של התקף חרדה',
    situation:
      'בת או בן הזוג מתקשרים אחרי אירוע מלחיץ (נסיעה, ריב עם מישהו, חדשות קשות) ומבקשים "פשוט תקשיב/י לי דקה". הצד השני מקשיב דקה, ואז מתחיל להציע פתרונות ולהסביר למה "זה לא כזה נורא".',
    whatHurtPersonFeels:
      'הרגשה שלא באמת רואים אותי – שהמטרה הייתה "לסגור" את הרגש ולא להיות איתי בתוכו. הבדידות גוברת דווקא כי מישהו היה שם אבל "עזב" לתוך ההסברים.',
    wrongResponses: [
      '"זה לא כזה נורא, תראי שזה יסתדר"',
      '"אתה תמיד מגזים עם הדאגות"',
      '"בואי נחשוב איך לפתור את זה" (מיד)',
    ],
    correctResponse:
      '"אני איתך. ספר/י לי עוד – איך את/ה מרגיש/ה עכשיו?" להשאיר מקום לרגש בלי לקפוץ לפתרונות. רק אחרי שהצד השני מרגיש שנשמע – אפשר בעדינות להציע כיווני פעולה.',
  },
  {
    id: 's3',
    title: 'אחרי ויכוח – "אתה לא מבין אותי"',
    situation:
      'אחרי ריב, אחד הצדדים אומר "אתה לא מבין אותי בכלל". הצד השני מגיב: "אני כן מבין! הרי אמרתי ש…" ומתחיל להסביר שוב את העמדה שלו.',
    whatHurtPersonFeels:
      'הכאב לא קיבל מקום. במקום "תגיד/י לי מה לא הבנתי" – השיחה חוזרת להסברים. התחושה ששוב לא נשמעים.',
    wrongResponses: [
      '"אני כן מבין, אתה פשוט לא מקשיב"',
      '"אז תסביר/י לי פעם אחת ולתמיד" (בטון מגונן)',
      '"נמאס מהדרמות האלה"',
    ],
    correctResponse:
      '"אני רוצה להבין. תגיד/י לי – מה היית/ה צריכ/ה שאשמע ולא שמעתי?" לפתוח מקום להסבר במקום להגן. זה משדר שהאדם חשוב יותר מהצדק.',
  },
  {
    id: 's4',
    title: 'כשהכאב יוצא ככעס',
    situation:
      'אחד הצדדים מרגיש שננטש ברגע קשה (שיחה שנקטעה, הבטחה שלא קוימה). במקום לבכות או להסביר – הוא/היא מתחילים לצעוק או להאשים.',
    whatHurtPersonFeels:
      'מתחת לכעס יש פחד, אכזבה ובדידות. הצד שצועק לפעמים הכי מפחד שלא יראו אותו – ולכן מגיב בעוצמה.',
    wrongResponses: [
      '"אל תצעק/י עליי"',
      '"אם תמשיך/י ככה אני לא מדבר/ת"',
      '"אתה מגזים, לא קרה כלום"',
    ],
    correctResponse:
      '"אני רואה שאת/ה כועס/ת וזה קשה. מה באמת כואב לך עכשיו? אני כאן." לראות את האדם שמאחורי הכעס ולתת מקום לרגש – מביא לרוב לרוגע ולדיבור אחר.',
  },
]

export function LifeSituationsSection() {
  return (
    <SectionWrapper
      id="life-situations"
      title="סיטואציות מהחיים"
      eyebrow="מצבים אמיתיים – ואיך להגיב נכון"
    >
      <p className="section-intro">
        הנה כמה מצבים שמתרחשים במערכות יחסים. כל סיטואציה מראה מה האדם הפגוע מרגיש,
        מה בדרך כלל לא עוזר – ומה כן מביא רגיעה והבנה.
      </p>
      <div className="situations-list">
        {situations.map((sit) => (
          <article key={sit.id} className="situation-card">
            <h3 className="situation-title">{sit.title}</h3>
            <p className="situation-desc">{sit.situation}</p>
            <div className="situation-block situation-feels">
              <h4 className="situation-block-title">מה האדם הפגוע מרגיש</h4>
              <p>{sit.whatHurtPersonFeels}</p>
            </div>
            <div className="situation-block situation-wrong">
              <h4 className="situation-block-title">תגובות שלא עוזרות</h4>
              <ul>
                {sit.wrongResponses.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <QuoteBlock>
              <strong>תגובה שמביאה רגיעה:</strong> {sit.correctResponse}
            </QuoteBlock>
          </article>
        ))}
      </div>
    </SectionWrapper>
  )
}
