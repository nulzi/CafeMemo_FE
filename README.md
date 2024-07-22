# Cafe Front Desk

### Feature

- **store** _with. redux toolkit_
- **Team**
  - add Team
  - delete Team
  - update Team info
  - exit Team
  - add data exit time in team
  - sort exit team by exit time
  - add info about paying
- **Table**
  - add Table
  - Delete Table exclude default table
- **Drag & Drop** _with.react-beautiful-dnd_
- **Download** get data to .txt file
- **Design**
  - change text to icon _with.react-icons_
  - styling inline css
  - hover, input, box

### To be added

- 삭제 시 확인 팝업
- offline : 메모장처럼 오프라인에서 사용가능하도록 기능
  - localStorage?

### To be modified

- 화면 사이즈 조정
  - tableContainer minWidth 조정 필요
- 테이블 4행 2열에 드랍이 잘 안되는 버그
  - 팀의 왼쪽 하단부가 테이블 이름에 닿아야 적용됨
  - 새로운 테이블 추가 시에도 해당 문제가 없음 해당 자리만 문제 발생
- 퇴장 처리 draggable 삭제
- 테이블 삭제 시 팀 정보들도 같이 삭제를 할 지 아니면, 대기로 옮길지 고민
- 팀 추가 버튼 사이즈 줄이기 why? 다른 테이블을 누르는 과정에서 눌릴 수 있다.

### Not Necessary

- check order : 주문이 나갔는지 확인하는 기능
- calculate : 주문 금액 계산 기능
  - add price data : 결제된 최종 금액 계산을 위한 메뉴 가격 데이터 추가
- sort table : 테이블 생성 후 순서대로 정렬
- backend
  - collect data
  - caculate data
  - 마감 시 데이터 저장
- log
- react-beautiful-dnd 보완
  - cursor style
- design
  - add reset css
  - animation1 : 대기에서 테이블로 옮길 때 배경색 물드는 애니메이션
