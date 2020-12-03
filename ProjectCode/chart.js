//Google Map

async function useMap(x,routeID) {
    let map = new google.maps.Map(d3.select(".middle").node(), {
        zoom: 11,
        center: new google.maps.LatLng(40.688701, -111.936183),
        mapTypeId: google.maps.MapTypeId.TERRAIN
            }); 

    if(x === 0){
        let json_route = await d3.json("data/plan0_route.json");
        let json_stop = await d3.json("data/plan0_stop.json");
        map.data.addGeoJson(json_route); 
        map.data.addGeoJson(json_stop); 
    }else if(x === 1){
        let json_route = await d3.json("data/plan1_route.json");
        let json_stop = await d3.json("data/plan1_stop.json");
        map.data.addGeoJson(json_route); 
        map.data.addGeoJson(json_stop); 
    }else if(x === 2){
        let json_route = await d3.json("data/plan2_route.json");
        let json_stop = await d3.json("data/plan2_stop.json");
        map.data.addGeoJson(json_route); 
        map.data.addGeoJson(json_stop); 
    }else if(x === 3){
        let json_route = await d3.json("data/plan3_route.json");
        let json_stop = await d3.json("data/plan3_stop.json");
        map.data.addGeoJson(json_route); 
        map.data.addGeoJson(json_stop); 
    }else if(x === 4){
        let json_route = await d3.json("data/plan4_route.json");
        console.log(json_route);
        let json_stop = await d3.json("data/plan4_stop.json");
        map.data.addGeoJson(json_route); 
        map.data.addGeoJson(json_stop); 
    }else if(x === 5){
        let json_route = await d3.json("data/plan5_route.json");
        let json_stop = await d3.json("data/plan5_stop.json");
        map.data.addGeoJson(json_route); 
        map.data.addGeoJson(json_stop); 
    }else if(x === 6){
        let json_route = await d3.json("data/plan6_route.json");
        let json_stop = await d3.json("data/plan6_stop.json");
        map.data.addGeoJson(json_route); 
        map.data.addGeoJson(json_stop); 
    }else if(x === 7){
        let json_route = await d3.json("data/plan7_route.json");
        let json_stop = await d3.json("data/plan7_stop.json");
        map.data.addGeoJson(json_route); 
        map.data.addGeoJson(json_stop); 
    }else if(x === 8){
        let json_route = await d3.json("data/plan8_route.json");
        let json_stop = await d3.json("data/plan8_stop.json");
        map.data.addGeoJson(json_route); 
        map.data.addGeoJson(json_stop); 
    }else if(x === 9){
        let json_route = await d3.json("data/plan9_route.json");
        let json_stop = await d3.json("data/plan9_stop.json");
        map.data.addGeoJson(json_route); 
        map.data.addGeoJson(json_stop); 
    }



    // Highlightin the service area
    console.log(routeID)

    // read route_service data
    let Busjson = await d3.json("/data/busRouteTAZ.json");
    console.log(Busjson);

    let updateRoute = [];
    for (let i = 0; i < routeID.length; i++){ 
        updateRoute.push('b'+routeID[i]);
    }
    console.log(updateRoute);

    let affectedTAZ = [];
    for (let i = 0; i < updateRoute.length; i++){ 
        Array.prototype.push.apply(affectedTAZ, Busjson[updateRoute[i]])

    }
    console.log(affectedTAZ);
    d3.select("#mapLayer").selectAll("path")
     .style("fill","grey")
    d3.select("#mapLayer").selectAll("path")
     .style("fill",function(d){ if (affectedTAZ.includes(d.properties.TAZID)) {return "#02940e"} else {return "grey"}})



}

function tooltipRender(data) {
    let text = "<h2>"+"Budget:&nbsp&nbsp$" + data[0] + "&nbspmillion"+ "<br>" +"Ei:&nbsp&nbsp" + data[4]+ "&nbspg/m^3"+ "" + "<br>"+ "Ei(Percentage):&nbsp&nbsp"+ data[5]+ "%"+ "<br>"+ "Buses replaced:&nbsp&nbsp" + data[1] + "<br>" + "In-depot charging stations:&nbsp&nbsp" + data[2] +"<br>"+ "On-route Charging Stations:&nbsp&nbsp" + data[3] +"</h2>";
    return text;
}

// read route_service data


let margin = { top: 20, right: 20, bottom: 60, left: 80 };
let width = 810 - margin.left - margin.right;
let height = 500 - margin.top - margin.bottom;
let activeYear = "";


d3.select('#chart-view')
            .append('div')
            .attr("class", "tooltip")
            .style("opacity", 0);

            
let tooltip = d3.select('.tooltip');

d3.select('#chart-view')
            .append('svg').classed('plot-svg', true)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom);

let svgGroup = d3.select('#chart-view').select('.plot-svg').append('g').classed('wrapper-group', true);

 svgGroup.append('text').classed('activeYear-background', true)
            .attr('transform', 'translate(100, 100)');

        svgGroup.append("g")
            .classed("x-axis", true)
            .attr("transform", "translate(0," + height + ")");

        svgGroup.append('text').classed('axis-label-x', true);

        svgGroup.append("g")
            .attr("class", "y-axis");

        svgGroup.append('text').classed('axis-label-y', true);
let maxX = 340
let maxY = 6;

//Find the min and max size for the circle data 

let xScale = d3.scaleLinear().range([0, width]).domain([0, maxX]).nice();
let yScale = d3.scaleLinear().range([height, 0]).domain([0, maxY]).nice();

let group = d3.select('#chart-view').select('.plot-svg').select('.wrapper-group');

group.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

let yearBg = group.select('.activeYear-background').text(activeYear);

let axisXLabel = d3.select('.axis-label-x')
    .text("Budget (million dollars)")
    .style("text-anchor", "middle")
    .attr('transform', 'translate(' + (width / 2) + ', ' + (height + 35) + ')');

d3.select('.axis-label-y')
    .text("Environmental equity (g/m^3)")
    .style("text-anchor", "middle")
    .attr('transform', 'translate(' + -50 + ', ' + (height / 2) + ')rotate(-90)');

//Add the x and y axis
let xAxis = d3.select('.x-axis')
    .call(d3.axisBottom(xScale));

let yAxis = d3.select('.y-axis')
    .call(d3.axisLeft(yScale));

// data
//Budget, num of bus, num of in-depot, num of on-route, Ei, Ei-percentage,which dataset
let budget_data = [[2.099,1,1,1,0.25,4.35,0,[33,35,240]],
[9.89,10,4,1,1.35,23.5,1,[33,35,240,39,41,45,47]],
[15.084,16,6,1,1.87,32.5,2,[33,35,240,39,41,45,47]],
[19.179,21,7,1,2.27,39.4,3,[33,35,240,39,41,45,47]],
[24.624,26,9,2,2.75,47.7,4,[33,35,39,41,45,47,227,232,240,248,509]],
[39.609,41,14,4,3.69,64.1,5,[33,35,240,39,41,45,47,232,248,227,509,6,516,11,2,209,33,513]],
[59.537,63,21,5,4.44,77.1,6,[2,6,11,33,35,39,41,45,47,200,205,209,227,232,240,248,500,509,516,520]],
[119.728,122,41,14,5.51,95.7,7,[2,6,9,11,17,21,33,35,39,41,45,47,62,200,201,205,209,213,218,227,232,240,248,354,461,500,509,516,519,520,625,862]],
[199.847,203,68,27,5.72,99.3,8,[2,36,9,11,17,21,33,35,39,41,45,47,54,62,72,200,201,205,209,213,217,218,220,223,227,228,232,240,248,307,313,320,354,461,462,463,470,471,472,473,477,500,509,516,519,520,625,862]],
[335.366,334,112,46,5.76,100,9],[2,36,9,11,17,21,33,35,39,41,45,47,54,62,72,200,201,205,209,213,217,218,220,223,227,228,232,240,248,307,313,320,354,451,453,454,455,456,460,461,462,463,470,471,472,473,477,500,509,513,516,519,520,525,526,551,603,604,606,608,612,613,616,625,627,628,630,640,645,650,664,665,667,805,806,807,811,821,822,830,831,833,834,838,840,841,850,862,863,902,919,920,972,990]];

let circles = group.selectAll('circle').data(budget_data);

let circleEnter = circles
    .enter().append('circle');

circles = circleEnter.merge(circles);

circles.attr("r",7)
.attr("cx", function (d) {
    return xScale(d[0]);
})
.attr("cy", function (d) {
    return yScale(d[4]);
})

circles.on('mouseover', function (d, i) {
    //show tooltip
    tooltip.transition()
        .duration(200)
        .style("opacity", .9);
    tooltip.html(tooltipRender(d) + "<br/>")
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY - 28) + "px");

});
//hover function for country selection
circles.on("mouseout", function (d) {
    tooltip.transition()
        .duration(500)
        .style("opacity", 0);
});

circles.on('click',function(d){
    useMap(d[6],d[7]);
})

useMap();
