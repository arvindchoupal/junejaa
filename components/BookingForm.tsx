"use client";

import { useEffect, useMemo, useState } from "react";
import { alieyaApiRoutes, extractList, postAlieyaApi } from "@/lib/alieyaApi";
import { isActiveRow, mapPackage, mapService, type PublicPackage, type PublicService } from "@/lib/liveData";

type BookingState = {
  booking_type: "service" | "package";
  service_id: string;
  package_id: string;
  customer_name: string;
  mobile: string;
  email: string;
  country: string;
  booking_date: string;
  booking_time: string;
  notes: string;
};

const initialState: BookingState = {
  booking_type: "service",
  service_id: "1",
  package_id: "",
  customer_name: "",
  mobile: "",
  email: "",
  country: "",
  booking_date: "",
  booking_time: "",
  notes: "",
};

export function BookingForm({
  defaultType,
  defaultId,
  services: initialServices,
  packages: initialPackages,
}: {
  defaultType?: string;
  defaultId?: string;
  services: PublicService[];
  packages: PublicPackage[];
}) {
  const [services, setServices] = useState(initialServices);
  const [packages, setPackages] = useState(initialPackages);
  const [isLoadingOptions, setIsLoadingOptions] = useState(false);
  const firstServiceId = String(services[0]?.id ?? "1");
  const firstPackageId = String(packages[0]?.id ?? "1");
  const [form, setForm] = useState<BookingState>({
    ...initialState,
    booking_type: defaultType === "package" ? "package" : "service",
    service_id: defaultType === "package" ? "" : defaultId ?? firstServiceId,
    package_id: defaultType === "package" ? defaultId ?? firstPackageId : "",
  });
  const [status, setStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    async function loadOptions() {
      setIsLoadingOptions(true);
      try {
        const [serviceData, packageData] = await Promise.all([
          postAlieyaApi(alieyaApiRoutes.service.list, {}),
          postAlieyaApi(alieyaApiRoutes.package.list, {}),
        ]);

        if (!isMounted) return;

        const liveServices = extractList(serviceData).filter(isActiveRow).map(mapService);
        const livePackages = extractList(packageData).filter(isActiveRow).map(mapPackage);

        setServices(liveServices);
        setForm((current) => ({
          ...current,
          service_id:
            current.booking_type === "service" &&
            !liveServices.some((item) => String(item.id) === current.service_id)
              ? String(liveServices[0]?.id ?? "")
              : current.service_id,
        }));

        setPackages(livePackages);
        setForm((current) => ({
          ...current,
          package_id:
            current.booking_type === "package" &&
            !livePackages.some((item) => String(item.id) === current.package_id)
              ? String(livePackages[0]?.id ?? "")
              : current.package_id,
        }));
      } catch (error) {
        if (isMounted) {
          setStatus(error instanceof Error ? error.message : "Unable to load services and packages.");
        }
      } finally {
        if (isMounted) setIsLoadingOptions(false);
      }
    }

    void loadOptions();

    return () => {
      isMounted = false;
    };
  }, []);

  const selectedAmount = useMemo(() => {
    if (form.booking_type === "package") {
      return packages.find((item) => String(item.id) === form.package_id)?.packagePrice ?? 0;
    }

    return services.find((item) => String(item.id) === form.service_id)?.price ?? 0;
  }, [form.booking_type, form.package_id, form.service_id, packages, services]);

  function update(field: keyof BookingState, value: string) {
    setForm((current) => ({ ...current, [field]: value }));
  }

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSaving(true);
    setStatus("");

    try {
      await postAlieyaApi(alieyaApiRoutes.booking.create, {
        booking_type: form.booking_type,
        service_id: form.booking_type === "service" ? Number(form.service_id) : null,
        package_id: form.booking_type === "package" ? Number(form.package_id) : null,
        customer_name: form.customer_name,
        mobile: form.mobile,
        email: form.email,
        country: form.country,
        booking_date: form.booking_date,
        booking_time: form.booking_time,
        amount: selectedAmount,
        payment_status: "pending",
        booking_status: "pending",
        notes: form.notes,
      });
      setStatus("Booking request sent successfully.");
      setForm({ ...initialState, service_id: firstServiceId });
    } catch (error) {
      setStatus(error instanceof Error ? error.message : "Booking request failed.");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <form className="booking-form" onSubmit={submit}>
      <div className="form-row">
        <label>
          Booking Type
          <select
            value={form.booking_type}
            onChange={(event) => {
              const type = event.target.value as "service" | "package";
              setForm((current) => ({
                ...current,
                booking_type: type,
                service_id: type === "service" ? firstServiceId : "",
                package_id: type === "package" ? firstPackageId : "",
              }));
            }}
          >
            <option value="service">Service</option>
            <option value="package">Package</option>
          </select>
        </label>
        {form.booking_type === "service" ? (
          <label>
            Service
            <select
              value={form.service_id}
              onChange={(event) => update("service_id", event.target.value)}
              disabled={isLoadingOptions}
            >
              {services.map((service) => (
                <option value={service.id} key={service.id}>
                  {service.name} - {service.priceLabel}
                </option>
              ))}
            </select>
          </label>
        ) : (
          <label>
            Package
            <select
              value={form.package_id}
              onChange={(event) => update("package_id", event.target.value)}
              disabled={isLoadingOptions}
            >
              {packages.map((item) => (
                <option value={item.id} key={item.id}>
                  {item.name} - ${item.packagePrice}
                </option>
              ))}
            </select>
          </label>
        )}
      </div>
      <div className="form-row">
        <label>Name<input required value={form.customer_name} onChange={(event) => update("customer_name", event.target.value)} /></label>
        <label>Mobile<input required value={form.mobile} onChange={(event) => update("mobile", event.target.value)} /></label>
      </div>
      <div className="form-row">
        <label>Email<input required type="email" value={form.email} onChange={(event) => update("email", event.target.value)} /></label>
        <label>Country<input required value={form.country} onChange={(event) => update("country", event.target.value)} /></label>
      </div>
      <div className="form-row">
        <label>Date<input required type="date" value={form.booking_date} onChange={(event) => update("booking_date", event.target.value)} /></label>
        <label>Time<input required type="time" value={form.booking_time} onChange={(event) => update("booking_time", event.target.value)} /></label>
      </div>
      <label>Notes<textarea value={form.notes} onChange={(event) => update("notes", event.target.value)} /></label>
      <div className="form-footer">
        <strong>{isLoadingOptions ? "Loading services..." : `Amount: $${selectedAmount}`}</strong>
        <button className="pill-button" type="submit" disabled={isSaving}>
          {isSaving ? "Sending..." : "Create Booking"}
        </button>
      </div>
      {status ? <p className="form-status">{status}</p> : null}
    </form>
  );
}
