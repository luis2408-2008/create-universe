import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRightIcon } from "@/components/icons";
import { Theory } from "@shared/schema";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface TheoryCardProps {
  theory: Theory;
}

export function TheoryCard({ theory }: TheoryCardProps) {
  const { title, description, category, imageUrl, author } = theory;
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  // Map category to display name and color
  const categoryMap: Record<string, { label: string, color: string, bgColor: string }> = {
    'scientific': { 
      label: 'Teoría Científica', 
      color: 'bg-space-indigo/10 text-space-indigo',
      bgColor: 'bg-space-indigo/5' 
    },
    'conspiracy': { 
      label: 'Teoría Alternativa', 
      color: 'bg-space-pink/10 text-space-pink',
      bgColor: 'bg-space-pink/5' 
    },
    'fun-fact': { 
      label: 'Curiosidad Cósmica', 
      color: 'bg-space-cyan/10 text-space-cyan',
      bgColor: 'bg-space-cyan/5' 
    },
    'featured': { 
      label: 'Teoría Destacada', 
      color: 'bg-space-purple/10 text-space-purple',
      bgColor: 'bg-space-purple/5' 
    }
  };
  
  const categoryInfo = categoryMap[category] || { 
    label: 'General', 
    color: 'bg-gray-500/10 text-gray-500',
    bgColor: 'bg-gray-500/5'
  };

  // Extended content for each category to show when "Leer más" is clicked
  const extendedContent: Record<string, string> = {
    'scientific': `${description} \n\nEsta teoría científica ha sido objeto de numerosos estudios y experimentos para validar sus postulados. Los científicos continúan investigando y refinando sus principios para alcanzar una comprensión más completa del universo. La evidencia observacional y experimental ha proporcionado respaldo sustancial a sus afirmaciones principales, aunque como toda teoría científica, está sujeta a revisión y mejora continua a medida que se realizan nuevos descubrimientos.`,
    'conspiracy': `${description} \n\nEsta teoría alternativa ha captado la atención de un segmento significativo del público, a pesar de la falta de respaldo por parte de la comunidad científica convencional. Sus proponentes señalan aspectos que, según ellos, las teorías establecidas no logran explicar completamente. Sin embargo, es importante abordar estas ideas con pensamiento crítico y evaluar cuidadosamente la evidencia presentada, distinguiendo entre correlación y causalidad.`,
    'fun-fact': `${description} \n\nEste fascinante dato cósmico revela la sorprendente naturaleza del universo que habitamos. La realidad cósmica frecuentemente supera nuestra imaginación, desafiando nuestro entendimiento común y recordándonos lo vasto y misterioso que sigue siendo el cosmos, incluso con nuestros avances tecnológicos actuales. Los científicos continúan descubriendo nuevas maravillas que expanden nuestra apreciación de la complejidad del universo.`,
    'featured': `${description} \n\nEsta teoría revolucionaria representa uno de los desarrollos más significativos en nuestra comprensión del cosmos. Ha transformado fundamentalmente cómo conceptualizamos el universo y nuestra posición en él. Las implicaciones de esta teoría se extienden más allá de la ciencia pura hacia la filosofía, alterando nuestra perspectiva sobre la realidad y planteando preguntas profundas sobre la naturaleza de la existencia misma.`
  };

  // Texto por defecto si no hay un contenido extendido específico para la categoría
  const defaultExtendedContent = `${description} \n\nEsta fascinante teoría continúa inspirando nuevas investigaciones y planteando importantes preguntas sobre nuestro universo. Los científicos de diversas disciplinas estudian sus implicaciones y buscan evidencia adicional para profundizar nuestra comprensión. Al examinar el cosmos a través de esta perspectiva, obtenemos nuevas visiones que impulsan el avance del conocimiento humano.`;

  // Seleccionar el contenido extendido adecuado según la categoría
  const fullContent = extendedContent[category] || defaultExtendedContent;

  // Truncar la descripción para mostrar solo un fragmento inicialmente
  const shortenedDescription = description.length > 150 
    ? `${description.substring(0, 150)}...` 
    : description;

  return (
    <>
      <Card className="bg-white dark:bg-gray-900 rounded-xl shadow-lg overflow-hidden hover:shadow-cosmic transition-all duration-300 border border-gray-100 dark:border-gray-800">
        <div className="h-48 bg-gray-200 dark:bg-gray-800 relative overflow-hidden">
          <img
            src={imageUrl || '/placeholder-image.jpg'}
            alt={`Representación de ${title}`}
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <Badge variant="outline" className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryInfo.color} border-0`}>
              {categoryInfo.label}
            </Badge>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="text-xl font-bold font-montserrat text-primary dark:text-white mb-3">{title}</h3>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            {isExpanded ? description : shortenedDescription}
          </p>
          {description.length > 150 && !isExpanded && (
            <Button 
              variant="ghost" 
              onClick={() => setIsExpanded(true)} 
              className="p-0 h-auto text-space-indigo hover:text-space-purple transition-colors mb-2"
            >
              Leer más <ArrowRightIcon className="h-4 w-4 ml-1" />
            </Button>
          )}
          {isExpanded && (
            <Button 
              variant="ghost" 
              onClick={() => setIsExpanded(false)} 
              className="p-0 h-auto text-space-indigo hover:text-space-purple transition-colors mb-2"
            >
              Mostrar menos
            </Button>
          )}
        </CardContent>
        <CardFooter className="p-0 px-6 pb-6 flex justify-between items-center">
          {author && (
            <span className="text-xs text-gray-500 dark:text-gray-400 font-space">Autor: {author}</span>
          )}
          <Button 
            variant="outline" 
            onClick={() => setIsDialogOpen(true)}
            className="text-white bg-space-indigo hover:bg-space-purple transition-colors rounded-lg px-4"
          >
            Ver detalle <ArrowRightIcon className="h-4 w-4 ml-1" />
          </Button>
        </CardFooter>
      </Card>

      {/* Dialog for full theory details */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className={`sm:max-w-[700px] ${categoryInfo.bgColor}`}>
          <DialogHeader>
            <DialogTitle className="text-2xl font-montserrat font-bold text-primary dark:text-white">
              {title}
            </DialogTitle>
            <div className="mt-2">
              <Badge variant="outline" className={`text-xs font-semibold px-2.5 py-1 rounded-full ${categoryInfo.color} border-0`}>
                {categoryInfo.label}
              </Badge>
              {author && (
                <span className="text-sm text-gray-500 dark:text-gray-400 ml-2">Por: {author}</span>
              )}
            </div>
          </DialogHeader>
          
          {imageUrl && (
            <div className="w-full h-56 sm:h-72 rounded-lg overflow-hidden my-2">
              <img 
                src={imageUrl} 
                alt={title} 
                className="w-full h-full object-cover" 
              />
            </div>
          )}
          
          <DialogDescription className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap text-base">
            {fullContent}
          </DialogDescription>
          
          <DialogFooter className="flex sm:justify-between">
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Categoría: {categoryInfo.label}
            </div>
            <DialogClose asChild>
              <Button variant="outline" className="sm:mt-0 mt-4">Cerrar</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
