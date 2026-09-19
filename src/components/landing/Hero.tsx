import { Link } from 'react-router-dom'
import HeroCarousel from './HeroCarousel'

export default function Hero() {
  return (
    <section
      id="index"
      className="flex flex-col md:gap-2 items-center justify-center relative"
    >
      <div className=" flex flex-col gap-1 md:gap-3 md:flex-row items-center justify-center max-w-3xl md:-ml-34">
        <p className="text-xs md:max-w-66 text-center md:text-start">
          Your trusted market place for every skills/service - from local
          services to digital expertise.
        </p>
        <p className="text-xl sm:text-2xl lg:text-3xl font-medium shrink-0">
          Find the <span className="text-primary">right skills</span>. Connect
        </p>
      </div>
      <div className="flex flex-col gap-1 md:gap-5 md:flex-row items-center justify-center max-w-md md:-mr-42">
        <p className="text-xl sm:text-2xl lg:text-3xl font-medium shrink-0">
          Get it <span className="text-primary">done</span>.
        </p>
        <p className="text-xs  text-center md:text-start">
          Connect with verified professionals, showcase your work and pay
          securely - all in one platform.
        </p>
      </div>
      <div className="flex items-center gap-4 mt-6">
        <Link
          to="/sign-up"
          className="w-32 text-sm py-2 rounded-md bg-primary text-white hover:bg-primary/90 hover:shadow-sm cursor-pointer text-center"
        >
          Get Started
        </Link>
        <Link
          to="/sign-in"
          className="w-32 text-sm py-2 rounded-md text-primary border border-primary cursor-pointer hover:bg-white hover:border-white hover:shadow-sm text-center"
        >
          Sign In
        </Link>
      </div>
      <HeroCarousel />
    </section>
  )
}
