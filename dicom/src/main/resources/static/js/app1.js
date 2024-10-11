
document.addEventListener('DOMContentLoaded',()=>{
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
	
	
})


