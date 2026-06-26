import { BookingForm } from "@/components/BookingForm";
import { SiteFrame } from "@/components/SiteChrome";
import { getLivePackages, getLiveServices } from "@/lib/liveData";

export default async function BookingPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string; id?: string }>;
}) {
  const params = await searchParams;
  const [services, packages] = await Promise.all([getLiveServices(), getLivePackages()]);

  return (
    <SiteFrame>
      <section className="inner-hero">
        <p className="eyebrow">Book A Reading</p>
        <h1>Request Your Session</h1>
        <p>
          Submit your preferred service or package, date, and time. The booking
          is created as pending until payment and availability are confirmed.
        </p>
      </section>
      <section className="form-section">
        <BookingForm
          defaultType={params.type}
          defaultId={params.id}
          services={services}
          packages={packages}
        />
      </section>
    </SiteFrame>
  );
}
