import { motion } from "framer-motion";
import SmartImage from "@/components/SmartImage";

const satisfiedClients = [
  { id: "1", name: "Client Partner 1", logo: "/gen jobs/served clients (1).png" },
  { id: "2", name: "Client Partner 2", logo: "/gen jobs/served clients (2).png" },
  { id: "3", name: "Client Partner 3", logo: "/gen jobs/served clients (3).png" },
  { id: "4", name: "Client Partner 4", logo: "/gen jobs/served clients (4).png" },
  { id: "5", name: "Client Partner 5", logo: "/gen jobs/served clients (5).png" },
  { id: "6", name: "Client Partner 6", logo: "/gen jobs/served clients (1).jpg" },
  { id: "7", name: "Client Partner 7", logo: "/gen jobs/served clients (2).jpg" },
  { id: "8", name: "Client Partner 8", logo: "/gen jobs/served clients (1).jpeg" },
  { id: "9", name: "Client Partner 9", logo: "/gen jobs/served clients (2).jpeg" },
];

interface SatisfiedClientsProps {
  showTitle?: boolean;
  className?: string;
}

export default function SatisfiedClients({
  showTitle = true,
  className = "",
}: SatisfiedClientsProps) {
  // Triplicate the list for seamless infinite loop
  const duplicatedLogos = [
    ...satisfiedClients,
    ...satisfiedClients,
    ...satisfiedClients,
  ];

  return (
    <section className={`relative w-full py-10 sm:py-14 bg-slate-50/70 dark:bg-slate-900/70 border-b border-slate-200/80 dark:border-slate-800 transition-colors ${className}`}>
      {showTitle && (
        <div className="mx-auto max-w-3xl text-center px-4 mb-8">
          <span className="sir-tag">
            Track Record &amp; Trust
          </span>
          <h2 className="mt-2 font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50">
            Satisfied Clients We Have Served
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            Proudly delivering high performance digital services, ecommerce operations, and BPO excellence for international brands and agencies.
          </p>
        </div>
      )}

      {/* Marquee Track Container */}
      <div className="relative py-2 overflow-hidden">
        {/* Soft edge gradient masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-16 sm:w-28 bg-gradient-to-r from-slate-50/90 dark:from-slate-900/90 to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-16 sm:w-28 bg-gradient-to-l from-slate-50/90 dark:from-slate-900/90 to-transparent" />

        <motion.div
          className="flex gap-6 sm:gap-8 items-center w-max"
          animate={{
            x: ["0%", "-33.333333%"],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 28,
              ease: "linear",
            },
          }}
        >
          {duplicatedLogos.map((client, idx) => (
            <div
              key={`${client.id}-${idx}`}
              className="h-20 w-44 sm:h-24 sm:w-52 shrink-0 rounded-2xl bg-white dark:bg-slate-800/95 border border-slate-200/90 dark:border-slate-700/80 shadow-xs hover:shadow-md transition-all duration-300 flex items-center justify-center p-4 group"
            >
              <SmartImage
                src={client.logo}
                alt={client.name}
                fallbackLabel="Client"
                className="max-h-12 sm:max-h-14 max-w-[140px] sm:max-w-[160px] object-contain transition-transform duration-300 group-hover:scale-105"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
