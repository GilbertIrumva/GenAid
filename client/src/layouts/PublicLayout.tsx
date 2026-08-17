import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PublicLayout() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      let attempts = 0;
      let cancelled = false;
      const tryScroll = () => {
        if (cancelled) return;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "start" });
        } else if (attempts++ < 10) {
          setTimeout(tryScroll, 50);
        }
      };
      requestAnimationFrame(tryScroll);
      return () => {
        cancelled = true;
      };
    }
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    return undefined;
  }, [location.pathname, location.hash]);

  return (
    <div className="flex min-h-screen flex-col bg-white dark:bg-slate-900 text-neutral-body dark:text-slate-300 transition-colors">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
