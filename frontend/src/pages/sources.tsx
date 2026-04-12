import { Badge } from "@/components/ui/badge";
import { ExternalLink, BookOpen, FileText, BarChart3, Search } from "lucide-react";
import { sources, statistics, getSourcesByStatistic, type Source } from "@/data/sources";
import { SourceModal } from "@/components/SourceModal";
import { useState } from "react";

export default function Sources() {
  const [selectedSource, setSelectedSource] = useState<Source | null>(null);
  const groupedSources = {
    'Lead Response & Conversion': sources.filter(s =>
      s.id.includes('lead') || s.id.includes('velocify') || s.id.includes('insidesales')
    ),
    'AI Cost Savings & ROI': sources.filter(s =>
      s.id.includes('mckinsey') || s.id.includes('gartner') || s.id.includes('deloitte') || s.id.includes('roi') || s.id.includes('ibm')
    ),
    'Customer Service Benchmarks': sources.filter(s =>
      s.id.includes('social')
    ),
  };

  const typeIcons = {
    study: BookOpen,
    report: FileText,
    survey: BarChart3,
    research: Search,
  };

  return (
    <div>
      {/* Hero */}
      <section className="bg-background px-6 lg:px-10 pt-16 pb-16">
        <div className="max-w-3xl mx-auto">
          <Badge className="mb-4 bg-border text-secondary-foreground border-0 text-[12px]">Research & Citations</Badge>
          <h1 className="text-[clamp(2rem,4vw,3rem)] font-normal text-foreground tracking-[-0.04em] leading-[1.1] mb-4">
            Research & Sources
          </h1>
          <p className="text-[17px] text-secondary-foreground leading-relaxed">
            All statistics and projections on Unkommon are backed by industry research, academic studies,
            and verified reports.
          </p>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-white px-6 lg:px-10 pt-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-background rounded-xl border border-border p-6">
            <p className="text-[14px] text-secondary-foreground">
              <span className="font-medium text-foreground">Important:</span> While all statistics are from
              verified industry sources, actual results vary by business size, industry, implementation, and
              other factors.
            </p>
          </div>
        </div>
      </section>

      {/* Key Statistics */}
      <section className="bg-white px-6 lg:px-10 py-12">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-normal text-foreground tracking-tight mb-8">Key Statistics</h2>
          <div className="space-y-4">
            {statistics.map((stat) => {
              const statSources = getSourcesByStatistic(stat.id);
              return (
                <div key={stat.id} className="p-6 bg-background rounded-xl border border-border">
                  <h3 className="text-[15px] text-foreground mb-1">{stat.claim}</h3>
                  <div className="text-2xl font-normal text-foreground tracking-tight mb-2">{stat.value}</div>
                  {stat.context && <p className="text-[13px] text-muted-foreground mb-3">{stat.context}</p>}
                  {stat.disclaimer && <p className="text-[12px] text-muted-foreground/70 italic mb-3">{stat.disclaimer}</p>}
                  <div className="flex flex-wrap gap-2 pt-3 border-t border-border">
                    {statSources.map((source) => (
                      <Badge key={source.id} variant="outline" className="text-[11px] border-border text-muted-foreground">
                        {source.organization} ({source.year})
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Categorized Sources */}
      <section className="bg-white px-6 lg:px-10 pb-20">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-normal text-foreground tracking-tight mb-8">Source Documentation</h2>
          {Object.entries(groupedSources).map(([category, categorySources]) => (
            <div key={category} className="mb-12">
              <h3 className="text-xl font-normal text-foreground tracking-tight mb-6">{category}</h3>
              <div className="space-y-4">
                {categorySources.map((source) => {
                  const Icon = typeIcons[source.type];
                  return (
                    <div key={source.id} className="p-6 bg-background rounded-xl border border-border">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h4 className="text-[15px] font-medium text-foreground">{source.title}</h4>
                        <Badge className="bg-border text-secondary-foreground border-0 text-[11px] flex-shrink-0">
                          <Icon className="w-3 h-3 mr-1" />
                          {source.type}
                        </Badge>
                      </div>
                      <p className="text-[13px] text-muted-foreground mb-3">{source.organization} &middot; {source.year}</p>
                      <p className="text-[14px] text-secondary-foreground leading-relaxed mb-4">{source.description}</p>
                      {source.url && (
                        <button
                          onClick={() => setSelectedSource(source)}
                          className="text-[13px] text-foreground hover:opacity-60 transition-opacity flex items-center gap-1"
                        >
                          View Source <ExternalLink className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {selectedSource && (
        <SourceModal
          open={!!selectedSource}
          onOpenChange={(open) => !open && setSelectedSource(null)}
          source={selectedSource}
        />
      )}
    </div>
  );
}
