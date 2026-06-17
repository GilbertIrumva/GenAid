#!/usr/bin/env bash
# One-off: download all external images referenced from the source into
# client/public/img/. Re-running is safe (skips files that already exist).
# Run from the client/ directory:
#   bash scripts/fetch-images.sh
set -e
cd "$(dirname "$0")/.."
ROOT=public/img

mkdir -p "$ROOT/programs" "$ROOT/news" "$ROOT/team" "$ROOT/board" \
  "$ROOT/causes" "$ROOT/stories" "$ROOT/heroes" "$ROOT/home" "$ROOT/site"

dl() {
  local url="$1"
  local dst="$ROOT/$2"
  if [[ -f "$dst" && -s "$dst" ]]; then
    echo "skip   $dst"
    return 0
  fi
  echo "fetch  $dst"
  curl --silent --show-error --location --max-time 60 \
    --user-agent "Mozilla/5.0 (compatible; gnaid-image-fetch/1.0)" \
    -o "$dst" "$url"
}

# --- Programs ----------------------------------------------------------------
dl "https://generationaid.org/wp-content/uploads/2025/10/WhatsApp-Image-2025-09-17-at-22.10.31_0778a7cc.jpg" "programs/computer-literacy.jpg"
dl "https://images.pexels.com/photos/4622414/pexels-photo-4622414.jpeg?auto=compress&cs=tinysrgb&w=1600" "programs/tailoring.jpg"
dl "https://generationaid.org/wp-content/uploads/2025/02/English-skills.png" "programs/english.png"
dl "https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1600&q=80" "programs/hero.jpg"
dl "https://generationaid.org/wp-content/uploads/2025/03/1737728618417-1-1024x768.jpeg" "programs/bpo.jpg"
dl "https://generationaid.org/wp-content/uploads/2025/03/1717174384034.jpeg" "programs/coding-academy.jpg"
dl "https://generationaid.org/wp-content/uploads/2026/06/Screenshot-2026-06-01-174044-1024x585.png" "programs/kap-hero.png"
dl "https://generationaid.org/wp-content/uploads/2026/06/image.png" "programs/kap-1.png"
dl "https://generationaid.org/wp-content/uploads/2026/06/Screenshot-2026-06-01-175056-5-861x1024.png" "programs/kap-2.png"
dl "https://generationaid.org/wp-content/uploads/2026/06/image-1-1024x544.png" "programs/kap-3.png"
dl "https://generationaid.org/wp-content/uploads/2025/03/1724447989836-1-1024x461.jpeg" "programs/artists-painting.jpg"
dl "https://generationaid.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-05-25-at-8.14.02-PM-768x1024.jpeg" "programs/art-portrait.jpg"
dl "https://generationaid.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-05-25-at-8.14.03-PM-1024x768.jpeg" "programs/art-landscape.jpg"
dl "https://generationaid.org/wp-content/uploads/2026/06/1747669564285-1-1024x454.jpg" "programs/artisan-1.jpg"
dl "https://generationaid.org/wp-content/uploads/2026/06/1747669567771-1024x454.jpg" "programs/artisan-2.jpg"
dl "https://generationaid.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-05-25-at-8.43.05-PM-1024x768.jpeg" "programs/senga-gallery.jpg"

# --- News --------------------------------------------------------------------
dl "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600" "news/rli-forum-2025.jpg"
dl "https://images.pexels.com/photos/4145354/pexels-photo-4145354.jpeg?auto=compress&cs=tinysrgb&w=1600" "news/kakuma-ict-cohort-2025.jpg"
dl "https://images.pexels.com/photos/6646919/pexels-photo-6646919.jpeg?auto=compress&cs=tinysrgb&w=1600" "news/globalgiving-spotlight-2025.jpg"
dl "https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1600" "news/tailoring-exchange-2025.jpg"
dl "https://images.pexels.com/photos/8867434/pexels-photo-8867434.jpeg?auto=compress&cs=tinysrgb&w=1600" "news/unhcr-livelihoods-2024.jpg"
dl "https://images.pexels.com/photos/8617715/pexels-photo-8617715.jpeg?auto=compress&cs=tinysrgb&w=1600" "news/founding-story-2023.jpg"

# --- People (team / board / stories — many are reused) ----------------------
# Same source URL is stored under whichever key references it; re-uses point to one file.
dl "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&q=80" "team/programs.jpg"
dl "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80" "team/digital.jpg"
dl "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=600&q=80" "team/community.jpg"
dl "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=600&q=80" "board/chair.jpg"
dl "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80" "board/treasurer.jpg"

# --- Causes ------------------------------------------------------------------
dl "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&q=80" "causes/hub.jpg"
dl "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80" "causes/jobs.jpg"
dl "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80" "causes/artists.jpg"

# --- Stories -----------------------------------------------------------------
dl "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=900&q=80" "stories/leila.jpg"
dl "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&q=80" "stories/yusuf.jpg"
dl "https://images.unsplash.com/photo-1573164574572-cb89e39749b4?w=900&q=80" "stories/fatima.jpg"

# --- Page heroes & misc ------------------------------------------------------
dl "https://images.unsplash.com/photo-1531545514256-b1400bc00f31?w=1600&q=80" "heroes/about.jpg"
dl "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&q=80" "heroes/about-history.jpg"
dl "https://images.unsplash.com/photo-1542810634-71277d95dcbb?w=1200&q=80" "heroes/about-mission.jpg"
dl "https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1600&q=80" "heroes/about-team-cta.jpg"
dl "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1600&q=80" "heroes/blog.jpg"
dl "https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1600&q=80" "heroes/contact.jpg"
dl "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?w=1600&q=80" "heroes/impact.jpg"
dl "https://images.unsplash.com/photo-1532274402911-5a369e4c4bb5?w=1600&q=80" "heroes/not-found.jpg"
dl "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80" "heroes/partners.jpg"
dl "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80" "heroes/stories.jpg"

# Home
dl "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1200&q=80" "home/featured-banner.jpg"

# Shared site background (already fetched if test ran)
dl "https://images.pexels.com/photos/9090820/pexels-photo-9090820.jpeg?auto=compress&cs=tinysrgb&w=1600" "site/bg.jpg"

echo
echo "Done. Image files:"
find "$ROOT" -type f | sort
