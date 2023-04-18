import { Link } from "react-router-dom"
import { HiOutlineDeviceMobile, HiOutlineViewGrid, HiOutlineEmojiHappy } from "react-icons/hi"
import dashboard from "../../assets/dashboard-mockup.webp"
import FeatureCard from "./FeatureCard"
import createGoogleUrl from "../../utils/createGoogleUrl"

const Landing = () => {
  const features = [
    { title: "Responsive", description: "Designed to be mobile-friendly, allowing you to report issues and track your tickets on the go.", icon: <HiOutlineDeviceMobile /> },
    { title: "Centralized", description: "Centralize all error tickets, making it easy for administrators to manage and resolve them.", icon: <HiOutlineViewGrid /> },
    { title: "User friendly", description: "Easy to navigate and use, making it simple for you to create and track your error tickets.", icon: <HiOutlineEmojiHappy /> }
  ]

  return (
    <div className="landing wrapper">
      <h1>Your solution is just a <span>ticket</span> away.</h1>
      <div className="sub">
        <p>Tired of struggling with technical errors on your own?</p>
        <p>Our error ticket management system is here to help!</p>
      </div>
      <Link to={createGoogleUrl()} className="solid">Start Ticketing</Link>
      <img src={dashboard} alt="application dashboard mockup" />
      <h2>Why should you choose our ticket management system?</h2>
      <section className="features">
        { features.map((feature, i) => <FeatureCard key={i} feature={feature} />)}
      </section>
    </div>
  )
}

export default Landing