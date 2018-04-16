/*global navigator, console, $, document, stations, popupAlert, popupList, getListSelection, popupPrompt, getPromptValue
         localStorage, XMLHttpRequest */
/*eslint no-console: ["error", { allow: ["log", "warn", "error", "dir"] }] */

if('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js').then(function (registration) {
        console.dir(registration);
        console.log("[ServiceWorker] registered in browser.");
    }).catch(function (err) {
        // registration failed :(
        console.log('ServiceWorker registration failed: ', err);
    });
}

if(navigator.onLine) {
    $("#indicator").text('Online');
} else {
   $("#indicator").text('Offline');
}

var CORE_URL = "https://transportapi.com/v3/uk/",
    KEYS = "api_key=55aa4dc0606a4f9b92730070eb510f21&app_id=6bbf63ec",
    URL = CORE_URL + "train/station/$$FROM$$/$$DATE$$/$$TIME$$/" +
         "timetable.json?" + KEYS + "&calling_at=$$TO$$",
    LOCURL = CORE_URL + "train/stations/near.json?lon=$$LONG$$&lat=$$LAT$$&rpp=4&" + KEYS;

/**
 * URL Request Format:
 * @type {string}
 * "http://transportapi.com/v3/uk/train/station/{station_code}/[date]/[time]/timetable[.format]?[limit=][&origin=][&destination=][&calling_at=][&called_at=]";
 *
 * = CORE-URL/station/{station_code}/{date}/{time}/timetable.json? ...
 *
 * Query-variables:
 *    limit={num_of_items_n_return}&
 *    origin={origin_station_code}&
 *    destination={destination_station_code}&
 *    calling_at={calling_at_station_code(s)}&
 *    called_at={called_at_station_code(s)&
 *    api_key={api_key}&
 *    app_id={app_id}
 */

/**
 * Favourite type - an object representing a frequent journey
 * @param name - name displayed in list
 * @param from - where from (station name)
 * @param to - where to (station name)
 * @param time - usual time-of-day
 * @constructor
 */
function Favourite(name, from, to, time) {
    this.name = name;
    this.from = from;
    this.to = to;
    this.time = time;
}

var app = {
    quickList: [],
    nearbyStations: [],
    online: false
};

$(document).ready(function(){
    checkConnection("favicon.ico", function() {
        // This will get a list of nearby stations..
        navigator.geolocation.getCurrentPosition(getLocation, locationError);
        app.online = true;
    });
    setDefaults();
    getQuickList();
    displayQuicklist();

    // This gets a list of departures - times and platforms - for the specified journey...
    $("#get_tt").on('click', function(){
        if(app.online) {
            getDepartureList(stations[$("#from-box").val()],
                stations[$("#to-box").val()],
                $("#date").val(),
                $("#time").val());
        } else {
            popupAlert("Offline", "You have no current Internet connection.  Try again from a different location.");
        }
    });

    // Set up the station lists (for 'from' location)...
    var lvLists = getListViewItems();
        // ,    selectList = getSelectList("selList");
    $("#from-list").html(lvLists);
    $("#from-list").trigger('listview');
    $("#from-list").hide();
    $("#from-box").on( "keypress", function() {
        if($(this).val().length > 2) {
            $("#from-list").show();
        }
    });

    // User has picked a station to travel from...
    $("#from-list li").on("click", function() {
        var selectedItem = this;
        $("#from-box").val(selectedItem.textContent);
        // close all, in case still open
        $("#from-list").hide();
    });

    // Set up the station lists (for 'from' location)...
    $("#to-list").html(lvLists);
    $("#to-list").trigger('listview');
    $("#to-list").hide();
    $("#to-box").on( "keypress", function() {
        if($(this).val().length > 2) {
            $("#to-list").show();
        }
    });

    // User has picked a station to go to...
    $("#to-list li").on("click", function() {
        var selectedItem = this;
        $("#to-box").val(selectedItem.textContent);
        // close all, in case still open
        $("#to-list").hide();
    });

    // User has clicked on the from-near 'location' button to get a 'nearby' station...
    $("#from-near").on('click', function() {
        popupList("Nearby Stations", nearbyStationList(), function() {
            var name = getListSelection().split(':')[0];
            $("#from-box").val(name);
            // $(".here").prop('disabed', false).addClass('ui-disabled');
        });
    });

    // User has clicked on the to-near 'location' button to get a 'nearby' station...
    $("#to-near").on('click', function() {
        popupList("Nearby Stations", nearbyStationList(), function() {
            var name = getListSelection().split(':')[0];
            $("#to-box").val(name);
            // $(".here").prop('disabed', false).addClass('ui-disabled');
        });
    });

    // User has decided to add the current journey as a favourite...
    $("#add-fav").on('click', function() {
        var name, from = $("#from-box").val(), to = $("#to-box").val(), time = $("#time").val();
        popupPrompt("New Favourite", "Enter a name for this journey", function() {
            name = getPromptValue();
            if(name) {
                app.quickList.push(new Favourite(name, from, to, time));
                updateQuicklist();
                displayQuicklist();
            }
        }, null);
    });

    // User has selected to clear the current journey details...
    $("#clear").on('click', function(){
        clearJourney();
    });

    // Used has selected a journey from the quick-list...
    $("#quicklist").on('click', "li a", function() {
        if ($(this).text() === "") {
            removeItem($(this).parent().text());
        } else {
            // Assign the quicklist item to the current journey...
            setQuicklistItem($(this).text());
        }
    });

    // User adds one day to the journey date...
    $("#up-date").on('click', function() {
        var d = new Date($("#date").val());
        d.setDate(d.getDate() + 1);
        $("#date").val(d.toISOString().substring(0, 10));
    });

    // User subtracts one day form the journey date...
    $("#down-date").on('click', function() {
        var d = new Date($("#date").val());
        d.setDate(d.getDate() - 1);
        $("#date").val(d.toISOString().substring(0, 10));    });

    // User adds 15 minutes to the journey time...
    $("#up-time").on('click', function() {
        var t = new Date(Date.parse(new Date().toDateString() + " " + $("#time").val()));
        // Here's how to add 15 minutes to a time...
        t.setTime(t.getTime() + 15 * 60000);
        $("#time").val(t.toTimeString().substr(0, 5));
    });

    // User subtracts 15 minutes from the journey time...
    $("#down-time").on('click', function() {
        var t = new Date(Date.parse(new Date().toDateString() + " " + $("#time").val()));
        t.setTime(t.getTime() - 15 * 60000);
        $("#time").val(t.toTimeString().substr(0, 5));
    });
});

/**
 * Gets a list of departures from the specified station to the specified destination on
 * the specified date and time...
 * @param from  - code of station to travel from
 * @param to    - code of station to travel to
 * @param date  - date of travel
 * @param time  - earliest time of travel
 */
function getDepartureList(from, to, date, time){
    if(!from){
        popupAlert("Error", "You must specify a 'from' station.");
        return;
    }
    if(!to){
        popupAlert("Error", "You must specify a 'to' station.");
        return;
    }
    if(!date){
        popupAlert("Error", "You must give a travel date.");
        return;
    }
    if(!time){
        popupAlert("Error", "You must provide an earliest departure time.");
        return;
    }
    var query_url = URL.replace("$$FROM$$", from)
            .replace("$$TO$$", to)
            .replace("$$DATE$$", date)
            .replace("$$TIME$$", time);
    console.log(query_url);
    // Update the collapsible header (to save space later)...
    $("#journey").text("Journey to " + $("#to-box").val());
    showWaitCursor("Getting departure list.");
    $.ajax({
        url: query_url,
        type: 'GET',
        async: true,
        contentType: "application/javascript",
        dataType: "jsonp",
        success: function(data) {
            showDepartures(data.departures.all);
            hideWaitCursor();
        },
        error: function(err) {
            console.dir(err);
            hideWaitCursor();
        }
    });
}

/**
 * User has selected a quick-list item - make this the current journey.
 * from to and time are as specified.  Today's date is used.
 * @param itemName
 */
function setQuicklistItem(itemName){
    var index, item; // show;
    for(index = 0; index < app.quickList.length; index += 1) {
        if (app.quickList[index].name === itemName) {
            item = app.quickList[index];
            //show = item.name + ":" + item.from + " - " + item.to + " @ " + item.time;
            setQuicklistJourney(item);
            $("#options_pnl").panel("close");
            break;
        }
    }
}

// Remove an item from the quicklist...
function removeItem(itemText){
    removeQuicklistItem(itemText);
    updateQuicklist();
    displayQuicklist();
}

function removeQuicklistItem(itemName) {
    var index;
    for(index = 0; index < app.quickList.length; index += 1) {
        if (app.quickList[index].name === itemName) {
            app.quickList.splice(index, 1);
            $("#options_pnl").panel("close");
            break;
        }
    }
}

// Set up date and time defaults - today at current time + 15 minutes
function setDefaults() {
    $("#date").val(getToday());
    $("#time").val(getNextTime(15));
}

// Today's date in UK format...
function getToday() {
    var d = new Date();
    return d.toISOString().substring(0, 10);       // toLocaleDateString("en-GB");
}

// Return a number as a two digit number (leading zero if necessary)...
function twoDigit(v) {
    return v.toString().length < 2 ? "0" + v.toString(): v.toString();
}

// Returns the station list contents as a set of listview items...
function getListViewItems() {
    var station, list = "";
    for (station in stations) {
        list += "<li id='" + stations[station] + "'>" + station + "</li>";
    }
    return list;
}

/*
function getSelectList(id) {
    var selList = "<select id='" + id + "'>";
    for (station in stations) {
        selList += "<option value='" + stations[station] + "'>" + station + "</option>";
    }
    selList += "</select>";
    return selList;
}
*/

// Show the list of departures ina listview...
function showDepartures(list){
    var dep_list = "",
        index;
    console.dir(list);
    for(index = 0; index < list.length; index += 1){
        dep_list += li(list[index]);
    }
    $("#list").html(dep_list).listview('refresh');
    $("#controls").collapsible("collapse");
}

// Create a <li> element for a departure...
function li(item){
    var html = "<li><h3>", platform = item.platform ? item.platform : "N/A";
    html += item.aimed_departure_time + " : Platform " + platform + "</h3><p>" + item.origin_name + " - " + item.destination_name + "</p>";
    return html + "</li>";
}

// Clear out the current journey details...
function clearJourney() {
    $("#from-box").val("");
    $("#to-box").val("");
    //$("#time").val("");
    //$("#date").val("");
    setDefaults();
    $("#list").empty();
    $("#add-fav").prop('disabed', false).removeClass('ui-disabled');
    $(".here").prop('disabed', false).removeClass('ui-disabled');
}

// Save a new version of the quicklist...
function updateQuicklist() {
    if(app.quickList.length > 0) {
        localStorage.setItem("quicklist", JSON.stringify(app.quickList));
    }
}

// Retrieve the current quickList...
function getQuickList() {
    var q_list = localStorage.getItem("quicklist", "");
    if (q_list !== null) {
        app.quickList = JSON.parse(q_list);
    } else {
        app.quicklist = [];
    }
    return app.quickList;
}

// Display the quicklist (in specified <ul> element)...
function displayQuicklist() {
    var listElement = $("#quicklist"), index, items = "", content;
    listElement.empty();
    for(index = 0; index < app.quickList.length; index += 1) {
        content = "<a href='#'>" + app.quickList[index].name + "</a><a href='#' data-icon='delete'></a>";
        items += "<li>" + content + "</li>";
    }
    listElement.html(items).listview().listview('refresh');
}

// Set the current quick list item as the specified journey...
function setQuicklistJourney(item) {
    $("#from-box").val(item.from);
    $("#to-box").val(item.to);
    $("#time").val(item.time);
    $("#add-fav").prop('disabled', true).addClass('ui-disabled');
}

// Geolocation response function - used to get nearby station list...
function getLocation(geoloc) {
    var lat = geoloc.coords.latitude.toString().trim(),
        long = geoloc.coords.longitude.toString().trim();
    getNearbyStations(lat, long);
}

function locationError(err) {
    console.log("Location error: " + err.message);
}

// Get a list of nearby stations and set up as an in-memory list...
function getNearbyStations(lat, long) {
    var query_url = LOCURL.replace("$$LONG$$", long).replace("$$LAT$$", lat);
    $.ajax({
        url: query_url,
        type: 'GET',
        async: true,
        contentType: "application/javascript",
        dataType: "jsonp",
        success: createNearbyStationList,
        error: function(err) {
            console.dir(err);
        }
    });
}

// Create a set of <li> items of nearby stations...
function nearbyStationList(){
    var index, list = "";
    for(index = 0; index < app.nearbyStations.length; index += 1) {
        list += "<li>" + app.nearbyStations[index].name + ": distance " + app.nearbyStations[index].distance + "m</li>";
    }
    return list;
}

// Add list of nearby stations to the app...
function createNearbyStationList(json) {
    var stations = json.stations, index;
    for(index = 0; index < stations.length; index += 1) {
        app.nearbyStations.push(stations[index]);
    }
    console.log("List ready");
    $(".here").prop('disabed', false).removeClass('ui-disabled');
}

// Get the current time and add a bit...
function getNextTime(period) {
    var t = new Date(), h = t.getHours(), m = t.getMinutes() + period;
    if (m > 59) {
        h += 1;
        m -= 60;
    }
    console.log(twoDigit(h) + ":" + twoDigit(m));
    return twoDigit(h) + ":" + twoDigit(m);
}


function showWaitCursor(message) {
    $.mobile.loading( 'show', {
        text: message,
        textVisible: true,
        theme: 'b',
        html: ""
    });
}

function hideWaitCursor() {
    $.mobile.loading( 'hide');
}

function checkConnection(fileUrl, indicator) {
    var xhr = new XMLHttpRequest(),
        randomNum = Math.round(Math.random() * 10000),
        checked = false;

    xhr.open('HEAD', fileUrl + "?rand=" + randomNum, true);

    try {
        xhr.onreadystatechange = function() {
            if(checked) return;
            if(indicator instanceof Function) {
                var status = xhr.status >= 200 && xhr.status < 304;
                indicator(status);
                checked = true;
            } else {
                if (xhr.status >= 200 && xhr.status < 304) {
                    indicator.innerText = "Online";
                    checked = true;
                } else {
                    indicator.innerText = "Offline";
                    checked = true;
                }
            }
        };
        xhr.send();
    } catch (e) {
        console.log(e.message);
    }
}
