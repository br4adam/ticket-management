import { FC } from "react"

type Props = {
  feature: {
    title: string,
    description: string,
    icon: JSX.Element
  }
}

const FeatureCard: FC<Props> = ({ feature }) => {
  return (
    <div className="feature-card">
      <div className="icon">{ feature.icon }</div>
      <p>{ feature.title }</p>
      <p>{ feature.description }</p>
    </div>
  )
}

export default FeatureCard