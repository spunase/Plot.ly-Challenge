function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    var resultsarray = metadata.filter(sampleobject => sampleobject.id == sample);
    var result = resultsarray[0]
    var panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(result).foreach(([key, value]) => {
      var row = panel.append("panel-body");
      row.text(`${key}: ${value} \n`)
    });
  });
}


function buildCharts(sample) {
  d3.json("samples.json").then(function (data) {
    
    for (var i =0; i< data.samples.length ;i++) {
      if (data.samples[i].id == sample) {
        console.log(data.samples[i].otu_ids)
        var otu_ids = data.samples[i].otu_ids;
        var sample_values = data.samples[i].sample_values;
        var otu_labels = data.samples[i].otu_labels;
      }
    }
    // @TODO: Build a Bubble Chart using the sample data
    var trace1 = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: 'markers',
      marker: {
        size: sample_values,
        color: otu_ids,
              }
                 };


    var data = [trace1];


    var layout = {
      xaxis: { title: "OTU ID" },
      title: "Belly Button Bacteria",
    };
    
    Plotly.newPlot("bubble", data, layout);
// bar plot
    d3.json("samples.json").then(function (data) {
      var values = data.samples["sample_values"];
      var labels = data.samples["otu_ids"];
      var display = data.samples["otu_labels"];

      var barChart = {
        x: values,
        y: labels,
        hovertext: display,
        type: "bar",
        orientation: "h"
      };
      var data = [barChart];
      var layout = {
        title: "bar",
        margin: {
          l: 100,
          r: 100,
          t: 100,
          b: 100
        }
      };
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
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
