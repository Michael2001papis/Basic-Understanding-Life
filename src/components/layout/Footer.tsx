export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-name">להיות שם באמת</span>
          <span className="footer-tagline">אהבה שנמדדת ברגעים הלא נוחים</span>
          <span className="footer-dev-signature">Built by Michael Papismedov – MP</span>
        </div>
        <div className="footer-meta">
          <span>© {new Date().getFullYear()}</span>
          <span>כל הזכויות שמורות</span>
        </div>
      </div>
      <div className="footer-personal-message">
        <p>
          לא משנה מה יקרה בדרך, דבר אחד תמיד יישאר קבוע. אני לעולם לא אפסיק לאהוב את בת
          הזוג שלי – צוצו שלי. האהבה שלי אליה אמיתית, עמוקה ונצחית.
        </p>
      </div>
    </footer>
  )
}

