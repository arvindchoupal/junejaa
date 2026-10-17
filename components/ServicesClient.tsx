"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { alieyaApiRoutes, extractList, postAlieyaApi } from "@/lib/alieyaApi";
import { isActiveRow, mapService, type PublicService } from "@/lib/liveData";

const DESCRIPTION_WORD_LIMIT = 32;

export function ServicesClient() {
  const [services, setServices] = useState<PublicService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeService, setActiveService] = useState<PublicService | null>(null);
  const [apiCategories, setApiCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    let isMounted = true;

    async function loadServices() {
      setIsLoading(true);
      setError("");
      try {
        const [serviceData, categoryData] = await Promise.all([
          postAlieyaApi(alieyaApiRoutes.service.list, {}),
          postAlieyaApi(alieyaApiRoutes.serviceMaster.list, {}).catch(() => null),
        ]);
        const rows = extractList(serviceData);
        const mapped = rows.filter(isActiveRow).map(mapService).filter((item) => item.name);
        const usedCategories = new Set(mapped.map((service) => service.category));
        const orderedApiCategories = extractList(categoryData)
          .filter(isActiveRow)
          .sort((a, b) => Number(a.display_order ?? 0) - Number(b.display_order ?? 0))
          .map((row) => String(row.service_category ?? "").trim())
          .filter((category) => category && usedCategories.has(category));
        const remainingCategories = [...usedCategories].filter(
          (category) => !orderedApiCategories.includes(category),
        );

        if (isMounted) {
          setServices(mapped);
          setApiCategories([...orderedApiCategories, ...remainingCategories]);
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unable to load services.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadServices();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (!activeService) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActiveService(null);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [activeService]);

  const categories = useMemo(
    () => apiCategories.length
      ? apiCategories
      : Array.from(new Set(services.map((service) => service.category))),
    [apiCategories, services],
  );

  const visibleCategories = selectedCategory === "all"
    ? categories
    : categories.filter((category) => category === selectedCategory);

  if (isLoading) {
    return <p className="catalog-state">Loading services from API...</p>;
  }

  if (error) {
    return <p className="catalog-state error">{error}</p>;
  }

  if (!services.length) {
    return <p className="catalog-state">No services found from API.</p>;
  }

  return (
    <>
      <nav aria-label="Filter services by category" className="service-category-filter">
        <button
          aria-pressed={selectedCategory === "all"}
          className={selectedCategory === "all" ? "active" : ""}
          onClick={() => setSelectedCategory("all")}
          type="button"
        >
          All Services
        </button>
        {categories.map((category) => (
          <button
            aria-pressed={selectedCategory === category}
            className={selectedCategory === category ? "active" : ""}
            key={category}
            onClick={() => setSelectedCategory(category)}
            type="button"
          >
            {category}
          </button>
        ))}
      </nav>
      {visibleCategories.map((category) => (
        <div className="catalog-group" key={category}>
          <h2>{category}</h2>
          <div className="catalog-grid">
            {services
              .filter((service) => service.category === category)
              .map((service) => {
                const descriptionWords = service.description.trim().split(/\s+/).filter(Boolean);
                const hasLongDescription = descriptionWords.length > DESCRIPTION_WORD_LIMIT;
                const visibleDescription = hasLongDescription
                  ? `${descriptionWords.slice(0, DESCRIPTION_WORD_LIMIT).join(" ")}…`
                  : service.description;

                return (
                <article className="catalog-card" key={service.id}>
                  <span className="service-icon">
                    <Icon name={service.icon} />
                  </span>
                  <div className="catalog-card-content">
                    <h3>{service.name}</h3>
                    <p>{visibleDescription}</p>
                    {hasLongDescription ? (
                      <button
                        className="description-toggle"
                        onClick={() => setActiveService(service)}
                        type="button"
                      >
                        Read more
                      </button>
                    ) : null}
                  </div>
                  <div className="catalog-card-actions">
                    <span className="catalog-card-price-label">Reading fee</span>
                    <strong>{service.priceLabel}</strong>
                    <Link href={`/booking?type=service&id=${service.id}`}>
                      Book This Reading
                    </Link>
                  </div>
                </article>
                );
              })}
          </div>
        </div>
      ))}
      {activeService ? (
        <div
          className="service-modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setActiveService(null);
          }}
          role="presentation"
        >
          <section
            aria-labelledby={`service-modal-title-${activeService.id}`}
            aria-modal="true"
            className="service-modal"
            role="dialog"
          >
            <button
              aria-label="Close service details"
              className="service-modal-close"
              onClick={() => setActiveService(null)}
              type="button"
            >
              ×
            </button>
            <header className="service-modal-header">
              <span className="service-icon">
                <Icon name={activeService.icon} />
              </span>
              <div>
                <span className="service-modal-category">{activeService.category}</span>
                <h2 id={`service-modal-title-${activeService.id}`}>{activeService.name}</h2>
              </div>
            </header>
            <div className="service-modal-copy">
              <p>{activeService.description}</p>
            </div>
            <footer className="service-modal-footer">
              <div>
                <span className="catalog-card-price-label">Reading fee</span>
                <strong>{activeService.priceLabel}</strong>
              </div>
              <Link href={`/booking?type=service&id=${activeService.id}`}>
                Book This Reading
              </Link>
            </footer>
          </section>
        </div>
      ) : null}
    </>
  );
}
