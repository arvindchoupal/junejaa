"use client";

import { useState } from "react";
import { Icon } from "./Icon";
import type { PublicTestimonial } from "@/lib/liveData";

export function TestimonialsCarousel({ testimonials }: { testimonials: PublicTestimonial[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = testimonials[activeIndex];
  const showControls = testimonials.length > 1;

  function move(direction: number) {
    setActiveIndex((current) => (current + direction + testimonials.length) % testimonials.length);
  }

  return (
    <section className="kind-words" id="testimonials" aria-label="Client testimonials">
      <span className="botanical left" aria-hidden="true"><Icon name="leaf" /></span>
      <span className="botanical right" aria-hidden="true"><Icon name="leaf" /></span>
      <h2>Kind Words From Clients Around The World</h2>
      <div className="divider">✦</div>
      {showControls ? <button className="testimonial-previous" type="button" aria-label="Previous testimonial" onClick={() => move(-1)}>‹</button> : null}
      <blockquote aria-live="polite">
        <span>“</span>
        {active.testimonial}
        <span>”</span>
      </blockquote>
      <div className="stars" aria-label={`${active.rating} out of 5 stars`}>{"★".repeat(active.rating)}</div>
      <p>– {active.clientName}{active.clientCountry ? `, ${active.clientCountry}` : ""}</p>
      {showControls ? <button className="testimonial-next" type="button" aria-label="Next testimonial" onClick={() => move(1)}>›</button> : null}
    </section>
  );
}
