document.getElementById('urlForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    const url = document.getElementById('urlInput').value;
    const resultDiv = document.getElementById('screenshotResult');
    resultDiv.innerHTML = 'Loading...';
    try {
        const response = await fetch('/screenshot', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        if (!response.ok) throw new Error('Screenshot failed');
        const blob = await response.blob();
        const img = document.createElement('img');
        img.src = URL.createObjectURL(blob);
        img.alt = 'Screenshot';
        resultDiv.innerHTML = '';
        resultDiv.appendChild(img);
        // Download button
        const downloadBtn = document.createElement('button');
        downloadBtn.textContent = 'Download Screenshot';
        downloadBtn.style.marginTop = '15px';
        downloadBtn.onclick = function() {
            const link = document.createElement('a');
            link.href = img.src;
            link.download = 'screenshot.png';
            link.click();
        };
        resultDiv.appendChild(document.createElement('br'));
        resultDiv.appendChild(downloadBtn);
    } catch (err) {
        resultDiv.innerHTML = 'Error: ' + err.message;
    }
});
