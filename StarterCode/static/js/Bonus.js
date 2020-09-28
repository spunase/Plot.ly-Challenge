
var gaugeDiv = document.getElementById("gauge");



var traceA = {
  type: "pie",
  showlegend: false,
  hole: 0.4,
  rotation: 90,
  values: [100/9, 100/9, 100/9, 100/9, 100/9, 100/9, 100/9, 100/9, 100/9, 100],
  text: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
  direction: "clockwise",
  textinfo: "text",
  textposition: "inside",
  marker: {
    colors: [
        "rgba(240, 230,215,.5)",
        "rgba(232,226,202,.5)",
        "rgba(210,206,145,.5)",
        "rgba(202,209,95,.5)",
        "rgba(170,202,42,.5)",
        "rgba(110,154,22,.5)",
        "rgba(14,127,0,.5)",
        "rgba(10,120,22,.5)",
        "rgba(0,105,11,.5)",
        "rgba(255,255,255,0)"

    ]
  },
  labels: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "6-7", "7-8", "8-9", ""],
  hoverinfo: "label"
};

var degrees = 115, radius = .6;
var radians = degrees * Math.PI / 180;
var x = -1 * radius * Math.cos(radians);
var y = radius * Math.sin(radians);
// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.035 L .0 0.035 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var layout = {
  shapes:[{
      type: 'line',
      x0: 0,
      y0: 0,
      x1: x,
      y1: 0.5,
      line: {
        color: 'black',
        width: 8
      }
    }],
  title: "Belly Button Washing Frequency <br> Scrubs per Week",
  xaxis: {visible: false, range: [-1, 1]},
  yaxis: {visible: false, range: [-1, 1]}
};

var data = [traceA];

Plotly.plot(gaugeDiv, data, layout, {staticPlot: true});
