"use client";

import { useCallback, useState } from "react";
import { Icon } from "@/components/Icon";
import { ServiceDetailsModal } from "@/components/ServiceDetailsModal";
import type { PublicService } from "@/lib/liveData";

const PREVIEW_WORD_LIMIT = 28;

export function FeaturedServices({ services }: { services: PublicService[] }) {
  const [activeService, setActiveService] = useState<PublicService | null>(null);
  const closeModal = useCallback(() => setActiveService(null), []);

  return (
    <>
      <div className="service-grid">
        {services.map((service) => {
          const words = service.description.trim().split(/\s+/).filter(Boolean);
          const preview = words.length > PREVIEW_WORD_LIMIT
            ? `${words.slice(0, PREVIEW_WORD_LIMIT).join(" ")}…`
            : service.description;

          return (
            <article className="service-card" key={service.id}>
              <span className="service-icon"><Icon name={service.icon} /></span>
              <div className="service-card-copy">
                <h3>{service.name}</h3>
                <p>{preview}</p>
              </div>
              <footer className="service-card-footer">
                <strong>{service.priceLabel}</strong>
                <button onClick={() => setActiveService(service)} type="button">
                  Read more
                </button>
              </footer>
            </article>
          );
        })}
      </div>
      {activeService ? (
        <ServiceDetailsModal service={activeService} onClose={closeModal} />
      ) : null}
    </>
  );
}
