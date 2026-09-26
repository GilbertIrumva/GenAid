import { useState } from "react";
import { Play, ExternalLink } from "lucide-react";

export interface GenJobVideo {
  id: string;
  title: string;
  description: string;
  category: string;
  youtubeUrl: string;
}

const genJobsVideos: GenJobVideo[] = [
  {
    id: "AKa99PyFqUg",
    title: "The Launch of Generation Jobs: Unlocking Global Employment Opportunities",
    description:
      "The official launch of Generation Jobs — Generation Aid's dedicated employment initiative connecting skilled refugee and host-community youth with remote global clients.",
    category: "Official Launch",
    youtubeUrl: "https://www.youtube.com/watch?v=AKa99PyFqUg",
  },
  {
    id: "VRoXjJpB854",
    title: "Testimonial: Inspiring Reflection Shared by Michelle Lee",
    description:
      "Listen to the heartfelt and inspiring reflection shared by Michelle Lee on the transformative power and high quality of Generation Jobs' digital talent.",
    category: "Client & Partner Testimonial",
    youtubeUrl: "https://www.youtube.com/watch?v=VRoXjJpB854",
  },
  {
    id: "vIK-iBooRfo",
    title: "Inside Generation Jobs: Remote Delivery & Tech Operations",
    description:
      "A firsthand look at our youth-led BPO teams in Kakuma delivering digital services, data workflows, Amazon account support, and multi-channel customer care.",
    category: "Hub Operations",
    youtubeUrl: "https://www.youtube.com/watch?v=vIK-iBooRfo",
  },
  {
    id: "zAQSZj5t9BA",
    title: "From Training to Global Placement: Real Impact Journeys",
    description:
      "Follow our candidates' journey from intensive digital literacy and vocational training to active, paid contracts with international employers.",
    category: "Talent Story",
    youtubeUrl: "https://youtu.be/zAQSZj5t9BA",
  },
  {
    id: "XObNyIB4znU",
    title: "Global Collaboration & Economic Inclusion from Kakuma",
    description:
      "How international businesses and remote hiring models empower displaced professionals to achieve lasting financial independence and self-reliance.",
    category: "Global Impact",
    youtubeUrl: "https://www.youtube.com/watch?v=XObNyIB4znU",
  },
];

interface GenJobsVideosProps {
  className?: string;
}

export default function GenJobsVideos({ className = "" }: GenJobsVideosProps) {
  const [selectedVideo, setSelectedVideo] = useState<GenJobVideo>(genJobsVideos[0]);

  return (
    <section id="videos" className={`py-12 sm:py-16 bg-slate-50 dark:bg-slate-900/60 border-y border-slate-200/80 dark:border-slate-800 transition-colors ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center mb-10">
          <span className="sir-tag">
            Video Showcase &amp; Stories
          </span>
          <h2 className="mt-3 font-serif text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            See Generation Jobs in Action
          </h2>
          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600 dark:text-slate-300">
            Watch our official launch, hear client testimonials, and explore how our Kakuma digital delivery hub turns skills into global remote employment.
          </p>
        </div>

        {/* Featured Video Player Box */}
        <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-4 sm:p-6 lg:p-8 shadow-lg">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-8 items-start">
            {/* Embedded Video Player */}
            <div className="w-full">
              <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-slate-950 shadow-md border border-slate-800">
                <iframe
                  key={selectedVideo.id}
                  src={`https://www.youtube-nocookie.com/embed/${selectedVideo.id}?rel=0&modestbranding=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full border-0"
                />
              </div>

              <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-50 dark:bg-brand-950/70 text-brand-700 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
                    {selectedVideo.category}
                  </span>
                  <h3 className="mt-2 font-serif text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100">
                    {selectedVideo.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {selectedVideo.description}
                  </p>
                </div>

                <a
                  href={selectedVideo.youtubeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold text-brand-600 dark:text-brand-400 hover:text-brand-800 dark:hover:text-brand-300 bg-brand-50/60 dark:bg-slate-800 border border-brand-200/60 dark:border-slate-700 transition-colors w-fit"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open on YouTube</span>
                </a>
              </div>
            </div>

            {/* Playlist Sidebar */}
            <div className="space-y-3 w-full">
              <p className="text-xs font-extrabold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
                Available Video Playlist ({genJobsVideos.length})
              </p>

              <div className="space-y-2.5 max-h-[480px] overflow-y-auto pr-1">
                {genJobsVideos.map((video) => {
                  const isSelected = video.id === selectedVideo.id;
                  return (
                    <button
                      key={video.id}
                      onClick={() => setSelectedVideo(video)}
                      type="button"
                      className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex gap-3.5 items-start ${
                        isSelected
                          ? "bg-brand-50/90 dark:bg-brand-950/40 border-brand-500 dark:border-brand-500 shadow-xs"
                          : "bg-white dark:bg-slate-800/70 border-slate-200/80 dark:border-slate-800 hover:border-brand-300 dark:hover:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800"
                      }`}
                    >
                      {/* Video Thumbnail Preview */}
                      <div className="relative w-24 sm:w-28 aspect-video shrink-0 rounded-lg overflow-hidden bg-slate-900 border border-slate-700/60 group">
                        <img
                          src={`https://img.youtube.com/vi/${video.id}/mqdefault.jpg`}
                          alt={video.title}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                        <div className={`absolute inset-0 flex items-center justify-center ${isSelected ? "bg-brand-600/30" : "bg-black/30"}`}>
                          <div className="w-6 h-6 rounded-full bg-white/90 text-slate-950 flex items-center justify-center shadow-xs">
                            <Play className="w-3 h-3 fill-current ml-0.5 text-brand-700" />
                          </div>
                        </div>
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full inline-block ${
                          isSelected
                            ? "bg-brand-600 text-white"
                            : "bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                        }`}>
                          {video.category}
                        </span>
                        <h4 className={`mt-1 font-serif text-xs sm:text-sm font-bold leading-snug line-clamp-2 ${
                          isSelected
                            ? "text-brand-900 dark:text-brand-300"
                            : "text-slate-900 dark:text-slate-100"
                        }`}>
                          {video.title}
                        </h4>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
