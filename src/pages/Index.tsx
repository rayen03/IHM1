import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookOpen } from "lucide-react";
import libraryBg from "@/assets/library-bg.jpg";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div 
      className="flex min-h-screen items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: `url(${libraryBg})` }}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      
      <div className="relative z-10 text-center max-w-2xl px-4">
        <div className="flex items-center justify-center gap-3 mb-6">
          <BookOpen className="h-16 w-16 text-primary" />
          <h1 className="text-6xl font-bold text-foreground">E-library</h1>
        </div>
        
        <p className="text-2xl text-foreground mb-8">
          Your gateway to knowledge and discovery
        </p>
        
        <p className="text-lg text-muted-foreground mb-12">
          Access thousands of books, journals, and digital resources. 
          Start your learning journey today.
        </p>
        
        <Button
          onClick={() => navigate("/auth")}
          size="lg"
          className="text-lg px-8 py-6 bg-accent hover:bg-accent/90"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
