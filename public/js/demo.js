demo = {
  initChartsPages: function (totalStorage, usedStorage) {
    chartColor = '#FFFFFF';

    ctx = document.getElementById('chartEmail').getContext('2d');

    myChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['فضای باقی مانده', 'فضای استفاده شده'],
        datasets: [
          {
            label: 'Files',
            pointRadius: 0,
            pointHoverRadius: 0,
            backgroundColor: ['#4acccd', '#ef8157'],
            borderWidth: 0,
            data: [totalStorage - usedStorage, usedStorage],
          },
        ],
      },

      options: {
        legend: {
          display: true,
        },

        pieceLabel: {
          render: 'percentage',
          fontColor: ['white'],
          precision: 2,
        },

        tooltips: {
          enabled: true,
        },

        scales: {
          yAxes: [
            {
              ticks: {
                display: false,
              },
              gridLines: {
                drawBorder: false,
                zeroLineColor: 'transparent',
                color: 'rgba(255,255,255,0.05)',
              },
            },
          ],

          xAxes: [
            {
              barPercentage: 1.6,
              gridLines: {
                drawBorder: false,
                color: 'rgba(255,255,255,0.1)',
                zeroLineColor: 'transparent',
              },
              ticks: {
                display: false,
              },
            },
          ],
        },
      },
    });
  },
};
