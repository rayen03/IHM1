import { Card } from "@/components/ui/card";
import { Eye, Download } from "lucide-react";
import bookPlaceholder from "@/assets/book-placeholder.jpg";

interface BookCardProps {
  title: string;
  author: string;
  year: string;
}

const BookCard = ({ title, author, year }: BookCardProps) => {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-all duration-300 border-secondary/30">
      <div className="relative aspect-[3/4] overflow-hidden">
        <img
          src={bookPlaceholder}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="p-4 bg-secondary/80 backdrop-blur-sm">
        <h3 className="font-semibold text-secondary-foreground truncate mb-1">
          Titre: {title}
        </h3>
        <p className="text-sm text-secondary-foreground/80 truncate mb-1">
          Auteur: {author}
        </p>
        <p className="text-sm text-secondary-foreground/80 mb-3">
          Année: {year}
        </p>
        <div className="flex gap-2">
          <button className="p-2 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground transition-colors">
            <Eye className="h-4 w-4" />
          </button>
          <button className="p-2 rounded-full bg-accent hover:bg-accent/90 text-accent-foreground transition-colors">
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
