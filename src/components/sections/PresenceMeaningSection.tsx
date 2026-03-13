import { SectionWrapper } from '../shared/SectionWrapper'
import { QuoteBlock } from '../shared/QuoteBlock'

export function PresenceMeaningSection() {
  return (
    <SectionWrapper
      id="presence"
      title="מה באמת אומרת נוכחות בזוגיות"
      eyebrow="נוכחות היא פעולה – לא רק משפט"
    >
      <p>
        הרבה פעמים אנחנו אומרים &quot;אני כאן&quot; ומתכוונים לזה מכל הלב. אבל ברגעים
        שבהם לצד השני כואב, פיזית או רגשית, המבחן הוא לא רק במילים אלא בחוויה שהוא
        יוצא איתה מהשיחה: האם הרגיש מוחזק, עדיפות, לא לבד – או שהוא נשאר עם תחושה
        ש&quot;הייתי לעצמי&quot;.
      </p>
      <p>
        נוכחות בזוגיות ברגעי קושי היא שילוב של קשב, שהייה, חזרה לבדוק מה קורה,
        נכונות לעצור דברים אחרים, והבנה שדווקא עכשיו – כשהגוף חלש או הלב מוצף –
        זה הרגע שבו אהבה נמדדת.
      </p>
      <QuoteBlock>
        לא מספיק להגיד &quot;אני פה בשבילך&quot; – צריך שגם הגוף, הזמן והקשב יגידו את
        אותו הדבר.
      </QuoteBlock>
    </SectionWrapper>
  )
}

