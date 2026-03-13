import { QuoteBlock } from '../shared/QuoteBlock'

export function HeroSection() {
  const handleScrollDown = () => {
    const next = document.getElementById('intro')
    if (!next) return
    next.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <section id="hero" className="hero-section">
      <div className="hero-inner">
        <div className="hero-text">
          <p className="hero-eyebrow">נוכחות ברגעים פיזיים ורגשיים קשים</p>
          <h1>איך להיות שם באמת כשקשה לבן או בת הזוג</h1>
          <p className="hero-subtitle">
            האתר הזה נועד לעשות סדר ברגעים שבהם אדם שאוהבים חווה כאב, חולשה או הצפה
            רגשית – ולהסביר מהי נוכחות אמיתית, מה בני זוג מפספסים לפעמים, ואיך אפשר
            להגיב בצורה בוגרת, מחבקת ומבינה.
          </p>
          <QuoteBlock>
            אדם לא תמיד יזכור מה אמרתם – אבל כמעט תמיד יזכור איך הרגיש לידכם כשהיה
            חלש.
          </QuoteBlock>
          <div className="hero-actions">
            <button type="button" className="primary-cta" onClick={handleScrollDown}>
              המשיכו לקרוא פנימה
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

