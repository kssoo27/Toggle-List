window.addEventListener("load",function(){
	function toggleList(numberOfList,className){
	/*
		var numberOfList;	// 리스트 개수
		var className;		// object 선택
	*/
		var minimum=0;
		var maximum=numberOfList;
		var listLength="";
		
		var wrap=document.querySelector(className);
		wrap.innerHTML="<div class='collection'><ul class='listGroup'></ul><div class='button'></div></div>"
		var collection=document.querySelector(".collection");
		var group=document.querySelector(".listGroup");
		var button=document.querySelector(".button");
		button.innerHTML="<a href=''class='remove'></a><a href=''class='add'></a>"
		var remove=document.querySelector(".remove");
		var add=document.querySelector(".add");

// AJAX
		var request=new XMLHttpRequest();
		var requestURL="data/photo.json";
		request.open("GET",requestURL,true);
		request.responseType="json";
		request.send();
		
		request.addEventListener("load", function(){
			data=request.response;
// Basic Node
			var i=0;
			for(imageName in data){
				if(i >= minimum && i<numberOfList){
					var liList=document.createElement("li");
					var image=document.createElement("img");
					liList.appendChild(image);
					image.setAttribute("src","images/"+data[imageName]);
					image.setAttribute("alt",imageName);
					group.appendChild(liList);
				}
				i++;
			}
			listLength=i;
// Remove Node			
			remove.addEventListener("click",function(e){
				e.preventDefault();	
				if(minimum==0) return false;
			
				for(i=minimum; i<maximum; i++){
					group.removeChild(group.lastElementChild);
				}
				minimum-=numberOfList;
				maximum=minimum+numberOfList;
			});
// add Node;
			add.addEventListener("click",function(e){
				e.preventDefault();
				if(maximum==listLength) return false;
				
				minimum+=numberOfList;
				maximum=minimum+numberOfList;
				
				if(maximum>listLength){
					maximum=listLength;
				}
				var i=0;
				for(imageName in data){
					if(i >= minimum && i<maximum){
						var liList=document.createElement("li");
						var image=document.createElement("img");
						liList.appendChild(image);
						image.setAttribute("src","images/"+data[imageName]);
						image.setAttribute("alt",imageName);
						group.appendChild(liList);
					}
					i++;
				}
			});
		});
	}
	toggleList(2,".wrap");
});