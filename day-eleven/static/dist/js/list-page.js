var most={myScroll:null,page:0,classId:1,isLoad:!1,header_nav:$(".header_nav"),init:function(){this.myScroll=new IScroll("#product_wrap",{scrollbars:!0,fadeScrollbars:!0,shrinkScrollbars:"scale",bounce:!0,probeType:1,click:!0}),this.loadData(),this.goScroll(),this.getClassId(),this.changeId()},loadData:function(a){$(".downLoad").css("display","none"),$(".loading").css("display","block"),a&&(this.page=0);var s=this;$.ajax({url:"http://datainfo.duapp.com/shopdata/getGoods.php",dataType:"jsonp",data:{classID:s.classId,pageCode:s.page,linenumber:8},success:function(l){for(var o="",t=0;t<l.length;t++)o+='<a href="detail.html?'+l[t].goodsID+'"><div class="product"><img src='+l[t].goodsListImg+' alt=""><p>'+l[t].goodsName+'</p><div class="price"><span>¥'+l[t].price+"</span><del>¥999</del></div></div> </a>";a?$(".product_wrap").html(o):$(".product_wrap").html($(".product_wrap").html()+o),$(".downLoad").html("下拉刷新啦!"),s.myScroll.refresh()},complete:function(){$(".downLoad").css("display","block"),$(".loading").fadeOut(500)}})},goScroll:function(){var a=this;this.myScroll.on("scroll",function(){this.y>50&&($(".downLoad").html("松开就可以刷新啦!"),a.isLoad=!0)}),this.myScroll.on("scrollEnd",function(){this.y-this.maxScrollY<50&&(a.page++,most.loadData()),a.isLoad&&(most.loadData(a.isLoad),a.isLoad=!1)})},getClassId:function(){var a=this;$.ajax({url:"http://datainfo.duapp.com/shopdata/getclass.php",dataType:"json",success:function(s){for(var l="",o=0,t=s.length;o<t;o++)l+=0==o?'<li class="header_triangle" classid='+s[o].classID+">"+s[o].className+"</li>":"<li classid="+s[o].classID+">"+s[o].className+"</li>";a.header_nav.html(a.header_nav.html()+l)}})},changeId:function(){var a=this;this.header_nav.delegate("li","click",function(){$(this).addClass("header_triangle").siblings().removeClass("header_triangle"),a.classId=$(this).attr("classid"),a.page=0,$(".product_wrap").html(""),most.loadData()})}};most.init();