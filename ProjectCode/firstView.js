async function utahTaz() {

    let width = 600;
    let height = 1500;
    let svg = d3.select("#mapLayer").append("svg")
    .attr("width",width)
    .attr("height",height);
    
    let  projection = d3.geoConicConformal()
                  .parallels([40 + 43/60, 41 + 47/60])
                  .center([0, 41])
                  .scale(36000)
                  .rotate([111 + 30 / 60, 0]);
              

    // This converts the projected lat/lon coordinates into an SVG path string
    let path = d3.geoPath()
        .projection(projection);
     
    // Load in GeoJSON data
    let json = await d3.json("/data/utah_geo.json");
    console.log(json);
    let Busjson = await d3.json("/data/busRouteTAZ.json");
    console.log(Busjson['b11'].includes(761));
    
    // Bind data and create one path per GeoJSON feature
    d3.select("#mapLayer").selectAll("path")
        .data(json.features)
        .join("path")
        .attr("d", path)
        .style('opacity', '0.5')
        .style("fill","grey")
        .attr("transform", "translate(50," +180 + ")");    
    
}   

async function utahPollution() {

    let div = d3.select("body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

    let json = await d3.json("/data/utah_geo.json");
    let tazPollution = [];
    for (let i = 0; i < json.features.length; i++){ 
        tazPollution.push(json.features[i].properties.MEAN);
    }
    
    let maxPollution = d3.max(tazPollution)
    let minPollution = d3.min(tazPollution)
            
    let PollutionScale = d3.scaleLinear()
      .domain([minPollution,maxPollution])
      .range(["#FFFFDD","#0b395a"]); 

    d3.select("#mapLayer").selectAll("path")
        
        .style("fill",function(d){return PollutionScale(d.properties.MEAN)})
        .attr("transform", "translate(50," +180 + ")")         
        .on("mouseover", function(d) {	
            d3.select(this).style("fill", "#f30524")
            div.transition()		
            .duration(50)		
            .style("opacity", 1)	
            
        div.html("TAZID: "+ d.properties.TAZID + "<br/>"+"PM 2.5: " + d3.format(",.2f")(d.properties.MEAN))	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 50) + "px")
                
        })					
        
        .on("mouseout", function(d) {		
        div.transition()		
            .duration(50)		
            .style("opacity", 0)
        d3.select(this).style('fill', function(d){
                return PollutionScale(d.properties.MEAN)})	
    });
   
}   

async function utahLowIncomePop() {

    let div = d3.select("body").append("div")	
    .attr("class", "tooltip1")				
    .style("opacity", 0);

    let json = await d3.json("/data/utah_geo.json");
    let tazLowPop = [];
    for (let i = 0; i < json.features.length; i++){ 
        tazLowPop.push(json.features[i].properties.low_pop);
    }
    
    let maxPop = d3.max(tazLowPop)
    let minPop = d3.min(tazLowPop)
            
    let LowPopScale = d3.scaleLinear()
      .domain([minPop,maxPop])
      .range(["#a07974","#971605"]); 

    d3.select("#mapLayer").selectAll("path")
        
        .style("fill",function(d){return LowPopScale(d.properties.low_pop)})
        .attr("transform", "translate(50," +180 + ")")         
        .on("mouseover", function(d) {	
            d3.select(this).style("fill", "#16ac09")
            div.transition()		
            .duration(50)		
            .style("opacity", 1)	
            
        div.html("TAZID: "+ d.properties.TAZID + "<br/>"+"Low-income population: " + d3.format(",.0f")(d.properties.low_pop))	
            .style("left", (d3.event.pageX) + "px")		
            .style("top", (d3.event.pageY - 50) + "px")
                
        })					
        
        .on("mouseout", function(d) {		
        div.transition()		
            .duration(50)		
            .style("opacity", 0)
        d3.select(this).style('fill', function(d){
                return LowPopScale(d.properties.low_pop)})	
    });
   
} 

// async function busRouteService() {
    
//     let json = await d3.json("/data/utah_geo.json");
//     console.log(json);
//     let Busjson = await d3.json("/data/busRouteTAZ.json");
//     console.log(Busjson['b213']);
//     d3.select("#mapLayer").selectAll("path")
//      .style("fill",function(d){ if (Busjson['b213'].includes(d.properties.TAZID)) {return "#02940e"} else {return "grey"}})


// }