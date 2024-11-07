document.addEventListener('DOMContentLoaded', () => {
    const studyKey = 1;

    function toggleSection(buttonId, sectionId) {
        const button = document.getElementById(buttonId);
        const section = document.getElementById(sectionId);
        const allSections = document.querySelectorAll('.study-info, .past-info, .series-info, .report-info');
        const imageViewer = document.getElementById('image-viewer');

        button.addEventListener('click', () => {
            allSections.forEach(sec => sec !== section && sec.classList.remove('show'));
            section.classList.toggle('show');
            const anySectionShown = Array.from(allSections).some(sec => sec.classList.contains('show'));
            imageViewer.classList.toggle('shifted', anySectionShown);
        });
    }

    toggleSection('toggle-info-btn', 'study-info');
    toggleSection('toggle-past-btn', 'past-info');
    toggleSection('toggle-series-btn', 'series-info');
    toggleSection('toggle-report-btn', 'report-info');

    document.getElementById('save-report').addEventListener('click', () => {
        const reportData = {
            studyKey,
            comment: document.getElementById('comment').value,
            radiologist1: document.getElementById('radiologist1').value,
            radiologist2: document.getElementById('radiologist2').value,
            reportDate: document.getElementById('report-date').value
        };

        fetch('/reports/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(reportData)
        })
        .then(response => response.json())
        .then(data => alert('저장되었습니다!'))
        .catch(error => alert('저장에 실패했습니다.'));
    });

    document.getElementById('home').addEventListener('click', () => window.location.href = 'http://localhost:8080/home');
});
