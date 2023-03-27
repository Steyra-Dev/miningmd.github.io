$(document).ready(function () {
	//$('.infobox .toggle').on('click', function () {
	//$(this).parents('.infobox').toggleClass('active');
	//});

	// -----стилизуем селекты---------
	jQuery('select[name=news]').select2({
		minimumResultsForSearch: Infinity,
		dropdownPosition: 'below'
	});

	jQuery('.default-select').select2({
		minimumResultsForSearch: Infinity,
		dropdownPosition: 'below'
	});


	// ----- преобразуем картинку в встроеный svg------
	function svg() {
		$('img[src$=".svg"]').each(function () {
			var $img = $(this);
			var imgURL = $img.attr('src');
			var attributes = $img.prop('attributes');
			if ($img.hasClass('svg')) {
				$.get(imgURL, function (data) {
					var $svg = jQuery(data).find('svg');
					$svg = $svg.removeAttr('xmlns:a');
					$.each(attributes, function () {
						$svg.attr(this.name, this.value);
					});
					$img.removeClass('svg').replaceWith($svg);
				}, 'xml');
			}
		});
	}
	svg();

	// ----- открываем/закрываем подсказку------
	$('.tooltip').on('click', function () {
		if (document.documentElement.clientWidth <= 1080) {
			$(this).toggleClass('active');
		}
	});


	// ----- открываем/закрываем главное меню------
	$('.nav-toggle').on('click', function () {
		$(this).toggleClass('active');
		$('.navigation').toggleClass('active');
		$('main').toggleClass('bg-over');
	});
	$('main').on('click', function () {
		$(this).removeClass('bg-over');
		$('.navigation').removeClass('active');
		$('.nav-toggle').removeClass('active');
	});

	// ----- добавляем кнопку открытия субменю в главном меню------
	function toggleBut() {
		$(".navigation .submenu").each(function () {
			if (document.documentElement.clientWidth <= 767) {
				$(this).before('<div class="but"></div>');
			} else {
				$('.navigation .but').remove();
			}
		});
	}
	toggleBut();

	// ----- открываем/закрываем субменю.------
	$('.navigation .but').on('click', function () {
		$(this).toggleClass('active');
		$(this).next('.submenu').toggleClass('active');
	});

	// -----открываем/закрываем подменю в иновациях-----
	$('.toggle-dop').on('click', function () {
		$(this).toggleClass('active');
		$('.dop-menu ul').toggleClass('active');
	});
	// -----открываем/закрываем подменю в ценах-----
	$('.toggle-price').on('click', function () {
		$(this).toggleClass('active');
		$('.price-nav').toggleClass('active');
	});
	// -----задаем ширину области для меню с прокруткой-----
	function strechNav() {
		if (document.documentElement.clientWidth > 640) {
			let nav = $('.nav').width();
			let nav_bar = $('.nav-bar').width();
			let strech = nav - nav_bar - 50;
			$('.strech').css('width', strech);
		}
	}
	strechNav();

	// -----открываем/закрываем меню с прокруткой в адаптиве-----
	$('.toggle-strech').on('click', function () {
		$(this).toggleClass('open');
		$('.nav-strech').toggleClass('open');
	});

	// -----показываем выброр в меню с прокруткой в адаптиве-----
	$('.nav-strech a').on('click', function (event) {
		$(this).parents().removeClass('open');
		$('.toggle-strech').removeClass('open');
		if ($(this).hasClass('no-link')) {
			event.preventDefault();
			$(this).addClass('current').siblings().removeClass('current');
			let text = $(this).html();
			$('.toggle-strech .toggle-chek').html(text);
		}
	});
	$('.nav-strech button').on('click', function () {
		$(this).parents().removeClass('open');
		$('.toggle-strech').removeClass('open');
		$(this).addClass('current').siblings().removeClass('current');
		let text = $(this).html();
		$('.toggle-strech .toggle-chek').html(text);
	});

	// меню в фильтре

	$('.toggle-drop').on('click', function () {
		$(this).toggleClass('open');
		$('.nav-drop').toggleClass('open');
	});

	$('.nav-drop button').on('click', function () {
		$(this).parents().removeClass('open');
		$('.toggle-drop').removeClass('open');
		$(this).addClass('current').siblings().removeClass('current');
		let text = $(this).html();
		$('.toggle-drop .text').html(text);
	});

	// --- деактивируем ссылку в проете если короткий текст -----
	function clamphText() {
		if (document.documentElement.clientWidth >= 678) {
			$(".project").each(function () {
				let texth = $(this).find('.clamp').height();
				if (texth < 70) {
					$(this).find('.more').addClass('disable');
				}
			});
		}
	}
	clamphText();

	// --- перемещаем виджеты в адаптиве -----
	function transferWidget() {
		if (document.documentElement.clientWidth <= 992) {
			$('.widget-about').prependTo($('.services-row'));
			$('.widget-about').addClass('show-box active');
			$('.widget-contacts').addClass('show-box active');
			$('.widget-purchase').addClass('show-box active');
			$('.widget-video').appendTo($('.widget-purchase .body'));
		} else {
			$('.widget-about').prependTo($('.sidebar'));
			$('.widget-about').removeClass('show-box active');
			$('.widget-contacts').removeClass('show-box active');
			$('.widget-purchase').removeClass('show-box active');
			$('.widget-video').prependTo($('.sidebar'));
		}
		if (document.documentElement.clientWidth <= 640) {
			$('.section-information').addClass('show-box active bg-white');
			$('.section-local').addClass('show-box active');
			$('.section-faq').addClass('show-box active');
			$('.company-one').addClass('bg-white');
		} else {
			$('.section-information').removeClass('show-box active');
			$('.section-local').removeClass('show-box active');
			$('.section-faq').removeClass('show-box active');
			$('.company-one').removeClass('bg-white');
		}
	}
	transferWidget();

	// --- задаем ширину тексту если рядом картинка -----
	function changeText() {

		$(".service-item").each(function () {
			if (document.documentElement.clientWidth >= 678) {
				if ($(this).children('.image').length > 0) {
					let img = $(this).find('.image').width();
					let text = $(this).width();
					let txw = text - img - 4;
					$(this).find('.text').css('width', txw);
				}
			} else {
				$(this).find('.text').css('width', '100%');
			}
		});

	}
	changeText();

	// --- открываем/закрываем текст в проекте -----
	$('.project .more:not(.disable)').on('click', function () {
		$(this).parents('.project').toggleClass('active');
	});

	// ----открываем/закрываем превью новости------------
	$('.news-post .title').on('click', function () {
		$(this).parents('.news-post').toggleClass('active').siblings().removeClass('active');
	});

	// --- сворачиваем/разворачиваем секцию-----
	$('.show-box .top').on('click', function () {
		$(this).parents('.show-box').toggleClass('active');
	});



	// --- сворачиваем/разворачиваем карту в иновациях-----
	var textDefault = 'Hide map';
	var textOther = 'Show map';

	$('.hide-map span').text(textDefault);

	$('.hide-map').click(function () {
		$(this).toggleClass('active');
		$('.top-inovation').toggleClass('open');
		textDefault = textOther;
		textOther = $('.hide-map span').text();
		$('.hide-map span').text(textDefault);
	});

	function calcDropdownHeight() {
		$('.top-inovation').each(function () {
			var fullHeight = this.scrollHeight;
			$(this).css('--full-height', fullHeight + 'px');
		})
	}
	calcDropdownHeight();

	// -------------------- rating --------------------------

	$(".rating").each(function () {
		var agregate = $(this).find('.rating-agregate').text();
		var fulles = 5;
		var rightes = (agregate / fulles) * 100;
		$(this).find('.progress').css("width", rightes + '%');
	});

	// ----Показываем результаты поиска-----

	$('.search input').on('keyup', function () {
		var $this = $(this),
			val = $this.val();
		if (val.length >= 1) {
			$('.seach-result').addClass('active');
		} else {
			$('.seach-result').removeClass('active');
		}
		$('.search button').on('click', function () {
			strechNav();
		});
	});


	// ----- переключаем кнопки над табами------
	$('.section-buttons button').on('click', function () {
		$(this).siblings('button').removeClass('active');
		$(this).addClass('active');

	});



	// -------------------- Инициализируем карусели и слайдеры--------------------------
	let slider = $('.slider-home');

	slider.on('drag.owl.carousel to.owl.carousel changed.owl.carousel', function (e) {
		svg();
	});

	slider.owlCarousel({
		loop: true,
		nav: false,
		dots: true,
		items: 1,
		autoplay: false,
		autoplayTimeout: 3000
	});

	let sliderWidget = $('.widget-slider');
	sliderWidget.owlCarousel({
		loop: true,
		nav: true,
		navText: ['<i class="icon-arrow"></i>', '<i class="icon-arrow"></i>'],
		dots: false,
		items: 1,
		autoplay: false,
		autoplayTimeout: 3000,
	});

	if (document.documentElement.clientWidth >= 541) {
		$('.nav-strech').addClass('carousel-strech owl-carousel');

		let strech = $('.carousel-strech');
		strech.owlCarousel({
			loop: false,
			nav: true,
			items: 6,
			margin: 2,
			navText: ['<i class="icon-arrow"></i>', '<i class="icon-arrow"></i>'],
			dots: false,
			autoWidth: true,
			autoplay: false,
			autoplayTimeout: 3000
		});
	}

	$('.carousel-2row').owlCarousel({
		loop: false,
		nav: false,
		dots: false,
		margin: 12,
		items: 5,
		autoplay: false,
		autoplayTimeout: 3000,
		owl2row: true,
		autoHeight: false,
		responsiveClass: true,
		responsive: {
			0: {
				items: 1
			},
			391: {
				items: 2
			},
			640: {
				items: 3,
				mouseDrag: true,
				touchDrag: true
			},
			1080: {
				items: 4,
				mouseDrag: true,
				touchDrag: true
			},
			1201: {
				items: 5,
				mouseDrag: false,
				touchDrag: false
			}
		}
	});
	if (document.documentElement.clientWidth > 992) {
		$('.carousel-service').addClass('owl-carousel');
		let homeCarousel = $('.carousel-service').owlCarousel({
			loop: true,
			nav: true,
			navText: ['<i class="icon-arrow"></i>', '<i class="icon-arrow"></i>'],
			dots: true,
			dotsEach: true,
			items: 3,
			autoplay: false,
			autoplayTimeout: 3000,
			owl2row: false,
			autoHeight: false,
			responsiveClass: true,
			responsive: {
				0: {
					items: 2
				},
				1170: {
					items: 3
				}
			}
		});
	}





	if (document.documentElement.clientWidth < 768) {
		$('.vendors-carousel').addClass('owl-carousel').owlCarousel({
			loop: false,
			nav: false,
			dots: false,
			margin: 12,
			items: 3,
			autoplay: false,
			autoplayTimeout: 3000,
			owl2row: false,
			autoHeight: true,
			responsiveClass: true,
			responsive: {
				0: {
					items: 1
				},
				391: {
					items: 2
				},
				640: {
					items: 3,
					mouseDrag: true,
					touchDrag: true
				}
			}
		});
	}

	// --- ровняем высоду сайдбара по высоте контента в иновациях-----
	function calcSidebarHeight() {
		if (document.documentElement.clientWidth > 767) {
			let inv_height = $('.inovations-content').height();
			$('.inovations-row .sidebar').css('height', inv_height);
		}
	}
	calcSidebarHeight();


	// -----вызов всплывающего окна--------
	$('.to-state').on('click', function (event) {
		event.preventDefault();
		$('div').removeClass('active');
		$('.state').removeClass('active');
		var state = $(this).attr('data-state');
		$('.state[data-state=' + state + ']').addClass('active');
	});

	// -----закрытие активных элементов--------
	$('.close').on('click', function (event) {
		$(this).parents().removeClass('active');
	});

	jQuery(function ($) {
		$(document).mouseup(function (e) { // событие клика по веб-документу
			var div = $(".state-box, .nav-strech, .toggle-strech"); // тут указываем ID элемента
			if (!div.is(e.target) // если клик был не по нашему блоку
				&& div.has(e.target).length === 0) { // и не по его дочерним элементам

				div.parents().removeClass('active');
				div.removeClass('open');  // скрываем его
				$('body').removeClass('modal-open');
			}
		});
	});


	// ----- Табы глобально -----

	(function ($) {
		jQuery.fn.lightTabs = function (options) {

			var createTabs = function () {
				tabs = this;
				i = 0;

				showPage = function (tabs, i) {
					$(tabs).children("div").children("div").hide();
					$(tabs).children("div").children("div").eq(i).show();
					$(tabs).children("ul").children("li").removeClass("active");
					$(tabs).children("ul").children("li").eq(i).addClass("active");
				}

				showPage(tabs, 0);

				$(tabs).children("ul").children("li").each(function (index, element) {
					$(element).attr("data-page", i);
					i++;
				});

				$(tabs).children("ul").children("li").click(function () {
					showPage($(this).parent().parent(), parseInt($(this).attr("data-page")));
				});
			};
			return this.each(createTabs);
		};
	})(jQuery);

	$('.tabs').lightTabs();
	$('.vertical-tabs').lightTabs();
	$('.gorizontal-tabs').lightTabs();
	// -------------------- filter--------------------------
	let filter = $('.filter');
	let toggle_filter = $('.toggle-filter');

	let tabs_ul = $('.tabs-list');
	let tabs_li = $('.tabs-list li');
	let tabs_box = $('.tabs-box');



	$('.tblc-show').on('click', function (event) {
		event.preventDefault();
		let state = $(this).attr('data-company');

		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).find('span').text('Show');
			tabs_li.css('display', 'flex').find('.company').css('opacity', '1');
		} else {
			$(this).addClass('active');
			$(this).find('span').text('Close');
			tabs_li.each(function () {
				let stateLi = $(this).attr('data-company');
				if (stateLi == state) {
					$(this).css('display', 'flex').find('.company').css('opacity', '0');
				} else {
					$(this).css('display', 'none');
				}
			})
		}
	});

	tabs_li.on('click', function () {
		if (document.documentElement.clientWidth <= 540) {
			$('.toggle-strech').toggleClass('active');

			tabs_box.addClass('sm-active');
			$(this).parent('.tabs-list').addClass('hidden');
			toggle_filter.addClass('hidden');
			$('.nav-bar').addClass('hidden');
			$('.dop-menu').toggleClass('hidden');
			$('.back').toggleClass('hidden');
			$('.toggle-dop').removeClass('active');
			$('.dop-menu ul').removeClass('active');
			let name = $('.top-page .page-title').text();
			$('.top-page .page-title').addClass('to-list').html('<img src="img/icons/arrow.svg" class= "svg"><span>' + name + '</span>');
			svg();
		}
	});

	$('.top-page .page-title').on('click', function () {
		if (document.documentElement.clientWidth <= 540) {
			if ($(this).hasClass('to-list')) {
				$('.toggle-strech').toggleClass('active');
				toggle_filter.removeClass('hidden');
				$('.nav-bar').removeClass('hidden');
				$('.dop-menu').removeClass('hidden');
				$('.back').removeClass('hidden');
				let name = $(this).find('span').text();
				$(this).html(name).removeClass('to-list');
				tabs_box.removeClass('sm-active');
				tabs_ul.removeClass('hidden');
			}
		}
	});

	$('.tabs-list .button-tab').on('click', function () {
		$('.button-tab').removeClass('current');
		$(this).addClass('current');
	});



	if (document.documentElement.clientWidth <= 540) {
		$('.top-bar .link').prependTo($('.prepend'));
		$('.top-bar .mail').prependTo($('.prepend'));
		$('.top-bar .plus').prependTo($('.prepend'));


		toggle_filter.prependTo($('.top-bar'));
		svg();
	}

	toggle_filter.on('click', function () {
		$(this).toggleClass('active');
		filter.toggleClass('active');
		if (document.documentElement.clientWidth < 992 && document.documentElement.clientWidth >= 541) {
			if (tabs_ul.hasClass('news-list')) {
				tabs_ul.toggleClass('hidden');
			} else {
				tabs_ul.toggleClass('active');
			}
			if (tabs_box.hasClass('news-box')) {
				tabs_box.toggleClass('active');
			} else {
				tabs_box.toggleClass('hidden');
			}
		}

		if (document.documentElement.clientWidth <= 540) {

			$('.toggle-strech').toggleClass('active');
			$('.nav-bar').toggleClass('hidden');
			$('.dop-menu').toggleClass('hidden');
			$('.back').toggleClass('hidden');
			$('.toggle-dop').removeClass('active');
			$('.dop-menu ul').removeClass('active');

			if ($(this).hasClass('active')) {
				let name = $('.top-page .page-title').text();
				$('.top-page .page-title').html('<span>' + name + '</span> / Filter');
			} else {

				let name_sp = $('.top-page .page-title').find('span').text();
				$('.top-page .page-title').html(name_sp);
			}
			tabs_ul.toggleClass('hidden');

		}
	});

	$('.filter-box .name').on('click', function () {
		$(this).parents('.filter-box').toggleClass('active');
	});

	$('.toggle-sub').on('click', function () {
		$(this).parents('li').toggleClass('active');
	});



	$('.filter-box .all').on('click', function () {
		if ($(this).hasClass('all-select')) {
			$(this).parents('.filter-box').find('input[type=checkbox]:not(:disabled)').prop('checked', true);
			$(this).removeClass('all-select').text('Unselect all').addClass('all-unselect');
		} else {
			$(this).parents('.filter-box').find('input[type=checkbox]:not(:disabled)').prop('checked', false);
			$(this).removeClass('all-unselect').text('Select all').addClass('all-select');
		}
		let filter_check = $(this).parents('.filter').find('input[type=checkbox]:not(:disabled)').length;
		let filter_check_sel = $(this).parents('.filter').find('input[type=checkbox]:checked').length;

		if (filter_check == filter_check_sel) {
			$('.selected').addClass('active');
		} else {
			$('.selected').removeClass('active');
		}
		$('.refresh').addClass('active');
	});

	$('.sub-filter').find('input').addClass('children');



	$('.filter-box input[type=checkbox').change(function (e) {

		if ($(this).hasClass('parrents')) {
			$(this).parents('.parrents-li').find('.sub-filter').find('input[type=checkbox]:not(:disabled)').prop("checked", this.checked);
		}

		if ($(this).hasClass('children')) {
			let sub_check = $(this).parents('.sub-filter').find('input[type=checkbox]:not(:disabled)').length;
			let sub_check_sel = $(this).parents('.sub-filter').find('input[type=checkbox]:checked').length;
			if (sub_check == sub_check_sel) {
				$(this).parents('.parrents-li').find('.parrents').prop('checked', true);
			} else {
				$(this).parents('.parrents-li').find('.parrents').prop('checked', false);
			}
		}

		let all_check = $(this).parents('.filter-box').find('input[type=checkbox]:not(:disabled)').length;
		let all_check_sel = $(this).parents('.filter-box').find('input[type=checkbox]:checked').length;

		if (all_check == all_check_sel) {
			$(this).parents('.filter-box').find('.all').removeClass('all-select').text('Unselect all').addClass('all-unselect');
		} else {
			$(this).parents('.filter-box').find('.all').removeClass('all-ulselect').text('Select all').addClass('all-select');
		}

		$('.refresh').addClass('active');

		let filter_check = $(this).parents('.filter').find('input[type=checkbox]:not(:disabled)').length;
		let filter_check_sel = $(this).parents('.filter').find('input[type=checkbox]:checked').length;
		if (filter_check == filter_check_sel) {
			$('.selected').addClass('active');
		} else {
			$('.selected').removeClass('active');
		}
	});



	$('.filter .selected').on('click', function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$(this).parents('.filter').find('input[type=checkbox]').prop('checked', false);
			$('.all').removeClass('all-unselect').text('Select all').addClass('all-select');
		} else {
			$(this).addClass('active');
			$(this).parents('.filter').find('input[type=checkbox]').prop('checked', true);
			$('.all').removeClass('all-select').text('Unselect all').addClass('all-unselect');
		}
	});


	$(window).resize(function () {
		toggleBut();
		clamphText();
		transferWidget();
		changeText();
		strechNav();
		calcDropdownHeight();
		calcSidebarHeight();
		$('main').removeClass('bg-over');
	});


	//--- отложеная загрузка видео с ютуба----

	function findVideos() {
		let videos = document.querySelectorAll('.video');

		for (let i = 0; i < videos.length; i++) {
			setupVideo(videos[i]);
		}
	}

	function setupVideo(video) {
		let link = video.querySelector('.video__link');
		let media = video.querySelector('.video__media');
		let button = video.querySelector('.video__button');
		let id = parseMediaURL(media);

		video.addEventListener('click', () => {
			let iframe = createIframe(id);
			link.remove();
			button.remove();
			video.appendChild(iframe);
		});

		link.removeAttribute('href');
		video.classList.add('video--enabled');

	}

	function parseMediaURL(media) {
		let regexp = /https:\/\/i\.ytimg\.com\/vi\/([a-zA-Z0-9_-]+)\/maxresdefault\.webp/i;
		let url = media.src;
		let match = url.match(regexp);
		return match[1];
	}

	function createIframe(id) {
		let iframe = document.createElement('iframe');
		iframe.setAttribute('allowfullscreen', '');
		iframe.setAttribute('allow', 'autoplay');
		iframe.setAttribute('src', generateURL(id));
		iframe.classList.add('video__media');

		return iframe;
	}

	function generateURL(id) {
		let query = '?rel=0&showinfo=0&autoplay=1';
		return 'https://www.youtube.com/embed/' + id + query;
	}
	findVideos();



	$(".accordion").each(function () {

		var acc = document.getElementsByClassName("accordion-box");
		var i;

		for (i = 0; i < acc.length; i++) {
			acc[i].addEventListener("click", function () {
				this.classList.toggle("active");
				//var panel = this.nextElementSibling;
				var panel = this.querySelector('.box-body');
				if (panel.style.maxHeight) {
					panel.style.maxHeight = null;
				} else {
					panel.style.maxHeight = panel.scrollHeight + "px";
				}
			});
		}

	});
	//end
});