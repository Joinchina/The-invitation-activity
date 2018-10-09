"use strict";
window.onload = function() {
    $(function() {
        FastClick.attach(document.body)
    });
    var i = window.location.host,
    l = "";
    function g(i) {
        for (var n = 0; n < i.length; n++) {
            var a = '<li><img src="' + i[n].img + '"/><h1>' + i[n].name + "</h1><h2>老师</h2><h3>领取30元京东券</h3></li>";
            $("#scroll_list_1 ul").append(a)
        }
    }
    function m() {
        var i = $("#scroll_list_1").html();
        $("#scroll_list_2").html(i);
        setInterval(function() {
            var i = $(".award_scroll").scrollTop();
            $("#scroll_list_1").height() <= i ? $(".award_scroll").scrollTop(0) : $(".award_scroll").scrollTop(i + 1)
        },
        60)
    }
    l = -1 < i.indexOf("teacherasst.openonline.com.cn") ? "http://teacherasst.openonline.com.cn:80": "/api";
    var n, a, r = function() {
        for (var i = new Object,        	
        //n = window.location.search.substring(1).split("&"), a = 0; a < n.length; a++) {
        n = "activityId=1&uid=257&token=1cYnZQ//j3Ohb3amDzzFXUCE2UUjJ3H6&clazzId=476".split("&"), a = 0; a < n.length; a++) {
            var e = n[a].indexOf("=");
            if ( - 1 != e) {
                var o = n[a].substring(0, e),
                t = n[a].substring(e + 1);
                i[o] = decodeURI(t)
            }
        }
        return i
    } ();
    a = {
        params: {
            clazzId: (n = r).clazzId,
            activityId: (n = r).activityId,
        },
        token: n.token,
        userId: n.uid
    };
    if(a.params.clazzId==undefined){
    	//console.log("灭有班级提示")
    	$("#activity_info").html("<br/><h3 style='font-size:14px'>您还没有班级，请先创建班级后才能参与活动哦！</h3>")
    }else{
    	$.ajax({
        type: "POST",
        url: l + "/business/activity/getActivityDetail.json",
        headers: {
            device: "ios",
            version: "1.3.3",
            UserAgent: "teacher"
        },
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(a),
        success: function(i) {
        	if(i.code==200){
	            var n = i.data.activityDetail,
	            a = n.fakeReceivedCount + n.receivedCount;
	            a > n.fakeMaxReceiveCount && (a = n.fakeMaxReceiveCount);
	            var e, o, t = "领取人数：" + a + "/<span>"+n.fakeMaxReceiveCount+"</span>";
	            if ($(".award_title h1").html(t), o = [{
	                img: "source/images/activity/icon/01.png",
	                name: "赵**"
	            },
	            {
	                img: "source/images/activity/icon/02.png",
	                name: "张**"
	            },
	            {
	                img: "source/images/activity/icon/03.png",
	                name: "张**"
	            },
	            {
	                img: "source/images/activity/icon/04.png",
	                name: "王**"
	            },
	            {
	                img: "source/images/activity/icon/05.png",
	                name: "刘**"
	            },
	            {
	                img: "source/images/activity/icon/01.png",
	                name: "高**"
	            },
	            {
	                img: "source/images/activity/icon/02.png",
	                name: "赵**"
	            },
	            {
	                img: "source/images/activity/icon/03.png",
	                name: "宋**"
	            },
	            {
	                img: "source/images/activity/icon/04.png",
	                name: "钱**"
	            },
	            {
	                img: "source/images/activity/icon/05.png",
	                name: "任**"
	            },
	            {
	                img: "source/images/activity/icon/01.png",
	                name: "宋**"
	            },
	            {
	                img: "source/images/activity/icon/02.png",
	                name: "孙**"
	            },
	            {
	                img: "source/images/activity/icon/03.png",
	                name: "吴**"
	            },
	            {
	                img: "source/images/activity/icon/04.png",
	                name: "毛**"
	            },
	            {
	                img: "source/images/activity/icon/05.png",
	                name: "常**"
	            },
	            {
	                img: "source/images/activity/icon/01.png",
	                name: "连**"
	            },
	            {
	                img: "source/images/activity/icon/02.png",
	                name: "周**"
	            },
	            {
	                img: "source/images/activity/icon/03.png",
	                name: "郑**"
	            },
	            {
	                img: "source/images/activity/icon/04.png",
	                name: "张**"
	            },
	            {
	                img: "source/images/activity/icon/05.png",
	                name: "贾**"
	            }], (e = a) < 5 ? g(o = o.splice(0, e)) : (5 <= e && e < o.length ? g(o = o.splice(0, e)) : g(o), m()), 0 == n.awdRecStatus) if (1 == n.actProStatus) $("#activity_info").html('<h3>恭喜，您已完成邀请任务，即刻领取奖励吧</h3><a class="ling" >领取奖励</a>'),
	            $(".ling").on("click",
	            function() {
	                var i;
	                i = {
	                    params: {
	                        clazzId: r.clazzId,
	                        activityId: r.activityId,
	                    },
	                    token: r.token,
	                    userId: r.uid
	                },
	                $.ajax({
	                    type: "POST",
	                    url: l + "/business/activity/recAwd.json",
	                    headers: {
	                        device: "ios",
	                        version: "1.3.3",
	                        UserAgent: "teacher"
	                    },
	                    dataType: "json",
	                    contentType: "application/json",
	                    data: JSON.stringify(i),
	                    success: function(i) {
	                        console.log(i);
	                        if(i.code==200){
	                        	var n = i.data.awardVoList,
		                        a = "<h3>我的卷码</h3><h4>" + (d = n.couponCode) + '</h4><a href="http://help.jd.com/user/issue/288-493.html" class="shi">使用规则</a>';
		                        $("#activity_info").html(a),
		                        $(".jl").fadeIn(),
		                        $(".jl .jl_box h2").text(d),
		                        $(".jl .jl_box button,.close").click(function() {
		                            $(".jl").fadeOut()
		                        })
	                        }else{
	                        	alert('您来晚了，活动已经结束了额！')
	                        };
	                    }
	                })
	            });
	            else {
	                var s = "<h1>您还差<span>" + n.needJoinCount + "</span>个家长</h1><h2>即可领取活动奖励，加油哦！！</h2>";
	                $("#activity_info").html(s)
	            } else if (1 == n.isManager) {
	                var c = "<h3>我的卷码</h3><h4>" + n.awardList[0].couponCode + '</h4><a class="shi">使用规则</a>';
	                $("#activity_info").html(c)
	            } else $("#activity_info").html("<br/><h3>您不是当前班级的创建者，<br/>邀请家长无法获得奖励哦~</h3>")
        	}else{
        		$(".duifixed").show();
        		$(".duifixed p").text(i.message)
        		$(".mie").click(function(){
        			history.back(-1);
        		})
        	}
        },
        error: function(i) {
            console.log(i)
        },
        
    	});
    };    
    var d = void 0
};