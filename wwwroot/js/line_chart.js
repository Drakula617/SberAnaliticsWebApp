
linechartVue = new Vue({
    el: '#linechart-page-div',
    data: {
        sbersInTable: []
    },
    methods:
    {
        getSbers: function () {
            axios.post('/Home/GetSbers').then((response) => {
                
/*                let data = response.data;*/
                console.log(response.data);
                this.sbersInTable = Object.assign([], response.data);
                this.createLineChartPositiveSbers(response.data);
                this.createLineChartNegativeSbers(response.data);
                this.createLineChartAllSbers(response.data);

            });
        },
        createLineChartPositiveSbers: function (data) {
            let chartdata = Object.assign([], data);
            let canvas = document.getElementById('linechart-positive-sbers');
            let context = canvas.getContext('2d');
            let xData = [];
            let yData = [];
            chartdata = chartdata.filter(c => c.summ > 0);
            for (let i = 0; i < chartdata.length; i++) {
                xData.push(chartdata[i].datetime);
                yData.push(chartdata[i].summ);
            }
            dataforChart = {
                labels: xData,
                datasets: [
                    {
                        label: 'Positive Sbers',
                        data: yData,
                        fill: true,
                        tension: 0.2
                    }
                ]
            };
            let zoomOption = {
                pan: {
                    enabled: true,
                    mode: 'xy',
                    speed: 10
                },
                zoom: {
                    mode: 'x',
                    pinch: {
                        enabled: true
                    },
                    wheel: {
                        enabled: true
                    },
                    speed: 10
                }
            };
            let xScalesConfig = {
                min: 0,
                max: 50
            };
            let config = {
                type: 'line',
                data: dataforChart,
                options: {
                    scales: {
                        x: xScalesConfig
                    },
                    plugins: {
                        zoom: zoomOption
                    }
                }
            };
            let chart = new Chart(context, config);
            
        },
        createLineChartNegativeSbers: function (data) {
            let chartdata = Object.assign([], data);
            let canvas = document.getElementById('linechart-negative-sbers');
            let context = canvas.getContext('2d');
            let xData = [];
            let yData = [];
            chartdata = chartdata.filter(c => c.summ < 0);

            /*chartData = chartdata.forEach(c => c.summ = -c.summ);*/
            for (let i = 0; i < chartdata.length; i++) {
                xData.push(chartdata[i].datetime);
                yData.push(-chartdata[i].summ);
            }
            dataforChart = {
                labels: xData,
                datasets: [
                    {
                        label: 'Negative Sbers',
                        data: yData,
                        fill: true,
                        tension: 0.2
                    }
                ]
            };
            let zoomOption = {
                pan: {
                    enabled: true,
                    mode: 'xy',
                    speed: 10
                },
                zoom: {
                    mode: 'x',
                    pinch: {
                        enabled: true
                    },
                    wheel: {
                        enabled: true
                    },
                    speed: 10
                }
            };
            let xScalesConfig = {
                min: 0,
                max: 50
            };
            let config = {
                type: 'line',
                data: dataforChart,
                options: {
                    scales: {
                        x: xScalesConfig
                    },
                    plugins: {
                        zoom: zoomOption
                    }
                }
            };
            let chart = new Chart(context, config);
        },
        createLineChartAllSbers: function (data) {
            let chartdata = Object.assign([], data);
            let canvas = document.getElementById('linechart-all-sbers');
            let context = canvas.getContext('2d');
            //let xPositiveData = [];
            let yPositiveData = [];
            //let xNegativedata = [];
            let yNegativeData = [];
            let xData = [];
            let positiveData = chartdata.filter(c => c.summ > 0);
            let negativeData = chartdata.filter(c => c.summ < 0);
            for (let i = 0; i < chartdata.length; i++) {
                xData.push(data[i].datetime);
            }
            for (let i = 0; i < positiveData.length; i++) {
                //xPositiveData.push(positiveData[i].datetime);
                yPositiveData.push(positiveData[i].summ);
            }
            for (let i = 0; i < negativeData.length; i++) {
                //xNegativedata.push(negativeData[i].datetime);
                yNegativeData.push(negativeData[i].summ);
            }
            let dataforChart = {
                labels: xData,
                datasets: [
                    {
                        label: 'Positive',
                        data: yPositiveData,
                        fill: true,
                        tension: 0.2
                    },
                    {
                        label: 'Negative',
                        data: yNegativeData,
                        fill: true,
                        tension:0.2
                    }
                ]
            };
            let zoomOption = {
                pan: {
                    enabled: true,
                    mode: 'xy',
                    speed: 10
                },
                zoom: {
                    mode: 'x',
                    pinch: {
                        enabled: true
                    },
                    wheel: {
                        enabled: true
                    },
                    speed: 10
                }
            };
            let xScalesConfig = {
                min: 0,
                max: 50
            };
            let config = {
                type : 'line',
                data: dataforChart,
                options: {
                    scales: {
                        x: xScalesConfig
                    },
                    plugins: {
                        zoom: zoomOption
                    }
                }
            };
            let chart = new Chart(context, config);

        }
        
    }

});