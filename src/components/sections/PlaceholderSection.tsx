interface PlaceholderSectionProps {
  title: string;
  description: string;
}

export default function PlaceholderSection({ title, description }: PlaceholderSectionProps) {
  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl font-bold text-gradient mb-4">{title}</h1>
      <div className="bg-card border border-border rounded-lg p-10 text-center">
        <p className="text-muted-foreground">{description}</p>
        <p className="text-sm text-muted-foreground mt-2">This section is coming soon.</p>
      </div>
    </div>
  );
}
