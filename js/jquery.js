$(function(){
	function toggleList(numberOfList,className){
	/*
		var numberOfList;	// 리스트 개수
		var className;		// object 선택
	*/
		var minimum=0;
		var maximum=numberOfList;
		var listLength="";
		
		$(className).append("<div class='collection'></div>");
		$(".collection").append("<h1 id='title'>ToggleList</h1>");
		$(".collection").append("<ul class='listGroup'></ul>");
		$(".collection").append("<div class='button'></div>");
		$(".button").append("<a href='' class='remove'></a>");
		$(".button").append("<a href='' class='add'></a>");

	// 데이터 불러오기	
		$.getJSON("data/photo.json", function(photo){
			var i=0;
			$.each(photo, function(Number, imageLink){
				if(i >= minimum && i<numberOfList){
					$(".listGroup").append("<li><img src='images/"+imageLink+"' alt='"+Number+"'></li>");
				}
				i++;
			});
			listLength=i;
		});
	// 리스트 제거	
		$(".remove").click(function(e){
			e.preventDefault();
			if(minimum==0) return false;
			
			for(i=minimum; i<maximum; i++){
				$(".listGroup li").last().remove();
			}
			minimum-=numberOfList;
			maximum=minimum+numberOfList;
		});
	// 리스트 추가
		$(".add").click(function(e){
			e.preventDefault();
			if(maximum==listLength) return false;
			
			minimum+=numberOfList;
			maximum=minimum+numberOfList;
			
			if(maximum>listLength){
				maximum=listLength;
			}
			$.getJSON("data/photo.json", function(photo){
				var i=0;
				$.each(photo, function(Number, imageLink){
					if(i >= minimum && i<maximum){
						$(".listGroup").append("<li><img src='images/"+imageLink+"' alt='"+Number+"'></li>");		
					}
					i++;
				});
			});
		});
	}
	
	toggleList(2,".wrap");
});