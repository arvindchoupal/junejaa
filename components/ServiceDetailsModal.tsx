"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Icon } from "@/components/Icon";
import type { PublicService } from "@/lib/liveData";

export function ServiceDetailsModal({
  service,
  onClose,
}: {
  service: PublicService;
  onClose: () => void;
}) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [onClose]);

  return (
    <div
      className="service-modal-backdrop"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
      role="presentation"
    >
      <section
        aria-labelledby={`service-modal-title-${service.id}`}
        aria-modal="true"
        className="service-modal"
        role="dialog"
      >
        <button
          aria-label="Close service details"
          className="service-modal-close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <header className="service-modal-header">
          <span className="service-icon">
            <Icon name={service.icon} />
          </span>
          <div>
            <span className="service-modal-category">{service.category}</span>
            <h2 id={`service-modal-title-${service.id}`}>{service.name}</h2>
          </div>
        </header>
        <div className="service-modal-copy">
          <p>{service.description}</p>
        </div>
        <footer className="service-modal-footer">
          <div>
            <span className="catalog-card-price-label">Reading fee</span>
            <strong>{service.priceLabel}</strong>
          </div>
          <Link href={`/booking?type=service&id=${service.id}`}>
            Book This Reading
          </Link>
        </footer>
      </section>
    </div>
  );
}
