window.onload = init();


function init(){
    //console.log("ready!");
    
    // channels katyj98, daspacepony and kitkatyj respectively
    var channels = ["UC6n6cH1DHsS-NjatbIBQPHg","UCSKNVwpVkQ5uKhV09Vc96Kw","UCQYFUBAdXY5PP0t1M1cK3JA"];
    var channelSubs = [];
    var requests = channels.length;
    
    var http = new XMLHttpRequest();
    var key = "AIzaSyDSfEKjKq-SDRhT-Xv0Fni51QWbOAnDWFU";
    var chString = "";
    channels.forEach(function(ch,i){
        chString += ch;
        if(i < requests-1) chString += ",";
    });
    
    var req = "https://www.googleapis.com/youtube/v3/channels?id="+chString+"&key="+key+"&part=statistics";
    console.log(req);

    // Get channel stats
    http.open('GET', req, true);
    http.send();

    http.onreadystatechange = processRequest;

    function processRequest(e) {
        if (http.readyState == 4 && http.status == 200) {
            var resp = JSON.parse(http.responseText);
            resp.items.forEach(function(chData,i){       
                channels.forEach(function(ch,j){
                    if(chData.id === ch){
                        channelSubs[j] = chData.statistics.subscriberCount;
                    }
                });

                requests--;

                if(requests <= 0) updateChannelsSubCount();
            });
        }
    }
    
    
    function updateChannelsSubCount(){
        $('#explore .subcount').each(function(n,e){
            e.textContent = addCommas(channelSubs[n]) + " subscribers";
        });
    }
    
    function addCommas(nStr) {
        nStr += '';
        var x = nStr.split('.');
        var x1 = x[0];
        var x2 = x.length > 1 ? '.' + x[1] : '';
        var rgx = /(\d+)(\d{3})/;
        while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
        }
        return x1 + x2;
    }
}