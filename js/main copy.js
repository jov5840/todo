$(function(){
   // 디데이 뿌리기=====================================================
   var ddays=getDdays();

   if(ddays!=null){
      ddays.forEach(obj => {  
         var Dday = new Date(obj.ddayDate);    
         var now = new Date();  
         var gap = now.getTime() - Dday.getTime();   
         var result = Math.floor(gap / (1000 * 60 * 60 * 24)) * -1;  
         var plusminus
         
         if (result>=0) {
            plusMinus='D-'
         } else {
            plusMinus='D+'
            result=Math.abs(result);
         }
         $('.dday-wrap').find('span').text(plusMinus+result);
      })
   }

   // 오늘 날짜 뿌리기===================================================
   var week = new Array('Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat');
   var today = new Date();
   var dd = today.getDate();
   var mm = today.getMonth()+1; //January is 0!
   var yyyy = today.getFullYear();
   var day = week[today.getDay()];

   if(dd<10) {
      dd='0'+dd
   }
   if(mm<10) {
      mm='0'+mm
   } 
   today = yyyy + ' . ' + mm +' . '+ dd +' . ' + day;

   var todayMain=yyyy+mm+dd;
   
   $('.date-wrap').text(today)
   
   // 디데이설정 페이지로 이동================================================
   $('.dday-wrap').click(function(){
      if (confirm("시험을 재설정 하시겠습니까?")==true) {
         location.href="dday.html";
      } else {
         return;
      }
   });
   function date() {
      var date=new Date().toLocaleDateString();
      date=date.slice(0, -1);
      // var time=new Date().toLocaleTimeString();
      return date+' ';
   };
   // 상단 + 눌러서 todo input 팝업생성=========================================
   $('.btn-add').click(function(){
      $('i.add').css('color','#b5bdc7')
      $('.add-popup').show()
   })
   // todo 저장================================================================
   $('.in-add').click(function(){
      var todoTitle = $(this).parents('.popup-wrap').find('.todotext').val();
      var todocheck = $('.checkbox').text();
      var todoTime = '00 : 00';
      var todoId =  todayIs();  

      if (todoTitle == ""|| todoTitle == null || todoTitle == undefined) {
         alert('todo를 작성해주세요')
         return false;
      }

      var todo={
         todoId:todoId,
         todoToday:todayMain,
         todoTitle:todoTitle,
         todocheck:todocheck,
         todoTime:todoTime
      } 

      var todos = getTodos();
      if(todos === null){
         todos = []
      }
      todos.push(todo);
      setTodos(todos);
      
      $('.add-popup').hide();
      location.href="main.html";
   });

   // todo 삭제
   $('.todo').on('click', '.btn-delete', function() {
      var id=$(this).parent().find('.todoId').text();
      var todos=getTodos();
      for (const i in todos) {
         if (todos[i].todoId==id) {
            todos.splice(i,1);
            break;
         }
      }
      setTodos(todos);
      todoList(todos);
   })

   // todo 수정할거 팝업에 가져오기
   $('.todo').on('click', '.btn-re', function() {
      var id=$(this).parent().find('.todoId').text();
      var todos=getTodos();
      var item={};
      for (const i in todos) {
         if (todos[i].todoId==id) {
            item=todos[i];
            break;
         }
      }
      $('.add-popup').show();
      $('.add-popup .btn-in-add').hide();
      $('.add-popup .btn-re-add').show();
      $('.add-popup .re-id').text(item.todoId);
      $('.add-popup .todotext').focus().val(item.todoTitle);
   })

   // todo 수정
   $('.btn-re-add').click(function(e) {
      e.preventDefault();
      var id=$('.add-popup .re-id').text();
      var reTitle=$('.add-popup .todotext').val();
      // console.log(id);
      // console.log(reTitle);
      if (reTitle == ""|| reTitle == null || reTitle == undefined) {
         alert('시험 이름을 수정해주세요.')
         return false;
      }

      var todos=getTodos();
      for (const i in todos) {
         if (todos[i].todoId==id) {
           todos[i].todoTitle=reTitle;
           break;
         }
      }
      setTodos(todos);
      todoList(todos);

      $('.add-popup').hide();
      location.href="main.html";
   })

   // 체크박스===========================================================
   $('.check > .material-icons').click(function(){
      if($(this).text() == 'check_box_outline_blank'){
         $(this).prev().prop('checked', true);
         $(this).empty(); 
         $(this).text('check_box');
         console.log($('[name=check]:checked').val());
      }else{
         $(this).empty();
         $(this).text('check_box_outline_blank')
         console.log($('[name=check]:checked').val());
      }
   });

   // todolist 시간기록팝업===========================================
   $('.select-time').click(function(){
      $('.select-time').removeClass('active');
      var id=$(this).parent().prev('.todolist-left').find('.todoId').text();
      console.log(id);
      
      var todos=getTodos();
      var item={};
      for (const i in todos) {
         if (todos[i].todoId==id) {
            item=todos[i];
            break;
         }
      }
      $('.select-time-popup .re-id').text(item.todoId);
      // console.log('aaa');
      $('.select-time-popup').show();
      $(this).addClass('active');
   });
   $('.cancel').click(function(){
      $('.select-time-popup').hide();
   });

   // todolist 시간기록팝업 저장=======================================
   $('.save').click(function(){
   // $('select').on("change", function(){
         var id=$('.select-time-popup .re-id').text();
         var hour = $('#select-hour').val();
         var min = $('#select-min').val();
         console.log(hour);
         console.log(min);
         var saveTime=hour+' : '+min
         console.log(saveTime);
         $('.select-time.active .hour').text(saveTime);
         var todos=getTodos();
         for (const i in todos) {
            if (todos[i].todoId==id) {
            todos[i].todoTime=saveTime;
            break;
            }
         }
         setTodos(todos);
         todoList(todos);
         $('.select-time-popup').hide()
   });

   // todolist에 시간기록 보여주기=========================================================
   var $select_hour = $("#select-hour");
   for(var i = 1; i < 13; i++) {
      var day_number = i;
      $('<option>')
         .val(('0' + day_number).slice(-2))
         .text(i)  
         .appendTo($select_hour);
   };
   var $select_time = $("#select-min");
   for(var i = 1; i < 60; i++) {
      var day_number = i;
      $('<option>')
         .val(('0' + day_number).slice(-2))  
         .text(i)   
         .appendTo($select_time);
   };

   // 좌우스와이프======================================
   $('#mainPage').bind('swipeleft', function(event){
      $.mobile.changePage('#calPage', {transition:'slide', reverse:true});
   });
   $('#calPage').bind('swiperight', function(event){
      $.mobile.changePage('#mainPage', {transition:'slide'});
   });

   // todolist 스와이프================================================== 
   function touchEvent() {  
      $('.todolist-content').swipe({
         swipeRight:function(){
            $('.todolist li').removeClass('left right');   
            $(this).parent().addClass('right');      
            console.log('오른쪽');        
         },
         swipeLeft:function(){;  
            $('.todolist li').removeClass('left right');   
            $(this).parent().addClass('left');       
            console.log('왼쪽');   
         },
         swipeStatus:function(){;   
            $('.todolist li').removeClass('left right');              
         }
      });
   };
   touchEvent();
   // ================================================================
   // 달력 ===========================================================
   $("#calendar")
   .datepicker({   
      dateFormat: "yy/mm/dd",
      showOtherMonths: true,
      selectOtherMonths: false,
      dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      onSelect: function (date) {
         // ////////////////////
         function calList() {
            var calTodos = getTodos();
            $('#calPage ul.todo').empty();

            if (calTodos === null) {
               calTodos = [];
            }
            if(calTodos.length!=0){//메모가 있다
               $("#calPage ul.todo").empty();
               calTodos.forEach(item => {
                  var startdate=item.todoToday
                  var daTe  = date.replace(/\//g,"");
                  console.log(startdate);
                  console.log(daTe);
                  
               //  오늘날짜만 뿌리기 (달력)
               if(startdate==daTe){
                  $("#calPage ul.todo").append(`
                  <li>
                  <div class="todolist-content">
                     <div class="todolist-left">
                        <span class="todoId">${item.todoId}</span>
                        <span class="todoTitle">${item.todoTitle}</span>   
                        <label class="check">
                              <input type="checkbox" name="check">
                              <i class="material-icons checkbox">check_box_outline_blank</i>
                        </label>
                     </div>
                     <div class="todolist-right">
                        <div class="select-time"> 
                           <span class="hour">${item.todoTime}</span>
                        </div>i
                     </div>
                  </div>
                  <span class="btn-bg btn-delete"><button class="material-icons">delete_outline</button></span>
                  <span class="btn-bg btn-re"><button class="material-icons">create</button></span>
               </li>
                  `);
               }else{
                  if($("#calPage ul.todo").find('div').hasClass('no-todo') == 0){
                     $("#calPage ul.todo").prepend(`
                     <div class="no-todo">
                        <span>할일 내역이 없습니다.</span>
                     </div>`);
                  }
               }

               });
            }
         }
            calList();
      }
   })
   .swipe({
      swipeRight:function(){
         console.log('오른쪽');        
         $(this).find("[data-handler='prev']").click();
      },
      swipeLeft:function(){
         console.log('왼쪽');
         $(this).find("[data-handler='next']").click();
      }
   });


    //  todo 뿌리기
    function todoList(){
      var todos = getTodos();
      $('.mainTodo todo').empty();
      if(todos === null){
         todos=[];
      }
      if(todos.length!=0){//메모가 있다
          $('.mainTodo .todo').empty();
               todos.forEach(item => {
                  var toDay = item.todoToday
                  var today = yyyy+mm+dd 
                  if(toDay == today ){
                     $('.mainTodo .todo').prepend(`
                     <li>
                        <div class="todolist-content">
                           <div class="todolist-left">
                              <span class="todoId">${item.todoId}</span>
                              <span class="todoTitle">${item.todoTitle}</span>   
                              <label class="check">
                                    <input type="checkbox" name="check">
                                    <i class="material-icons checkbox">check_box_outline_blank</i>
                              </label>
                           </div>
                           <div class="todolist-right">
                              <div class="select-time"> 
                                 <span class="hour">${item.todoTime}</span>
                              </div>
                           </div>
                        </div>
                        <span class="btn-bg btn-delete"><button class="material-icons">delete_outline</button></span>
                        <span class="btn-bg btn-re"><button class="material-icons">create</button></span>
                     </li>
                     `)

                     $('.ui-datepicker-calendar td:not(.ui-state-disabled)').each(function(){                
                        var year=$(this).data('year');
                        var month=$(this).data('month')+1;
                        var date=$(this).find('a').text();
                        if(month<10){
                           month = '0'+month
                        }
                        if(date<10){
                           date = '0'+date
                        }
   
                        if(toDay==year+month+date){          
                           if($(this).find('span').hasClass('todo-dot') == 0){
                              $(this).append(`<span class="todo-dot"></span>`)
                           }
                        }}

                     )}
                  // 점뿌리기
                
                  
               })

            // }
         // };
          touchEvent();
      }else{
         $(".mainTodo .todo").append(`
            <div class="no-todo">
               <span>할일이 없습니다.</span>
            </div>`);
         // $("#calPage .todo").append(`
         // <div class="no-todo">
         //    <span>할일 내역이 없습니다.</span>
         // </div>`);
      };



      
  }
   todoList();

   //달력
    // 달력 ===========================================================
   //  $("#calendar")
   //  .datepicker({   
   //     dateFormat: "yymmdd",
   //     showOtherMonths: true,
   //     selectOtherMonths: false,
   //     dayNamesMin: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
   //     onSelect: function (date) {
   //        // 달력 날짜 선택시 값 뿌려지게 함
   //        function calList(){
   //           var calTodos = getTodos();
   //           $('#calPage ul.todo').empty();
   //           if(calTodos === null){
   //              calTodos=[];
   //           }
   //           if(calTodos.length!=0){//메모가 있다
   //              $('#calPage ul.todo').empty();
   //              for (const i in calTodos) {
   //                 if (calTodos[i].todoToday==date){
   //                    calTodos.forEach(item => {
   //                       $('#calPage ul.todo').prepend(`
   //                       <li>
   //                       <div class="todolist-content">
   //                          <div class="todolist-left">
   //                             <span class="todoId">${item.todoId}</span>
   //                             <span class="todoTitle">${item.todoTitle}</span>   
   //                             <label class="check">
   //                                   <input type="checkbox" name="check">
   //                                   <i class="material-icons checkbox">check_box_outline_blank</i>
   //                             </label>
   //                          </div>
   //                          <div class="todolist-right">
   //                             <div class="select-time"> 
   //                                <span class="hour">${item.todoTime}</span>
   //                             </div>i
   //                          </div>
   //                       </div>
   //                       <span class="btn-bg btn-delete"><button class="material-icons">delete_outline</button></span>
   //                       <span class="btn-bg btn-re"><button class="material-icons">create</button></span>
   //                    </li>
   //                    `)}
   //                 )}else{
   //                    $("#calPage ul.todo").prepend(`
   //                       <div class="no-todo">
   //                          <span>할일 내역이 없습니다.</span>
   //                       </div>`);
   //                 }
   //              }
   //              touchEvent();
   //           }
   //        }
   //        calList();
   //        }
   //  })
   //  .swipe({
   //     swipeRight:function(){
   //        console.log('오른쪽');        
   //        $(this).find("[data-handler='prev']").click();
   //     },
   //     swipeLeft:function(){
   //        console.log('왼쪽');
   //        $(this).find("[data-handler='next']").click();
   //     }
   //  });


});