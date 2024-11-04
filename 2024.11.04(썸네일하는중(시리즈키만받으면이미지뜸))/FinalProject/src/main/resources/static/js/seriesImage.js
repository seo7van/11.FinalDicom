document.addEventListener("DOMContentLoaded", () => {
// cornerstone과 dicomParser 연결 설정
    cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
    cornerstoneWADOImageLoader.external.dicomParser = dicomParser;

    // cornerstoneWADOImageLoader 기본 설정
    cornerstoneWADOImageLoader.configure({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('Accept', 'application/dicom');
        }
    });

    const dicomViewer = document.getElementById('dicomViewer');
    let currentIndex = 0;

    // cornerstone 활성화 및 첫 번째 이미지 로드
    cornerstone.enable(dicomViewer);




    function loadAndDisplayImage(index) {
        if (index < 0 || index >= seriesImagePaths.length) return;  // 유효한 인덱스 확인
        const imageId = seriesImagePaths[index];
        cornerstone.loadImage(imageId)
            .then(image => {
                cornerstone.displayImage(dicomViewer, image);
                console.log("Displayed image:", imageId);
            })
            .catch(error => console.error("Image load error:", error));
    }

    // 첫 이미지 로드
    loadAndDisplayImage(currentIndex);

    // 마우스 스크롤 이벤트로 이미지 넘기기
    dicomViewer.addEventListener('wheel', function(event) {
        event.preventDefault();
        if (event.deltaY > 0) { // Scroll down
            currentIndex = Math.min(currentIndex + 1, seriesImagePaths.length - 1);
        } else { // Scroll up
            currentIndex = Math.max(currentIndex - 1, 0);
        }
        loadAndDisplayImage(currentIndex);
    });
    
});