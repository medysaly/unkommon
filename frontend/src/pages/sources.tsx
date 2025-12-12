import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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

  const typeColors = {
    study: 'bg-card text-foreground border-border',
    report: 'bg-card text-foreground border-border',
    survey: 'bg-card text-foreground border-border',
    research: 'bg-card text-foreground border-border',
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black">
      {/* Hero Section */}
      <div className="relative py-20 px-4 bg-white dark:bg-black">
        <div className="max-w-4xl mx-auto relative">
          <Badge variant="secondary" className="mb-4 bg-card text-foreground border-border">Research & Citations</Badge>
          <h1 className="text-5xl font-light text-foreground tracking-tight mb-6">
            Research & Sources
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            All statistics and projections on Unkommon are backed by industry research, academic studies,
            and verified reports. We believe in transparency and providing accurate, research-based information.
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="max-w-4xl mx-auto px-4 mb-12">
        <Card className="bg-card border-yellow-500/20">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-yellow-400">Important:</span> While all statistics are from
              verified industry sources, actual results vary by business size, industry, implementation, and
              other factors. Projections are based on industry averages and should not be considered guaranteed outcomes.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Key Statistics Summary */}
      <div className="max-w-4xl mx-auto px-4 mb-16">
        <h2 className="text-3xl font-light text-foreground tracking-tight mb-8">Key Statistics</h2>
        <div className="grid gap-4">
          {statistics.map((stat, index) => {
            const statSources = getSourcesByStatistic(stat.id);
            return (
              <Card key={stat.id} className="bg-card border-border" data-testid={`stat-card-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div className="flex-1">
                      <h3 className="text-lg font-light text-foreground tracking-tight mb-1">{stat.claim}</h3>
                      <div className="text-2xl font-light text-foreground tracking-tight mb-2">{stat.value}</div>
                      {stat.context && (
                        <p className="text-sm text-muted-foreground mb-3">{stat.context}</p>
                      )}
                      {stat.disclaimer && (
                        <p className="text-xs text-yellow-400/80 italic">{stat.disclaimer}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-border">
                    {statSources.map((source) => (
                      <Badge 
                        key={source.id} 
                        variant="outline" 
                        className="text-xs"
                        data-testid={`source-badge-${source.id}`}
                      >
                        {source.organization} ({source.year})
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Categorized Sources */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <h2 className="text-3xl font-light text-foreground tracking-tight mb-8">Source Documentation</h2>
        {Object.entries(groupedSources).map(([category, categorySources]) => (
          <div key={category} className="mb-12">
            <h3 className="text-2xl font-light text-foreground tracking-tight mb-6">{category}</h3>
            <div className="grid gap-4">
              {categorySources.map((source, index) => {
                const Icon = typeIcons[source.type];
                return (
                  <Card key={source.id} className="bg-card border-border" data-testid={`source-card-${index}`}>
                    <CardHeader>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <CardTitle className="text-foreground mb-2">{source.title}</CardTitle>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{source.organization}</span>
                            <span>•</span>
                            <span>{source.year}</span>
                          </div>
                        </div>
                        <Badge variant="outline" className={typeColors[source.type]}>
                          <Icon className="w-3 h-3 mr-1" />
                          {source.type}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{source.description}</p>
                      {source.url && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedSource(source)}
                          className="gap-2"
                          data-testid={`source-link-${source.id}`}
                        >
                          View Full Source <ExternalLink className="w-4 h-4" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Methodology */}
      <div className="max-w-4xl mx-auto px-4 pb-20">
        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-foreground text-2xl font-light tracking-tight">Our Research Methodology</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-muted-foreground">
            <p>
              We prioritize accuracy and transparency in all our claims. Our research process includes:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Citing peer-reviewed academic studies (Harvard, MIT) where available</li>
              <li>Referencing recent industry reports from recognized organizations</li>
              <li>Using 2024-2025 data to ensure current relevance</li>
              <li>Providing context and disclaimers for all projections</li>
              <li>Linking to original sources for verification</li>
              <li>Updating statistics annually as new research becomes available</li>
            </ul>
            <p className="pt-4 text-sm italic">
              Last updated: November 2025. We review and update our sources quarterly to maintain accuracy.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Source Modal */}
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
