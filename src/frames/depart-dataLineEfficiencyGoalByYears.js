import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape } from 'bizcharts';
const { Region } = Guide;
import { DataSet } from '@antv/data-set';

let y = 0;

export default class DepartDataLineEfficiencyGoalByYears extends React.Component{

  constructor(props){
    super(props);
    this.state={
      data:[]
    }
  }

  componentDidMount(){
    this.updateData()
  }

  updateData(){
    fetch("/webservices/public_services.asmx/simpleQuery?type=getEfficiencyByYearsGroupByLine&p=")
    .then(response => response.json()).then(data => {

      var rawData=data.data;
      var trans = [];
      rawData.map(function(rItem,rI){
        var inx = 0;
        var tmp = trans.filter(function(item,i){
          if(item.Line == rItem.Line){inx = i;return true;}
          return false;
        })
        if(tmp.length){
          trans[inx][rItem.year]=parseFloat(rItem.p);
        }else{
          var n = {Line:rItem.Line};
          n[rItem.year]=parseFloat(rItem.p);
          trans.push(n);
        }
      })
      trans.map(function(item){
        switch(item.Line){
          case '2FA1':item.goal=55.5;break;
          case '2FB2':item.goal=48;break;
          case '2FC1':item.goal=59;break;
          case '2FC2':item.goal=86;break;
          case '2FC3':item.goal=66;break;
        }
      })
      this.setState({data:trans});
    })
  }

  render(){
    return (
      <div>
        <h2>目标值达成情况</h2>
        <Chart height={400} data={[1]} forceFit >
          <Legend custom clickable={false} items={[
            {
              value: '差',
              fill: '#FFA39E',
              marker: 'square'
            },
            {
              value: '良',
              fill: '#FFD591',
              marker: 'square'
            },
            {
              value: '优',
              fill: '#A7E8B4',
              marker: 'square'
            },
            {
              value: '实际值',
              fill: '#223273',
              marker: 'square'
            },
            {
              value: '目标值',
              fill: '#F7B733',
              marker: {
              symbol: 'line',
              stroke: '#F7B733',
              radius: 5
              }
            },
          ]}
          />
        {this.state.data.map( (data,i) =>{
          const yGap = 0.12;
          const max = data['goal']||data['2018']*1.1;
            const cols ={
              '2018': {
                min:0,
                max: max*1.1,
                nice: false
              },
              goal: {
                min: 0,
                max: max*1.1,
                nice: false
              }
            }
            return (
            <View key = {i} start={{x: 0,
                      y:y}}
              end={{x: 1,
                      y: y + yGap}}
              data={[data]} scale={cols}>
                <Coord transpose />
                <Axis name="2018" position='right' />
                <Axis name='goal'visible={false} />
                <Geom type='point' position='Line*goal' color='#F7B733' shape='line' size={12} style={{lineWidth: 5}}/>
                <Geom type='interval' position='Line*2018' color='#223273' size={6} />
                <Guide>
                  <Region start={[-1, 0]} end={[1, data['2016']]} style={{fill: '#FFA39E',
                      fillOpacity: 0.65}}/>
                  <Region start={[-1, data['2016']]} end={[1, data['2017']]} style={{fill: '#FFD591',
                      fillOpacity: 0.75}}/>
                  <Region start={[-1, data['2017']]} end={[1, max*1.1]} style={{fill: '#A7E8B4',
                      fillOpacity: 0.85}}/>
                </Guide>
                <Tooltip />
                <div style={{display:'none'}}>{y += yGap + 0.06}</div>
              </View>
            )
          })}
        </Chart>
      </div>

    )
  }

}
