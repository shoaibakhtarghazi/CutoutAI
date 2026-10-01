import Icon from "./Icon";

export default function Logo({ small = false }) {
  return (
    <span className={`logo ${small ? "logo--sm" : ""}`}>
      <span className="logo__mark">
        <Icon name="sparkles" size={small ? 14 : 18} />
      </span>
      <span className="logo__text">
        Cutout<span>AI</span>
      </span>
    </span>
  );
}
