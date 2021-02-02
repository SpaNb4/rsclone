import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import { getRoomState } from './room_state';

const createHistogram = () => {
    const date = [];
    let obj;

    const allGames = getRoomState().getAllGames();

    // eslint-disable-next-line no-restricted-syntax
    for (const [name, time] of Object.entries(allGames)) {
        obj = {
            game: `${name}`,
            value: `${time}`,
        };
        date.push(obj);
    }
    return date;
};

const buildHistogram = () => {
    const chart = am4core.create('modal-histogram__content', am4charts.XYChart);

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'game';
    categoryAxis.title.text = 'Game';

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.title.text = 'Seconds';

    const series = chart.series.push(new am4charts.ColumnSeries());
    series.columns.template.tooltipText = 'Game: {categoryX}\nSeconds: {valueY}';
    series.columns.template.fill = am4core.color('#C70404'); // fill
    series.dataFields.valueY = 'value';
    series.dataFields.categoryX = 'game';

    document.querySelector('#menu-histogram-button').addEventListener('click', () => {
        chart.data = createHistogram();
    });
};

buildHistogram();
