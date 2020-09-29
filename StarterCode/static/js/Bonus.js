//Build Gauge meter for the belly button wash frequency
function buildGauge(sample) {
    // Using D3 library to read sample.json
    d3.json("samples.json").then((data) => {
        //  Extract the metadata wash frequency attribute
        var count = Object.keys(data.metadata).length;

        for (var i = 0; i < count; i++) {
            
            if (data.metadata[i].id == sample) {

                var wfreq = data.metadata[i].wfreq;
            }
        };
        var level = wfreq * 20;
        // Trigonometry to Calculate Meter Point
        var degrees = 180 - level;
        var radius = 0.5;
        var radians = (degrees * Math.PI) / 180;
        var x = radius * Math.cos(radians);
        var y = radius * Math.sin(radians);

        // create a path for the gauge indicator
        var mainPath = "M-.0 -0.05 L  .0 0.05 L";
        var pathX = String(x);
        var space = " ";
        var pathY = String(y);
        var pathEnd = " Z";
        var path = mainPath.concat(pathX, space, pathY, pathEnd);

        var data = [
            {
                type: "scatter",
                x: [0],
                y: [0],
                marker: { size: 12, color: "850000" },
                showlegend: false,
                text: level,
                hoverinfo: "text+name"
            },
            {
                values: [50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50 / 9, 50],
                rotation: 90,
                text: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
                textinfo: "text",
                textposition: "inside",
                marker: {
                    colors: [
                        "rgba(0,105,11,.5)",
                        "rgba(10,120,22,.5)",
                        "rgba(14,127,0,.5)",
                        "rgba(110,154,22,.5)",
                        "rgba(170,202,42,.5)",
                        "rgba(202,209,95,.5)",
                        "rgba(210,206,145,.5)",
                        "rgba(232,226,202,.5)",
                        "rgba(240, 230,215,.5)",
                        "rgba(255,255,255,0)"
                    ]
                },
                labels: ["8-9", "7-8", "6-7", "5-6", "4-5", "3-4", "2-3", "1-2", "0-1", ""],
                hoverinfo: "label",
                hole: 0.5,
                type: "pie",
                showlegend: false
            }
        ]

        var layout = {
            shapes: [
                {
                    type: "path",
                    path: path,
                    fillcolor: "850000",
                    line: {
                        color: "850000"
                    }
                }
            ],
            title: "Belly Button Washing Frequency <br> Scrubs per Week",
            height: 500,
            width: 500,
            xaxis: {
                zeroline: false,
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
        }
        // Render the plot to the div tag with id "gauge"
        Plotly.newPlot("gauge", data, layout);
    })
}