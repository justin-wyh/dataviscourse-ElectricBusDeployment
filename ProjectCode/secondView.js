async function usMap() {

    let routejson =  await d3.json("data/eg1_route.json");
    
    let map = new google.maps.Map(d3.select(".middle").node(), {
                zoom: 11.5,
                center: new google.maps.LatLng(40.688701, -111.936183),
                mapTypeId: google.maps.MapTypeId.TERRAIN
                    });
     map.data.addGeoJson(routejson); 
    
    }
    usMap();