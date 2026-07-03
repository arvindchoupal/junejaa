export const navItems = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Services", href: "/services" },
  { label: "Packages", href: "/packages" },
  { label: "Booking", href: "/booking" },
];

export const proofPoints = [
  { icon: "spark", label: "5+ Years Experience" },
  { icon: "heart", label: "11,000+ Clients" },
  { icon: "lamp", label: "Psychology Background" },
  { icon: "shield", label: "Confidential Space" },
];

// Compatibility for stale deployment artifacts that still import the former
// dedicated testimonials page. Live testimonials come from the API.
export const testimonials: Array<{
  clientName: string;
  clientCountry: string;
  rating: number;
  testimonial: string;
}> = [];




export const adminCredentials = {
  email: "aaliyahjuneja1@gmail.com",
  password: "123123",
};
