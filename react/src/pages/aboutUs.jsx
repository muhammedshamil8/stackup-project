import bgImage from '../images/about.jpg'
import {useOutletContext} from "react-router-dom";

export default function AboutUS() {
  const [darkMode] = useOutletContext();

    return (
      <div className='about-page'>
         
  <div class="container1">
    <img src={bgImage} className='about-image'/>
    <h1 >About Us</h1>

  </div>
  <div class="about-content">
    <h2>Our Team</h2>
    <h3>
      We are a team of passionate developers and designers who are dedicated to building the best task management app on
      the market. We believe that everyone deserves to be able to work more efficiently and effectively, and our app is
      designed to help you do just that.
      Our team is the heart and soul of our App. . We come from a variety of backgrounds and experiences, but we share a
      common vision for the future.
    </h3>
    <h2>
      Our Culture
    </h2>
    <h3>
      At Index, we value collaboration, creativity, and innovation. We believe that the best ideas come from when people
      from different backgrounds come together and share their perspectives. We foster a culture of open communication
      and feedback, and we encourage our team members to take risks and learn from their mistakes.
      We are constantly adding new features and improvements to our app, and we are committed to providing our users
      with the best possible experience.
    </h3>
  </div>
      </div>
    );
  }
  