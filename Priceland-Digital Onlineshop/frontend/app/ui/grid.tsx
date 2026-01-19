interface SoftwareItem {
  softwareId: number;   
    name: string;
    version: string;
    preis: number;
    hersteller?: {
      name: string;
    };
}

interface GridProps {
  software: SoftwareItem[];
}

export default function Grid({ software }: GridProps) {
  return (
<div style={{
  display: "grid",
  gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
  gap: "1.5rem",
  marginTop: "1rem"
}}>
  {software.map(item => (
    <div key={item.softwareId} className="admin-card">
      ...
    </div>
  ))}
</div>
  );
}