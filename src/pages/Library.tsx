import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User, Session } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BookOpen, Search, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import BookCard from "@/components/BookCard";

const Library = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Sample book data
  const books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald", year: "1925" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee", year: "1960" },
    { id: 3, title: "1984", author: "George Orwell", year: "1949" },
    { id: 4, title: "Pride and Prejudice", author: "Jane Austen", year: "1813" },
    { id: 5, title: "The Catcher in the Rye", author: "J.D. Salinger", year: "1951" },
    { id: 6, title: "Animal Farm", author: "George Orwell", year: "1945" },
    { id: 7, title: "Lord of the Flies", author: "William Golding", year: "1954" },
    { id: 8, title: "Brave New World", author: "Aldous Huxley", year: "1932" },
  ];

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (!session?.user) {
          navigate("/auth");
        }
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      
      if (!session?.user) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      toast({
        title: "Error",
        description: "Failed to log out",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Logged out",
        description: "You've been successfully logged out",
      });
      navigate("/auth");
    }
  };

  const getUserName = () => {
    return user?.user_metadata?.full_name || user?.email?.split("@")[0] || "User";
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <BookOpen className="h-10 w-10 text-primary" />
            <h1 className="text-3xl font-bold text-primary">E-library</h1>
          </div>
          
          <div className="flex items-center gap-6">
            <span className="text-foreground font-medium hidden sm:inline">
              Welcome, {getUserName()}
            </span>
            <Button
              onClick={handleLogout}
              variant="default"
              className="bg-accent hover:bg-accent/90 h-10 px-6 font-semibold"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-10">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            Discover Your Next Read
          </h2>
          
          {/* Search Bar */}
          <div className="max-w-3xl mx-auto relative">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for books, authors, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-14 pr-20 h-16 text-lg rounded-full border-2 border-border focus-visible:ring-2 focus-visible:ring-primary shadow-sm"
            />
            <Button
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-12 px-6 bg-accent hover:bg-accent/90 font-semibold"
            >
              Search
            </Button>
          </div>
        </div>

        {/* Books Section */}
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-6">Available Books</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {books.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                year={book.year}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Library;
