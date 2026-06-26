"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { alieyaApiRoutes, extractList, postAlieyaApi } from "@/lib/alieyaApi";
import { mapPackage, type PublicPackage } from "@/lib/liveData";

export function PackagesClient() {
  const [packages, setPackages] = useState<PublicPackage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    async function loadPackages() {
      setIsLoading(true);
      setError("");
      try {
        const data = await postAlieyaApi(alieyaApiRoutes.package.list, {});
        const rows = extractList(data);
        const mapped = rows.map(mapPackage).filter((item) => item.name);
        if (isMounted) setPackages(mapped);
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : "Unable to load packages.");
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    void loadPackages();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isLoading) {
    return <p className="catalog-state">Loading packages from API...</p>;
  }

  if (error) {
    return <p className="catalog-state error">{error}</p>;
  }

  if (!packages.length) {
    return <p className="catalog-state">No packages found from API.</p>;
  }

  return (
    <div className="catalog-grid packages-grid">
      {packages.map((item) => (
        <article className="catalog-card package-card" key={item.id}>
          <h3>{item.name}</h3>
          <p>{item.description}</p>
          <div className="price-row">
            <span>${item.actualPrice}</span>
            <strong>${item.packagePrice}</strong>
          </div>
          <p>
            {item.totalSessions} sessions • Save ${item.savings} • Valid for{" "}
            {item.validityMonths} months
          </p>
          <Link href={`/booking?type=package&id=${item.id}`}>Book Package</Link>
        </article>
      ))}
    </div>
  );
}
