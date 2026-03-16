import { Sparkles } from "lucide-react";

interface PlaceholderSectionProps {
  title: string;
  description: string;
}

export default function PlaceholderSection({ title, description }: PlaceholderSectionProps) {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-display font-bold text-gradient mb-4">{title}</h1>
      <div className="bg-card border border-border rounded-xl p-12 text-center wedding-shadow">
        <Sparkles className="w-14 h-14 text-muted-foreground/20 mx-auto mb-3" />
        <p className="text-muted-foreground font-medium">{description}</p>
        <p className="text-sm text-muted-foreground mt-2">Yeh section jald aa raha hai. ✨</p>
      </div>
    </div>
  );
}
