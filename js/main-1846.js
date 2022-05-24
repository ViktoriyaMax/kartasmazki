'use strict';

$(document).ready(function () {



    $('.filter-row .dropdown-menu').click(function(e) {
        e.stopPropagation();
    });
    // Materiale Style Form
    $('.form-control').on('focusin', function () {
        var
            $this = $(this),
            row = $this.closest('.form-group'),
            label = row.find('.form-label');

        row.addClass('active');
    });

    $('.form-control').on('focusout', function () {
        var
            $this = $(this),
            row = $this.closest('.form-group'),
            label = row.find('.form-label'),
            val = this.value;


        if (!val) {
            row.removeClass('active');
        }
    });


    $('.navbar-nav .dropdown-menu').on('click', 'a[data-toggle="collapse"]', function (event) {
        $($(this).attr('href')).collapse('toggle');
        event.stopPropagation();
    });


    // Filter More
    $('.filter-more').on('click', function (e) {
        e.preventDefault();

        var $this = $(this),
            group = $this.closest('.filter-row'),
            list = group.find('.filter-list'),
            wrap = group.find('.filter-list-wrap');

        if (!$this.hasClass('on')) {
            $this.addClass('on');
            $this.html('- Свернуть список');

            wrap.addClass('on');
        } else {
            $this.removeClass('on');
            $this.html('+ Показать еще <span class="filter-q"></span>');

            wrap.removeClass('on');
        }

        FilterQ();
    });


    function FilterQ() {
        if ($('.filter-q').length) {
            $('.filter-q').each(function () {
                var $this = $(this),
                    wrap = $this.closest('.filter-row'),
                    ch = wrap.find('.custom-control-input');

                //console.log(wrap);

                $this.text(ch.length - 4);
            });
        }
    }

    FilterQ();


    // Calculate +\-
    function calculation() {

        $('.quant-btn').click(function (e) {
            e.preventDefault();

            var
                $this = $(this),
                fieldName = $this.attr('data-field'),
                type = $this.attr('data-type'),
                input = $("input[name='" + fieldName + "']"),
                currentVal = parseInt(input.val()),
                counter;


            if (!isNaN(currentVal)) {
                if (type == 'decrement') {
                    var minValue = parseInt(input.attr('min'));
                    if (!minValue) minValue = 1;
                    if (currentVal > minValue) {
                        input.val(currentVal - 1).change();

                        counter = input.val();

                    }

                    if (parseInt(input.val()) == minValue) {
                        $(this).attr('disabled', true);
                    }

                } else if (type == 'increment') {
                    var maxValue = parseInt(input.attr('max'));
                    if (!maxValue) maxValue = 9999999999999;

                    if (currentVal < maxValue) {
                        input.val(currentVal + 1).change();

                        counter = input.val();

                    }

                    if (parseInt(input.val()) == maxValue) {
                        $(this).attr('disabled', true);
                    }

                }
            } else {
                input.val(0);
            }
        });

        $('.quant-control').focusin(function () {

            var
                $this = $(this),
                counter;

            counter = $this.val();
        });


        $('.quant-control').change(function () {

            var
                $this = $(this),
                counter;

            var minValue = parseInt($(this).attr('min'));
            var maxValue = parseInt($(this).attr('max'));
            if (!minValue) minValue = 1;
            if (!maxValue) maxValue = 9999999999999;
            var valueCurrent = parseInt($(this).val());

            var name = $(this).attr('name');
            if (valueCurrent >= minValue) {
                $(".quant-btn[data-type='decrement'][data-field='" + name + "']").removeAttr('disabled')
            } else {
                //alert('Sorry, the minimum value was reached');
                //$(this).val($(this).data('oldValue'));
            }
            if (valueCurrent <= maxValue) {
                $(".quant-btn[data-type='increment'][data-field='" + name + "']").removeAttr('disabled')
            } else {
                //alert('Sorry, the maximum value was reached');
                //$(this).val($(this).data('oldValue'));
            }

            counter = $this.val();
        });


        $(".quant-control").keydown(function (e) {

            var
                $this = $(this),
                counter;

            // Allow: backspace, delete, tab, escape, enter and .
            if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
                // Allow: Ctrl+A
                (e.keyCode == 65 && e.ctrlKey === true) ||
                // Allow: home, end, left, right
                (e.keyCode >= 35 && e.keyCode <= 39)) {
                // let it happen, don't do anything
                return;
            }
            // Ensure that it is a number and stop the keypress
            if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
                e.preventDefault();
            }

            counter = $this.val();
        });
    }

    calculation();


    // ---------------------------------- Range slider jq ui
    $('.filter-slider-element').each(function () {
        var $this = $(this),
            container = $this.closest('.filter-slider'),
            min = parseInt($this.data('min')),
            max = parseInt($this.data('max')),
            start = $this.data('start') ,
            end =  $this.data('end') ,
            from = container.find('.filter-slider-input-from'),
            to = container.find('.filter-slider-input-to');
/**/
        var ids=$this.attr('id');

       /* from.change(function () {alert(1);
            $this.slider('values', 0, from.val());
            count_product(0);
        });

        to.change(function () {alert(2);
            $this.slider('values', 1, to.val());

            count_product(0);
        });
*/

        $('[type="reset"]').click(function () {

            console.log(from.val() + ' ' + to.val() + ' ');
            from.attr('value', min);
            to.attr('value', max);

            $this.slider("values", 0, min);
            $this.slider("values", 1, max);


        });


        from.on('keyup keypress', function (e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                $(this).change();
                e.preventDefault();
                return false;
            }
        });


        to.on('keyup keypress', function (e) {
            var keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                $(this).change();
                e.preventDefault();
                return false;
            }
        });


var start_1=min;
var end_1=max;



if(start!==''){
    var start_1=start;
    var end_1=end;


}

        $this.slider({
            range: true,
            min: min,
            max: max,
            values: [start_1, end_1],
            slide: function (event, ui) { // При каждом перемещении
                var values = $(this).slider('option', 'values');
                from.val(ui.values[0]);
                to.val(ui.values[1]);

                // $('.filter_amount-1 span').html(ui.values[0]);
                // $('.filter_amount-2 span').html(ui.values[1]);

                $('.ui-slider-handle:eq(0)').html('<span>' + ui.values[0] + '</span>');
                $('.ui-slider-handle:eq(1)').html('<span>' + ui.values[1] + '</span>');

                //console.log(ui.values[0] + '₽');
            },
            change: function (event, ui) { // В конце перетаскивания
                //console.log('change');
                $('#form_filter').submit();
                /*count_product(0);*/
            },
            create: function () { // При создании виджета
                var values = $(this).slider('option', 'values');
              if(start!==''){

                  from.val(start);
                  to.val(end);
              }  else {
                  from.val(values[0]);
                  to.val(values[1]);
              }
                // $('.filter_amount-1 span').html(values[0]);
                // $('.filter_amount-2 span').html(values[1]);

                //console.log(values[1]);
            },
            stop: function (event, ui) { // При завершении перетаскивания

            }

        });

        if(start!==''){

            from.val(start);
            to.val(end);
        }  else {
            from.val('');
            to.val('');
        };

        from.change(function () {


if(from.val( )==''){
    from.val(min);
}
                if(to.val( )==''){
                    to.val(max);
                }



            $this.slider('values', 0, from.val());
            $this.slider('values', 1, to.val());
            count_product(0);
        });

        to.change(function () {
            $this.slider('values', 0, from.val());
            $this.slider('values', 1, to.val());

            count_product(0);
        });
    });

    /*-----------------------------------------------------------------*/
    /*  PLUGINS */
    /*-----------------------------------------------------------------*/
    $('[data-toggle="tooltip"]').tooltip({
        trigger: 'hover',
        template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
    });


    $('.filter [data-toggle="tooltip"]').each(function () {
        var $this = $(this),
            wrap = $this.closest('li');

        $this.tooltip({
            container: wrap,
            trigger: 'click',
            template: '<div class="tooltip" role="tooltip"><div class="arrow"></div><div type="button" class="tooltip-close" data-toggle="tooltip"></div><div class="tooltip-inner"></div></div>'
        });
    })


    $(document).on("click", ".tooltip .tooltip-close", function () {
        $(this).parents(".tooltip").tooltip('hide');
    });

    //Select2
    if ($('.js-select').length) {
        $('.js-select').select2({
            // closeOnSelect : false,
            // allowHtml: true,
            // allowClear: true,
            placeholder: function () {
                $(this).data('placeholder');
            }
        });
    }

    $('[data-fancybox]').fancybox({
        touch: false
    });


    // Rating Star
    if ($(".rate").length) {

        var $this = $(".rate"),
            item = $this.closest('.rate-wrap');
        //label = item.find('.rate-label');

        //label.text($this.data('rate-value'));


        var options = {
            selected_symbol_type: 'image',
            max_value: 5,
            step_size: 0.5,
            initial_value: 3.5,
            //readonly: true,
            symbols: {
                image: {
                    base: '<svg class="icon icon-icon-rate"><use xlink:href="#icon-icon-rate"></use></svg>',
                    hover: '<svg class="icon icon-icon-rate-active"><use xlink:href="#icon-icon-rate-active"></use></svg>',
                    selected: '<svg class="icon icon-icon-rate-active"><use xlink:href="#icon-icon-rate-active"></use></svg>',
                },
            }
        }

        $(".rate").rate(options);
    }


    /*=========== Phone Mask ===========*/
    $('.js-phone').mask("+7(999)999-9999");

    /*=========== Slick Slider ===========*/

    if ($('.card-settings').length) {
        $('.card-settings').each(function () {

            var $this = $(this);

            $this.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: false,
                infinite: false,
                touchMove: true,
                draggable: true,
                lazyLoad: 'ondemand',
                prevArrow: '<span class="slick-prev new_slick"><svg class="icon icon-icon-sl-left"><use xlink:href="#icon-icon-sl-left"></use></svg></span>',
                nextArrow: '<span class="slick-next new_slick"><svg class="icon icon-icon-sl-right"><use xlink:href="#icon-icon-sl-right"></use></svg></span>',
                variableWidth: true
            });

        });

    }



    if ($('.intro-slider').length) {
        $('.intro-slider').each(function () {

            var $this = $(this);

            $this.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                dots: false,
                infinite: true,
                touchMove: true,
                draggable: true,
                lazyLoad: 'ondemand',
                prevArrow: '<button class="slick-prev"><svg class="icon icon-icon-sl-left"><use xlink:href="#icon-icon-sl-left"></use></svg></button>',
                nextArrow: '<button class="slick-next"><svg class="icon icon-icon-sl-right"><use xlink:href="#icon-icon-sl-right"></use></svg></button>',

                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 1,
                            arrows: false,
                            dots: true
                        }
                    },
                ]

            });

        });
    }

    if ($('.slider-4').length) {
        $('.slider-4').each(function () {

            var $this = $(this);

            $this.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                dots: true,
                infinite: true,
                touchMove: true,
                draggable: true,
                lazyLoad: 'ondemand',
                prevArrow: '<button class="slick-prev"><svg class="icon icon-icon-sl-left"><use xlink:href="#icon-icon-sl-left"></use></svg></button>',
                nextArrow: '<button class="slick-next"><svg class="icon icon-icon-sl-right"><use xlink:href="#icon-icon-sl-right"></use></svg></button>',

                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                            arrows: true
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });

        });
    }

    if ($('.slider-5').length) {
        $('.slider-5').each(function () {

            var $this = $(this);

            $this.slick({
                slidesToShow: 5,
                slidesToScroll: 1,
                dots: false,
                infinite: true,
                touchMove: true,
                draggable: true,
                lazyLoad: 'ondemand',
                prevArrow: '<button class="slick-prev"><svg class="icon icon-icon-sl-left"><use xlink:href="#icon-icon-sl-left"></use></svg></button>',
                nextArrow: '<button class="slick-next"><svg class="icon icon-icon-sl-right"><use xlink:href="#icon-icon-sl-right"></use></svg></button>',

                responsive: [
                    {
                        breakpoint: 1200,
                        settings: {
                            slidesToShow: 3,
                            arrows: true
                        }
                    },
                    {
                        breakpoint: 992,
                        settings: {
                            slidesToShow: 2,
                        }
                    },
                    {
                        breakpoint: 576,
                        settings: {
                            slidesToShow: 1,
                        }
                    }
                ]
            });

        });
    }


    $('.object-slider-win').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        asNavFor: '.object-slider-controll',
        arrows: true,
        dots: false,
        infinite: true,
        focusOnSelect: true,
        prevArrow: '<button class="slick-prev"><svg class="icon icon-icon-sl-left"><use xlink:href="#icon-icon-sl-left"></use></svg></button>',
        nextArrow: '<button class="slick-next"><svg class="icon icon-icon-sl-right"><use xlink:href="#icon-icon-sl-right"></use></svg></button>',

    });

    $('.object-slider-controll').slick({
        slidesToShow: 6,
        slidesToScroll: 1,
        arrows: false,
        vertical: false,
        dots: false,
        infinite: true,
        asNavFor: '.object-slider-win',
        focusOnSelect: true,
        centerMode: false,
        adaptiveHeight: false,
        variableWidth: false,
        lazyLoad: 'ondemand',
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 5,
                    vertical: false
                }
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 4,
                    vertical: false
                }
            },
        ]
    });


    $('.compare-slider-top').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.compare-slider',
        arrows: true,
        dots: false,
        infinite: true,
        focusOnSelect: true,
        prevArrow: $('#compare-prev'),
        nextArrow: $('#compare-next'),
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });

    $('.compare-slider').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: '.compare-slider-top',
        arrows: false,
        dots: false,
        infinite: true,
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                }
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });


    /*=========== Callback ===========*/
  /*  (function () {

        var app = {

            init: function () {
                this.setUpListeners();
            },

            setUpListeners: function () {

                $(document).on('submit', 'form', this.submitForm);
                $(document).on('keyup', 'input', this.removeError);
            },

            submitForm: function (e) {
                e.preventDefault();
                var form = $(this),
                    btnSubmit = form.find('[type="submit"]'),
                    calcForm = $('.calculation-form'),
                    defForm = $('.form'),
                    btnSubmit = form.find('[type="submit"]');

                if (form.validate().form() === false) {
                    btnSubmit.addClass('disabled');
                    return false;
                } else {
                    btnSubmit.removeClass('disabled');
                }


                var str = form.serialize();

                var sc = $('#success-form');

                $.ajax({
                    url: 'contacts.php',
                    type: 'post',
                    data: str + document.location.search.replace('?', '&')
                }).done(function (msg) {

                    if (msg === "OK") {

                        setTimeout(function () {
                            $.fancybox.close();
                        }, 1000);


                        if (typeof form[0].reset == "function") {
                            form[0].reset();
                        } else {
                            form[0].reset.click();
                        }

                        $.fancybox.open({
                            src: sc,
                            type: 'inline',
                        });

                    } else {

                        $.fancybox.open({
                            src: sc,
                            type: 'inline',
                        });

                    }

                }).always(function () {

                });
            },

            removeError: function () {
                var $this = $(this),
                    formGroup = $this.closest('.form-group'),
                    form = $(this).closest('form'),
                    btnSubmit = form.find('[type="submit"]');


                if ($this.valid()) {
                    btnSubmit.removeClass('disabled');
                } else {
                    btnSubmit.addClass('disabled');
                }
            }
        }

        app.init();
    })();*/


});

$(document).on('change', '.topfiltrecheckbox', function () {
    count_product(0);
});

$(document).on('click', '.btnzaprosform', function () {



    if ($('#form_zapros').validate().form() === false) {
        $('.btnzaprosform').addClass('disabled');
        return false;
    } else {
        $('.btnzaprosform').removeClass('disabled');
    }


    $.ajax({
        url: '/ajax/zapros/',
        type: 'post',
        data: $('#form_zapros').serialize()
    }).done(function (msg) {

        $.fancybox.open({
            src: $('#success-form_zapros'),
            type: 'inline',
        });
    }).always(function () {

    });
    return  false

});
$(document).on('click', '.zapros_tovara', function () {
    var data_id = $(this).data('id');
    var amount = $('#calc-' + data_id).val();

    $('#form_zapros input[name="id"]').val(data_id);
$('#form_zapros input[name="amount"]').val(amount);

    $.fancybox.open({
        src: $('#callback-p'),
        type: 'inline',
    });
    return false;
})


$(document).on('click', '.add_to_cart', function () {
    var data_id = $(this).data('id');
    var amount = $('#calc-' + data_id).val();

    $.ajax({
        url: '/ajax/add_to_cart/',
        type: 'post',
        data: {
            id: data_id,
            amount: amount


        },  success: function(m){


                if (m['error'] == 0) {
                    $.fancybox.open({
                        src: $('#success-p-2'),
                        type: 'inline',
                    });
                    $('.scount').html(m['scount']);
                    $('.stotal').html(m['stotal']+'Р');
                } else {

                    $('.section-bodyerror-form').html(m['mess'])
                    $.fancybox.open({
                        src: $('#error-form'),
                        type: 'inline',
                    });
                }
            }
    })


    return false;
})

$(document).on('click','.close_succescart',function () {
    $.fancybox.close();
});


function calculation_cart() {

    $('.quant-btn_1').click(function (e) {
        e.preventDefault();

        var
            $this = $(this),
            fieldName = $this.attr('data-field'),
            type = $this.attr('data-type'),
            input = $("input[name='" + fieldName + "']"),
            id =$this.attr('data-id'),
            currentVal = parseInt(input.val()),
            counter;


        if (!isNaN(currentVal)) {
            if (type == 'decrement') {
                var minValue = parseInt(input.attr('min'));
                if (!minValue) minValue = 1;
                if (currentVal > minValue) {
                    input.val(currentVal - 1).change();

                    counter = input.val();

                }

                if (parseInt(input.val()) == minValue) {
                    $(this).attr('disabled', true);
                }

            } else if (type == 'increment') {
                var maxValue = parseInt(input.attr('max'));
                if (!maxValue) maxValue = 9999999999999;

                if (currentVal < maxValue) {
                    input.val(currentVal + 1).change();

                    counter = input.val();

                }

                if (parseInt(input.val()) == maxValue) {
                    $(this).attr('disabled', true);
                }

            }
        } else {
            input.val(0);
        }

        set_counter(counter, id)
    });

    $('.quant-control').focusin(function () {

        var
            $this = $(this),
            counter;

        counter = $this.val();
    });


    $('.quant-control').change(function () {

        var
            $this = $(this),
            counter;

        var minValue = parseInt($(this).attr('min'));
        var maxValue = parseInt($(this).attr('max'));
        var id = $(this).attr('data-id')
        if (!minValue) minValue = 1;
        if (!maxValue) maxValue = 9999999999999;
        var valueCurrent = parseInt($(this).val());

        var name = $(this).attr('name');
        if (valueCurrent >= minValue) {
            $(".quant-btn[data-type='decrement'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            //alert('Sorry, the minimum value was reached');
            //$(this).val($(this).data('oldValue'));
        }
        if (valueCurrent <= maxValue) {
            $(".quant-btn[data-type='increment'][data-field='" + name + "']").removeAttr('disabled')
        } else {
            //alert('Sorry, the maximum value was reached');
            //$(this).val($(this).data('oldValue'));
        }

        counter = $this.val();set_counter(counter,id);
    });


    $(".quant-control").keydown(function (e) {

        var
            $this = $(this),
            counter;

        // Allow: backspace, delete, tab, escape, enter and .
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
            // Allow: Ctrl+A
            (e.keyCode == 65 && e.ctrlKey === true) ||
            // Allow: home, end, left, right
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }

        counter = $this.val();

    });

}

calculation_cart();
function  set_counter(counter,id) {
    $.ajax({
        url: '/ajax/cart_recalc/',
        type: 'post',
        data: {
            id: id,
            amount: counter


        },  success: function(m){


            if (m['error'] == 0) {
$('.total_field_'+id).html(m['total']+'Р');
                $('.scount').html(m['scount']);
                $('.stotal').html(m['stotal']+'Р');
                $('.order_summ').val(m['stotal']);
                fcal();
            } else {

                $('.quant-control_'+id).val(m['amount'])


                $('#success-p-1111 .section-body').html( m['mess'])
                $.fancybox.open({
                    src: $('#success-p-1111'),
                    type: 'inline',
                });

            }
        }
    })
}

$('.get_ship_price').click(function () {
    $(this).attr('disabled',true);
    $('.shippricetable').html('<img src="/images/827.svg" style="margin: 0 auto; height: 28px">');


    $.ajax({
        type: "get",
        url: "/ajax/iml_getprice/",
        data: 'city='+$('#citi_dost').val()+'&adres='+$('#input-payment-address-1').val(),
        success: function (html1) {
            $('.get_ship_price').attr('disabled',false);
            $('.shippricetable').html(html1);

        }
    });
    return false
});
$(document).on('click','.open_analog',function (){

    $('#myTab li:last-child a').tab('show');
    return false
})

$(document).on('click','.set_delivery',function () {
  if($(this).data('dver')=='deliveryToPoint'){
      $('.recc').hide();
      $('.checkout-body .collapse').collapse('hide')

$('.adrescalsss').hide();

  }
    if($(this).data('dver')=='deliveryToDoor'){

        $('.recc').show();
        $('.checkout-body .collapse').collapse('show');
        $('.adrescalsss').show();
    }

    $('.delivery_company').val($(this).data('company'));
    $('.delivery_type').val($(this).data('tarifname'));
    $('.delivery_time').val($(this).data('time'));
    $('.new_ship_method').val($(this).data('method'));
    $('.delivery_price').val($(this).data('price')); fcal();


    var city=$(this).data('city');
    var company=$(this).data('company');
    var dver=$(this).data('dver');
    $('.m_del_adres').html('');

    $.ajax({
        url: '/ajax/get_pickpoint/',
        type: 'post',
        data: {
            city: city,
            company: company,
            dver: dver,



        },  success: function(m){
$('.m_del_adres').html(m);
            if ($('.js-select').length) {
                $('.js-select').select2({
                    // closeOnSelect : false,
                    // allowHtml: true,
                    // allowClear: true,

                    placeholder: function () {
                        $(this).data('placeholder');
                    }
                });
            }

        }
    })


});
$(document).on('click','.radio_delivery',function () {

    $('.shippricetable').html('');
    $('.delivery_company').val('');
    $('.delivery_type').val('');
    $('.delivery_time').val('');
    $('.delivery_price').val(0); fcal();

    if($(this).data('dver')=='deliveryToPoint'){
        $('.recc').hide();
        $('.checkout-body .collapse').collapse('hide')

        $('.adrescalsss').hide();

    }
    if($(this).data('dver')=='deliveryToDoor'){

        $('.recc').show();
        $('.checkout-body .collapse').collapse('show');
        $('.adrescalsss').show();
    }

});
function fcal() {

    var delivery_price=$('.delivery_price').val();
    var summ_order=$('.order_summ').val();
    var total=parseInt(delivery_price)+parseInt(summ_order);

    $('.span_del_price').html(delivery_price+'Р');
    $('.total_summ').html(total+'Р');


    if($('#checkoutType2:checked').val()==2){
        $('.recc').show();

    }else{
        $('.recc').hide();
    }

}


$(document).on('click','.send_order',function () {



    if($('#checkoutType2:checked').val()==2){

if($('#citi_dost').val()==''){

 $('#success-p-1111 .section-body').html('Заполните город доставки')
    $.fancybox.open({
        src: $('#success-p-1111'),
        type: 'inline',
    });

return false;


}
        if($('input[name=dost_ratio]').is(':checked')) {


        }else{

            $('#success-p-1111 .section-body').html('Расчитайте доставку и выберите тариф доставки')
            $.fancybox.open({
                src: $('#success-p-1111'),
                type: 'inline',
            });

            ;return false;
        }
       /* if($('[name="checkoutRegion"]').val()==''){   ferror();return  false;}*/
        if($('[name="profCity"]').val()==''){   ferror();return  false;}
        if($('[name="profStreet"]').val()==''){   ferror();return  false;}
        if($('[name="profHouse"]').val()==''){   ferror();return  false;}





      /* */

        if($('input[name=dost_ratio]:checked').data('dver')=='deliveryToPoint'){




        }
        if($('input[name=dost_ratio]:checked').data('dver')=='deliveryToDoor'){

            if($('[name="checkoutRegion"]').val()==''){   ferror();return  false;}
        }

        if($('[name="profCity"]').val()==''){   ferror();return  false;}
        if($('[name="profStreet"]').val()==''){   ferror();return  false;}
        if($('[name="profHouse"]').val()==''){   ferror();return  false;}



    }

if(!$('#checkoutCheck').is(':checked')){
    $('#success-p-1111 .section-body').html('Для отправки заказа вы должны принять политику обработки персональных данных и политику конфиденциальности')
    $.fancybox.open({
        src: $('#success-p-1111'),
        type: 'inline',
    });
    return false;
}

if($('[name="checkoutName"]').val()==''){   ferror();return  false;}
if($('[name="checkoutEmail"]').val()==''){   ferror();return  false;}
if($('[name="checkoutPhone"]').val()==''){   ferror();return  false;}
if($('[name="checkoutLastname"]').val()==''){   ferror();return  false;}


    $('#form_order').submit();
    return false;


})

$(document).on('click','#citi_dost',function () {
    $('#checkoutType2').prop('checked',true);
    $('.shippricetable').html('');
})
function ferror() {

    $('#success-p-1111 .section-body').html('Заполните обязательные поля формы')
    $.fancybox.open({
        src: $('#success-p-1111'),
        type: 'inline',
    });
}
var  tip_dostavka=0;
$('#citi_dost').autocomplete({
    serviceUrl: '/ajax/get_city/', // Страница для обработки запросов автозаполнения
    minChars: 2, // Минимальная длина запроса для срабатывания автозаполнения
    delimiter: /(,|;)\s*/, // Разделитель для нескольких запросов, символ или регулярное выражение
    maxHeight: 400, // Максимальная высота списка подсказок, в пикселях
    width: 560, // Ширина списка
    zIndex: 9999, // z-index списка
    deferRequestBy: 300, // Задержка запроса (мсек), на случай, если мы не хотим слать миллион запросов, пока пользователь печатает. Я обычно ставлю 300.
    /* params: { country: 'Yes'},*/ // Дополнительные параметры
    onSelect: function(data, value){ }, // Callback функция, срабатывающая на выбор одного из предложенных вариантов,
    //   lookup: ['January', 'February', 'March'] // Список вариантов для локального автозаполнения
});

var mregion='';
var mcity='';
$('#dataadres_region').autocomplete({
    serviceUrl: '/ajax/get_adres_regions/', // Страница для обработки запросов автозаполнения
    minChars: 2, // Минимальная длина запроса для срабатывания автозаполнения
    // Разделитель для нескольких запросов, символ или регулярное выражение
    maxHeight: 400, // Максимальная высота списка подсказок, в пикселях
    width: 560, // Ширина списка
    zIndex: 9999, // z-index списка
    deferRequestBy: 300, // Задержка запроса (мсек), на случай, если мы не хотим слать миллион запросов, пока пользователь печатает. Я обычно ставлю 300.
    /* params: { country: 'Yes'},*/ // Дополнительные параметры
    onSelect: function(data, value){
        mregion=data.value;

        $('#dataadres_city').val('');
        $('#dataadres_city').autocomplete({
            serviceUrl: '/ajax/get_adres_city/', // Страница для обработки запросов автозаполнения
            minChars: 2, // Минимальная длина запроса для срабатывания автозаполнения
            // Разделитель для нескольких запросов, символ или регулярное выражение
            maxHeight: 400, // Максимальная высота списка подсказок, в пикселях
            width: 560, // Ширина списка
            zIndex: 9999, // z-index списка
            deferRequestBy: 300, // Задержка запроса (мсек), на случай, если мы не хотим слать миллион запросов, пока пользователь печатает. Я обычно ставлю 300.
            params: { reg:mregion},
            onSelect: function(data, value){
                mcity=data.value;
                $('#dataadres_street').val('');
                $('#dataadres_street').autocomplete({
                    serviceUrl: '/ajax/get_adres_street/', // Страница для обработки запросов автозаполнения
                    minChars: 2, // Минимальная длина запроса для срабатывания автозаполнения
                    // Разделитель для нескольких запросов, символ или регулярное выражение
                    maxHeight: 400, // Максимальная высота списка подсказок, в пикселях
                    width: 560, // Ширина списка
                    zIndex: 9999, // z-index списка
                    deferRequestBy: 300, // Задержка запроса (мсек), на случай, если мы не хотим слать миллион запросов, пока пользователь печатает. Я обычно ставлю 300.
                    params: {city:mcity,
                        region:mregion
                    },
                    onSelect: function(data, value){

                    }, // Callback функция, срабатывающая на выбор одного из предложенных вариантов,
                    //   lookup: ['January', 'February', 'March'] // Список вариантов для локального автозаполнения
                });
            }, // Callback функция, срабатывающая на выбор одного из предложенных вариантов,
            //   lookup: ['January', 'February', 'March'] // Список вариантов для локального автозаполнения
        });
    }, // Callback функция, срабатывающая на выбор одного из предложенных вариантов,
    //   lookup: ['January', 'February', 'March'] // Список вариантов для локального автозаполнения
});





$(document).on('click','.gologin',function () {

    if ($('#form_login').validate().form() === false) {

        return false;
    }

    $.ajax({
        type: "post",
        url: "/ajax/login/",
        data: $('#form_login').serialize(),
        success: function (html1) {

if(html1==0){
    $('#success-p-1111 .section-body').html('Неверный логин или пароль')
    $.fancybox.open({
        src: $('#success-p-1111'),
        type: 'inline',
    });
    return false;
}
return  window.location.href='/lk';
        }
    });


})

$(document).on('click','.goregister',function () {

    if ($('#register_form').validate().form() === false) {

        return false;
    }

    $.ajax({
        type: "post",
        url: "/ajax/register/",
        data: $('#register_form').serialize(),
        success: function (html1) {

            if(html1['error']==0){
                $('#success-p-1111 .section-body').html(html1['mess'])
                $.fancybox.open({
                    src: $('#success-p-1111'),
                    type: 'inline',
                });
                return false;
            }
            return  window.location.href='/lk';
        }
    });


})
$(document).on('click','.gorepass',function () {

    if ($('#repass_form').validate().form() === false) {

        return false;
    }

    $.ajax({
        type: "post",
        url: "/ajax/repass/",
        data: $('#repass_form').serialize(),
        success: function (html1) {


                $('#success-p-1111 .section-body').html(html1['mess'])
                $.fancybox.open({
                    src: $('#success-p-1111'),
                    type: 'inline',
                });
                return false;

        }
    });


})

$(document).on('keyup','#brand_search',function () {
    $('.my_brands').hide();
    var zn=$(this).val().toLowerCase();

 if(zn=='') {
     $('.my_brands').show();
     return '';

 }
    $('.my_brands').each(function( index ) {
 var $znch=$(this).data('name').toLowerCase();
console.log($znch);
console.log(zn);
console.log($znch.indexOf(zn));
 if($znch.indexOf(zn)==0){
     $(this).show();
 }else {
     $(this).hide();
 }



    });
})

$(".filter-row input").click(function() {
    console.log('S>>>' + $(this).offset().top);
    $('.filter-submit').css({
        'display' : 'flex',
        'top': $(this).offset().top - $(this).closest('.filter').offset().top,
        'left': $(this).closest('.filter').width() - 15
    });

});


$('.filter-submit-close').on('click', function(e){
    e.preventDefault();

    $(this).closest('.filter-submit').css({
        'display' : 'none',
    });
});



$(".filter-row input").click(function() {

    $('.filter-submit').css({

        'top': $(this).offset().top - $(this).closest('.filter').offset().top,
        'left': $(this).closest('.filter').width() - 15
    });
    count_product(1);


});



function count_product(id){

    $.ajax({
        url: '/ajax/filtre_count/',
        type: 'post',
        data: $('#form_filter').serialize(),  success: function(m){
          if(id==1) {
              $('.filter-submit').css({
                  'display': 'flex'

              });
          }
            $('.filter-submit-res').html('('+m+')');
            if(m==0){
                $('.filter-submit-link').prop('disabled',true);




            }else{
                $('.filter-submit-link').prop('disabled',false);
            }


        }
    })




}
$('.filter-submit-close').on('click', function(e){
    e.preventDefault();

    $(this).closest('.filter-submit').css({
        'display' : 'none',
    });
});
/*
$('.filter.dropdown-menu').click(function(e) {
    e.stopPropagation();
});$('.filter.dropdown-menu').click(function(e) {
    e.stopPropagation();
});
*/

$(document).on('click','.card-remove',function () {

 var id=$(this).data('id');
 $('#card_'+id).remove();
    $.ajax({
        url: '/ajax/cart_delete/',
        type: 'post',
        data: {
            id: id,



        },  success: function(m){


            if (m['error'] == 0) {
                $('.total_field_'+id).html(m['total']+'Р');
                $('.scount').html(m['scount']);
                $('.stotal').html(m['stotal']+'Р');
                $('.order_summ').val(m['stotal']);
                fcal();
            } else {

window.location.reload();


            }
        }
    })
})
$(document).on('click','.pack_in_catalog',function () {

    var id=$(this).data('id');
    var item=$(this).data('item');
    var image=$(this).data('image');
$('.pack_in_catalog'+item).prop('checked',false);
$(this).prop('checked',true);
console.log($(this));
    $('.image_id_'+item).attr('src','/fimage/'+image)
return false;
})

$(document).on('click','#x1',function () {
if($('#x1').is(':checked')){
    $('.hiden').hide();
}else{

    $('.hiden').show();
}


});
$(document).on('click','.add_compare',function () {
    var id=$(this).data('id');

    $(this).addClass('active');
    $.ajax({
        url: '/ajax/add_compare/',
        type: 'post',
        data: {
            id: id,



        },  success: function(m){
$('.class_mess_1i').html(m['text'])
            $.fancybox.open({
                src: $('#success-p-1111_1'),
                type: 'inline',
            });


        }
    })

    return false;
})
