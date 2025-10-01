import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Shield, CheckCircle2, XCircle, Clock, FileText } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Submission {
  id: string;
  damId: string;
  workerId: string;
  imageHash: string;
  timestamp: string;
  status: "pending" | "verified" | "rejected";
  imageUrl: string;
  authorityId?: string;
  verifiedAt?: string;
}

const AuthorityDashboard = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = () => {
    const stored = localStorage.getItem('submissions');
    if (stored) {
      setSubmissions(JSON.parse(stored));
    }
  };

  const handleVerify = (submission: Submission, status: "verified" | "rejected") => {
    const updatedSubmissions = submissions.map(sub => 
      sub.id === submission.id 
        ? { 
            ...sub, 
            status, 
            authorityId: "AUTH-001",
            verifiedAt: new Date().toISOString()
          }
        : sub
    );
    
    localStorage.setItem('submissions', JSON.stringify(updatedSubmissions));
    setSubmissions(updatedSubmissions);
    setIsDialogOpen(false);
    
    toast({
      title: status === "verified" ? "Submission Verified" : "Submission Rejected",
      description: `Transaction ${submission.id} has been ${status}`,
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified": return "bg-green-500";
      case "rejected": return "bg-red-500";
      default: return "bg-yellow-500";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified": return <CheckCircle2 className="h-4 w-4" />;
      case "rejected": return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const stats = {
    total: submissions.length,
    pending: submissions.filter(s => s.status === "pending").length,
    verified: submissions.filter(s => s.status === "verified").length,
    rejected: submissions.filter(s => s.status === "rejected").length,
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Shield className="h-10 w-10 text-primary" />
            <div>
              <h1 className="text-4xl font-bold">Authority Dashboard</h1>
              <p className="text-muted-foreground">Review and verify dam inspection submissions</p>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-3xl font-bold">{stats.total}</p>
                </div>
                <FileText className="h-8 w-8 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-3xl font-bold text-yellow-600">{stats.pending}</p>
                </div>
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Verified</p>
                  <p className="text-3xl font-bold text-green-600">{stats.verified}</p>
                </div>
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                  <p className="text-3xl font-bold text-red-600">{stats.rejected}</p>
                </div>
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submission Queue</CardTitle>
            <CardDescription>Click on any submission to review details</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[600px]">
              <div className="space-y-4 pr-4">
                {submissions.length === 0 ? (
                  <div className="text-center py-12 text-muted-foreground">
                    <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p>No submissions yet</p>
                  </div>
                ) : (
                  submissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="flex items-center gap-4 p-4 border rounded-lg hover:bg-accent/50 cursor-pointer transition-colors"
                      onClick={() => {
                        setSelectedSubmission(submission);
                        setIsDialogOpen(true);
                      }}
                    >
                      <img
                        src={submission.imageUrl}
                        alt="Dam inspection"
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-mono text-sm font-semibold">{submission.id}</p>
                          <Badge className={getStatusColor(submission.status)}>
                            {getStatusIcon(submission.status)}
                            <span className="ml-1">{submission.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Dam: {submission.damId} | Worker: {submission.workerId}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(submission.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Review Submission</DialogTitle>
            <DialogDescription>Verify the authenticity and quality of the submission</DialogDescription>
          </DialogHeader>
          {selectedSubmission && (
            <div className="space-y-6">
              <img
                src={selectedSubmission.imageUrl}
                alt="Dam inspection"
                className="w-full rounded-lg shadow-lg"
              />
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Transaction ID</p>
                  <p className="font-mono font-semibold">{selectedSubmission.id}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge className={getStatusColor(selectedSubmission.status)}>
                    {selectedSubmission.status}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Dam ID</p>
                  <p className="font-semibold">{selectedSubmission.damId}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Worker ID</p>
                  <p className="font-semibold">{selectedSubmission.workerId}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Image Hash (SHA-256)</p>
                  <p className="font-mono text-xs break-all">{selectedSubmission.imageHash}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Timestamp</p>
                  <p className="text-sm">{new Date(selectedSubmission.timestamp).toLocaleString()}</p>
                </div>
              </div>
              {selectedSubmission.status === "pending" && (
                <div className="flex gap-4">
                  <Button
                    className="flex-1"
                    onClick={() => handleVerify(selectedSubmission, "verified")}
                  >
                    <CheckCircle2 className="mr-2 h-4 w-4" />
                    Verify
                  </Button>
                  <Button
                    variant="destructive"
                    className="flex-1"
                    onClick={() => handleVerify(selectedSubmission, "rejected")}
                  >
                    <XCircle className="mr-2 h-4 w-4" />
                    Reject
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthorityDashboard;
