import Icon from "./Icon";

const FEATURES = [
  { icon: "zap", label: "Results in seconds" },
  { icon: "sparkles", label: "Edge-aware precision" },
  { icon: "shield", label: "Private & secure" },
];

export default function Hero() {
  return (
    <section className="hero">
      <span className="hero__eyebrow">
        <span className="hero__dot" /> AI Background Remover
      </span>
      <h1>Remove Background</h1>
      <p>Upload an image and remove its background with AI.</p>
      <ul className="hero__features">
        {FEATURES.map((f) => (
          <li key={f.label}>
            <Icon name={f.icon} size={16} />
            {f.label}
          </li>
        ))}
      </ul>
    </section>
  );
}
