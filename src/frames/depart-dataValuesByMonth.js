import React from 'react';
import { Chart, Geom, Axis, Tooltip, Legend, Coord } from 'bizcharts';
import { DataSet } from '@antv/data-set';

export default class DepartDataValuesByMonth extends React.Component {
  constructor(props) {
    super(props)
    this.state={
      cols : {
        val: { alias: '效率' },
        Month: { alias: '月份' }
      },
      dataView:'',
      rawData:'',
      YoY:'',
      Chain:0,
      currentMonth:{}
    }
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
      Line:val?val:"all"
    }
    fetch('/WebService_main.asmx/GetSumData',{
      method: 'post',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify(data)
    }).then(response => response.json())
  .then(data => {
    var rawData = JSON.parse(data.d);
    for(var p in rawData){
      if(rawData[p].Nvalue){
        rawData[p].Ncapacity=parseFloat(rawData[p].Nvalue)*parseFloat(rawData[p].Nhours);
      }
      rawData[p].Ucapacity = parseFloat(rawData[p].Uvalue)*parseFloat(rawData[p].Uhours);
    }
    const dvForAll = ds.createView('allData').source(rawData);
    dvForAll.transform({
      type:'fold',
      fields:['Ucapacity','Ncapacity'],
      key:'p',
      value:'val',
    });
    dvForAll.transform({
      type:'map',
      callback:function(obj){
        obj.val= parseFloat(obj.val);
        if(obj.p=='Uvalue'){obj.v = parseFloat(obj.val)*parseFloat(obj.Uhours)}
        if(obj.p=='Nvalue'){obj.v = parseFloat(obj.val)*parseFloat(obj.Nhours)}
        return obj;
      }
    })
    this.setState({rawData:rawData})
    this.setState({dataView:dvForAll});
  })
  .catch(error => console.log('error is', error));
  }

  componentDidMount(){
    this.updateData();

  }
  render(){
    return (
      <div>
        <h2>月度总产值走势图</h2>
        <Chart height={400} cols={this.state.cols} data={this.state.dataView}
        onIntervalClick={(ev) => {
          var month = parseInt(ev.data._origin.Month);
          if(this.state.rawData[month-1].Ncapacity){
            var current = this.state.rawData[month-1].Ncapacity;
            var lastYear = this.state.rawData[month-1].Ucapacity;
            var lastMonth = month==1?this.state.rawData[11].Ucapacity:this.state.rawData[month-2].Ncapacity;
            console.log(lastMonth);
            var YoY = ((current-lastYear)/lastYear*100).toFixed(2)+"%";
            var Chain=((current-lastMonth)/lastMonth*100).toFixed(2)+"%";;
            this.setState({YoY:YoY,Chain:Chain,currentMonth:ev.data._origin})
          }

        }}
        >
          <Axis name="Month" />
          <Axis name="val" />
          <Legend />
          <Tooltip />
          <Geom type="interval" position="Month*val" color="p"   adjust={[{type: 'dodge',marginRatio: 0}]}/>

        </Chart>
        {this.state.currentMonth.Month?<p>当前选中的月份为{this.state.currentMonth.Month}月，当月产值为{this.state.currentMonth.val.toFixed(2)}元，同比{this.state.YoY}，环比{this.state.Chain}</p>:""}

      </div>

    )
  }

}
