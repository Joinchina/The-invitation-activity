window.onload=function(){
	//阻止页面放大缩小
	$(function(){
		document.addEventListener('touchstart',function (event) {  
            if(event.touches.length>1){  
                event.preventDefault();  
            }  
        })  
        var lastTouchEnd=0;  
        document.addEventListener('touchend',function (event) {  
            var now=(new Date()).getTime();  
            if(now-lastTouchEnd<=300){  
                event.preventDefault();  
            }  
            lastTouchEnd=now;  
        },false)  
	});
	//去掉300s的延迟并阻止图片拖动
	$(function() {
		FastClick.attach(document.body);
		$('img').on('mousedown',function (e) {
		    e.preventDefault()
		})
	});
	//点击规则打开页面
	$(function(){
		$(".active_rule").click(function(){
			window.location.href="active_rule.html"
		})
	});
	//列表滚动
	function listscroll() {
        var i = $("#scroll_list_1").html();
        $("#scroll_list_2").html(i);
        setInterval(function() {
            var i = $(".award_scroll").scrollTop();
            $("#scroll_list_1").height() <= i ? $(".award_scroll").scrollTop(0) : $(".award_scroll").scrollTop(i + 1)
        },
        60)
    };
    //数据插入列表
    function addlist(i) {
        for (var n = 0; n < i.length; n++) {
            var a = '<li><img src="' + i[n].img + '"/><h1>' + i[n].name + "</h1><h2>老师</h2><h3>领取30元京东券</h3></li>";
            $("#scroll_list_1 ul").append(a);            
        }
    };
    //请求接口的获取
    var host = location.host;
	var api = "";
	if(host.indexOf("teacherasst.openonline.com.cn") > -1){
		api = "http://teacherasst.openonline.com.cn:80"
	}else{
		api='/api'
	};
	//获取客户端传递过来的请求参数
	function GetUrlParms() {
		 var args=new Object();
		 //var query=window.location.search.substring(1);//获取查询串 
		 var query='activityId=11&uid=437&token=KJR3xvag82jkI5PR0Cqq2DVIYRVaUtFT&clazzId=551';//获取查询串 
		 var pairs=query.split("&");
		 for(var i=0;i<pairs.length;i++) { 
		   var pos=pairs[i].indexOf('=');
		   if(pos==-1) continue;
		   var argname=pairs[i].substring(0,pos);
		   var value=pairs[i].substring(pos+1);
		   args[argname]=encodeURI(value);
		 };
		 return args;
	};
	//列表滚动数组
	var scrolldata=[{
	                img: "../../../source/images/activity/icon/moren.png",
	                name: "赵**"
	            },
	            {
	                img: "../../../source/images/activity/icon/02.png",
	                name: "张**"
	            },
	            {
	                img: "../../../source/images/activity/icon/moren.png",
	                name: "张**"
	            },
	            {
	                img: "../../../source/images/activity/icon/04.png",
	                name: "王**"
	            },
	            {
	                img: "../../../source/images/activity/icon/05.png",
	                name: "刘**"
	            },
	            {
	                img: "../../../source/images/activity/icon/moren.png",
	                name: "高**"
	            },
	            {
	                img: "../../../source/images/activity/icon/02.png",
	                name: "赵**"
	            },
	            {
	                img: "../../../source/images/activity/icon/moren.png",
	                name: "宋**"
	            },
	            {
	                img: "../../../source/images/activity/icon/04.png",
	                name: "钱**"
	            },
	            {
	                img: "../../../source/images/activity/icon/05.png",
	                name: "任**"
	            },
	            {
	                img: "../../../source/images/activity/icon/moren.png",
	                name: "宋**"
	            },
	            {
	                img: "../../../source/images/activity/icon/02.png",
	                name: "孙**"
	            },
	            {
	                img: "../../../source/images/activity/icon/moren.png",
	                name: "吴**"
	            },
	            {
	                img: "../../../source/images/activity/icon/04.png",
	                name: "毛**"
	            },
	            {
	                img: "../../../source/images/activity/icon/05.png",
	                name: "常**"
	            },
	            {
	                img: "../../../source/images/activity/icon/moren.png",
	                name: "连**"
	            },
	            {
	                img: "../../../source/images/activity/icon/02.png",
	                name: "周**"
	            },
	            {
	                img: "../../../source/images/activity/icon/moren.png",
	                name: "郑**"
	            },
	            {
	                img: "../../../source/images/activity/icon/04.png",
	                name: "张**"
	            },
	            {
	                img: "../../../source/images/activity/icon/05.png",
	                name: "贾**"
	            }];
	//定义一个变量用来接收参数
	var argument=GetUrlParms();
	//发起第一个ajax请求取得参数
	//定义请求参数
	var passdata = {
	        params: {
	            clazzId: argument.clazzId,
	            activityId: argument.activityId,
	        },
	        token: argument.token,
	        userId: argument.uid
    };
    //第一次判断是否有班级
    
    //console.log(passdata.params.clazzId)
    if(passdata.params.clazzId==undefined || passdata.params.clazzId==null || passdata.params.clazzId==''){
    	$("#activity_info").html("<br/><h3 style='line-height: 20px;'>您还没有班级，<br/>请先创建班级后才能参与活动哦！</h3>")
    }else{    	
    	main();
    };
    //逻辑函数
    function main(){
    	$.ajax({
    		type: "POST",
	        url: api + "/business/activity/getActivityDetail.json",
	        headers: {
	            device: "ios",
	            version: "1.3.3",
	            UserAgent: "teacher"
	        },
	        dataType: "json",
	        contentType: "application/json",
	        data: JSON.stringify(passdata),
	        success:function(data){
	        	//处理异常
	        	if(data.code==200){
	        		var msg = data.data.activityDetail;	        		
	           		var	allpeople = msg.fakeReceivedCount + msg.receivedCount;//领取获取奖励的用户和
	           		//处理列表的滚动数据
           			var titlestr2 = "领取人数：" + allpeople + "/<span>"+msg.fakeMaxReceiveCount+"</span>";
           			$(".award_title h1").html(titlestr2);
           			//清除滚动列表假的数据
    				$("#scroll_list_1 ul").children().remove();
    				//执行列表同步
           			if(allpeople<5){
           				scrolldata = scrolldata.splice(0, allpeople);
           				addlist(scrolldata);
           			}else if(5 < allpeople && allpeople < scrolldata.length){
           				scrolldata = scrolldata.splice(0, allpeople);
           				addlist(scrolldata)
           				listscroll(); //插入列表完成开始执行滚动
           			}else{
           				addlist(scrolldata)
           				listscroll(); //插入列表完成开始执行滚动
           			};
	           		//如果领取的人数大于最大领奖数，提示活动借宿
	           		if(msg.receivedCount>=msg.maxReceiveCount){
	           			allpeople=msg.fakeMaxReceiveCount;
	           			var titlestr = "领取人数：" + allpeople + "/<span>"+msg.fakeMaxReceiveCount+"</span>";
	           			$(".award_title h1").html(titlestr)
	           			$("#activity_info").html("<br/><h3>奖励已领取完啦，敬请等待下次活动吧！~</h3>")
	           		}else{	           			
	           			//业务逻辑展示
	           			if(msg.isManager==1){
	           				//是闯建者
	           				if(msg.awdRecStatus==1){
	           					//领取过展示券码
	           					var yesstr= "<h3>我的卷码</h3><h4>京东卡密码:" +msg.awardList[0].couponCode+ '</h4><a href="http://help.jd.com/user/issue/288-493.html" class="shi"  target="_blank">使用规则</a>';
		                        $("#activity_info").html(yesstr)
	           				}else{
	           					//没有领取过
	           					//判断当前班级是否完成活动
	           					if(msg.actProStatus==0){
	           						//未完成显示当前差了多少人
	           						 var s = "<h1>当前班级还差<span>" + msg.needJoinCount + "</span>个家长</h1><h2>即可领取活动奖励，加油哦！！</h2>";
	               					 $("#activity_info").html(s)
	           					}else{
	           						//完成
	           						$("#activity_info").html('<h3>恭喜，您已完成邀请任务，即刻领取奖励吧</h3><a class="ling" >领取奖励</a>');
	           						$(".ling").on("click",ling);
	           					}
	           				};
	           			}else{
	           				$("#activity_info").html("<br/><h3 style='line-height: 20px;'>您不是当前班级的创建者，<br/>邀请家长无法获得奖励哦~</h3>")
	           			}
	           		}
	        	}else{
	        		if(data.message=='登陆失效，请重新登录'){
	        			data.message='该用户已在其他设备登录';
	        			$(".duifixed").show();
	        			$(".duifixed .dui_box p").text(data.message);
	        			$(".duifixed .dui_box button").hide();
	        			setInterval(function(){
	        				$(".duifixed").hide();
	        				gologo();
	        			},3000)
			     	}else if(data.message=='活动已经结束'){
			     		$("#activity_info").html("<br/><h3 style='line-height: 20px;'>奖励已领取完啦，敬请等待下次活动吧！</h3>")
			     		let endstr='<li>'+
										'<img src="../../../source/images/activity/icon/moren.png"/>'+
										'<h1> 赵**</h1>'+
										'<h2>老师</h2>'+
										'<h3>领取30元京东券</h3>'+
									'</li>'+
									'<li>'+
										'<img src="../../../source/images/activity/icon/02.png"/>'+
										'<h1> 宋**</h1>'+
										'<h2>老师</h2>'+
										'<h3>领取30元京东券</h3>'+
									'</li>';
						$("#scroll_list_1 ul").append(endstr);				
			     		$(".duifixed").show();
		        		$(".duifixed .dui_box p").text(data.message)
		        		$(".mie").click(function(){
		        			$(".duifixed").hide();	        					        			
		        		})
			     	}else{
			     		$(".duifixed").show();
		        		$(".duifixed .dui_box p").text(data.message)
		        		$(".mie").click(function(){
		        			$(".duifixed").hide();	        					        			
		        		})
			     	};	        		
	        	};
	        	
	        },
    	});
    };
   $("#dianjiling").click(function(){
   	ling()
   })
//  点击按钮时发请求获取奖券信息
   function ling(){
        $.ajax({
            type: "POST",
            url: api + "/business/activity/recAwd.json",
            headers: {
                device: "ios",
                version: "1.3.3",
                UserAgent: "teacher"
            },
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(passdata),
            success: function(i) {
                if(i.code==200){
                	console.log(i)
                	var n = i.data.awardVoList;
                   //领取过展示券码
   					var yesstr2= "<h3>我的卷码</h3><h4>京东卡密码:" +n[0].couponCode+ '</h4><a href="http://help.jd.com/user/issue/288-493.html" class="shi"  target="_blank">使用规则</a>';
                    $("#activity_info").html(yesstr2)
                    $(".jl").show();
                    $(".jl .jl_box h2").text(n[0].couponCode);
                    $(".jl .jl_box button,.close").click(function() {
                    $(".jl").hide()
                    });
                    //500毫秒以后回调数据
                    setTimeout(function(){
                    	main();
                    },500)                    
                }else{
                	$(".duifixed").show();
		        	$(".duifixed .dui_box p").text(i.message)
		        	$(".mie").click(function(){
		        		$(".duifixed").hide();	        					        			
		        	})
                };
            }
        })	          
   };
	//强制跳转到首页
	function gologo(){
		// 根据浏览器判断是苹果设备还是安卓设备
		var ua = navigator.userAgent;
		var isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //android终端
	    var isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    	if(isAndroid){
    		android.tokenLose('我是安卓');  		
    	}else{
    		console.log('我是ios')
    	}	        
	};   
}
