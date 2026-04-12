import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { getCurrentUser, signOut, fetchAuthSession } from "aws-amplify/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import "@/lib/amplify-config";

const API_URL = import.meta.env.VITE_API_URL;

interface Lead {
  id: number;
  leadId: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  message: string;
  createdAt: string;
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [expandedMessages, setExpandedMessages] = useState<Set<string>>(new Set());
  const [user, setUser] = useState<{ username: string } | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const currentUser = await getCurrentUser();
      setUser({ username: currentUser.username });
      fetchLeads();
    } catch (error) {
      console.error("Auth error:", error);
      setLocation("/admin/login");
    }
  };

  const getAuthToken = async () => {
    const session = await fetchAuthSession();
    const idToken = session.tokens?.idToken?.toString();
    if (!idToken) throw new Error("Not authenticated");
    return idToken;
  };

  const fetchLeads = async () => {
    try {
      const idToken = await getAuthToken();

      const response = await fetch(`${API_URL}/api/leads`, {
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch leads");
      }

      const data = await response.json();
      setLeads(data.leads || []);
    } catch (error) {
      console.error("Fetch leads error:", error);
      toast({
        title: "Error",
        description: "Failed to load leads",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteLead = async (leadId: string) => {
    try {
      const idToken = await getAuthToken();
      const response = await fetch(`${API_URL}/api/leads?leadId=${leadId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error("Failed to delete lead");

      setLeads(prev => prev.filter(l => l.leadId !== leadId));
      toast({ title: "Deleted", description: "Lead removed" });
    } catch (error) {
      console.error("Delete error:", error);
      toast({ title: "Error", description: "Failed to delete lead", variant: "destructive" });
    }
  };

  const handleClearAll = async () => {
    setIsDeleting(true);
    try {
      const idToken = await getAuthToken();
      const response = await fetch(`${API_URL}/api/leads`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${idToken}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) throw new Error("Failed to clear leads");

      setLeads([]);
      setShowClearConfirm(false);
      toast({ title: "Cleared", description: "All leads have been deleted" });
    } catch (error) {
      console.error("Clear all error:", error);
      toast({ title: "Error", description: "Failed to clear leads", variant: "destructive" });
    } finally {
      setIsDeleting(false);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut();
      toast({
        title: "Success",
        description: "Logged out successfully",
      });
      setLocation("/admin/login");
    } catch (error) {
      console.error("Logout error:", error);
      toast({
        title: "Error",
        description: "Logout failed",
        variant: "destructive",
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, {user?.username}
            </p>
          </div>
          <Button variant="outline" onClick={handleLogout}>
            Logout
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Leads</CardDescription>
              <CardTitle className="text-4xl">{leads.length}</CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>This Week</CardDescription>
              <CardTitle className="text-4xl">
                {leads.filter((lead) => {
                  const leadDate = new Date(lead.createdAt);
                  const weekAgo = new Date();
                  weekAgo.setDate(weekAgo.getDate() - 7);
                  return leadDate >= weekAgo;
                }).length}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Today</CardDescription>
              <CardTitle className="text-4xl">
                {leads.filter((lead) => {
                  const leadDate = new Date(lead.createdAt);
                  const today = new Date();
                  return leadDate.toDateString() === today.toDateString();
                }).length}
              </CardTitle>
            </CardHeader>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>All Leads</CardTitle>
                <CardDescription>
                  Contact form submissions from your website
                </CardDescription>
              </div>
              {leads.length > 0 && (
                <div>
                  {showClearConfirm ? (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Are you sure?</span>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={handleClearAll}
                        disabled={isDeleting}
                      >
                        {isDeleting ? "Deleting..." : "Yes, delete all"}
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setShowClearConfirm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setShowClearConfirm(true)}
                      className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                    >
                      Clear All
                    </Button>
                  )}
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {leads.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No leads yet
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Phone</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead className="w-[50px]"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leads.map((lead) => (
                      <TableRow key={lead.leadId || lead.id}>
                        <TableCell className="whitespace-nowrap">
                          {formatDate(lead.createdAt)}
                        </TableCell>
                        <TableCell className="font-medium">
                          {lead.name}
                        </TableCell>
                        <TableCell>
                          <a
                            href={`mailto:${lead.email}`}
                            className="text-primary hover:underline"
                          >
                            {lead.email}
                          </a>
                        </TableCell>
                        <TableCell>
                          {lead.phone || (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell>
                          {lead.company || (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                        <TableCell className="max-w-md">
                          <div>
                            <p className={expandedMessages.has(lead.leadId) ? "" : "truncate"}>
                              {lead.message}
                            </p>
                            {lead.message && lead.message.length > 50 && (
                              <button
                                onClick={() => {
                                  setExpandedMessages(prev => {
                                    const next = new Set(prev);
                                    if (next.has(lead.leadId)) {
                                      next.delete(lead.leadId);
                                    } else {
                                      next.add(lead.leadId);
                                    }
                                    return next;
                                  });
                                }}
                                className="text-xs text-primary hover:underline mt-1"
                              >
                                {expandedMessages.has(lead.leadId) ? "Show less" : "Show more"}
                              </button>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <button
                            onClick={() => handleDeleteLead(lead.leadId)}
                            className="text-muted-foreground hover:text-destructive transition-colors"
                            title="Delete lead"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                          </button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
