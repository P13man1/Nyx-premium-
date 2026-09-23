import { useEffect, useRef, useState } from "react";

// Reveal-on-scroll: returns a ref to attach; adds .in class when visible.
export function useReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("in");
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.14, ...options }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// Small fetch helper that never throws in the UI.
export async function postJSON(url, body) {
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json().catch(() => ({}));
    return { ok: res.ok, status: res.status, data };
  } catch (err) {
    return { ok: false, status: 0, data: { error: "network" } };
  }
}

export function useCounters() {
  const [counters, setCounters] = useState(null);
  useEffect(() => {
    let active = true;
    // Register a visit, then read back the totals.
    postJSON("/api/stats", { type: "visit" }).then((r) => {
      if (active && r.ok && r.data) setCounters(r.data);
    });
    return () => {
      active = false;
    };
  }, []);
  return counters;
}
