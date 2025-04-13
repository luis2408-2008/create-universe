import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { PlayIcon, BookmarkIcon, EyeIcon, TimeIcon } from "@/components/icons";
import { Video } from "@shared/schema";

interface VideoCardProps {
  video: Video;
}

export function VideoCard({ video }: VideoCardProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { title, description, thumbnailUrl, videoUrl, duration, views } = video;
  
  // Format views (e.g., 1200000 -> 1.2M)
  const formatViews = (num: number) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <Card className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      <div className="relative aspect-video bg-gray-200 dark:bg-gray-800">
        <img 
          src={thumbnailUrl} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="absolute inset-0 m-auto bg-accent/90 hover:bg-accent text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 w-14 h-14"
            >
              <PlayIcon className="h-6 w-6" />
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-0 bg-black">
            <div className="relative pb-[56.25%] h-0">
              <iframe 
                src={`${videoUrl}?autoplay=1`} 
                title={title}
                className="absolute top-0 left-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </DialogContent>
        </Dialog>
      </div>
      <CardContent className="p-5">
        <h3 className="text-xl font-bold font-montserrat text-primary dark:text-white mb-2">{title}</h3>
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">
          {description}
        </p>
      </CardContent>
      <CardFooter className="px-5 pb-5 pt-0 flex items-center justify-between">
        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
          <TimeIcon className="h-3 w-3 mr-1" /> {duration}
        </span>
        <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center">
          <EyeIcon className="h-3 w-3 mr-1" /> {formatViews(views)} visualizaciones
        </span>
        <Button variant="ghost" size="icon" className="text-secondary hover:text-accent transition-colors">
          <BookmarkIcon className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
