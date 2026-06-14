import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import RequireAuth from "./components/RequireAuth";
import RequireRole from "./components/RequireRole";
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
import Volunteer from "./pages/Volunteer";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import AdminMessages from "./pages/AdminMessages";
import AdminVideos from "./pages/AdminVideos";
import AdminPhotos from "./pages/AdminPhotos";
import AdminPrograms from "./pages/AdminPrograms";
import AdminImpact from "./pages/AdminImpact";
import AdminStories from "./pages/AdminStories";
import AdminPartners from "./pages/AdminPartners";
import AdminUsers from "./pages/AdminUsers";
import NotFound from "./pages/NotFound";

export default function App() {
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
        <Route path="/partners" element={<Partners />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        element={
          <RequireAuth>
            <AdminLayout />
          </RequireAuth>
        }
      >
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/messages" element={<AdminMessages />} />
        <Route path="/admin/videos" element={<AdminVideos />} />
        <Route path="/admin/photos" element={<AdminPhotos />} />
        <Route path="/admin/programs" element={<AdminPrograms />} />
        <Route path="/admin/impact" element={<AdminImpact />} />
        <Route path="/admin/stories" element={<AdminStories />} />
        <Route path="/admin/partners" element={<AdminPartners />} />
        <Route
          path="/admin/users"
          element={
            <RequireRole role="admin">
              <AdminUsers />
            </RequireRole>
          }
        />
      </Route>
    </Routes>
  );
}
