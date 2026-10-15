let timeoutId = null;

function debounce(callback) {
  clearTimeout(timeoutId);
  timeoutId = setTimeout(callback, 300);
}

export { debounce };
