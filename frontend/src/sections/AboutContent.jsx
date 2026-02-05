import "./AboutContent.css";

export default function AboutContent() {
  return (
    <section className="about-hero" id="about">
      <div className="about-container">

        {/* HEADING */}
        <div className="about-header">
          <h2>About Classic Tailor</h2>
          <p>
            Serving NG Halli with craftsmanship, trust, and perfect fits for over
            three decades.
          </p>
        </div>

        {/* CONTENT */}
        <div className="about-cards">

          {/* NAGARAJ */}
          <div className="about-card">
            <h3>Nagaraj</h3>
            <span className="experience">30+ Years of Experience</span>
            <p>
              Nagaraj is a master tailor specializing in pant stitching and
              precision fitting. With over 30 years of hands-on experience, his
              work is known for durability, comfort, and a flawless finish.
            </p>
          </div>

          {/* LATHA */}
          <div className="about-card">
            <h3>Latha</h3>
            <span className="experience">15+ Years of Experience</span>
            <p>
              Latha is an expert in shirt stitching, known for elegant cuts and
              perfect measurements. With 15 years of experience, she ensures
              every shirt reflects comfort and refined style.
            </p>
          </div>

        </div>

        {/* FOOTER TEXT */}
        <div className="about-footer">
          <p>
            Classic Tailor has proudly served customers in <strong>NG Halli</strong> for
            nearly <strong>30 years</strong>, building long-term relationships through
            quality craftsmanship and personalized service.
          </p>
        </div>

      </div>
    </section>
  );
}
