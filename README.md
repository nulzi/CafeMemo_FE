# Cafe Front Desk

### Feature

- store with. redux toolkit (ING~)
- styling inline css
- add Team
- delete Team
- update Team info
- exit Team
- add Table
- Delete Table exclude default table
- add data exit time in team
- sort exit team by exit time
- drag n drop with.react-beautiful-dnd
- get data to .txt file
- 퇴장 시 퇴장 시간 표시

### To be added

- add price data : 결제된 최종 금액 계산을 위한 메뉴 가격 데이터 추가
- add 지불된 비용 및 사용된 포인트 input

### To be modified

- 테이블 4행 2열에 드랍이 잘 안되는 버그
  - 팀의 왼쪽 하단부가 테이블 이름에 닿아야 적용됨
  - 새로운 테이블 추가 시에도 해당 문제가 없음 해당 자리만 문제 발생
- 퇴장 처리 draggable 삭제
- 테이블 삭제 시 팀 정보들도 같이 삭제를 할 지 아니면, 대기로 옮길지 고민

### Not Necessary

- check order : 주문이 나갔는지 확인하는 기능
- calculate : 주문 금액 계산 기능
- offline : 메모장처럼 오프라인에서 사용가능하도록 기능
- sort table : 테이블 생성 후 순서대로 정렬
- design
  - hover, input, box
  - add reset css
  - animation1 : 대기에서 테이블로 옮길 때 배경색 물드는 애니메이션
- backend: collect data, caculate data etc
- log
