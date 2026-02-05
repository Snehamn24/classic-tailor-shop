import "./FAQ.css";

export default function FAQ() {
  return (
    <section className="faq-section" id="faq">
      <div className="faq-container">

        <div className="faq-header">
          <span className="faq-subtitle">Need Help?</span>
          <h2 className="faq-title">Frequently Asked Questions</h2>
          <p className="faq-desc">
            Everything you need to know about our tailoring services.
          </p>
        </div>

        <div className="faq-list">

          <details className="faq-item">
            <summary className="faq-question">
              How long does stitching take?
            </summary>
            <p className="faq-answer">
              Typically 3–5 working days depending on the design and fabric.
            </p>
          </details>

          <details className="faq-item">
            <summary className="faq-question">
              Do you offer free alterations?
            </summary>
            <p className="faq-answer">
              No, free alterations are not available.
            </p>
          </details>

          <details className="faq-item">
            <summary className="faq-question">
              Can I bring my own fabric?
            </summary>
            <p className="faq-answer">
              Absolutely. You can bring your own fabric and choose your design.
            </p>
          </details>

          <details className="faq-item">
            <summary className="faq-question">
              Do you stitch uniforms or bulk orders?
            </summary>
            <p className="faq-answer">
              Yes, we accept bulk orders for uniforms, offices, and events.
            </p>
          </details>

        </div>
      </div>
    </section>
  );
}
