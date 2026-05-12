const ANALYSIS_STORAGE_KEY = "chainproof-analysis";

export const analysisStore = {
  latestResult: null
};

export function saveAnalysisResult(result) {
  analysisStore.latestResult = result;

  if (typeof window !== "undefined") {
    window.localStorage.setItem(ANALYSIS_STORAGE_KEY, JSON.stringify(result));
  }
}

export function getAnalysisResult() {
  if (analysisStore.latestResult) {
    return analysisStore.latestResult;
  }

  if (typeof window === "undefined") {
    return null;
  }

  const stored = window.localStorage.getItem(ANALYSIS_STORAGE_KEY);

  if (!stored) {
    return null;
  }

  try {
    const parsed = JSON.parse(stored);
    analysisStore.latestResult = parsed;
    return parsed;
  } catch {
    return null;
  }
}

export function clearAnalysisResult() {
  analysisStore.latestResult = null;

  if (typeof window !== "undefined") {
    window.localStorage.removeItem(ANALYSIS_STORAGE_KEY);
  }
}
