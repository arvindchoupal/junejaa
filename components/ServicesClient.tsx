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
  const [expandedServiceIds, setExpandedServiceIds] = useState<Set<number>>(new Set());
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

  const categories = useMemo(
    () => apiCategories.length
      ? apiCategories
      : Array.from(new Set(services.map((service) => service.category))),
    [apiCategories, services],
  );

  const visibleCategories = selectedCategory === "all"
    ? categories
    : categories.filter((category) => category === selectedCategory);

  function toggleDescription(serviceId: number) {
    setExpandedServiceIds((current) => {
      const next = new Set(current);
      if (next.has(serviceId)) next.delete(serviceId);
      else next.add(serviceId);
      return next;
    });
  }

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
                const isExpanded = expandedServiceIds.has(service.id);
                const visibleDescription = hasLongDescription && !isExpanded
                  ? `${descriptionWords.slice(0, DESCRIPTION_WORD_LIMIT).join(" ")}…`
                  : service.description;

                return (
                <article className="catalog-card" key={service.id}>
                  <span className="service-icon">
                    <Icon name={service.icon} />
                  </span>
                  <h3>{service.name}</h3>
                  <p>{visibleDescription}</p>
                  {hasLongDescription ? (
                    <button
                      aria-expanded={isExpanded}
                      className="description-toggle"
                      onClick={() => toggleDescription(service.id)}
                      type="button"
                    >
                      {isExpanded ? "Show less" : "Read more"}
                    </button>
                  ) : null}
                  <strong>{service.priceLabel}</strong>
                  <Link href={`/booking?type=service&id=${service.id}`}>
                    Book This Reading
                  </Link>
                </article>
                );
              })}
          </div>
        </div>
      ))}
    </>
  );
}
