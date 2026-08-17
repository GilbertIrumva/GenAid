import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import PublicLayout from "./layouts/PublicLayout";
import JobsLayout from "./layouts/JobsLayout";
import Home from "./pages/Home";
import About from "./pages/About";
import Programs from "./pages/Programs";
import ProgramDetail from "./pages/ProgramDetail";
import Impact from "./pages/Impact";
import Stories from "./pages/Stories";
import StoryDetail from "./pages/StoryDetail";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Partners from "./pages/Partners";
import Jobs from "./pages/Jobs";
import JobsTalent from "./pages/JobsTalent";
import JobsTalentProfile from "./pages/JobsTalentProfile";
import JobsEmployers from "./pages/JobsEmployers";
import JobsOpportunities from "./pages/JobsOpportunities";
import Volunteer from "./pages/Volunteer";
import Contact from "./pages/Contact";
import News from "./pages/News";
import Reports from "./pages/Reports";
import NotFound from "./pages/NotFound";

export default function App() {
  const { i18n } = useTranslation();

  // Keep <html lang> in sync with the active i18n language so assistive tech,
  // browser translation prompts, and SEO crawlers see the correct locale.
  useEffect(() => {
    const apply = (lng: string) => {
      const base = (lng || "en").split("-")[0];
      document.documentElement.lang = base;
    };
    apply(i18n.language);
    i18n.on("languageChanged", apply);
    return () => {
      i18n.off("languageChanged", apply);
    };
  }, [i18n]);

  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="/programs/:id" element={<ProgramDetail />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/stories" element={<Stories />} />
        <Route path="/stories/:id" element={<StoryDetail />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/news" element={<News />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/partners" element={<Partners />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="/jobs" element={<JobsLayout />}>
        <Route index element={<Jobs />} />
        <Route path="talent" element={<JobsTalent />} />
        <Route path="talent/:slug" element={<JobsTalentProfile />} />
        <Route path="employers" element={<JobsEmployers />} />
        <Route path="opportunities" element={<JobsOpportunities />} />
      </Route>
    </Routes>
  );
}
