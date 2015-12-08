$(function(){
    // 搜索下拉框
    $('ul.search-type').click(function(){
        $('.btn-subtype').toggleClass('btn-subtype-rotat');
        $('.subtype-wrap').slideToggle(200);
    })
    // 推荐用户排版
    $('ul.ul-users').find('li').each(function(index, el) {
        if( (index+1)%3 == 0 )$(this).css('marginRight','0px');
    });
    // 微信
    $('#wechat').on('mouseenter', function(){
        $(this).find('img').stop().fadeIn();
    }).on('mouseleave', function(){
        $(this).find('img').stop().fadeOut();
    })
});