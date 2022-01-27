$(document).ready(function (){
    // Выпадающее окно. Открытие
    $('body').on('click', '.parameter__field > label', function (e) {
        e.preventDefault();
        if ($(this).find('.picker__button').hasClass('active')) {
            $(this).find('.picker__button').removeClass('active');
            $(this).closest('.parameter__field').find('.parameter__field--list').removeClass('active');
            $(this).closest('.parameter__field').find('.parameter__field--list').height(0);
        } else {
            $('body .picker__button.active').removeClass('active');
            $('body .parameter__field--list.active').height('');
            $('body .parameter__field--list.active').removeClass('active');
            $(this).find('.picker__button').addClass('active');
            $(this).closest('.parameter__field').find('.parameter__field--list').addClass('active');
            var filterInnerHeight = $(this).closest('.parameter__field').find('.parameter__field--wrap').outerHeight();
            $(this).closest('.parameter__field').find('.parameter__field--list').height(filterInnerHeight);
        }
        //Проверка на необходиомсть "дымки"
        var filterWrap = $(this).closest('.parameter__field').find('.parameter__field--list .parameter__field--inner').height();
        var filterList = $(this).closest('.parameter__field').find('.parameter__field--list .parameter--list').outerHeight();
        if (filterList > filterWrap) {
            $(this).closest('.parameter__field').find('.parameter__field--list .parameter__field--inner').addClass('hidden');
        }
        setTimeout(()=>{
            checkListVisibility();
        }, 300);
    });


    // Проверка выпадающего списка на видимость в окне
    function checkListVisibility() {
        var elementList = document.querySelector('.parameter__field .parameter__field--list.active');
        var elementListTop = window.pageYOffset + elementList.getBoundingClientRect().top + elementList.offsetHeight;
        var windowTop = window.pageYOffset + document.documentElement.clientHeight;
        if (elementListTop > windowTop) {
            var scrollValue = window.pageYOffset + (elementListTop - windowTop);
            $('html, body').animate({
                scrollTop: scrollValue + 10
            }, 300);
        }
    };


    // Выпадающее окно. Выбор
    $('body').on('click', '.parameter__field .parameter__field--list label', function(){
        if ($(this).find('input[type="radio"]').length > 0) {
            $(this).closest('.parameter--list').find('.selected').removeClass('selected');
            $(this).addClass('selected');
            var labelVal = $(this).find('span').text();
            $(this).closest('.parameter__field').find('.picker__button').val(labelVal);
            $(this).closest('.parameter__field').find('.picker__button').removeClass('active');
            $(this).closest('.parameter__field--list').removeClass('active');
            $(this).closest('.parameter__field--list').css('height',0);
        } else if ($(this).find('input[type="checkbox"]').length > 0) {
            if ($(this).closest('.parameter__field--list').find('input[type="checkbox"]:checked').length > 0) {
                if (!$(this).closest('.parameter__field').find('.parameter__field--button').hasClass('active')) {
                    $(this).closest('.parameter__field').find('.parameter__field--button').addClass('active');
                    var listHeightWithButtons = $(this).closest('.parameter__field--list').height() + $(this).closest('.parameter__field').find('.parameter__field--button').outerHeight(true);
                    $(this).closest('.parameter__field--list').height(listHeightWithButtons);
                }
            } else {
                $(this).closest('.parameter__field').find('.parameter__field--button').removeClass('active');
                var listHeightWithButtons = $(this).closest('.parameter__field--list').height() - $(this).closest('.parameter__field').find('.parameter__field--button').outerHeight(true);
                $(this).closest('.parameter__field--list').height(listHeightWithButtons);
                $(this).closest('.parameter__field').find('.picker__button').val('показывать все');
                $(this).closest('.parameter__field').removeClass('active');
            }
        }
    });


    // Выпадающее окно. Сбросить
    $('body').on('click', '.parameter__field .clear', function(e){
        e.preventDefault();
        $(this).closest('.parameter__field').find('input[type="checkbox"]').prop('checked', false);
        $(this).closest('.parameter__field').find('.parameter__field--list').height('0');
        $(this).closest('.parameter__field').find('.picker__button').val('показывать все');
        $(this).closest('.parameter__field').find('.picker__button').removeClass('active');
        $(this).closest('.parameter__field').removeClass('active');
        $(this).closest('.parameter__field').find('.parameter__field--list').removeClass('active');
        $(this).closest('.parameter__field').find('.parameter__field--button').removeClass('active');
    });


    // Выпадающее окно. Применить
    $('body').on('click', '.parameter__field .apply', function(e){
        e.preventDefault();
        let checkedQantity = $(this).closest('.parameter__field').find('input[type="checkbox"]:checked').length;
        if (checkedQantity > 0) {
            $(this).closest('.parameter__field').find('.picker__button').val('(Выбрано ' + checkedQantity + ')');
            $(this).closest('.parameter__field').addClass('active');
        } else {
            $(this).closest('.parameter__field').find('.picker__button').val('показывать все');
            $(this).closest('.parameter__field').removeClass('active');
        }
        $(this).closest('.parameter__field').find('.parameter__field--list').height('0');
        $(this).closest('.parameter__field').find('.picker__button').removeClass('active');
        $(this).closest('.parameter__field').find('.parameter__field--list').removeClass('active');
    });


    // Выпадающее окно. Действие при скролле
    $('.parameter__field .parameter__field--inner').scroll(function(){
        var scrollTopNav = Math.round($(this).find('.parameter--list').position().top);
        var scrollTopWrap = Math.round($(this).height() - $(this).find('.parameter--list').height());
        if (scrollTopNav == scrollTopWrap) {
            $(this).addClass('scroll-to-end');
        } else {
            $(this).removeClass('scroll-to-end');
        }
    });


    // Выпадающее окно. Закрытие окна при клике вне его
    $(document).mousedown(function (e){
        var modalClient = $(".parameter__field--list");
        var modalOpen = $(modalClient).closest('.parameter__field').children('label');
        if (modalClient.hasClass('active')) {
            if (!modalClient.is(e.target) && modalClient.has(e.target).length === 0 && !modalOpen.is(e.target) && modalOpen.has(e.target).length === 0){
                $('.parameter__field--list.active').height('0');
                $('.parameter__field--list.active').parent().find('.picker__button').removeClass('active');
                $('.parameter__field--list.active').removeClass('active');
            }
        }
    });
});