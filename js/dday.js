$(function(){
   // https://codepen.io/iskander-bakirov/pen/XWrvRKG
   // 년월일 select ===============================================================
   //년
   var year = new Date().getFullYear()
   console.log(year);
   var $select_year = $('#select_year').empty();
   for(var i = 0;  i < 11; i++) {
      console.log(i);
      $('<option>')
         .val(year + i)     // set the value
         .text(year + i)    // set the text in in the <option>
         .appendTo($select_year);
   }
   //월
   var $select_month = $("#select_month");
   var options = ["01","02","03","04","05","06", "07","08","09","10","11","12"];
   for(var i = 0; i < options.length; i++) {
      var month_number = i + 1;
      $('<option>')
         .val(('0' + month_number).slice(-2))
         .text(options[i])
         .appendTo($select_month);
   }
    //일
   var $select_day = $("#select_day");
   for(var i = 1; i < 32; i++) {
      var day_number = i;
      $('<option>')
         .val(('0' + day_number).slice(-2))
         .text(i)
         .appendTo($select_day);
   }


   // 확인버튼 눌렀을때=============================================================
   $('.btn-con').click(function(){
      var title = $("#title").val();  //시험이름
      var year = $("#select_year option:selected").val();   //년
      var month = $("#select_month option:selected").val(); //월
      var day = $("#select_day option:selected").val();     //일
      var ddayDate = new Date(year, month-1, day);   //디데이 목표날짜
      var startDay = new Date();    //디데이 작성날짜
      
      // 시험 이름 들어갔나 아닌가 검사
      if (title == ""|| title == null || title == undefined) {
         alert('시험 이름을 작성해주세요')
         return false;
      }
      // 날짜 들어갔나 아닌가 검사
      if(month =='Month'){
            alert("'월' 선택해주세요")
      }else if(day =='Day'){
            alert("'일' 선택해주세요")
      }else{
         var dday={
            ddayTitle:title,
            ddayDate:ddayDate,
            startDay:startDay
         };
         var ddays = getDdays();
         if(ddays === null){
            ddays = []
         }else{
            //  삭제 추가한거
            delete ddays;
            ddays = [];
         }
         ddays.push(dday)
         setDdays(ddays);
         location.href="main.html";
      }
   });
});