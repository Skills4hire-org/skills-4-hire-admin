import about from '../../assets/images/about.jpg'

export default function About() {
  return (
    <section
      id="about"
      className="md:grid gap-4 md:gap-10 lg:gap-20 md:grid-cols-3 place-items-center space-y-6"
    >
      <div className="space-y-4 md:space-y-5 col-span-2 ">
        <div className="space-y-2 md:space-y-3">
          <span className="text-xs md:text-sm bg-muted px-3 py-0.5 rounded-full font-medium w-max block ">
            About us
          </span>
          <h2 className="text-2xl md:text-4xl font-bold">Who are we?</h2>
        </div>
        <p className="text-sm md:text-base">
          We are Skills4Hire, a trusted platform built to connect people who
          need services with the skilled professionals who can deliver them.
          From vocational experts like plumbers, electricians, and cleaners to
          digital freelancers like designers, developers, and marketers, we
          bring every skill into one accessible ecosystem.
        </p>
      </div>
      <figure className="w-full h-96 rounded-3xl bg-gray-300 overflow-hidden">
        <img
          src={about}
          alt={about}
          className="w-full h-full object-cover object-top aspect-4/5"
        />
      </figure>
    </section>
  )
}
