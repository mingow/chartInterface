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
      rawData[i]['diff']=parseFloat(parseFloat(rawData[i]['diff']).toFixed(3));
      rawData[i]['commits']=parseFloat(parseFloat(rawData[i]['commits']).toFixed(3));
      rawData[i]['p']=parseFloat(parseFloat(rawData[i]['p']).toFixed(3));
      const item = rawData[i];
      if (i > 0 && i < rawData.length - 1) {
        if (Util.isArray(rawData[i - 1].diff)) {
          item.diff = [ rawData[i - 1].diff[1], parseFloat((item.diff + rawData[i - 1].diff[1]).toFixed(3)) ];
        } else {
          item.diff = [ rawData[i - 1].diff, parseFloat((item.diff + rawData[i - 1].diff).toFixed(3)) ];
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
          <Legend name="genre" position="right" title={null} dx={20} />
          <Geom type='interval' position="date*commits" color="#DFDCE3" />
          <Geom type='interval' position="date*diff" shape="waterfall" color="#f00" />
          <Geom type='line' position="date*p" color="#4ABDAC"  />
        </Chart>
      </div>

    )
  }
}
