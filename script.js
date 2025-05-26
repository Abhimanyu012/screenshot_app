document.getElementById('screenshotBtn').addEventListener('click', function() {
    html2canvas(document.body).then(function(canvas) {
        const resultDiv = document.getElementById('screenshotResult');
        resultDiv.innerHTML = '';
        const img = document.createElement('img');
        img.src = canvas.toDataURL();
        resultDiv.appendChild(img);
        // Add download button
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
    });
});
