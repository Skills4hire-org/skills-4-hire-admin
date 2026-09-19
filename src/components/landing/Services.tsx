import SectionTitle from '../global/SectionTitle'
import ServicesCarousel from './ServicesCarousel'

export default function Services() {
  return (
    <section id="services" className="space-y-16">
      <SectionTitle
        title1="our"
        title2="services"
        desc="Skills4Hire brings together a variety of services, from trusted home repairs to modern digital solutions. Whatever your need, our providers are ready to deliver."
      />
      <ServicesCarousel />
    </section>
  )
}
