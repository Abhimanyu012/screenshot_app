document.getElementById('screenshot-btn').addEventListener('click', async () => {
  const btn = document.getElementById('screenshot-btn');
  btn.disabled = true;
  btn.textContent = 'Processing...';
  try {
    const response = await fetch('/screenshot');
    if (!response.ok) throw new Error('Failed to get screenshot');
    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'infographic-screenshot.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  } catch (e) {
    alert('Error taking screenshot: ' + e.message);
  } finally {
    btn.disabled = false;
    btn.textContent = 'Take Screenshot';
  }
});
