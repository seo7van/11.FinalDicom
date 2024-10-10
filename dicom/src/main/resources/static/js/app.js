document.addEventListener('DOMContentLoaded', ()=> {
// cornerstone 초기화 문구
cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
cornerstoneWADOImageLoader.external.cornerstoneTools = cornerstoneTools;
    
    // 이미지를 넣을 요소 얻어오기
    const element = document.getElementById('dicomImage');
    
    // 이미지 요소를 초기화 (반드시 해야함)
    cornerstone.enable(element);
    
    // 이미지 얻어오기 (static은 루트임 그아래부터 경로 잡아주면 됨. ex) 'wadouri:img/파일이름' )
    const imageId = 'wadouri:img/CR.1.3.46.670589.26.802185.4.20170405.165004.674477.0.dcm';
    
    // 얻어온 이미지 요소에 로드하기
    cornerstone.loadImage(imageId).then(image => {
    cornerstone.displayImage(element, image);
    }).catch(err => {
    console.log('이미지 로드 실패 : ', err);
    })
    
    
    // image enable the element
   

    // add event handlers to mouse move to adjust window/center
    element.addEventListener('mousedown', function (e) {
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

            document.getElementById('bottomleft').textContent = "WW/WC:" + Math.round(viewport.voi.windowWidth)
                + "/" + Math.round(viewport.voi.windowCenter);
        }

        function mouseUpHandler() {
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }

        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    });

    })