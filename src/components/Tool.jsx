import { useCallback, useEffect, useState } from "react";
import Icon from "./Icon";
import UploadCard from "./UploadCard";
import PreviewCard from "./PreviewCard";

const MAX_SIZE = 10 * 1024 * 1024; // 10 MB
const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/webp"];

/* ============================================================
   BACKGROUND REMOVAL API
   ============================================================ */

// API key (filhal code ke andar hi hai)
const API_KEY = "sandbox_sk_pr_bg_7d5e8c3b647a75028c6c138095f09787db208966";

// Demo mode: true = fake (2.5 sec wait, original image wapas)
//            false = asli remove.bg API call
const DEMO_MODE = false;

async function removeBackground(file) {
  if (DEMO_MODE) {
    await new Promise((resolve) => setTimeout(resolve, 2500));
    return URL.createObjectURL(file);
  }

  const formData = new FormData();
  formData.append("imageFile", file);          // "image_file" NAHI, "imageFile"
  formData.append("removeBackground", "true"); // Photoroom ka param

  const response = await fetch("https://image-api.photoroom.com/v2/edit", {
    method: "POST",
    headers: {
      "x-api-key": API_KEY,  // chhote "x" aur "api-key"
    },
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Photoroom API Error:", errorText);
    throw new Error("Background remove nahi ho saka. API key ya image check karein.");
  }

  const blob = await response.blob();
  return URL.createObjectURL(blob);
}
export default function Tool() {
  const [file, setFile] = useState(null);
  const [originalUrl, setOriginalUrl] = useState(null);
  const [resultUrl, setResultUrl] = useState(null);
  const [status, setStatus] = useState("idle");
  const [view, setView] = useState("result");
  const [error, setError] = useState("");

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (originalUrl) URL.revokeObjectURL(originalUrl);
    };
  }, [originalUrl]);

  useEffect(() => {
    return () => {
      if (resultUrl) URL.revokeObjectURL(resultUrl);
    };
  }, [resultUrl]);

  const handleSelect = useCallback((f) => {
    if (!ACCEPTED_TYPES.includes(f.type)) {
      setError("Sirf PNG, JPG ya WEBP image upload karein.");
      return;
    }
    if (f.size > MAX_SIZE) {
      setError("File 10MB se bari hai. Choti image select karein.");
      return;
    }
    setError("");
    setFile(f);
    setOriginalUrl(URL.createObjectURL(f));
    setResultUrl(null);
    setView("result");
    setStatus("ready");
  }, []);

  const handleRemove = async () => {
    if (!file || status === "processing") return;
    setStatus("processing");
    setError("");
    try {
      const url = await removeBackground(file);
      setResultUrl(url);
      setView("result");
      setStatus("done");
    } catch (err) {
      setError(
        err.message || "Background remove nahi ho saka. Dobara koshish karein."
      );
      setStatus("ready");
    }
  };

  const reset = () => {
    setFile(null);
    setOriginalUrl(null);
    setResultUrl(null);
    setStatus("idle");
    setError("");
  };

  const processing = status === "processing";

  return (
    <section className="tool" id="upload-stage">
      {!file ? (
        <UploadCard onSelect={handleSelect} error={error} />
      ) : (
        <>
          <PreviewCard
            file={file}
            status={status}
            originalUrl={originalUrl}
            resultUrl={resultUrl}
            view={view}
            setView={setView}
          />

          {error && (
            <p className="error error--center" role="alert">
              <Icon name="alert" size={16} /> {error}
            </p>
          )}

          <div className="actions">
            <button
              type="button"
              className="btn btn--primary btn--lg"
              onClick={handleRemove}
              disabled={processing || status === "done"}
            >
              {processing ? (
                <>
                  <Icon name="loader" size={18} className="spin" />
                  Removing...
                </>
              ) : (
                <>
                  <Icon name="sparkles" size={18} />
                  Remove Background
                </>
              )}
            </button>
            <button
              type="button"
              className="btn btn--ghost btn--lg"
              onClick={reset}
              disabled={processing}
            >
              <Icon name="refresh" size={18} />
              New image
            </button>
          </div>
        </>
      )}
    </section>
  );
}