function AboutSection(){
     return (

      <section className="over-ons mb-170">
        <div className="wrapper">
          <div className="inner-part">
            <div className="left-part">
              <img src="http://localhost/wordpresswebshop/wp-content/themes/wordpresswebshop/images/overons-img.png" alt="over-ons" />
            </div>
            <div className="right-part">
              <div className="sub-title">Over Ons</div>
              <h2>Wie zijn wij?</h2>
              <p>WordPressWebshop.nl is een gespecialiseerd WordPress bureau met één doel: jouw webshop laten
                groeien. We werken al meer dan 10 jaar met ondernemers door heel Nederland — van startende
                zzp'ers tot gevestigde mkb-bedrijven.
              </p>
              <p>Wij geloven in transparante communicatie, heldere afspraken en een eindresultaat waar je trots op
                bent. Geen verrassingen achteraf, geen verborgen kosten. Gewoon een webshop die werkt.</p>
              <div className="btn-flx">
                <a href="#" className="btn_one">
                  Leer ons beter kennen
                  <span className="arrow">
                    <svg width={21} height={21} viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className="arrow-fill" d="M0.898589 19.5366L19.5366 0.898561M19.5366 10.2176V0.898561H10.2176" stroke="#1A5C38" strokeWidth="1.79715" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
}

export default AboutSection;

