function buildGauge(sample) {
    d3.json("samples.json").then((data) => {
        for (var i = 0; i < data.metadata.length; i++) {
            if (data.metadata[i].id == sample) {
              
              var wfreq = data.metadata[i].wfreq;

            }
        }
    
    level = wfreq * 20
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

var degrees = 180 - level, radius = .6;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
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
        type: 'path',
        path: path,
        fillcolor: "850000",
        line: {
            color: "850000"
        }
    } 
],      
        
  title: "Belly Button Washing Frequency <br> Scrubs per Week",
  xaxis: {
    zeroline:false,
    showticklabels: false,
    showgrid: false,
    range: [-1, 1]
},
yaxis: {
    zeroline: false,
    showticklabels: false,
    showgrid: false,
    range: [-1, 1]
}

};

var data = [traceA];
var gaugeDiv = document.getElementById("gauge");

Plotly.plot(gaugeDiv, data, layout);
    });
}