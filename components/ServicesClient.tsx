"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/Icon";
import { alieyaApiRoutes, extractList, postAlieyaApi } from "@/lib/alieyaApi";
import { mapService, type PublicService } from "@/lib/liveData";

export function ServicesClient() {
  const [services, setServices] = useState<PublicService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadServices() {
      setIsLoading(true);
      setError("");
      try {
        const data = await postAlieyaApi(alieyaApiRoutes.service.list, {});
        const rows = extractList(data);
        const mapped = rows.map(mapService).filter((item) => item.name);
        if (isMounted) setServices(mapped);
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
    () => Array.from(new Set(services.map((service) => service.category))),
    [services],
  );

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
      {categories.map((category) => (
        <div className="catalog-group" key={category}>
          <h2>{category}</h2>
          <div className="catalog-grid">
            {services
              .filter((service) => service.category === category)
              .map((service) => (
                <article className="catalog-card" key={service.id}>
                  <span className="service-icon">
                    <Icon name={service.icon} />
                  </span>
                  <h3>{service.name}</h3>
                  <p>{service.description}</p>
                  <strong>{service.priceLabel}</strong>
                  <Link href={`/booking?type=service&id=${service.id}`}>
                    Book This Reading
                  </Link>
                </article>
              ))}
          </div>
        </div>
      ))}
    </>
  );
}
