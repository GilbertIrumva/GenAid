import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "/api";

const impactFallback = [
  {
    _id: "impact-1",
    title: "Learners supported",
    value: 500,
    icon: "🎓",
    order: 1,
  },
  {
    _id: "impact-2",
    title: "Volunteer hours logged",
    value: 1800,
    icon: "🤝",
    order: 2,
  },
  {
    _id: "impact-3",
    title: "Community partners",
    value: 24,
    icon: "🌍",
    order: 3,
  },
  {
    _id: "impact-4",
    title: "Refugee-led initiatives",
    value: 8,
    icon: "🚀",
    order: 4,
  },
];

const storiesFallback = [
  {
    _id: "story-1",
    title: "A youth-led coding circle in Kakuma",
    summary:
      "Young learners are building practical digital skills and confidence through our community-led program.",
    image: "/img/stories/leila.jpg",
    author: "Generation Aid team",
    createdAt: "2025-01-01",
  },
  {
    _id: "story-2",
    title: "Tailoring graduates launching small businesses",
    summary:
      "Graduates are turning new skills into income and self-reliance for their families.",
    image: "/img/stories/yusuf.jpg",
    author: "Community mentor",
    createdAt: "2025-02-01",
  },
];

export const api = axios.create({
  baseURL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    const path = String(err.config?.url || "").replace(/^\//, "");

    if (
      err.code === "ERR_NETWORK" ||
      err.response?.status === 404 ||
      err.response?.status === 500
    ) {
      if (path === "contact") {
        return Promise.resolve({
          data: { ok: true, message: "Message received locally." },
        });
      }

      if (path === "impact") {
        return Promise.resolve({ data: impactFallback });
      }

      if (path === "stories") {
        return Promise.resolve({ data: storiesFallback });
      }

      return Promise.resolve({ data: [] });
    }

    return Promise.reject(err);
  },
);
