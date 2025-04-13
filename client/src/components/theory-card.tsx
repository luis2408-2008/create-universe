import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";
import { Theory } from "@shared/schema";

interface TheoryCardProps {
  theory: Theory;
}

export function TheoryCard({ theory }: TheoryCardProps) {
  const { title, description, category, imageUrl, source, year } = theory;
  
  // Map category to display name and color
  const categoryMap: Record<string, { label: string, color: string }> = {
    'scientific': { label: 'Teoría Científica', color: 'bg-secondary/10 text-secondary' },
    'conspiracy': { label: 'Conspiración', color: 'bg-red-500/10 text-red-500' },
    'fun-fact': { label: 'Curiosidad', color: 'bg-green-500/10 text-green-500' },
    'featured': { label: 'Teoría Destacada', color: 'bg-secondary/10 text-secondary' }
  };
  
  const categoryInfo = categoryMap[category] || { label: 'General', color: 'bg-gray-500/10 text-gray-500' };

  return (
    <Card className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="h-48 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
        <img
          src={imageUrl}
          alt={`Representación de ${title}`}
          className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
        />
      </div>
      <CardContent className="p-6">
        <div className="flex items-center mb-2">
          <Badge variant="outline" className={`text-xs font-semibold px-2 py-1 rounded-full ${categoryInfo.color}`}>
            {categoryInfo.label}
          </Badge>
        </div>
        <h3 className="text-xl font-bold font-montserrat text-primary dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {description}
        </p>
      </CardContent>
      <CardFooter className="p-0 px-6 pb-6 flex justify-between items-center">
        {source && year && (
          <span className="text-xs text-gray-500 dark:text-gray-400 font-space">{year} - {source}</span>
        )}
        <Button variant="ghost" className="text-secondary hover:text-accent transition-colors p-0 h-auto">
          Leer más <ArrowRightIcon className="h-4 w-4 ml-1" />
        </Button>
      </CardFooter>
    </Card>
  );
}
