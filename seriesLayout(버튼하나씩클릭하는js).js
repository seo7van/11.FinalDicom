// 시리즈 레이아웃 생성 (그리드 형태)
// seriesLayout 함수: 버튼 그리드 레이아웃을 생성하고 화면에 표시하는 함수
document.getElementById("seriesLayout").addEventListener("click", () => {
    const gridContainer = document.getElementById("seriesLayoutContainer");
        // 토글 동작: 그리드 컨테이너가 비어있으면 버튼 생성, 아니면 초기화
    if (gridContainer.innerHTML === "") {
		const rows = 5; // 행 개수
        const cols = 5; // 열 개수
		
        // 행과 열의 개수를 곱해서 총 그리드 버튼 생성
        for (let i = 0; i < rows * cols; i++) {
			const cell = document.createElement("div"); //각 버튼 생성
            cell.classList.add("grid-cell");
            cell.textContent = i + 1; // 각 버튼에 번호 표시
            
            // 클릭 이벤트 (예: 버튼 클릭 시 동작 추가)
            cell.addEventListener("click", () => {
                alert(`Button ${i + 1} clicked!`);
            });
            gridContainer.appendChild(cell);
        }
    } else {
	// 컨테이너가 비어 있지 않다면 (즉, 그리드가 이미 표시되어 있다면) 초기화
	gridContainer.innerHTML = ""; // 컨테이너를 비우기(그리드를 숨김)
    }
});