// Use Morris.Area instead of Morris.Line
Morris.Donut({
	element: 'graph-donut',
	data: [{
		value: 10,
		label: 'New Visit',
		formatted: 'at least 40%'
	}, {
		value: 10,
		label: 'Unique Visits',
		formatted: 'approx. 30%'
	}, {
		value: 10,
		label: 'Bounce Rate',
		formatted: 'approx. 20%'
	}, {
		value: 70,
		label: 'Up Time',
		formatted: 'at most 10%'
	}],
	backgroundColor: false,
	labelColor: '#fff',
	colors: [
		'#4acacb', '#6a8bc0', '#5ab6df', '#fe8676'
	],
	formatter: function(x, data) {
		return data.formatted;
	}
});

$(function() {
	//蓝线条
	d1 = [
		
	];
	//红线条
	var d2 = [
		[0, 200],
		[1, 520],
		[2, 337],
		[3, 261],
		[4, 449],
		[5, 518],
		[6, 470],
		[7, 658],
		[8, 558],
		[9, 438],
		[10, 388]
	];

	var data = ([{
		label: "New Visitors",
		data: d1,
		lines: {
			show: true,
			fill: true,
			fillColor: {
				colors: ["rgba(255,255,255,.4)", "rgba(183,236,240,.4)"]
			}
		}
	}, {
		label: "Unique Visitors",
		data: d2,
		lines: {
			show: true,
			fill: true,
			fillColor: {
				colors: ["rgba(255,255,255,.0)", "rgba(253,96,91,.7)"]
			}
		}
	}]);

	var options = {
		grid: {
			backgroundColor: {
				colors: ["#ffffff", "#f4f4f6"]
			},
			hoverable: true,
			clickable: true,
			tickColor: "#eeeeee",
			borderWidth: 1,
			borderColor: "#eeeeee"
		},
		// Tooltip
		tooltip: true,
		tooltipOpts: {
			content: "%s X: %x Y: %y",
			shifts: {
				x: -60,
				y: 25
			},
			defaultTheme: false
		},
		legend: {
			labelBoxBorderColor: "#000000",
			container: $("#main-chart-legend"), //remove to show in the chart
			noColumns: 0
		},
		series: {
			stack: true,
			shadowSize: 0,
			highlightColor: 'rgba(000,000,000,.2)'
		},
		//        lines: {
		//            show: true,
		//            fill: true
		//
		//        },
		points: {
			show: true,
			radius: 3,
			symbol: "circle"
		},
		colors: ["#5abcdf", "#ff8673"]
	};
	var plot = $.plot($("#main-chart #main-chart-container"), data, options);
});