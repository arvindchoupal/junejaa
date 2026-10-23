"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Icon } from "@/components/Icon";
import type { PublicPackage } from "@/lib/liveData";

export function PackageDetailsModal({
  packageItem,
  onClose,
}: {
  packageItem: PublicPackage;
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
        aria-labelledby={`service-modal-title-${packageItem.id}`}
        aria-modal="true"
        className="service-modal"
        role="dialog"
      >
        <button
          aria-label="Close package details"
          className="service-modal-close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <header className="service-modal-header">
          <span className="service-icon">
            <Icon name={"moon"} />
          </span>
          <div>
            <span className="service-modal-category">{"Tarot Package"}</span>
            <h2 id={`service-modal-title-${packageItem.id}`}>{packageItem.name}</h2>
          </div>
        </header>
        <div className="service-modal-copy">
          <p>{packageItem.description}</p>
        </div>
        <footer className="service-modal-footer">
          <div>
            <span className="catalog-card-price-label">Package fee</span>
            <strong>{`$${packageItem.packagePrice}`}</strong>
          </div>
          <Link href={`/booking?type=package&id=${packageItem.id}`}>
            Book Package
          </Link>
        </footer>
      </section>
    </div>
  );
}
