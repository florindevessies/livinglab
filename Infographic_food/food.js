 WebFontConfig = {
 google:
{families: ["Open Sans",]},active: function() {
 DrawTheChart(ChartData,ChartOptions,"chart-01","PolarArea")}
};

function MoreChartOptions(){} 
var ChartData = [
{value :12.8,color:'rgba(18,51,53,1)',title:'Meat'},
{value :11.1,color:'rgba(43,87,85,1)', title:'Cheese'},
{value :4.9,color:'rgba(97,136,144,1)',title:'Fish'},
	{value :3,color:'rgba(134,174,181,1)',title:'Egg'},
	{value :2.4,color:'rgba(198,218,221,1)',title:'Potatoes'},
	{value :2,color:'rgba(49,99,96,1)',title:'Vegetables'},
	{value :1.9,color:'rgba(113,152,160,1)',title:'Legumes'},
	{value :2.2,color:'rgba(160,191,197,1)',title:'Fruit'},
	{value :1.8,color:'rgba(23,65,68,1)',title:'Cereal Products'},
	{value :2,color:'rgba(55,112,109,1)',title:'Sauces and spices'},
	];
	ChartOptions= {decimalSeparator:".",thousandSeparator:",",
	spaceLeft:12,
	spaceRight:12,
	spaceTop:12,
	spaceBottom:12,
	scaleLabel:"<%=value+''%>",
	yAxisMinimumInterval:1,
	scaleShowLabels:false,
	scaleShowLine:true,scaleLineStyle:"dotted",scaleLineWidth:1,scaleLineColor:"rgba(0,0,0,0.6)",scaleOverlay :false,
	scaleOverride :true,scaleSteps:5,scaleStepWidth:3,scaleStartValue:0,inGraphDataShow:true,inGraphDataTmpl:'<%=v2%>',
	inGraphDataFontFamily:"'Open Sans'",inGraphDataFontStyle:"normal bold",inGraphDataFontColor:"rgba(46,46,46,1)",
	inGraphDataFontSize:8,inGraphDataPaddingX:0,inGraphDataPaddingY:-5,inGraphDataAlign:"center",inGraphDataVAlign:"top",
	inGraphDataXPosition:2,inGraphDataYPosition:3,inGraphDataAnglePosition:2,inGraphDataRadiusPosition:3,inGraphDataRotate:0,
	inGraphDataPaddingAngle:0,inGraphDataPaddingRadius:10, inGraphDataBorders:false,inGraphDataBordersXSpace:1,
	inGraphDataBordersYSpace:1,inGraphDataBordersWidth:1,inGraphDataBordersStyle:"solid",inGraphDataBordersColor:"rgba(0,0,0,1)",
	egend:true,maxLegendCols:6,legendBlockSize:15,legendFillColor:'rgba(255,255,255,0.00)',legendColorIndicatorStrokeWidth:-4,
	legendPosX:-2,legendPosY:4,legendXPadding:0,legendYPadding:0,legendBorders:false,legendBordersWidth:1,
	legendBordersStyle:"solid",legendBordersColors:"rgba(102,102,102,1)",legendBordersSpaceBefore:5,legendBordersSpaceLeft:5,
	legendBordersSpaceRight:5,legendBordersSpaceAfter:5,legendSpaceBeforeText:10,legendSpaceLeftText:5,legendSpaceRightText:5,
	legendSpaceAfterText:5,legendSpaceBetweenBoxAndText:5,legendSpaceBetweenTextHorizontal:5,legendSpaceBetweenTextVertical:5,
	legendFontFamily:"'Open Sans'",legendFontStyle:"normal normal",legendFontColor:"rgba(0,0,0,1)",legendFontSize:10,
	showYAxisMin:false,rotateLabels:"smart",xAxisBottom:true,yAxisLeft:true,yAxisRight:false,graphTitleSpaceBefore:5,
	graphTitleSpaceAfter:5, graphTitleBorders:false,graphTitleBordersXSpace:1,graphTitleBordersYSpace:1,graphTitleBordersWidth:5,
	graphTitleBordersStyle:"solid",graphTitleBordersColor:"rgba(0,0,0,1)",
	graphTitle : "kg of CO2 emissions per kg product of different food groups ",
	graphTitleFontFamily:"'Open Sans'",graphTitleFontStyle:"normal normal",graphTitleFontColor:"rgba(111,115,117,1)",
	graphTitleFontSize:22,scaleFontFamily:"'Open Sans'",scaleFontStyle:"normal normal",scaleFontColor:"rgba(0,0,0,1)",
	scaleFontSize:12,pointLabelFontFamily:"'Open Sans'",pointLabelFontStyle:"normal normal",
	pointLabelFontColor:"rgba(102,102,102,1)",pointLabelFontSize:12,angleShowLineOut:true,angleLineStyle:"solid",
	angleLineWidth:1,angleLineColor:"rgba(0,0,0,0.1)",percentageInnerCutout:50,scaleShowGridLines:true,
	scaleGridLineStyle:"solid",scaleGridLineWidth:1,scaleGridLineColor:"rgba(0,0,0,0.1)",scaleXGridLinesStep:1,
	scaleYGridLinesStep:3,segmentShowStroke:true,segmentStrokeStyle:"solid",segmentStrokeWidth:0,
	segmentStrokeColor:"rgba(255,255,255,1.00)",datasetStroke:true,datasetFill : true,datasetStrokeStyle:"solid",
	datasetStrokeWidth:2,bezierCurve:true,bezierCurveTension :0.4,pointDotStrokeStyle:"solid",pointDotStrokeWidth : 1,
	pointDotRadius : 3,pointDot : true,scaleTickSizeBottom:5,scaleTickSizeTop:5,scaleTickSizeLeft:5,scaleTickSizeRight:5,
	graphMin:0,barShowStroke : false,barBorderRadius:0,barStrokeStyle:"solid",barStrokeWidth:1,barValueSpacing:15,
	barDatasetSpacing:0,scaleShowLabelBackdrop :true,scaleBackdropColor:'rgba(196,78,78,0)',scaleBackdropPaddingX :2,
	scaleBackdropPaddingY :2,animation : true,
	onAnimationComplete : function(){MoreChartOptions()}};

 DrawTheChart(ChartData,ChartOptions,"chart-01","PolarArea");

 function DrawTheChart(ChartData,ChartOptions,ChartId,ChartType){
eval('var myLine = new Chart(document.getElementById(ChartId).getContext("2d")).'+
	ChartType+'(ChartData,ChartOptions);document.getElementById(ChartId).getContext("2d").stroke();')
}