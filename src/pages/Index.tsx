import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Database, Lock, CheckCircle2, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 md:py-32">
          <div className="text-center space-y-8">
            <div className="flex justify-center">
              <Shield className="h-24 w-24 text-accent animate-float" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
              Dam Monitoring
              <br />
              <span className="text-accent">Blockchain System</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Immutable, transparent, and secure infrastructure monitoring powered by blockchain technology
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
              <Button
                size="lg"
                onClick={() => navigate('/worker')}
                className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6"
              >
                <Users className="mr-2 h-5 w-5" />
                Worker Portal
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="bg-white/10 text-white border-white hover:bg-white/20 text-lg px-8 py-6"
              >
                <Shield className="mr-2 h-5 w-5" />
                Authority Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-4xl font-bold">System Features</h2>
          <p className="text-xl text-muted-foreground">Built on Hyperledger Fabric for maximum security</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-lg hover:shadow-blockchain transition-shadow">
            <CardHeader>
              <Lock className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Immutable Records</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Once submitted, inspection records cannot be altered or deleted, ensuring data integrity
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-blockchain transition-shadow">
            <CardHeader>
              <CheckCircle2 className="h-12 w-12 text-accent mb-4" />
              <CardTitle>Authority Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Multi-level verification process ensures only authorized personnel can approve submissions
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-blockchain transition-shadow">
            <CardHeader>
              <Database className="h-12 w-12 text-primary mb-4" />
              <CardTitle>Decentralized Storage</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Images stored off-chain (IPFS) with cryptographic hashes on blockchain for verification
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="shadow-lg hover:shadow-blockchain transition-shadow">
            <CardHeader>
              <Shield className="h-12 w-12 text-accent mb-4" />
              <CardTitle>Complete Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>
                Full audit trail of all submissions, verifications, and modifications available to stakeholders
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        <div className="mt-20 space-y-12">
          <div className="text-center space-y-4">
            <h2 className="text-4xl font-bold">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple three-step process for secure dam monitoring</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative">
              <Card className="gradient-card shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                      1
                    </div>
                    <Users className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Worker Submission</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Field workers capture dam inspection images and submit them with their credentials. Each image is hashed using SHA-256.
                  </CardDescription>
                </CardContent>
              </Card>
              <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2">
                <ArrowRight className="h-8 w-8 text-primary" />
              </div>
            </div>

            <div className="relative">
              <Card className="gradient-card shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-bold">
                      2
                    </div>
                    <Database className="h-8 w-8 text-accent" />
                  </div>
                  <CardTitle>Blockchain Recording</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Metadata and image hash are permanently recorded on Hyperledger Fabric blockchain with timestamp and worker ID.
                  </CardDescription>
                </CardContent>
              </Card>
              <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2">
                <ArrowRight className="h-8 w-8 text-accent" />
              </div>
            </div>

            <div>
              <Card className="gradient-card shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-12 w-12 rounded-full bg-primary text-white flex items-center justify-center text-xl font-bold">
                      3
                    </div>
                    <Shield className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle>Authority Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Authorized personnel review submissions and verify authenticity. Status updates are recorded immutably.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Card className="mt-20 bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
          <CardContent className="pt-12 pb-12 text-center space-y-6">
            <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Join the future of infrastructure monitoring with blockchain-powered transparency and security
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" onClick={() => navigate('/worker')} className="text-lg px-8 py-6">
                Access Worker Portal
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/dashboard')}
                className="text-lg px-8 py-6"
              >
                View Dashboard
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
