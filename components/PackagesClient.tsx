"use client";

import Link from "next/link";
import { PackageDetailsModal } from "@/components/PackageDetailsModal";
import { Icon } from "@/components/Icon";
import { useEffect, useState } from "react";
import { alieyaApiRoutes, extractList, postAlieyaApi } from "@/lib/alieyaApi";
import { isActiveRow, mapPackage, type PublicPackage } from "@/lib/liveData";

export function PackagesClient() {
  const [activePackage, setActivePackage] = useState<PublicPackage | null>(null);
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
        const mapped = rows.filter(isActiveRow).map(mapPackage).filter((item) => item.name);
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
    <>
    <div className="catalog-grid">
      {packages.map((item) => {
        const words = item.description.trim().split(/\s+/).filter(Boolean);
        const isLong = words.length > 32;
        return (
        <article className="catalog-card" key={item.id}>
          <span className="service-icon"><Icon name="moon" /></span>
          <div className="catalog-card-content">
          <h3>{item.name}</h3>
          <p>{isLong ? `${words.slice(0, 32).join(" ")}…` : item.description}</p>
          {isLong && <button className="description-toggle" type="button" onClick={() => setActivePackage(item)}>Read more</button>}
          <p>
            {item.totalSessions} sessions • Save ${item.savings} • Valid for{" "}
            {item.validityMonths} months
          </p>
          </div>
          <div className="catalog-card-actions">
            <span className="catalog-card-price-label">Package fee</span>
            <div className="price-row">
              <span>${item.actualPrice}</span>
              <strong>${item.packagePrice}</strong>
            </div>
          <Link href={`/booking?type=package&id=${item.id}`}>Book Package</Link>
          </div>
        </article>
      );})}
    </div>
    {activePackage && <PackageDetailsModal packageItem={activePackage} onClose={() => setActivePackage(null)} />}
    </>
  );
}
