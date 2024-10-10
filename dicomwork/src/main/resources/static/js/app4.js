document.addEventListener('DOMContentLoaded', () => {
	//1. 
	//코너스톤 초기화
	cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
	cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;

	// 이미지를 넣을 요소 얻어오기
	const element = document.getElementById('dicomImage');

	// 이미지 요소를 초기화
	cornerstone.enable(element);

	// 이미지 얻어오기(기본 루트는 static)
	const imageId = 'wadouri:img/CT.1.2.840.113619.2.80.3826517136.10405.1536138231.15.dcm';

	cornerstone.loadImage(imageId).then(image => {
		cornerstone.displayImage(element, image);
	}).catch(err => {
		console.log('이미지 로드 실패 : ', err);
	});
	
// 4. Add event handlers to flip or rotate the image
    document.getElementById('hFlip').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(element);
        viewport.hflip = !viewport.hflip;
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('vFlip').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(element);
        viewport.vflip = !viewport.vflip;
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('lRotate').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(element);
        viewport.rotation-=90;
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('rRotate').addEventListener('click', function (e) {
        const viewport = cornerstone.getViewport(element);
        viewport.rotation+=90;
        cornerstone.setViewport(element, viewport);
    });

    document.getElementById('reset').addEventListener('click', function (e) {
        cornerstone.reset(element);
    });

    element.addEventListener('mousemove', function(event) {
        const pixelCoords = cornerstone.pageToPixel(element, event.pageX, event.pageY);
        document.getElementById('coords').textContent = "pageX=" + event.pageX + ", pageY=" + event.pageY + ", pixelX=" + pixelCoords.x + ", pixelY=" + pixelCoords.y;
    });
});