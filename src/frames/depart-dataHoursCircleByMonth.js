import React from 'react';
import { Chart, Axis, Geom, Tooltip, Facet, View, Legend, Label, Coord } from 'bizcharts';
import { DataSet } from '@antv/data-set';
const { DataView } = DataSet;

export default class DepartDataHoursCircleByMonth extends React.Component {

  constructor(props){
    super(props);
    var current = new Date();
    current = current.getFullYear()+'-'+(current.getMonth()+1)+'-1';

    this.state={
      month: current,
      source:[]
    }
  }

  updateData(month){
    fetch("/webservices/public_services.asmx/getHoursDistribution?month="+month)
    .then(response => response.json()).then(data => {
      console.log(data);
      const dv = new DataView();
      dv.source(data.data, {
          type: 'hierarchy',
        }).transform({
          type: 'hierarchy.partition', // 根据树形数据生成相邻层次图 Adjacency Diagram 布局
          field: 'sum',
          as: ['x', 'y'],
        });
        const source = [];
        const nodes = dv.getAllNodes();
        nodes.map(node => {
          if (node.depth === 0) { // 父节点不展示
            return;
          }
          const obj = {};
          obj.label = node.data.label;
          obj.sum = node.data.sum;
          obj.uv = node.data.uv;
          obj.value = node.value;
          obj.x = node.x;
          obj.y = node.y;
          obj.parent = node.parent.data.sum;
          obj.percent = (node.data.sum/node.parent.data.sum*100).toFixed(2)+'%';
          console.log(node,obj);
          source.push(obj);
          return node;
        });
        this.setState({source:source});
    })
  }

  componentWillReceiveProps(nextProps){
    this.updateData(nextProps.month);
  }

  componentDidMount(){
    this.updateData(this.state.month);
  }

  render(){
    return (
      <div>
        <h2>工时分布图</h2>
        <Chart  data={this.state.source} forceFit={true} >
          <Coord type='polar' innerRadius={0.3} />
          <Tooltip showTitle={false} />
          <Geom type='polygon' position='x*y' active={false} color={['value', '#BAE7FF-#1890FF-#0050B3']} style={{stroke: '#FFF',lineWidth: 1}} tooltip='label*sum*percent' />
        </Chart>
      </div>
    )
  }

}
