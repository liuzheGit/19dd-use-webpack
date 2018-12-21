  import $ from 'jquery'
  import './style.css'
  $(function(){
    $('.dialog-wrap').hide();
    var remainTimes = 5, isLogin = true, isReach = true, isGet = false;
    var $hammer = $('<img src="../images/hammer.png" class="hammer">');
    var isBroken = false;
    var myTime = null;
    $('.times-hint .red-times').html(remainTimes);

    // 查看记录
    $('.prize-btns .to-record').click(function(e){
      e.preventDefault();
      $(this).parents('.get-prize').hide();
      setTimeout(function(){
        $('.dialog-wrap.award-record').show();
      },8)
    })
    // 领取
    $('.explain3-button a').click(function(e){
      e.preventDefault();
      if(isLogin === false){
        $('.dialog-wrap.to-login').show();
      }else if(isLogin === true && isReach === false){
        $('.dialog-wrap.get-fail').show();
      }else if(isLogin === true && isReach === true && isGet === true){
        $('.dialog-wrap.get-fail').show().find('.fail-words').html('您已获得此红包!');
      }else{
        $('.dialog-wrap.get-success').show();
      }
    })


    // 砸蛋
    $('.egg-wrap').click(function(){
      if(isLogin === true && remainTimes > 0){
        if(isBroken !== true){
          isBroken = true;
          clearTimeout(myTime);
          $(this).append($hammer);
          let _this = $(this);
          setTimeout(function(){
            _this.find('.gold-egg img').attr('src', '../images/egg-broke.png');
            isBroken = false;
            remainTimes -= 1;
            var result = getPrize();
            if(result === '50'){
              $('.get-prize .prize-txt').html('现金红包');
              $('.get-prize .prize-price').html(5)
            }else{
              $('.get-prize .prize-txt').html('礼金红包');
              $('.get-prize .prize-price').html(result)
            }

            $('.times-hint .red-times').html(remainTimes);
            $('.dialog-wrap.get-prize').show();
        
          }, 1000);
        }
      }else if(isLogin === false){
        $('.dialog-wrap.to-login').show();
      }
    });
    $('.close-btn').click(function(e){
      $(this).parent('.dialog-award').toggleClass('bounceInUp');
      $('.egg-main .hammer').detach();
      $('.gold-egg img').attr('src', '../images/egg.png');
      setTimeout(()=>{
        $(this).parent('.dialog-award').toggleClass('bounceInUp');
        $(this).parents('.dialog-wrap').hide();
      },100)
    })

    $('.ok-btn').click(function(e){
      e.preventDefault();
      $(this).parents('.dialog-award').toggleClass('bounceInUp');
      setTimeout(()=>{
        $(this).parents('.dialog-award').toggleClass('bounceInUp');
        $(this).parents('.dialog-wrap').hide();
      },100)
    })

    function getPrize(){
      var lucks = [5, 70, 15, 10];
      var items = ['50','5','10','20'];
      return goodLuck(items, lucks);
      
    }

    function goodLuck(obj, luck) {
      var sum = 0,factor = 0,random = Math.random();
      for (var i = luck.length - 1; i >= 0; i--) {
        sum += luck[i];
      }
      random *= sum;
      for (var i = luck.length - 1; i >= 0; i--) {
        factor += luck[i];
        if (random <= factor) return obj[i];
      }
      return null;
    }
  })
