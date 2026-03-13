import { SectionWrapper } from '../shared/SectionWrapper'

export function ContactSection() {
  return (
    <SectionWrapper
      id="contact"
      title="רוצים לשתף מחשבה?"
      eyebrow="לא למכירה – רק מקום לשיקוף רגשי"
    >
      <p>
        אם תרצו, תוכלו לכתוב כאן בקצרה מה נגע בכם, מה למדתם, או איזה רגע מהחיים שלכם
        עלה במהלך הקריאה. התוכן לא מיועד לפרסום, אלא כהזדמנות לסכם לעצמכם מה לקחתם
        מפה.
      </p>
      <form className="contact-form">
        <div className="form-row">
          <label htmlFor="role">מאיזה מקום אתם קוראים?</label>
          <select id="role" name="role">
            <option value="">בחרו אפשרות</option>
            <option value="hurt">אני בעיקר הצד שנפגע ברגעים כאלה</option>
            <option value="partner">אני בעיקר הצד שלא תמיד מבין מה עשיתי לא נכון</option>
            <option value="curious">אני פשוט רוצה זוגיות בריאה יותר</option>
          </select>
        </div>
        <div className="form-row">
          <label htmlFor="message">מה הכי נגע בכם או מה תרצו לזכור מפה?</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            placeholder="מוזמנים לכתוב באופן חופשי. אין תשובה נכונה או לא נכונה."
          />
        </div>
        <button type="submit" className="secondary-cta">
          שמירה לעצמי
        </button>
      </form>
    </SectionWrapper>
  )
}

