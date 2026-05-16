import { Play, Upload } from "lucide-react";
import { useRef, useState } from "react";

export function PitchVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [hasVideo] = useState(false); // Switch to true when /pitch.mp4 is added to /public

  const handlePlay = () => {
    videoRef.current?.play();
    setPlaying(true);
  };

  return (
    <div className="relative group">
      <div className="absolute -inset-1 rounded-2xl bg-[var(--gradient-accent)] opacity-40 blur-2xl animate-pulse-glow" />
      <div className="relative aspect-[4/5] rounded-2xl overflow-hidden border border-border bg-surface shadow-[var(--shadow-elevated)]">
        {hasVideo ? (
          <>
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              src="/pitch.mp4"
              poster="/pitch-poster.jpg"
              controls={playing}
              onEnded={() => setPlaying(false)}
            />
            {!playing && (
              <button
                onClick={handlePlay}
                className="absolute inset-0 flex items-center justify-center bg-background/30 backdrop-blur-[2px] hover:bg-background/20 transition"
              >
                <span className="w-20 h-20 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-[var(--shadow-glow)] group-hover:scale-110 transition-transform">
                  <Play className="w-8 h-8 ml-1" fill="currentColor" />
                </span>
              </button>
            )}
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-6 p-8 text-center bg-grid">
            <div className="absolute inset-0 bg-[var(--gradient-hero)]" />
            <div className="relative w-20 h-20 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center backdrop-blur-sm">
              <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
            </div>
            <div className="relative space-y-3 max-w-xs">
              <p className="font-display text-xl font-semibold">Elevator Pitch</p>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Hier kommt dein 60-Sekunden-Video. Lade die Datei als
                <code className="mx-1 px-1.5 py-0.5 rounded bg-secondary text-foreground text-xs">
                  pitch.mp4
                </code>
                in den <code className="mx-1 px-1.5 py-0.5 rounded bg-secondary text-foreground text-xs">public/</code> Ordner und setze
                <code className="mx-1 px-1.5 py-0.5 rounded bg-secondary text-foreground text-xs">hasVideo</code>
                auf <code className="text-primary">true</code>.
              </p>
              <div className="inline-flex items-center gap-2 text-xs text-primary font-medium pt-2">
                <Upload className="w-3.5 h-3.5" /> Platzhalter aktiv
              </div>
            </div>
          </div>
        )}
      </div>
      {/* Floating tag */}
      <div className="absolute -bottom-4 -right-4 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-display font-semibold tracking-wide shadow-[var(--shadow-glow)]">
        ▶ 60 Sek. Pitch
      </div>
    </div>
  );
}
