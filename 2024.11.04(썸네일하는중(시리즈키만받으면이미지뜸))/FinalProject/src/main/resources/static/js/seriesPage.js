document.addEventListener("DOMContentLoaded", () => {
	console.log("seriesImagePaths 초기화 확인:", seriesImagePaths);
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
    let currentSeriesImages = []; // 현재 선택된 시리즈의 이미지 경로 배열

    // 썸네일클릭했을때 뷰어 활성화
    cornerstone.enable(dicomViewer);
    
    //썸네일 로드 및 표시
	document.querySelectorAll(".dicomImage").forEach((element, index) => {
        const imagePath = imagePaths[index]?.imagePath;
        if (imagePath && imagePath.startsWith("wadouri:")) {
            cornerstone.enable(element); // 썸네일 요소 활성화
            cornerstone.loadImage(imagePath)
                .then(image => {
                    cornerstone.displayImage(element, image); // 썸네일 이미지 표시
                    console.log("썸네일 로드 성공: " + imagePath);
                })
                .catch(error => {
                    console.error("썸네일 로드 에러:", error);
                });
        } else {
            console.error("잘못된 이미지 경로 형식:", imagePath);
        }
        
        
        
        // 썸네일 클릭 시 해당 시리즈의 이미지를 뷰어에 로드
element.addEventListener("click", () => {
    if (!seriesImagePaths[index]) {
        console.error(`선택한 시리즈에 이미지가 없습니다. 인덱스: ${index}`);
        return;
    }
    currentSeriesImages = seriesImagePaths[index]; // 선택한 시리즈의 이미지 리스트로 설정
    currentIndex = 0; // 인덱스 초기화
    console.log("선택된 시리즈 이미지 리스트:", currentSeriesImages); // 디버깅용 출력
    loadAndDisplayImage(currentIndex); // 첫 번째 이미지 로드
});
    });


// 큰 뷰어에 이미지 로드 및 표시 함수
    function loadAndDisplayImage(index) {
        if (index < 0 || index >= currentSeriesImages.length) {
            console.error("유효하지 않은 인덱스이거나 currentSeriesImages가 비어 있습니다.");
            return;
        }
        const imageId = currentSeriesImages[index];
        cornerstone.loadImage(imageId)
            .then(image => {
                cornerstone.displayImage(dicomViewer, image); // 큰 뷰어에 이미지 표시
                console.log("큰 뷰어 이미지 로드 성공:", imageId);
            })
            .catch(error => console.error("Image load error:", error));
    }

    // 마우스 스크롤로 이미지 탐색
    dicomViewer.addEventListener('wheel', function(event) {
        event.preventDefault();
        if (event.deltaY > 0) { // 스크롤 다운
            currentIndex = Math.min(currentIndex + 1, currentSeriesImages.length - 1);
        } else { // 스크롤 업
            currentIndex = Math.max(currentIndex - 1, 0);
        }
        loadAndDisplayImage(currentIndex);
    });
});