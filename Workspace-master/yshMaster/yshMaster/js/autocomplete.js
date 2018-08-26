/**
A jQuery plugin for search hints

Author: Lorenzo Cioni - https://github.com/lorecioni
*/

(function($) {

	$.fn.autocomplete = function(params) {
		//Selections
		var currentSelection = -1;
		var currentProposals = [];
		//Default parameters
		params = $.extend({
			name:'query',
			api:'',
			hints: [],
			placeholder: 'Search',
			width: 200,
			height: 16,
			showButton: true,
			buttonText: 'Search',
			required: false,
			upd:{},
			isAddParams:false,//是否添加查询参数
			onSubmit: function(text){},
			onBlur: function(){}
		}, params||{});
//		console.log(params.upd);
		//Build messagess
		this.each(function() {
			//Container
			var searchContainer = $('<div></div>')
				.addClass('autocomplete-container');

			//Text input
			var input = $('<input type="text" class="form-control" autocomplete="off" id="'+ params.name +'" name="'+ params.name +'">')
				.attr('placeholder', params.placeholder)
				.addClass('autocomplete-input')
				.css({
					'width' : params.width,
					'height':params.height
				});

			if(params.required){
				input.attr("required","required");
			}

			if(params.showButton){
				input.css('border-radius', '3px 0 0 3px');
			}

			//Proposals
			var proposals = $('<div></div>')
				.addClass('proposal-box')
				.css('width', '97.38%')
				.css('top', input.outerHeight());
			var proposalList = $('<ul></ul>')
				.addClass('proposal-list');

			proposals.append(proposalList);

			input.keydown(function(e) {
				switch(e.which) {
					case 38: // Up arrow
						e.preventDefault();
						$('ul.proposal-list li').removeClass('selected');
						if((currentSelection - 1) >= 0){
							currentSelection--;
							$( "ul.proposal-list li:eq(" + currentSelection + ")" )
								.addClass('selected');
						} else {
							currentSelection = -1;
						}
						break;
					case 40: // Down arrow
						e.preventDefault();
						if((currentSelection + 1) < currentProposals.length){
							$('ul.proposal-list li').removeClass('selected');
							currentSelection++;
							$( "ul.proposal-list li:eq(" + currentSelection + ")" )
								.addClass('selected');
						}
						break;
					case 13: // Enter
						if(currentSelection > -1){
							var text = $( "ul.proposal-list li:eq(" + currentSelection + ")" ).html();
							input.val(text);
						}
						currentSelection = -1;
						proposalList.empty();
						params.onSubmit(input.val());
						break;
					case 27: // Esc button
						currentSelection = -1;
						proposalList.empty();
						input.val('');
						break;
				}
			});

			input.on(" paste keyup", function(e){
				if(e.which != 13 && e.which != 27
					&& e.which != 38 && e.which != 40){
					currentProposals = [];
					currentSelection = -1;
					proposalList.empty();
					input.attr('ekey','');
					if(input.val() != ''){
						var name = input.val();
						params.upd.Names = name;
						if(params.isAddParams) {
							params.upd.QueryKeys = $('#merchantName').attr('ekey');
						}
						//var word = "^" + name + ".*";
						proposalList.empty();
						getDataList(yshurl+params.api,params.upd,function(d){
							if(d && d.state == 0 && d.aaData){
								params.hints = d.aaData;
								for(var test in params.hints){
									//if(params.hints[test].text.match(word)){
									currentProposals.push(params.hints[test]);
									var element = $('<li></li>')
										.html(params.hints[test].text)
										.attr('ekey',params.hints[test].value)
										.addClass('proposal')
										.click(function(){
											input.val($(this).html());
											input.attr('ekey',$(this).attr('ekey'));
											proposalList.empty();
											params.onSubmit(input.val());
										})
										.mouseenter(function() {
											$(this).addClass('selected');
										})
										.mouseleave(function() {
											$(this).removeClass('selected');
										});
									proposalList.append(element);
									//}
								}
							}
						})
					}
				}
			});

			input.blur(function(e){
				currentSelection = -1;
				//proposalList.empty();
				params.onBlur();
			});

			searchContainer.append(input);
			searchContainer.append(proposals);

			if(params.showButton){
				//Search button
				var button = $('<div></div>')
					.addClass('autocomplete-button')
					.html(params.buttonText)
					.css({
						'height': params.height + 2,
						'line-height': params.height + 2 + 'px'
					})
					.click(function(){
						proposalList.empty();
						params.onSubmit(input.val());
					});
				searchContainer.append(button);
			}

			$(this).append(searchContainer);

			if(params.showButton){
				//Width fix
				searchContainer.css('width', params.width + button.width() + 50);
			}
		});

		return this;
	};

})(jQuery);