//Build Metadata
function buildMetadata(sample) {
  // Using D3 library to read sample.json
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultsarray = metadata.filter(sampleobject => sampleobject.id == sample);
    var result = resultsarray[0]
    var panel = d3.select("#sample-metadata");
    // Use `.html("") to Clear any Existing Metadata
    panel.html("");
     // Use `Object.entries` to Add Each Key & Value Pair to the Panel
    Object.entries(result).forEach(([key, value]) => {
      var row = panel.append("h6");
      row.text(`${key}: ${value} \n`)
    });
  });
}


function buildCharts(sample) {
  // Using D3 library to read sample.json
  d3.json("samples.json").then(function (data) {

    for (var i = 0; i < data.samples.length; i++) {
      if (data.samples[i].id == sample) {
        console.log(data.samples[i].otu_ids)
        var otu_ids = data.samples[i].otu_ids;
        var sample_values = data.samples[i].sample_values;
        var otu_labels = data.samples[i].otu_labels;
      }
    }
    // Build a Bubble Chart using the sample data
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      
      marker: {
        size: sample_values,
        color: otu_ids,
        colorscale: 'Viridis',
      }
    };

    // data
    var data = [trace1];


    var layout = {
      xaxis: { title: "OTU ID" },
      title: "Belly Button Bacteria",
    };
    // Render the plot to the div tag with id "bubble"
    Plotly.newPlot("bubble", data, layout);

    // Build a Bar chart using the sample data
    d3.json("samples.json").then(function (data) {
      // Use slice() to Grab the Top 10 sample_values
      // use reverse() to arrange data
      var values = sample_values.slice(0, 10).reverse();
      var labels = otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse();
      var display = otu_labels.slice(0, 10).reverse();
      // barchart for the sample Data
      var barChart = {
        x: values,
        y: labels,
        hovertext: display,
        type: "bar",
        orientation: "h"
      };
      // data
      var data = [barChart];
      // Apply the group bar mode to the layout
      var layout = {
        margin: {
          l: 200,
          r: 50,
          t: 10,
          b: 50
        }
      };
      // Render the plot to the div tag with id "bar"
      Plotly.newPlot("bar", data, layout);
    });
  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
    buildGauge(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
  buildGauge(newSample);
}

// Initialize the dashboard
init();
