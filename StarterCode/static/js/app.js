function buildPlots(userInput) {
    d3.json('samples.json').then((d) => {
        var filter = d.samples.filter(i => i.id == userInput)
        var filter_ids = filter[0].otu_ids
        var samples = filter[0].sample_values
        var labels = filter[0].otu_labels
        var first_ids = filter_ids.slice(0, 10).reverse()
        var first_samples = samples.slice(0, 10).reverse()
        var first_labels = labels.slice(0, 10).reverse()
        var trace1 = {
            x: first_samples,
            y: first_ids.map(i => `OTU ${i}`),
            text: first_labels,
            type: "bar",
            orientation: "h",
        }
        Plotly.newPlot('bar', [trace1])
        var trace2 = {
            x: filter_ids,
            y: samples,
            text: labels,
            mode: 'markers',
            marker: {
                size: samples,
                color: filter_ids
            }
        }
        Plotly.newPlot('bubble', [trace2])
        var demo_card_li = d3.select('#sample-metadata')
        var selected_data = d.metadata.filter(i => i.id == userInput)
        selected_data.forEach(i => {
            demo_card_li.html('')
            demo_card_li.append('li').html(`ID: ${i.id}<br>`)
            demo_card_li.append('li').html(`WAFREQ: ${i.wfreq}<br>`)
            demo_card_li.append('li').html(`Age: ${i.age}<br>`)
            demo_card_li.append('li').html(`Ethnicity: ${i.ethnicity}<br>`)
            demo_card_li.append('li').html(`Location: ${i.location}<br>`)
            demo_card_li.append('li').html(`BBType: ${i.bbtype}<br>`)
            demo_card_li.append('li').html(`Gender: ${i.gender}<br>`)
        })
    })
}

function optionChanged(option) {
    buildPlots(option)
}

d3.json('samples.json').then((d) => {
    console.log(d);
    var dropdown = d3.select('#selDataset')
    var otu_idArr = []
    d.metadata.forEach(i => {
        otu_idArr.push(i.id)
        dropdown.append('option').text(i.id)
    })
    console.log(otu_idArr)
});
  