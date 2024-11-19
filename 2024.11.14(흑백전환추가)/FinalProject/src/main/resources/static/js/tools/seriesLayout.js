// 시리즈 레이아웃 생성 (그리드 형태)
// seriesLayout 함수: 버튼 그리드 레이아웃을 생성하고 화면에 표시하는 함수
document.getElementById("seriesLayout").addEventListener("click", () => {
    const gridContainer = document.getElementById("seriesLayoutContainer");
        
    // 토글 동작: 그리드 컨테이너가 비어있으면 버튼 생성, 아니면 초기화
    if (gridContainer.innerHTML === "") {
		const rows = 5; // 행 개수
        const cols = 5; // 열 개수
		const cells = []; // 버튼 배열
		
        // 행과 열의 개수를 곱해서 총 그리드 버튼 생성
        for (let i = 0; i < rows * cols; i++) {
			const cell = document.createElement("div"); //각 버튼 생성
            cell.classList.add("grid-cell");
            cell.textContent = i + 1; // 각 버튼에 번호 표시
            
            // 클릭 이벤트 (예: 버튼 클릭 시 동작 추가)
            cell.addEventListener("click", () => {
				console.log(`Button ${i + 1} clicked!`);
                //alert(`Button ${i + 1} clicked!`); // 클릭한 버튼의 인덱스 저장(0부터 시작)
                selectButtons(i, rows, cols, cells); // 선택 로직 호출
            });
            
            cells.push(cell); // 배열에 버튼 추가
            gridContainer.appendChild(cell);
        }
    } else {
	// 컨테이너가 비어 있지 않다면 (즉, 그리드가 이미 표시되어 있다면) 초기화
	gridContainer.innerHTML = ""; // 시리즈 레이아웃 컨테이너 비우기(그리드를 숨김)
    }
});

// 버튼 선택 방향을 선택하는 함수 (오른쪽, 아래, 대각선)
function selectButtons(index, rows, cols, cells) { //index는 위치 i=index
	console.log(`선택된 인덱스: ${index}`);
	// 기존 선택 초기화
	cells.forEach(cell => cell.classList.remove("selected"));
	
	// 선택 방향 정의 (오른쪽, 아래, 대각선)
    const directions = ["right", "down", "diagonal"];
    
    // 방향별로 버튼 선택 처리
    directions.forEach((direction) => {
		// 방향에 따라 선택된 버튼 인덱스 계산
        const selectedIndexes = calculateSelection(index, rows, cols, direction);
        
        console.log(`Selected indexes for ${direction}:`, selectedIndexes);
        // 계산된 인덱스의 버튼에 "selected" 클래스 추가
        selectedIndexes.forEach((idx) => {
            if (idx >= 0 && idx < cells.length) { // 유효한 인덱스인지 확인
                cells[idx].classList.add("selected"); // 선택된 버튼 강조
            }
        });
    });
}

// 방향으로 움직여서 결과를 계산한 함수
function calculateSelection(index, rows, cols, direction) {
    const selectedIndexes = [];
    const row = Math.floor(index / cols);
    const col = index % cols;
	// 오른쪽으로 이동
    if (direction === "right") {
        for (let i = 1; i <= cols - col; i++) {
            selectedIndexes.push(index + i - 1);
        }
    } else if (direction === "down") {
		// 아래로 이동
        for (let i = 1; i <= rows - row; i++) {
            selectedIndexes.push(index + cols * (i - 1));
        }
    } else if (direction === "diagonal") {
		// 대각선 아래로 이동
        for (let i = 1; i <= Math.min(rows - row, cols - col); i++) {
            selectedIndexes.push(index + cols * (i - 1) + (i - 1));
        }
    }
    return selectedIndexes; // 선택된 인덱스 반환
}