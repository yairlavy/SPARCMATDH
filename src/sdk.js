const DEFAULT_APP_URL = "https://intelligent-spark-match-flow.base44.app";

function init(options = {}) {
  const {
    buttonSelector,
    targetUrl = DEFAULT_APP_URL,
    openInNewTab = true,
  } = options;

  if (!buttonSelector) {
    throw new Error("SparkMatch SDK: buttonSelector is required");
  }

  const button = document.querySelector(buttonSelector);

  if (!button) {
    throw new Error(`SparkMatch SDK: button not found for selector ${buttonSelector}`);
  }

  button.addEventListener("click", () => {
    if (openInNewTab) {
      window.open(targetUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = targetUrl;
    }
  });
}

window.SparkMatch = { init };

export { init };
