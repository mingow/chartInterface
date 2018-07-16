import React from 'react';
import { Chart, Geom, Axis, Tooltip, Coord, Label, Legend, View, Guide, Shape, Facet, Util } from 'bizcharts';
import { DataSet } from '@antv/data-set';

export default class DepartDataHoursByDays extends React.Component {
  constructor(props){
    super(props);
    this.state={
      cols: {
        day: {
          type: 'cat',
          values: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六' ]
        },
        week: {
          type: 'cat'
        },
        val: {
          sync: true
        },
        p: {
          type: 'linear',
          min: 0,
          max: 100,
          sync: true,
          alias: '效率',

        }
      },
      rawData:[],
      info:{},
      currentLine:'all'
    }
  }

  componentWillReceiveProps(nextProps){
    this.updateData(nextProps.currentLine);
    this.setState({currentLine:nextProps.currentLine,info:nextProps.info});
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
    for(var p in rawData){
      rawData[p]['commits']=parseFloat(rawData[p]['commits']);
      rawData[p]['p']=parseFloat(rawData[p]['p']);
      rawData[p]['value']=parseFloat(rawData[p]['value']);
      rawData[p]['day']=parseFloat(rawData[p]['day']);
      rawData[p]['month']=parseFloat(rawData[p]['month']);
    }
    this.setState({rawData:rawData});
  })
  .catch(error => console.log('error is', error));
  }

  componentDidMount(){
    Shape.registerShape('polygon', 'boundary-polygon', {
      draw(cfg, container) {
        if (!Util.isEmpty(cfg.points)) {
          const attrs = {
            stroke: '#fff',
            lineWidth: 1,
            fill: cfg.color,
            fillOpacity: cfg.opacity
          };
          const points = cfg.points;
          const path = [
            [ 'M', points[0].x, points[0].y ],
            [ 'L', points[1].x, points[1].y ],
            [ 'L', points[2].x, points[2].y ],
            [ 'L', points[3].x, points[3].y ],
            [ 'Z' ]
          ];
          attrs.path = this.parsePath(path);
          const polygon = container.addShape('path', {
            attrs
          });

          if (cfg.origin._origin.lastWeek) {
            const linePath = [
              [ 'M', points[2].x, points[2].y ],
              [ 'L', points[3].x, points[3].y ],
            ];
            // 最后一周的多边形添加右侧边框
            container.addShape('path', {
              zIndex: 1,
              attrs: {
                path: this.parsePath(linePath),
                lineWidth: 1,
                stroke: '#404040'
              }
            });
            if (cfg.origin._origin.lastDay) {
              container.addShape('path', {
                zIndex: 1,
                attrs: {
                  path: this.parsePath([
                    [ 'M', points[1].x, points[1].y ],
                    [ 'L', points[2].x, points[2].y ],
                  ]),
                  lineWidth: 1,
                  stroke: '#404040'
                }
              });
            }
          }
          container.sort();
          return polygon;
        }
      }
    });
    this.updateData();
  }

  render(){
    return(
      <div>
        <h2>人均产值热力图</h2>
        <Chart height={300} data={this.state.rawData} scale={this.state.cols} forceFit >
          <Tooltip title='date' />
          <Axis name='day' grid={null} />
          <Geom type='polygon' position="week*day*date" shape='boundary-polygon' color={['p', '#F51D27-#FA541C-#FFBE15-#FFF2D1-#E3F6FF-#85C6FF-#0086FA-#0A61D7']} color={['p', (p)=>{
        	//some code
            var trans = p - this.state.info[0].goal;
            var R=0,G=0,B=0;
            if(trans > 0 ){
              B=255;
              R=-4.25*2*trans+240;
              G=-1.6167*2*trans+240;
            }else{
              R=255;
              G=B=4.25*trans+240;
            }
            return 'rgb('+R.toString()+','+G.toString()+','+B.toString()+')'
	}]}/>
          <Coord reflect='y' />
        </Chart>
      </div>

    )
  }

}
