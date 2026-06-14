import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function PublicLayout() {
  const location = useLocation();

  // Scroll to hash target when navigating to "/#about" etc., or top otherwise.
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1);
      // The target section may not be mounted on the first frame after a
      // cross-route navigation (Home is long and lazy-loads data), so retry
      // briefly until it appears.
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
    // Snap to top instantly on route change. We bypass `window.scrollTo`
    // because the global `html { scroll-behavior: smooth }` rule would
    // animate it — and if the user was scrolled near the bottom of the
    // previous page, the new (often shorter) page renders far below the
    // viewport, making it look like nothing happened until they scroll.
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
    return undefined;
  }, [location.pathname, location.hash]);

  return (
    <div className="flex min-h-screen flex-col bg-bg">
      <Navbar />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
