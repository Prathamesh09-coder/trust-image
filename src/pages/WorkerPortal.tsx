import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Upload, Camera, Shield, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const WorkerPortal = () => {
  const [damId, setDamId] = useState("");
  const [workerId, setWorkerId] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateHash = async (file: File): Promise<string> => {
    const arrayBuffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest('SHA-256', arrayBuffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile || !damId || !workerId) {
      toast({
        title: "Missing Information",
        description: "Please fill all fields and select an image",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const imageHash = await generateHash(selectedFile);
      const timestamp = new Date().toISOString();
      
      const submission = {
        id: `TX-${Date.now()}`,
        damId,
        workerId,
        imageHash,
        timestamp,
        status: "pending",
        imageUrl: previewUrl,
      };

      const existingSubmissions = JSON.parse(localStorage.getItem('submissions') || '[]');
      localStorage.setItem('submissions', JSON.stringify([submission, ...existingSubmissions]));

      toast({
        title: "Submission Successful",
        description: `Transaction ID: ${submission.id}`,
      });

      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen gradient-hero p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4 pt-8">
          <div className="flex justify-center">
            <Shield className="h-16 w-16 text-accent animate-pulse-slow" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white">Worker Portal</h1>
          <p className="text-xl text-blue-200">Dam Monitoring Blockchain System</p>
        </div>

        <Card className="shadow-blockchain">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Camera className="h-5 w-5 text-primary" />
              Submit Dam Inspection
            </CardTitle>
            <CardDescription>Upload and verify dam inspection images securely on blockchain</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="workerId">Worker ID</Label>
                  <Input
                    id="workerId"
                    placeholder="e.g., WRK-001"
                    value={workerId}
                    onChange={(e) => setWorkerId(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="damId">Dam ID</Label>
                  <Input
                    id="damId"
                    placeholder="e.g., DAM-2024-001"
                    value={damId}
                    onChange={(e) => setDamId(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Label>Inspection Image</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <label htmlFor="file-upload" className="cursor-pointer">
                    {previewUrl ? (
                      <div className="space-y-4">
                        <img
                          src={previewUrl}
                          alt="Preview"
                          className="max-h-64 mx-auto rounded-lg shadow-lg"
                        />
                        <p className="text-sm text-muted-foreground">Click to change image</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <Upload className="h-12 w-12 mx-auto text-muted-foreground" />
                        <div>
                          <p className="text-lg font-medium">Click to upload image</p>
                          <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB</p>
                        </div>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  "Submitting to Blockchain..."
                ) : (
                  <>
                    <CheckCircle2 className="mr-2 h-5 w-5" />
                    Submit to Blockchain
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-4">
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="pt-6 text-center">
              <Shield className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Immutable</h3>
              <p className="text-sm text-muted-foreground">Records cannot be altered</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="pt-6 text-center">
              <CheckCircle2 className="h-8 w-8 mx-auto mb-2 text-accent" />
              <h3 className="font-semibold">Verified</h3>
              <p className="text-sm text-muted-foreground">Authority approved</p>
            </CardContent>
          </Card>
          <Card className="bg-card/50 backdrop-blur">
            <CardContent className="pt-6 text-center">
              <Camera className="h-8 w-8 mx-auto mb-2 text-primary" />
              <h3 className="font-semibold">Transparent</h3>
              <p className="text-sm text-muted-foreground">Full audit trail</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default WorkerPortal;
