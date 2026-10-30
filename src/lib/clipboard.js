import { useCallback, useEffect, useState } from "react";

/**
 * Copy text to the clipboard with a graceful fallback.
 *
 * `navigator.clipboard` is unavailable on insecure origins and in some
 * embedded webviews, so the older `execCommand("copy")` path is kept as a
 * fallback. Returns a boolean rather than throwing: the caller only needs to
 * know whether to show the "Copied" confirmation.
 */
export async function copyText(text) {
  try {
    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fall through to the legacy path */
  }

  try {
    const el = document.createElement("textarea");
    el.value = text;
    el.setAttribute("readonly", "");
    el.style.position = "fixed";
    el.style.top = "-1000px";
    el.style.opacity = "0";
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand ? document.execCommand("copy") : false;
    document.body.removeChild(el);
    return Boolean(ok);
  } catch {
    return false;
  }
}

/** Copy helper with a self-resetting `copied` flag for button feedback. */
export function useCopyToClipboard(resetAfter = 2200) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), resetAfter);
    return () => clearTimeout(timer);
  }, [copied, resetAfter]);

  const copy = useCallback(async (text) => {
    const ok = await copyText(text);
    if (ok) setCopied(true);
    return ok;
  }, []);

  return { copied, copy };
}
