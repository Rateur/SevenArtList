"use client";

import * as React from "react";
import { Star, Check, Plus, Loader2, Trash2 } from "lucide-react";
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from "@/components/ui/popover";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button, buttonVariants } from "@/components/ui/button";
import { upsertWatchlistItemAction, removeWatchlistItemAction, WatchlistStatus } from "@/app/actions/watchlist";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface WatchlistButtonProps {
  tmdbId: number;
  mediaType: "movie" | "tv";
  initialData?: {
    status: WatchlistStatus;
    rating: number | null;
  } | null;
  onUpdate?: () => void;
}

const statusLabels: Record<WatchlistStatus, { label: string; icon: string }> = {
  to_watch: { label: "À voir", icon: "👀" },
  in_progress: { label: "En cours", icon: "▶️" },
  completed: { label: "Terminé", icon: "✅" },
  dropped: { label: "Abandonné", icon: "⏳" },
};

export function WatchlistButton({ 
  tmdbId, 
  mediaType, 
  initialData,
  onUpdate 
}: WatchlistButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();
  const [status, setStatus] = React.useState<WatchlistStatus>(initialData?.status || "to_watch");
  const [rating, setRating] = React.useState<number>(initialData?.rating || 0);
  const [hoverRating, setHoverRating] = React.useState<number>(0);

  // Sync state when initialData changes
  React.useEffect(() => {
    if (initialData) {
      setStatus(initialData.status);
      setRating(initialData.rating || 0);
    }
  }, [initialData]);

  const handleSave = () => {
    startTransition(async () => {
      try {
        await upsertWatchlistItemAction(tmdbId, mediaType, status, rating > 0 ? rating : undefined);
        toast.success("Liste mise à jour !");
        setIsOpen(false);
        onUpdate?.();
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Une erreur est survenue.";
        toast.error(message);
      }
    });
  };

  const handleRemove = () => {
    startTransition(async () => {
      try {
        await removeWatchlistItemAction(tmdbId, mediaType);
        toast.info("Retiré de votre liste.");
        setIsOpen(false);
        onUpdate?.();
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : "Une erreur est survenue.";
        toast.error(message);
      }
    });
  };

  const currentLabel = initialData ? statusLabels[initialData.status] : null;
  const starDisplay = initialData?.rating ? Math.round(initialData.rating / 20) : null;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger
        className={cn(
          buttonVariants({ variant: initialData ? "secondary" : "outline" }),
          "w-full sm:w-fit h-11 px-6 gap-2 text-sm font-medium transition-all shadow-lg",
          initialData 
            ? "bg-zinc-800 text-zinc-100 border-zinc-700 hover:bg-zinc-700 hover:border-zinc-600" 
            : "border-zinc-800 hover:bg-zinc-800 text-zinc-300 hover:text-white"
        )}
      >
        {initialData ? (
          <>
            <Check className="h-4 w-4 text-green-500" />
            <span>{currentLabel?.icon} {currentLabel?.label}</span>
            {starDisplay && (
              <span className="ml-1 text-yellow-500 flex items-center gap-0.5">
                <Star className="h-3 w-3 fill-current" />
                {starDisplay}/5
              </span>
            )}
          </>
        ) : (
          <>
            <Plus className="h-4 w-4" />
            <span>Ajouter à ma liste</span>
          </>
        )}
      </PopoverTrigger>

      <PopoverContent className="w-80 p-4 bg-zinc-950 border-zinc-800 text-zinc-100 shadow-2xl rounded-2xl">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500">Statut</label>
            <Select value={status} onValueChange={(v) => setStatus(v as WatchlistStatus)}>
              <SelectTrigger className="bg-zinc-900 border-zinc-800 focus:ring-violet-500/20 h-10 rounded-xl transition-all">
                <SelectValue placeholder="Choisir un statut" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-800 rounded-xl overflow-hidden">
                {Object.entries(statusLabels).map(([key, { label, icon }]) => (
                  <SelectItem 
                    key={key} 
                    value={key}
                    className="focus:bg-zinc-800 focus:text-white transition-colors py-2.5"
                  >
                    <span className="mr-2">{icon}</span> {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-zinc-500 block">Ma Note</label>
            <div className="flex items-center gap-1 py-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onMouseEnter={() => setHoverRating(star * 20)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star * 20)}
                  className="transition-all hover:scale-125 active:scale-95 focus:outline-none"
                >
                  <Star 
                    className={cn(
                      "h-7 w-7 transition-colors",
                      (hoverRating || rating) >= star * 20 
                        ? "fill-yellow-500 text-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]" 
                        : "text-zinc-700"
                    )} 
                  />
                </button>
              ))}
              {rating > 0 && (
                <button 
                  onClick={() => setRating(0)}
                  className="ml-auto text-[10px] text-zinc-500 hover:text-zinc-300 transition-colors uppercase font-bold tracking-tighter"
                >
                  Effacer
                </button>
              )}
            </div>
          </div>

          <div className="pt-2 space-y-3">
            <Button 
              onClick={handleSave} 
              disabled={isPending}
              className="w-full h-11 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold rounded-xl shadow-lg shadow-violet-950/20 transition-all active:scale-95"
            >
              {isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Enregistrer"}
            </Button>
            
            {initialData && (
              <Button 
                variant="ghost" 
                onClick={handleRemove}
                disabled={isPending}
                className="w-full text-zinc-500 hover:text-red-400 hover:bg-red-950/20 h-10 rounded-xl transition-all gap-2 text-xs font-bold uppercase tracking-widest"
              >
                <Trash2 className="h-3.5 w-3.5" />
                Retirer de la liste
              </Button>
            )}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
