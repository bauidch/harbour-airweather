function httpGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.send(null);
    return xmlHttp;
}

function httpXMLGet(url) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", url, false);
    xmlHttp.responseType = 'document';
    xmlHttp.setRequestHeader("Content-Type", "text/xml");
    xmlHttp.onload = function () {
      if (xmlHttp.readyState === xmlHttp.DONE && xmlHttp.status === 200) {
        console.log(xmlHttp.response, xmlHttp.responseXML);
      }
    };
    xmlHttp.send(null);
    return xmlHttp;
}

function get_metar(icao) {
    var locationsRAW = httpXMLGet("https://www.aviationweather.gov/adds/dataserver_current/httpparam?dataSource=metars&requestType=retrieve&hoursBeforeNow=1&format=xml&mostRecent=true&stationString=" + icao )
    console.log(locationsRAW)
    console.log(locationsRAW.responseText)
    console.log(locationsRAW.responseXML)
    console.log(locationsRAW.response)

}

function getAirportData(icao) {
    var airportdataRAW = httpGet("https://www.airport-data.com/api/ap_info.json?icao=" + icao)

    try {
        var location = JSON.parse(airportdataRAW.responseText);
    } catch (e) {
        console.log("error: failed to parse json");
    }

    if (airportdataRAW.status >= 200 && airportdataRAW.status < 400) {

        var ret = [];
        ret.push({"icao":location.icao, "name":location.name, "location":location.location, "country":location.country});
        return ret;

    } else {
        console.log('error or no data')
    }
}
