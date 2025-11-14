import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, FileText, BarChart3, Search } from "lucide-react";
import { type Source } from "@/data/sources";

interface SourceModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  source: Source;
}

const typeIcons = {
  study: BookOpen,
  report: FileText,
  survey: BarChart3,
  research: Search,
};

export function SourceModal({ open, onOpenChange, source }: SourceModalProps) {
  const TypeIcon = typeIcons[source.type];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl" data-testid="source-modal">
        <DialogHeader>
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
              <TypeIcon className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <DialogTitle className="text-2xl font-bold mb-2" data-testid="source-modal-title">
                {source.title}
              </DialogTitle>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                <span className="font-medium">{source.organization}</span>
                <span>•</span>
                <span>{source.year}</span>
              </div>
              <Badge variant="secondary" className="capitalize" data-testid="text-source-type">
                {source.type}
              </Badge>
            </div>
          </div>
        </DialogHeader>

        <DialogDescription asChild>
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-foreground mb-2">About this source</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {source.description}
              </p>
            </div>

            {source.url ? (
              <div className="pt-4 border-t">
                <Button
                  variant="default"
                  size="lg"
                  asChild
                  className="w-full"
                  data-testid="button-view-full-source"
                >
                  <a 
                    href={source.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View Full Source
                  </a>
                </Button>
                <p className="text-xs text-muted-foreground text-center mt-3">
                  Opens in a new window
                </p>
              </div>
            ) : (
              <div className="pt-4 border-t">
                <p className="text-sm text-muted-foreground text-center">
                  No external link available for this source
                </p>
              </div>
            )}
          </div>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
}
