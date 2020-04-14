function date() {
   var date=new Date().toLocaleDateString();
   date=date.slice(0, -1);
   var time=new Date().toLocaleTimeString();
   return date+' '+time;
}

// 오늘날짜(년월일)
function todayIs() {
   var today = new Date();
   var dd = today.getDate();
   var mm = today.getMonth()+1; 
   var yyyy = today.getFullYear();
   var tt = today.toLocaleTimeString();
   if(dd<10){
      dd = '0'+dd
   }
   if(mm<10){
      mm = '0'+mm
   }
   return yyyy+mm+dd+tt;
} 

// dday저장하기
function setDdays(ddays) {
   var ddaysJSON = JSON.stringify(ddays);
   localStorage.setItem("ddays", ddaysJSON);
}
// dday가져오기
function getDdays() {
   var ddaysJSON = localStorage.getItem("ddays");
   return JSON.parse(ddaysJSON);
}

// todo저장하기
function setTodos(todos) {
   var todosJSON = JSON.stringify(todos);
   localStorage.setItem("todos", todosJSON);
}

// todo가져오기
function getTodos() {
   var todosJSON = localStorage.getItem("todos");
   return JSON.parse(todosJSON);
}



// todo 스와이프================================================== 
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
      },
   })
}
touchEvent();