import '../componentsCSS/features.css'

const About = () => {


  return (
    <div>
      <h2>What does DonateEasy serves?</h2>
      <div class="timeline">
        <div class="timeline__event  animated fadeInUp delay-3s timeline__event--type1">
          <div class="timeline__event__icon ">
            <i class="lni-cake"></i>

          </div>
          <div class="timeline__event__date">
            <i class="fa-solid fa-house-user"></i>
          </div>
          <div class="timeline__event__content ">
            <div class="timeline__event__title">
              Disaster Relief Fund
            </div>
            <div class="timeline__event__description">
              <p>Our Disaster Relief Fund enables direct contributions from compassionate individuals to support communities affected by natural calamities. Donors can make monetary contributions that go towards providing essential aid, including food, shelter, medical assistance, and rehabilitation efforts for those impacted by disasters.</p>
            </div>
          </div>
        </div>
        <div class="timeline__event animated fadeInUp delay-2s timeline__event--type2">
          <div class="timeline__event__icon">
            <i class="lni-burger"></i>

          </div>
          <div class="timeline__event__date">
            <i class="fa-solid fa-bowl-food"></i>
          </div>
          <div class="timeline__event__content">
            <div class="timeline__event__title">
              Food Redistribution Initiative
            </div>
            <div class="timeline__event__description">
              <p>Through our Food Redistribution Initiative, we combat food waste by connecting donors with surplus or unused food to individuals and communities facing hunger. By facilitating the redistribution of excess food, we aim to minimize food wastage while addressing food insecurity among vulnerable populations</p>
            </div>
          </div>
        </div>
        <div class="timeline__event animated fadeInUp delay-1s timeline__event--type3">
          <div class="timeline__event__icon">
            <i class="lni-slim"></i>

          </div>
          <div class="timeline__event__date">
            <i class="fa-solid fa-car"></i>
          </div>
          <div class="timeline__event__content">
            <div class="timeline__event__title">
              Neighbourly Support Mediation
            </div>
            <div class="timeline__event__description">
              <p>Acting as a mediator, our platform connects donors with individuals in need, facilitating direct assistance to those facing various challenges. Whether it's matching donors with resources or connecting individuals with specific needs, we bridge the gap between generosity and necessity, promoting a culture of neighborly support within communities.</p>
            </div>

          </div>
        </div>
        <div class="timeline__event animated fadeInUp timeline__event--type1">
          <div class="timeline__event__icon">
            <i class="lni-cake"></i>

          </div>
          <div class="timeline__event__date">
            <i class="fa-solid fa-pen-nib"></i>
          </div>
          <div class="timeline__event__content">
            <div class="timeline__event__title">
              Impactful Collaboration Platform
            </div>
            <div class="timeline__event__description">
              <p>Our Impactful Collaboration Platform serves as a centralized hub for individuals, businesses, and organizations to collaborate in support of humanitarian causes. By fostering partnerships and mobilizing resources, we empower stakeholders to make a tangible difference in the lives of those in need, amplifying our collective impact and creating lasting solutions to societal challenges.</p>
            </div>
          </div>
        </div>

      </div></div>
  )
}

export default About