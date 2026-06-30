"use client";

import { useMemo, useState } from "react";

type BookingRow = Record<string, unknown>;

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function dateKey(value: unknown) {
  if (typeof value !== "string") return "";
  const match = value.match(/\d{4}-\d{2}-\d{2}/);
  return match?.[0] ?? "";
}

function localDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function bookingLabel(booking: BookingRow) {
  const type = String(booking.booking_type ?? "service");
  const name = booking.service_name ?? booking.package_name;
  const id = type === "package" ? booking.package_id : booking.service_id;
  return name ? String(name) : `${type === "package" ? "Package" : "Service"}${id ? ` #${id}` : ""}`;
}

export function BookingCalendar({ bookings }: { bookings: BookingRow[] }) {
  const today = new Date();
  const [month, setMonth] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState(() => localDateKey(today));

  const bookingsByDate = useMemo(() => {
    const grouped = new Map<string, BookingRow[]>();
    for (const booking of bookings) {
      const key = dateKey(booking.booking_date);
      if (!key) continue;
      grouped.set(key, [...(grouped.get(key) ?? []), booking]);
    }
    return grouped;
  }, [bookings]);

  const calendarDays = useMemo(() => {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const leadingDays = new Date(year, monthIndex, 1).getDay();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

    return Array.from({ length: 42 }, (_, index) => {
      const day = index - leadingDays + 1;
      if (day < 1 || day > daysInMonth) return null;
      const date = new Date(year, monthIndex, day);
      return { day, key: localDateKey(date) };
    });
  }, [month]);

  const selectedBookings = bookingsByDate.get(selectedDate) ?? [];
  const selectedDateLabel = new Date(`${selectedDate}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  function changeMonth(offset: number) {
    setMonth((current) => new Date(current.getFullYear(), current.getMonth() + offset, 1));
  }

  return (
    <div className="booking-calendar-layout">
      <section className="booking-calendar" aria-label="Booking calendar">
        <div className="calendar-header">
          <button type="button" onClick={() => changeMonth(-1)} aria-label="Previous month">‹</button>
          <h2>{month.toLocaleDateString("en-IN", { month: "long", year: "numeric" })}</h2>
          <button type="button" onClick={() => changeMonth(1)} aria-label="Next month">›</button>
        </div>
        <div className="calendar-grid calendar-weekdays">
          {weekDays.map((day) => <span key={day}>{day}</span>)}
        </div>
        <div className="calendar-grid calendar-days">
          {calendarDays.map((date, index) => {
            if (!date) return <span className="calendar-empty" key={`empty-${index}`} />;
            const count = bookingsByDate.get(date.key)?.length ?? 0;
            const classes = [
              "calendar-day",
              count ? "has-bookings" : "",
              date.key === selectedDate ? "selected" : "",
              date.key === localDateKey(today) ? "today" : "",
            ].filter(Boolean).join(" ");

            return (
              <button className={classes} type="button" key={date.key} onClick={() => setSelectedDate(date.key)}>
                <span>{date.day}</span>
                {count ? <strong>{count}</strong> : null}
              </button>
            );
          })}
        </div>
      </section>

      <section className="booking-day-details">
        <p className="eyebrow">Selected Date</p>
        <h2>{selectedDateLabel}</h2>
        <p className="booking-day-count">{selectedBookings.length} booking{selectedBookings.length === 1 ? "" : "s"}</p>
        <div className="booking-day-list">
          {selectedBookings.length ? selectedBookings.map((booking, index) => (
            <article key={String(booking.id ?? index)}>
              <div className="booking-detail-heading">
                <h3>{String(booking.customer_name ?? "Unnamed client")}</h3>
                <span className={`booking-status ${String(booking.booking_status ?? "pending").toLowerCase()}`}>
                  {String(booking.booking_status ?? "pending")}
                </span>
              </div>
              <p><strong>{bookingLabel(booking)}</strong> at {String(booking.booking_time ?? "Time not set")}</p>
              <p>{String(booking.mobile ?? booking.email ?? "No contact provided")}</p>
              <p>Amount: ${String(booking.amount ?? 0)} · Payment: {String(booking.payment_status ?? "pending")}</p>
            </article>
          )) : <p className="calendar-no-bookings">No bookings on this date.</p>}
        </div>
      </section>
    </div>
  );
}
