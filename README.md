# Cafe Memo

## Current
### Main
  - first page
<img width="1000" alt="main page" src="https://github.com/user-attachments/assets/648f6370-7137-4d4e-88fe-e6cc87754ff4"/>

### Add & Mod Table
  - add table feature create new table named 'new'
  - can edit table name using double click
<img width="700" alt="add & mod table" src="https://github.com/user-attachments/assets/a7416459-4e95-404b-bab9-0e0212273a32"/>

### Add Team
  - add team using click icon
  - show/hide pay info
<img width="300" alt="add team in table" src="https://github.com/user-attachments/assets/51506121-6356-4d84-a3a1-0e336c94a060"/>
<img width="700" alt="add team in wait" src="https://github.com/user-attachments/assets/3b00cec2-60d4-478a-be57-3e334aa9ad99"/>

### Mod Team Info
  - can edit team info
    - time
    - member
    - order list
    - pay info(credit card, cash)
<img width="300" alt="mod team info" src="https://github.com/user-attachments/assets/fb3b4159-5c75-4f53-9378-772889a344b2"/>

### Move Team
  - move team using drag and drop

https://github.com/user-attachments/assets/e669c903-d880-4a53-bc61-4cd8eab288aa

### Exit Team
  - enter pay info
<img width="1000" alt="mod team info" src="https://github.com/user-attachments/assets/a662a6cb-a5ae-4138-9d39-d73b887c0330"/>

### Save Data
  - save exited team data to 'txt' file with current date
    - entrance time(pay info/default drink)
    - member
    - order list
<img width="300" alt="save data" src="https://github.com/user-attachments/assets/2af68e60-fe24-4c19-bcdf-1eb469dd9075"/>

## In Progress
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
  - default 값 설정
    - table
- **Drag & Drop** _with.react-beautiful-dnd_
- **Download** get data to .txt file
- **Design**
  - change text to icon _with.react-icons_
  - styling inline css
  - hover, input, box
- **Deploy**
  - github pages
  - icon 변경
- **Offline**
  - PWA

### To be added

- 삭제 시 확인 팝업
- offline : 메모장처럼 오프라인에서 사용가능하도록 기능
  - 새로고침을 눌렀을 경우에도 데이터 유지. localStorage?

### To be modified

- 화면 사이즈 조정
  - tableContainer minWidth 조정 필요
- 테이블 4행 2열에 드랍이 잘 안되는 버그
  - 팀의 왼쪽 하단부가 테이블 이름에 닿아야 적용됨
  - 새로운 테이블 추가 시에도 해당 문제가 없음 해당 자리만 문제 발생
- 퇴장 처리 draggable 삭제
- 테이블 삭제 시 팀 정보들도 같이 삭제를 할 지 아니면, 대기로 옮길지 고민
- 팀 추가 버튼 사이즈 줄이기 why? 다른 테이블을 누르는 과정에서 눌릴 수 있다.
- design
  - pwa 화면 하단이 꽉 안차는 에러

### Not Necessary

- check order : 주문이 나갔는지 확인하는 기능
- calculate : 주문 금액 계산 기능
  - add price data : 결제된 최종 금액 계산을 위한 메뉴 가격 데이터 추가
- sort table : 테이블 생성 후 순서(이름순)대로 정렬
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
- deafult 값 수정
