import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { getSourcesByStatistic, type Source } from "@/data/sources";
import { FileText } from "lucide-react";
import { SourceModal } from "./SourceModal";
import { useState } from "react";

interface CitationProps {
  statisticId: string;
  inline?: boolean;
}

export function Citation({ statisticId, inline = true }: CitationProps) {
  const sources = getSourcesByStatistic(statisticId);
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const [popoverOpen, setPopoverOpen] = useState(false);
  
  if (sources.length === 0) return null;

  const citationNumbers = sources.map((_, index) => index + 1).join(',');
  
  const handleSourceClick = (source: Source, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setPopoverOpen(false);
    setSelectedSource(source);
  };
  
  const popoverContent = (
    <div className="space-y-2 max-w-xs">
      {sources.map((source, index) => (
        <div key={source.id} className="text-xs">
          <div className="font-semibold">
            [{index + 1}] {source.title}
          </div>
          <div className="text-muted-foreground">
            {source.organization}, {source.year}
          </div>
          {source.url && (
            <button 
              onClick={(e) => handleSourceClick(source, e)}
              className="text-primary hover:text-primary/80 inline-flex items-center gap-1 mt-1 transition-colors"
              data-testid={`button-view-source-${source.id}`}
            >
              View Source <FileText className="w-3 h-3" />
            </button>
          )}
        </div>
      ))}
    </div>
  );

  if (inline) {
    return (
      <>
        <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
          <PopoverTrigger asChild>
            <sup 
              className="text-blue-400 cursor-pointer hover:text-blue-300 transition-colors ml-0.5"
              data-testid={`citation-${statisticId}`}
            >
              [{citationNumbers}]
            </sup>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            {popoverContent}
          </PopoverContent>
        </Popover>
        
        {selectedSource && (
          <SourceModal
            open={!!selectedSource}
            onOpenChange={(open) => !open && setSelectedSource(null)}
            source={selectedSource}
          />
        )}
      </>
    );
  }

  return null;
}
