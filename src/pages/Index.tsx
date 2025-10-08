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
      
      <div className="relative z-10 text-center max-w-3xl px-6">
        <div className="flex items-center justify-center gap-4 mb-8">
          <BookOpen className="h-20 w-20 text-primary" />
          <h1 className="text-7xl font-bold text-foreground">E-library</h1>
        </div>
        
        <p className="text-3xl font-semibold text-foreground mb-6">
          Your Gateway to Knowledge
        </p>
        
        <p className="text-xl text-muted-foreground mb-14 leading-relaxed">
          Access thousands of books, journals, and digital resources. 
          Join our community and start your learning journey today.
        </p>
        
        <Button
          onClick={() => navigate("/auth")}
          size="lg"
          className="text-lg px-12 py-7 bg-accent hover:bg-accent/90 font-semibold rounded-full shadow-lg"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Index;
