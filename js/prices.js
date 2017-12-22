(function(window, undefined) {

  var getPercentChangeText = (percentChange, timeFrame) => {
    if (percentChange > 0)
      return `<p class="positive">+${numeral(percentChange).format("0.00")}% (${timeFrame})</p>`
    else
      return `<p class="negative">${numeral(percentChange).format("0.00")}% (${timeFrame})</p>`
  }

  var renderSummaryData = (data) => {
    var res = `<div class="currencySummary shadowbox">
      <div class="summaryMainInfo">
        <h2>${data.name}</h2>
        <h3>$${numeral(data.price_usd).format("0,0.00")}</h3>
      </div>
      <div class="summaryPercentages">
    `
    res += getPercentChangeText(data.percent_change_1h, "1h");
    res += getPercentChangeText(data.percent_change_24h, "24h");
    res += getPercentChangeText(data.percent_change_7d, "7d");

    res += `
    </div>
      <div class="summaryOtherInfo">
        <p>Market Cap: $${numeral(data.market_cap_usd).format("0,0")}</p>
      </div>
    </div>`
    return res;
  }

  var renderSummaries = (data) => {
    var res = "";
    for (var i = 0; i < data.length; i++) {
      res += renderSummaryData(data[i]);
    }
    return res;
  }

  function setIntervalAndExecute(fn, t) {
    fn();
    return(setInterval(fn, t));
  }

  var run = () => {
    /* particlesJS.load(@dom-id, @path-json, @callback (optional)); */
    particlesJS.load('particles-js', 'js/particles.json', function() {
      console.log('callback - particles.js config loaded');
    });

    // Updates time every second
    var format = 'hh:mm:ss'
    setIntervalAndExecute(() => {
      // var time = moment() gives you current time. no format required.
      var two = moment('02:00:00',format),
        noon = moment('12:00:00', format),
        five = moment('17:00:00', format),
        now = moment();
      var headerWelcomeMsg = "Welcome!";
      if (now.isBetween(two, noon))
        headerWelcomeMsg = "Good morning!";
      else if (now.isBetween(noon, five))
        headerWelcomeMsg = "Good afternoon!";
      else
        headerWelcomeMsg = "Good evening!";

      $("#greeting").text(headerWelcomeMsg);
      $(".currentTime").text(now.format('h:mm:ss a'));
      $(".currentDate").text(now.format('ddd, MMMM D, YYYY'));
    }, 1000);

    // Update prices every 10 seconds
    setIntervalAndExecute(() => {
      console.log("Updating prices...")
      $.get( "https://api.coinmarketcap.com/v1/ticker/?limit=30", function(data) {
        $("#summaries").html(renderSummaries(data))
      });
    }, 10000);
  }

  $(run);


})(window);
