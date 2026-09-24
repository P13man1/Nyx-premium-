import { useState } from "react";
import { contact } from "../lib/content.js";
import { useReveal, postJSON } from "../lib/hooks.js";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState({ msg: "", cls: "" });
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    if (!email) return;
    setBusy(true);
    setState({ msg: "Envoi…", cls: "" });
    const r = await postJSON("/api/subscribe", { email });
    setBusy(false);
    if (r.ok) {
      setState({ msg: "Merci ! Tu es bien inscrit(e). 🔥", cls: "ok" });
      setEmail("");
    } else if (r.status === 409) {
      setState({ msg: "Cet email est déjà inscrit.", cls: "ok" });
    } else {
      setState({
        msg: r.data?.error === "config"
          ? "La base n'est pas encore connectée."
          : "Oups, réessaie dans un instant.",
        cls: "err",
      });
    }
  }

  return (
    <div className="card-box">
      <h3>Newsletter</h3>
      <p>Reçois les sorties, clips et dates en avant-première.</p>
      <form onSubmit={submit}>
        <div className="newsletter-row">
          <input
            type="email"
            required
            placeholder="ton@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Adresse email"
          />
          <button className="btn btn-red" disabled={busy}>
            {busy ? "…" : "Je m'abonne"}
          </button>
        </div>
        <div className={`form-msg ${state.cls}`}>{state.msg}</div>
      </form>
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [state, setState] = useState({ msg: "", cls: "" });
  const [busy, setBusy] = useState(false);

  function set(k) {
    return (e) => setForm((f) => ({ ...f, [k]: e.target.value }));
  }

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setState({ msg: "Envoi…", cls: "" });
    const r = await postJSON("/api/contact", form);
    setBusy(false);
    if (r.ok) {
      setState({ msg: "Message envoyé. On te recontacte vite. ✅", cls: "ok" });
      setForm({ name: "", email: "", message: "" });
    } else {
      setState({
        msg: r.data?.error === "config"
          ? "La base n'est pas encore connectée."
          : "Envoi impossible, réessaie.",
        cls: "err",
      });
    }
  }

  return (
    <div className="card-box">
      <h3>Booking & Contact</h3>
      <p>{contact.bookingNote}</p>
      <form onSubmit={submit}>
        <div className="field">
          <label>Nom</label>
          <input value={form.name} onChange={set("name")} required placeholder="Ton nom" />
        </div>
        <div className="field">
          <label>Email</label>
          <input type="email" value={form.email} onChange={set("email")} required placeholder="ton@email.com" />
        </div>
        <div className="field">
          <label>Message</label>
          <textarea value={form.message} onChange={set("message")} required placeholder="Ton message, ta proposition…" />
        </div>
        <button className="btn btn-red" disabled={busy}>
          {busy ? "Envoi…" : "Envoyer"}
        </button>
        <div className={`form-msg ${state.cls}`}>{state.msg}</div>
        <p style={{ marginTop: 14, fontSize: "0.82rem", color: "var(--ink-dim)" }}>
          Ou par mail : <a href={`mailto:${contact.email}`} style={{ color: "var(--red)" }}>{contact.email}</a>
        </p>
      </form>
    </div>
  );
}

export default function Connect() {
  const ref = useReveal();
  return (
    <section className="section" id="contact">
      <div className="wrap">
        <div className="section-head">
          <span className="num">04</span>
          <h2>Reste connecté</h2>
        </div>
        <div className="connect-grid reveal" ref={ref}>
          <Newsletter />
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
