Highcharts.setOptions({
	lang: {
		months: ['01', '02', '03', '04', '05', '06', 
			'07', '08', '09', '10', '11', '12'],
		weekdays: ['日','一','二','三','四','五','六'],
		resetZoom: ['> 按此回復原比例']
	}
});

Highcharts.setOptions({
    colors: ['#ff53d5', '#b99a1d']
});
			var chart;
			$(document).ready(function() {
				
				// define the options
				var options = {
			
					chart: {
						renderTo: 'container',
						spacingTop: 50 ,
						plotBorderWidth: 1,
						plotBorderColor: '#e0e0e0',
						zoomType: 'x',
						backgroundColor: '#feffd1',
						plotBackgroundColor: {
							linearGradient: [0, 0, 0, 500],
							stops: [
								[0, 'rgb(239, 240, 239)'],
								[1, 'rgb(201, 254, 147)']
							]						
						}
					},
					
					title: {
						text: null,
						margin:50
					},
					
					subtitle: {
						text: null
					},
					
					credits: {
						enabled: false
					},
					
					xAxis: {
						title: {
							text: 'DATE（2010/06/01 ~ 2010/09/15）',
							stlye: {
								color: '#736aff'
							}
						},
						
						type: 'datetime',
						labels: {
							/*formatter: function() {
								return Highcharts.dateFormat('%b月%d', this.value);
							},*/
							enabled: false
						},
						tickInterval: 24 * 3600 * 1000, // one day
						lineColor: '#c77daa',
						lineWidth: 3,
						gridLineWidth: 1,
						gridLineColor : '#e0e0e0',
						tickLength: 5,
						tickWidth: 2,
						tickColor: '#c77daa'
					},
					
					yAxis: { // left y axis
						title: {
							text: '<span style="font-size:15px;">匯</span><br/><span style="font-size:15px;">率</span>',
							stlye: {
								color: '#736aff'
							},
							rotation: '360'
						},
						labels: {
							formatter: function() {
								return Highcharts.numberFormat(this.value, 3);
							}
						},
						allowDecimals: true,
						showFirstLabel: false,
						lineColor: '#c77daa',
						lineWidth: 3,
						gridLineWidth: 1,
						gridLineColor : '#e0e0e0',
						tickInterval: null,
						tickLength: 5,
						tickWidth: 2,
						tickColor: '#c77daa'
					},
					
					legend: {
						align: 'left',
						verticalAlign: 'top',
						x: 60,
						y: -45,
						floating: true,
						borderWidth: 0
					},
					
					tooltip: {
						shared: true,
						crosshairs: true,
						formatter: function() {
							var s = '<b>'+ Highcharts.dateFormat('%Y / %b / %d', this.x) +'</b><br/>', color;
            
							$.each(this.points, function(i, point) {
								color = point.series.color;
								
								s += '<span style="color: '+color+'">'+ point.series.name +'</span>: '+
									Highcharts.numberFormat(point.y, 3) +'<br/>';
							});
            
							return s;
						}
					},
					
					plotOptions: {
						series: {
							cursor: 'default',
							point: {
								events: {
									click: function() {
										hs.htmlExpand(null, {
											pageOrigin: {
												x: this.pageX, 
												y: this.pageY
											},
											headingText: this.series.name,
											maincontentText: Highcharts.dateFormat('%Y / %b / %d', this.x) +'<br/> '+ 
												Highcharts.numberFormat(this.y, 3),
											width: 200
										});
									}
								}
							},
							marker: {
								lineWidth: 1
							}
						}
					},
					
					series: [{
						name: '美金存款匯率',
						lineWidth: 4,
						marker: {
							radius: 4
						}
					}, {
						name: '美金放款匯率',
						marker: {
							fillColor: '#FFFFFF',
							radius: 4,
							lineColor: null,
							symbol: 'circle'
						}
					}],
					
					exporting: {
						buttons: {
							exportButton: {
								enabled: false
							},
							
							printButton:{
								enabled: false
							}
						}
					}
					
				};
				
				// the button handler 
				$('#button_chartprt').click(function() {
					chart.print();
				});
				
				$('#button_chartprt').css({
					position: "absolute",
					top: "10px",
					right: "50px",
					display: 'block',
					width: '28px',
					height: '23px'
				});
				
				$('#button_chartexp').click(function() {
					chart.exportChart();
				});
				
				$('#button_chartexp').css({
					position: "absolute",
					top: "10px",
					right: "10px",
					display: 'block',
					width: '28px',
					height: '23px'
				});
				

				
				// Load data asynchronously using jQuery. On success, add the data
				// to the options and initiate the chart.
				// This data is obtained by exporting a GA custom report to TSV.
				// http://api.jquery.com/jQuery.get/
				jQuery.get('../../inc/chart/data/rate_usd.tsv', null, function(tsv, state, xhr) {
					var lines = [],
						listen = false,
						date,
						
						// set up the two data series
						usdBuy = [],
						usdSell = [];
						
					// inconsistency
					if (typeof tsv !== 'string') {
						tsv = xhr.responseText;
					}
					
					// split the data return into lines and parse them
					tsv = tsv.split(/\n/g);
					jQuery.each(tsv, function(i, line) {
			
						// listen for data lines between the Graph and Table headers
						if (tsv[i - 3] == '# Graph') {
							listen = true;
						} else if (line == '' || line.charAt(0) == '#') {
							listen = false;
						}
						
						// all data lines start with a double quote
						if (listen) {
							line = line.split(/\t/);
							date = Date.parse(line[0] +' UTC');
							
							usdBuy.push([
								date, 
								parseFloat(line[1].replace(',', ''), 10)
							]);
							usdSell.push([
								date, 
								parseFloat(line[2].replace(',', ''), 10)
							]);
						}
					});
					
					options.series[0].data = usdBuy;
					options.series[1].data = usdSell;
					
					chart = new Highcharts.Chart(options);
				});
				
			});