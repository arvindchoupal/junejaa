"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { alieyaApiRoutes, extractList, postAlieyaApi } from "@/lib/alieyaApi";
import { clearAuthToken, getAuthToken } from "@/lib/authStorage";
import { BookingCalendar } from "@/components/BookingCalendar";

type Field = {
  name: string;
  label: string;
  type?: "text" | "number" | "date" | "time" | "textarea" | "select";
  options?: string[];
};

type Master = {
  key: string;
  label: string;
  routes: {
    list: string;
    create: string;
    update: string;
    delete: string;
  };
  fields: Field[];
  initial: Record<string, string>;
};

const masters: Master[] = [
  {
    key: "serviceCategories",
    label: "Service Categories",
    routes: alieyaApiRoutes.serviceMaster,
    fields: [
      { name: "service_category", label: "Service Category" },
      { name: "display_order", label: "Display Order", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["active", "inactive"] },
    ],
    initial: { service_category: "", display_order: "1", status: "active" },
  },
  {
    key: "services",
    label: "Services",
    routes: alieyaApiRoutes.service,
    fields: [
      { name: "service_name", label: "Service Name" },
      { name: "service_category", label: "Service Category", type: "select" },
      { name: "charges", label: "Charges", type: "number" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image", label: "Image" },
      { name: "display_order", label: "Display Order", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["active", "inactive"] },
    ],
    initial: { service_name: "", service_category: "", charges: "", description: "", image: "", display_order: "1", status: "active" },
  },
  {
    key: "packages",
    label: "Packages",
    routes: alieyaApiRoutes.package,
    fields: [
      { name: "package_name", label: "Package Name" },
      { name: "total_sessions", label: "Total Sessions", type: "number" },
      { name: "actual_price", label: "Actual Price", type: "number" },
      { name: "package_price", label: "Package Price", type: "number" },
      { name: "savings_amount", label: "Savings", type: "number" },
      { name: "validity_months", label: "Validity Months", type: "number" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "image", label: "Image" },
      { name: "display_order", label: "Display Order", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["active", "inactive"] },
    ],
    initial: {
      package_name: "",
      total_sessions: "5",
      actual_price: "",
      package_price: "",
      savings_amount: "",
      validity_months: "12",
      description: "",
      image: "",
      display_order: "1",
      status: "active",
    },
  },
  {
    key: "bookings",
    label: "Bookings",
    routes: alieyaApiRoutes.booking,
    fields: [
      { name: "booking_type", label: "Booking Type", type: "select", options: ["service", "package"] },
      { name: "service_id", label: "Service ID", type: "number" },
      { name: "package_id", label: "Package ID", type: "number" },
      { name: "customer_name", label: "Customer Name" },
      { name: "mobile", label: "Mobile" },
      { name: "email", label: "Email" },
      { name: "country", label: "Country" },
      { name: "booking_date", label: "Date", type: "date" },
      { name: "booking_time", label: "Time", type: "time" },
      { name: "amount", label: "Amount", type: "number" },
      { name: "payment_status", label: "Payment Status", type: "select", options: ["pending", "paid", "failed"] },
      { name: "booking_status", label: "Booking Status", type: "select", options: ["pending", "confirmed", "cancelled"] },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
    initial: {
      booking_type: "service",
      service_id: "",
      package_id: "",
      customer_name: "",
      mobile: "",
      email: "",
      country: "",
      booking_date: "",
      booking_time: "",
      amount: "",
      payment_status: "pending",
      booking_status: "pending",
      notes: "",
    },
  },
  {
    key: "payments",
    label: "Payments",
    routes: alieyaApiRoutes.payment,
    fields: [
      { name: "booking_id", label: "Booking ID", type: "number" },
      { name: "payment_date", label: "Payment Date", type: "date" },
      { name: "amount", label: "Amount", type: "number" },
      { name: "payment_mode", label: "Payment Mode", type: "select", options: ["paypal", "stripe", "bank", "cash"] },
      { name: "transaction_id", label: "Transaction ID" },
      { name: "payment_status", label: "Status", type: "select", options: ["pending", "paid", "failed"] },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
    initial: { booking_id: "", payment_date: "", amount: "", payment_mode: "paypal", transaction_id: "", payment_status: "paid", notes: "" },
  },
  {
    key: "testimonials",
    label: "Testimonials",
    routes: alieyaApiRoutes.testimonial,
    fields: [
      { name: "client_name", label: "Client Name" },
      { name: "client_country", label: "Country" },
      { name: "client_image", label: "Client Image" },
      { name: "testimonial_type", label: "Type", type: "select", options: ["text", "video"] },
      { name: "video_url", label: "Video URL" },
      { name: "rating", label: "Rating", type: "number" },
      { name: "testimonial", label: "Testimonial", type: "textarea" },
      { name: "display_order", label: "Display Order", type: "number" },
      { name: "status", label: "Status", type: "select", options: ["active", "inactive"] },
    ],
    initial: { client_name: "", client_country: "", client_image: "", testimonial_type: "text", video_url: "", rating: "5", testimonial: "", display_order: "1", status: "active" },
  },
  {
    key: "availability",
    label: "Availability",
    routes: alieyaApiRoutes.availability,
    fields: [
      { name: "slot_date", label: "Slot Date", type: "date" },
      { name: "start_time", label: "Start Time", type: "time" },
      { name: "end_time", label: "End Time", type: "time" },
      { name: "status", label: "Status", type: "select", options: ["available", "blocked"] },
      { name: "notes", label: "Notes", type: "textarea" },
    ],
    initial: { slot_date: "", start_time: "", end_time: "", status: "available", notes: "" },
  },
];

function toPayload(form: Record<string, string>, id?: number) {
  const payload: Record<string, string | number | null> = {};
  if (id) payload.id = id;

  for (const [key, value] of Object.entries(form)) {
    if (value === "" && key.endsWith("_id")) payload[key] = null;
    else if (["id", "charges", "display_order", "total_sessions", "actual_price", "package_price", "savings_amount", "validity_months", "amount", "rating", "booking_id", "service_id", "package_id"].includes(key)) {
      payload[key] = value === "" ? null : Number(value);
    } else payload[key] = value;
  }

  return payload;
}

export function AdminPanel() {
  const router = useRouter();
  const [activeKey, setActiveKey] = useState("dashboard");
  const [rows, setRows] = useState<Record<string, unknown>[]>([]);
  const [form, setForm] = useState<Record<string, string>>(masters[0].initial);
  const [editingId, setEditingId] = useState<number | undefined>();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [calendarBookings, setCalendarBookings] = useState<Record<string, unknown>[]>([]);
  const [calendarLoading, setCalendarLoading] = useState(false);
  const [calendarError, setCalendarError] = useState("");
  const [serviceCategories, setServiceCategories] = useState<string[]>([]);
  const [pendingDelete, setPendingDelete] = useState<Record<string, unknown> | null>(null);
  const [deletingId, setDeletingId] = useState<number | null>(null);

  const activeMaster = useMemo(
    () => masters.find((master) => master.key === activeKey) ?? masters[0],
    [activeKey],
  );

  useEffect(() => {
    const token = getAuthToken();
    if (!token) {
      router.push("/admin/login");
      return;
    }

    try {
      const [, payload] = token.split(".");
      if (!payload) return;

      const decoded = JSON.parse(atob(payload.replace(/-/g, "+").replace(/_/g, "/"))) as { exp?: number };
      if (decoded.exp && decoded.exp < Date.now() / 1000) {
        clearAuthToken();
        router.push("/admin/login");
      }
    } catch {
      clearAuthToken();
      router.push("/admin/login");
    }
  }, [router]);

  const loadRows = useCallback(async (master = activeMaster) => {
    setLoading(true);
    setMessage("");
    try {
      const data = await postAlieyaApi(master.routes.list, {});
      setRows(extractList(data));
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load records.");
    } finally {
      setLoading(false);
    }
  }, [activeMaster]);

  const loadServiceCategories = useCallback(async () => {
    try {
      const data = await postAlieyaApi(alieyaApiRoutes.serviceMaster.list, {});
      const categories = extractList(data)
        .filter((row) => {
          const status = String(row.status ?? "active").toLowerCase();
          return status === "active" || status === "1" || status === "true";
        })
        .sort((a, b) => Number(a.display_order ?? 0) - Number(b.display_order ?? 0))
        .map((row) => String(row.service_category ?? "").trim())
        .filter(Boolean);
      setServiceCategories(Array.from(new Set(categories)));
    } catch (error) {
      setServiceCategories([]);
      setMessage(error instanceof Error ? error.message : "Unable to load service categories.");
    }
  }, []);

  const loadCalendarBookings = useCallback(async () => {
    setCalendarLoading(true);
    setCalendarError("");
    try {
      const data = await postAlieyaApi(alieyaApiRoutes.booking.list, {});
      setCalendarBookings(extractList(data));
    } catch (error) {
      setCalendarError(error instanceof Error ? error.message : "Unable to load booking calendar.");
    } finally {
      setCalendarLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => void loadCalendarBookings(), 0);
    return () => window.clearTimeout(timer);
  }, [loadCalendarBookings]);

  useEffect(() => {
    if (activeKey !== "services") return;
    const timer = window.setTimeout(() => void loadServiceCategories(), 0);
    return () => window.clearTimeout(timer);
  }, [activeKey, loadServiceCategories]);

  function selectMaster(master: Master) {
    setActiveKey(master.key);
    setForm(master.initial);
    setEditingId(undefined);
    setRows([]);
    setMessage("");
    void loadRows(master);
  }

  async function save(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      const formWithCategory = activeMaster.key === "services" && !form.service_category && serviceCategories[0]
        ? { ...form, service_category: serviceCategories[0] }
        : form;
      await postAlieyaApi(
        editingId ? activeMaster.routes.update : activeMaster.routes.create,
        toPayload(formWithCategory, editingId),
      );
      setMessage(editingId ? "Record updated." : "Record created.");
      setForm(activeMaster.initial);
      setEditingId(undefined);
      await loadRows();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save record.");
    } finally {
      setLoading(false);
    }
  }

  async function remove() {
    if (!pendingDelete) return;
    const row = pendingDelete;
    const rowId = Number(row.id);
    setLoading(true);
    setDeletingId(rowId);
    setMessage("");
    try {
      const payload: Record<string, unknown> = { id: rowId };
      if (activeMaster.key === "services" && row.service_category != null) {
        payload.service_category = row.service_category;
      }
      await postAlieyaApi(activeMaster.routes.delete, payload);
      setMessage("Record deleted.");
      setPendingDelete(null);
      await loadRows();
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to delete record.");
    } finally {
      setDeletingId(null);
      setLoading(false);
    }
  }

  function edit(row: Record<string, unknown>) {
    const next = { ...activeMaster.initial };
    for (const field of activeMaster.fields) {
      const value = row[field.name];
      next[field.name] = value == null
        ? ""
        : field.type === "date"
          ? String(value).slice(0, 10)
          : String(value);
    }
    setForm(next);
    setEditingId(Number(row.id));
  }

  return (
    <section className="admin-shell">
      <aside className="admin-sidebar">
        <h2>Admin</h2>
        <button className={activeKey === "dashboard" ? "active" : ""} onClick={() => { setActiveKey("dashboard"); setMessage(""); }}>
          Dashboard
        </button>
        {masters.map((master) => (
          <button className={master.key === activeKey ? "active" : ""} key={master.key} onClick={() => selectMaster(master)}>
            {master.label}
          </button>
        ))}
      </aside>
      <div className="admin-workspace">
        {activeKey === "dashboard" ? (
          <>
            <div className="admin-title">
              <div>
                <p className="eyebrow">Overview</p>
                <h1>Booking Calendar</h1>
              </div>
              <div className="admin-title-actions">
                <button className="outline-button" onClick={() => loadCalendarBookings()} disabled={calendarLoading}>
                  {calendarLoading ? "Refreshing..." : "Refresh"}
                </button>
                <button className="outline-button" onClick={() => { clearAuthToken(); router.push("/admin/login"); }}>Logout</button>
              </div>
            </div>
            {calendarError ? <p className="form-status">{calendarError}</p> : null}
            <BookingCalendar bookings={calendarBookings} />
          </>
        ) : (
        <>
        <div className="admin-title">
          <div>
            <p className="eyebrow">Master</p>
            <h1>{activeMaster.label}</h1>
          </div>
          <div className="admin-title-actions">
            <button className="outline-button" onClick={() => loadRows()} disabled={loading}>Refresh</button>
            <button
              className="outline-button"
              onClick={() => {
                clearAuthToken();
                router.push("/admin/login");
              }}
            >
              Logout
            </button>
          </div>
        </div>

        <form className="admin-form" onSubmit={save}>
          {activeMaster.fields.map((field) => (
            <label key={field.name}>
              {field.label}
              {field.type === "textarea" ? (
                <textarea value={form[field.name] ?? ""} onChange={(event) => setForm({ ...form, [field.name]: event.target.value })} />
              ) : field.type === "select" ? (
                <select
                  value={field.name === "service_category" && activeMaster.key === "services"
                    ? form[field.name] || serviceCategories[0] || ""
                    : form[field.name] ?? ""}
                  onChange={(event) => setForm({ ...form, [field.name]: event.target.value })}
                >
                  {field.name === "service_category" && activeMaster.key === "services" && !serviceCategories.length ? (
                    <option value="">No active categories found</option>
                  ) : null}
                  {(field.name === "service_category" && activeMaster.key === "services"
                    ? serviceCategories
                    : field.options
                  )?.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              ) : (
                <input type={field.type ?? "text"} value={form[field.name] ?? ""} onChange={(event) => setForm({ ...form, [field.name]: event.target.value })} />
              )}
            </label>
          ))}
          <div className="form-footer">
            <button className="pill-button" type="submit" disabled={loading}>{editingId ? "Update" : "Create"}</button>
            {editingId ? <button className="outline-button" type="button" onClick={() => { setEditingId(undefined); setForm(activeMaster.initial); }}>Cancel</button> : null}
          </div>
        </form>

        {message ? <p className="form-status">{message}</p> : null}

        <div className="admin-table">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                {activeMaster.fields.slice(0, 4).map((field) => <th key={field.name}>{field.label}</th>)}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {rows.length ? rows.map((row, index) => (
                <tr key={String(row.id ?? index)}>
                  <td>{String(row.id ?? "-")}</td>
                  {activeMaster.fields.slice(0, 4).map((field) => <td key={field.name}>{String(row[field.name] ?? "-")}</td>)}
                  <td>
                    <button onClick={() => edit(row)}>Edit</button>
                    <button
                      onClick={() => setPendingDelete(row)}
                      disabled={!row.id || deletingId === Number(row.id)}
                    >
                      {deletingId === Number(row.id) ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6}>{loading ? "Loading..." : "No records loaded."}</td></tr>
              )}
            </tbody>
          </table>
        </div>
        </>
        )}
      </div>
      {pendingDelete ? (
        <div className="modal-backdrop" role="presentation">
          <div
            aria-labelledby="delete-dialog-title"
            aria-modal="true"
            className="reset-dialog delete-dialog"
            role="dialog"
          >
            <p className="eyebrow">Confirm deletion</p>
            <h2 id="delete-dialog-title">Delete this record?</h2>
            <p>
              You are about to delete <strong>{String(
                pendingDelete[activeMaster.fields[0]?.name] ?? `record #${String(pendingDelete.id)}`,
              )}</strong>. This action cannot be undone.
            </p>
            <div className="delete-dialog-actions">
              <button
                className="outline-button"
                disabled={deletingId !== null}
                onClick={() => setPendingDelete(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="danger-button"
                disabled={deletingId !== null}
                onClick={() => void remove()}
                type="button"
              >
                {deletingId !== null ? "Deleting..." : "Yes, delete"}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}
