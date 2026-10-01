import Icon from "./Icon";

const formatSize = (bytes) =>
  bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;

const STATUS_LABEL = { ready: "Ready", processing: "Processing", done: "Done" };

export default function PreviewCard({ file, status, originalUrl, resultUrl, view, setView }) {
  const base = file.name.replace(/\.[^.]+$/, "");
  const hasResult = status === "done" && !!resultUrl;

  // Agar result aa gaya aur user ne "result" view chuna hai
  const showResult = hasResult && view === "result";

  return (
    
    <div className="preview">
        
      <div className="preview__meta">
        <div className="preview__file">
          <span className="preview__icon"><Icon name="image" size={16} /></span>
          <span className="preview__name" title={file.name}>{file.name}</span>
          <span className="preview__size">{formatSize(file.size)}</span>
        </div>
        <span className={`pill pill--${status}`}>
          <span className="pill__dot" />
          {STATUS_LABEL[status]}
        </span>
      </div>

      {/* STAGE */}
      <div
        className={`stage ${showResult ? "stage--checker" : ""} ${
          showResult ? "is-showing-result" : "is-showing-original"
        }`}
      >
        {/* ORIGINAL IMAGE */}
        <img
          className="stage__img stage__img--original"
          src={originalUrl}
          alt={`Original ${file.name}`}
        />

        {/* RESULT IMAGE — sirf tab render ho jab mil jaye */}
        {hasResult && (
          <img
            className="stage__img stage__img--result"
            src={resultUrl}
            alt={`Background removed ${file.name}`}
          />
        )}

        {status === "processing" && (
          <div className="stage__overlay" role="status" aria-live="polite">
            <div className="stage__tint" />
            <div className="stage__scan" />
            <div className="stage__spinner">
              <span className="stage__ping" />
              <span className="stage__ring">
                <Icon name="loader" size={22} className="spin" />
              </span>
            </div>
            <span className="stage__label">AI is removing the background...</span>
          </div>
        )}
      </div>

      {hasResult && (
        <div className="preview__footer">
          <div className="segmented" role="tablist" aria-label="Compare">
            {[["original", "Original"], ["result", "Result"]].map(([key, label]) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={view === key}
                className={view === key ? "is-active" : ""}
                onClick={() => setView(key)}
              >
                {label}
              </button>
            ))}
          </div>
          <a className="download" href={resultUrl} download={`${base}-cutout.png`}>
            <Icon name="download" size={16} />
            Download
          </a>
        </div>
      )}
    </div>
  );
}