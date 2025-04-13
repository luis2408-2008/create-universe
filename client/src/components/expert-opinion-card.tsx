import { Card, CardContent } from "@/components/ui/card";
import { QuoteIcon } from "@/components/icons";
import { ExpertOpinion } from "@shared/schema";

interface ExpertOpinionCardProps {
  opinion: ExpertOpinion;
}

export function ExpertOpinionCard({ opinion }: ExpertOpinionCardProps) {
  const { expertName, position, opinion: opinionText, imageUrl } = opinion;

  return (
    <Card className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col sm:flex-row gap-6 transition-all duration-300">
      <div className="sm:w-1/3 flex-shrink-0">
        <div className="aspect-square bg-gray-200 dark:bg-gray-800 rounded-xl overflow-hidden">
          <img 
            src={imageUrl}
            alt={expertName} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="mt-3 text-center sm:text-left">
          <h4 className="font-bold text-primary dark:text-white">{expertName}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{position}</p>
        </div>
      </div>
      <div className="sm:w-2/3">
        <div className="flex mb-4">
          <QuoteIcon className="text-4xl text-accent/30 h-8 w-8" />
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          {opinionText.length > 200 
            ? opinionText.substring(0, 200).split(' ').slice(0, -1).join(' ') + '...'
            : opinionText}
        </p>
        {opinionText.length > 200 && (
          <p className="text-gray-600 dark:text-gray-300">
            {opinionText.substring(200)}
          </p>
        )}
      </div>
    </Card>
  );
}
