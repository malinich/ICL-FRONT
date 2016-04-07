(function () {
    'use strict';

    var options = {
        chart: {
            type: 'lineChart',
            height: 450,
            margin : {
                top: 20,
                right: 20,
                bottom: 60,
                left: 55
            },
            duration: 10,

            x: function(d){return d[0];},
            y: function(d){ return d[1];},

            showValues: true,

            valueFormat: function(d){
                return d3.format(',f')(d);
            },

            xAxis: {
                axisLabel: 'X Axis'
            },
            yAxis: {
                axisLabel: 'Y Axis',
                tickFormat: function(d){
                    return d3.format(',2f')(d);
                }
            }
        }
    };
    app.utilize = app.utilize || {};
    app.utilize.d3_options = options;
})();