import { useRef, useState } from "react";
import Icon from "./Icon";

export default function UploadCard({ onSelect, error }) {
  const inputRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) onSelect(file);
  };

  return (
    <div
      className={`upload ${dragging ? "is-dragging" : ""}`}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <div className="upload__badge">
        <Icon name="upload" size={28} />
      </div>
      <h2 className="upload__title">Upload your image</h2>
      <p className="upload__sub">Drag & drop karein ya button se select karein</p>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        hidden
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onSelect(file);
          e.target.value = ""; // same file dobara choose ho sake
        }}
      />
      <button type="button" className="btn btn--primary" onClick={() => inputRef.current?.click()}>
        <Icon name="plus" size={18} />
        Upload Image
      </button>

      <p className="upload__meta">PNG, JPG, WEBP · Max 10MB</p>

      {error && (
        <p className="error" role="alert">
          <Icon name="alert" size={16} /> {error}
        </p>
      )}
    </div>
  );
}
