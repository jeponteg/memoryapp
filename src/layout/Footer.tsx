import { FC } from "react"

const Footer: FC = () => {
  return (
    <div className="h-16 bg-col bg-gray-900 flex items-center justify-center">
      <span className="text-white">
        By Javier Ponte
        <a
          href="https://www.linkedin.com/in/javier-ponte-gonz%C3%A1lez-67a6a7147/"
          target="_blank"
        >
          Linkedin
        </a>
      </span>
    </div>
  )
}

export default Footer