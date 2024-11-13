function initializeTools() {
	const dicomViewer = document.getElementById('dicomViewer');
	cornerstone.enable(dicomViewer);
	// cornerstone-tools 초기화 및 외부 라이브러리 연결
	cornerstoneTools.external.cornerstone = cornerstone;
	cornerstoneTools.external.cornerstoneMath = cornerstoneMath;
	cornerstoneTools.external.Hammer = Hammer;
	cornerstoneTools.init();

	document.getElementById('hFlip').addEventListener('click', function() {
		flipHorizontal(dicomViewer);
	});

	document.getElementById('vFlip').addEventListener('click', function () {
		flipVertical(dicomViewer);
	});

	document.getElementById('lRotate').addEventListener('click', function () {
		rotateLeft(dicomViewer);
	});

	document.getElementById('rRotate').addEventListener('click', function () {
	    rotateRight(dicomViewer);
	});

	document.getElementById('zoomIn').addEventListener('click', function () {
	    zoomIn(dicomViewer);
	});

	document.getElementById('zoomOut').addEventListener('click', function () {
	    zoomOut(dicomViewer);
	});
	
	document.getElementById('scrollRoof').addEventListener('click', function () {
	    enableRotate(dicomViewer);
	});

	document.getElementById('scrollZoom').addEventListener('click', function () {
	    enableScrollZoom(dicomViewer);
	});

	document.getElementById('drag').addEventListener('click', function () {
	    enableDrag(dicomViewer);
	});

	document.getElementById('windowLevel').addEventListener('click', function () {
	    //enableWindowLevel(dicomViewer)
		enableWwwcTool(dicomViewer);
	});
		
	document.getElementById('invert').addEventListener('click', function() {
		invert(dicomViewer);
	});
		
	document.getElementById('reset').addEventListener('click', function () {
	    resetImage(dicomViewer);
	});

	document.getElementById('playClip').addEventListener('click', function () {
		playClipControll(dicomViewer);
	});
	
	document.getElementById('length').addEventListener('click', function() {
		enableLength(dicomViewer);
	})

	document.getElementById('eraser').addEventListener('click', function() {
		enableEraser(dicomViewer);
	});
	document.getElementById('angle').addEventListener('click', function() {
		enableAngle(dicomViewer);
	});
	document.getElementById('magnify').addEventListener('click', function() {
		enableMagnify(dicomViewer);
	});

}