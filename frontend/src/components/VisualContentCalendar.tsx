import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from "lucide-react";
import { SiInstagram, SiFacebook, SiLinkedin, SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";

interface ScheduledPost {
  id: number;
  date: number;
  platform: "Instagram" | "Facebook" | "LinkedIn" | "X";
  icon: any;
  color: string;
  time: string;
  content: string;
  type: string;
}

const scheduledPosts: ScheduledPost[] = [
  { id: 1, date: 2, platform: "Instagram", icon: SiInstagram, color: "bg-white/10 text-white", time: "7:00 PM", content: "New product showcase", type: "Image" },
  { id: 2, date: 2, platform: "Facebook", icon: SiFacebook, color: "bg-white/10 text-white", time: "1:00 PM", content: "Customer testimonial", type: "Video" },
  { id: 3, date: 5, platform: "LinkedIn", icon: SiLinkedin, color: "bg-white/10 text-white", time: "8:00 AM", content: "Industry insights", type: "Article" },
  { id: 4, date: 5, platform: "X", icon: SiX, color: "bg-white/10 text-white", time: "6:30 PM", content: "Quick tip", type: "Text" },
  { id: 5, date: 9, platform: "Instagram", icon: SiInstagram, color: "bg-white/10 text-white", time: "7:00 PM", content: "Behind the scenes", type: "Reel" },
  { id: 6, date: 12, platform: "Facebook", icon: SiFacebook, color: "bg-white/10 text-white", time: "12:00 PM", content: "Flash sale announcement", type: "Image" },
  { id: 7, date: 12, platform: "LinkedIn", icon: SiLinkedin, color: "bg-white/10 text-white", time: "9:00 AM", content: "Company milestone", type: "Text" },
  { id: 8, date: 16, platform: "X", icon: SiX, color: "bg-white/10 text-white", time: "5:00 PM", content: "Trending topic response", type: "Text" },
  { id: 9, date: 16, platform: "Instagram", icon: SiInstagram, color: "bg-white/10 text-white", time: "6:00 PM", content: "User-generated content", type: "Image" },
  { id: 10, date: 19, platform: "Facebook", icon: SiFacebook, color: "bg-white/10 text-white", time: "2:00 PM", content: "Event reminder", type: "Image" },
  { id: 11, date: 19, platform: "LinkedIn", icon: SiLinkedin, color: "bg-white/10 text-white", time: "8:30 AM", content: "Thought leadership", type: "Article" },
  { id: 12, date: 23, platform: "Instagram", icon: SiInstagram, color: "bg-white/10 text-white", time: "7:30 PM", content: "Product tutorial", type: "Reel" },
  { id: 13, date: 23, platform: "X", icon: SiX, color: "bg-white/10 text-white", time: "4:00 PM", content: "Poll question", type: "Poll" },
  { id: 14, date: 26, platform: "Facebook", icon: SiFacebook, color: "bg-white/10 text-white", time: "11:00 AM", content: "Community spotlight", type: "Video" },
  { id: 15, date: 26, platform: "LinkedIn", icon: SiLinkedin, color: "bg-white/10 text-white", time: "7:00 AM", content: "Team achievement", type: "Image" },
  { id: 16, date: 30, platform: "Instagram", icon: SiInstagram, color: "bg-white/10 text-white", time: "6:00 PM", content: "Month in review", type: "Carousel" },
  { id: 17, date: 30, platform: "X", icon: SiX, color: "bg-white/10 text-white", time: "3:00 PM", content: "Month highlights", type: "Thread" },
];

export default function VisualContentCalendar() {
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [currentMonth] = useState({ name: "December", year: 2024 });

  const daysInMonth = 31;
  const firstDayOfWeek = 0; // Sunday
  const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const emptyDays = Array.from({ length: firstDayOfWeek }, (_, i) => i);

  const getPostsForDate = (date: number) => {
    return scheduledPosts.filter(post => post.date === date);
  };

  const selectedDatePosts = selectedDate ? getPostsForDate(selectedDate) : [];

  const platformStats = [
    { name: "Instagram", icon: SiInstagram, count: scheduledPosts.filter(p => p.platform === "Instagram").length, color: "text-white" },
    { name: "Facebook", icon: SiFacebook, count: scheduledPosts.filter(p => p.platform === "Facebook").length, color: "text-white" },
    { name: "LinkedIn", icon: SiLinkedin, count: scheduledPosts.filter(p => p.platform === "LinkedIn").length, color: "text-white" },
    { name: "X", icon: SiX, count: scheduledPosts.filter(p => p.platform === "X").length, color: "text-white" },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-4 gap-4">
        {platformStats.map((platform) => {
          const Icon = platform.icon;
          return (
            <Card key={platform.name} className="bg-slate-800/30 backdrop-blur-sm border-slate-700/50">
              <CardContent className="p-4 text-center">
                <Icon className={`w-6 h-6 ${platform.color} mx-auto mb-2`} />
                <p className="text-2xl font-bold text-white">{platform.count}</p>
                <p className="text-xs text-gray-400">Posts This Month</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-700 rounded-3xl shadow-2xl shadow-black/50">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-white" />
                  {currentMonth.name} {currentMonth.year}
                </h3>
                <div className="flex gap-2">
                  <Button size="icon" variant="outline" className="border-slate-600" data-testid="button-prev-month">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button size="icon" variant="outline" className="border-slate-600" data-testid="button-next-month">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-7 gap-2 mb-2">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                  <div key={day} className="text-center text-xs font-medium text-gray-400 py-2">
                    {day}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 gap-2">
                {emptyDays.map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                
                {daysArray.map((day) => {
                  const postsForDay = getPostsForDate(day);
                  const hasPost = postsForDay.length > 0;
                  const isSelected = selectedDate === day;

                  return (
                    <motion.button
                      key={day}
                      onClick={() => setSelectedDate(day)}
                      className={`aspect-square rounded-lg p-2 text-sm transition-all relative ${
                        isSelected
                          ? "bg-white text-black ring-2 ring-white/50"
                          : hasPost
                          ? "bg-slate-700 text-white hover:bg-slate-600"
                          : "text-gray-400 hover:bg-slate-700/50"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      data-testid={`calendar-day-${day}`}
                    >
                      <span className="font-medium">{day}</span>
                      {hasPost && (
                        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5">
                          {postsForDay.slice(0, 4).map((post, i) => {
                            const Icon = post.icon;
                            return (
                              <div
                                key={i}
                                className="w-1 h-1 rounded-full bg-white"
                              />
                            );
                          })}
                        </div>
                      )}
                    </motion.button>
                  );
                })}
              </div>

              <div className="mt-4 pt-4 border-t border-zinc-700">
                <div className="flex items-center gap-4 text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>Instagram</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>Facebook</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>LinkedIn</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    <span>X</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="bg-gradient-to-b from-zinc-900 to-black border border-zinc-700 rounded-3xl shadow-2xl shadow-black/50">
            <CardContent className="p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                {selectedDate ? `Posts for Dec ${selectedDate}` : "Select a Date"}
              </h3>

              {!selectedDate ? (
                <div className="text-center py-12 text-gray-500">
                  <CalendarIcon className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Click a date to see scheduled posts</p>
                </div>
              ) : selectedDatePosts.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-sm">No posts scheduled for this date</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[500px] overflow-y-auto">
                  {selectedDatePosts.map((post, index) => {
                    const Icon = post.icon;
                    return (
                      <motion.div
                        key={post.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 rounded-lg border bg-white/10 border-white/20"
                        data-testid={`post-${post.id}`}
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-white" />
                            <span className="text-sm font-semibold text-white">{post.platform}</span>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {post.time}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-300 mb-1">{post.content}</p>
                        <p className="text-xs text-gray-500">{post.type}</p>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
