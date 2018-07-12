import React from 'react';
import { Chart, Axis, Geom, Tooltip, Util, Shape, Legend } from 'bizcharts';
import { DataSet } from '@antv/data-set';

export default class DepartReachGoalByDays extends React.Component{

  constructor(props){
    super(props);
    this.state={
      rawData:[]
    }
  }

  componentDidMount(){
    this.updateData();
  }

  componentWillReceiveProps(nextProps){
    this.updateData(nextProps.currentLine);
  }

  updateData(val){
    const ds = new DataSet({
      state:{
        currentMonth:1
      }
    })
    var data = {
      line:val?val:""
    }
    fetch('/webservices/public_services.asmx/getHoursByDays',{
      method: 'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }).then(response => response.json())
  .then(data => {
    var rawData = JSON.parse(data.d);
    for(var i in rawData){
      rawData[i]['diff']=parseFloat(rawData[i]['diff']);
      rawData[i]['commits']=parseFloat(rawData[i]['commits']);
      rawData[i]['p']=parseFloat(rawData[i]['p']);
      const item = rawData[i];
      if (i > 0 && i < rawData.length - 1) {
        if (Util.isArray(rawData[i - 1].diff)) {
          item.diff = [ rawData[i - 1].diff[1], item.diff + rawData[i - 1].diff[1] ];
        } else {
          item.diff = [ rawData[i - 1].diff, item.diff + rawData[i - 1].diff ];
        }
      }
    }
    this.setState({rawData:rawData});
  })
  .catch(error => console.log('error is', error));
  }

  render(){
    return(
      <div>
        <h2>目标值差异</h2>
        <Chart height={400} data={this.state.rawData} forceFit>
          <Axis name="date" />
          <Legend />
          <Tooltip />

          <Geom type='interval' position="date*commits" color="#ff0" />
          <Geom type='interval' position="date*diff" shape="waterfall" color="#f00" />
          <Geom type='line' position="date*p"  />
        </Chart>
      </div>

    )
  }
}
