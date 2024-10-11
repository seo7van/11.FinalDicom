
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
	})


	//2. Add event handler to the ww/wc apply button
	document.getElementById('apply').addEventListener('click', function(e) {
		let viewport = cornerstone.getViewport(element);
		viewport.voi.windowWidth = parseFloat(document.getElementById('ww').value);
		viewport.voi.windowCenter = parseFloat(document.getElementById('wc').value);
		cornerstone.setViewport(element, viewport);
	});

	document.getElementById('invert').addEventListener('click', function(e) {
		let viewport = cornerstone.getViewport(element);
		viewport.invert = !viewport.invert;
		cornerstone.setViewport(element, viewport);
	});

	// add event handlers to mouse move to adjust window/center
	element.addEventListener('mousedown', function(e) {
		let lastX = e.pageX;
		let lastY = e.pageY;

		function mouseMoveHandler(e) {
			const deltaX = e.pageX - lastX;
			const deltaY = e.pageY - lastY;
			lastX = e.pageX;
			lastY = e.pageY;

			let viewport = cornerstone.getViewport(element);
			viewport.voi.windowWidth += (deltaX / viewport.scale);
			viewport.voi.windowCenter += (deltaY / viewport.scale);
			cornerstone.setViewport(element, viewport);
		};

		function mouseUpHandler() {
			document.removeEventListener('mousemove', mouseMoveHandler);
			document.removeEventListener('mouseup', mouseUpHandler);
		}

		document.addEventListener('mousemove', mouseMoveHandler);
		document.addEventListener('mouseup', mouseUpHandler);
	});
})

