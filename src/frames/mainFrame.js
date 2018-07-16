import React from 'react';
import { DatePicker,Select ,message,Menu,Button,Icon,Layout,Row, Col   } from 'antd';
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import DepartDataHoursByMonth from './depart-dataHoursByMonth'
import DepartDataCapacityByMonth from './depart-dataCapacityByMonth'
import DepartDataValuesByMonth from './depart-dataValuesByMonth'
import DepartDataHoursByDays from './depart-dataHoursByDays'
import DepartDataCapacityByDays from './depart-dataCapacityByDays'
import DepartDataValueByDays from './depart-dataValueByDays'
import DepartReachGoalByDays from './depart-reachGoalByDays'
import DepartDataLineEfficiencyGoalByYears from './depart-dataLineEfficiencyGoalByYears'
import DepartDataHoursCircleByMonth from './depart-dataHoursCircleByMonth'

export default class MainFrame extends React.Component {

  constructor(props){
    super(props);
    this.state={
      month:"",
      currentLine:"all",
      line:[
        {text:"所有",val:"all",goal:60},
        {text:"2FA-1",val:"2FA1",goal:55.5},
        {text:"2FB-2",val:"2FB2",goal:48},
        {text:"2FC-1",val:"2FC1",goal:59},
        {text:"2FC-2",val:"2FC2",goal:86},
        {text:"2FC-3",val:"2FC3",goal:66}
      ]

    }
  }

  handleChange(val){
    this.setState({currentLine:val});
  }

  onChange(date, dateString) {
    this.setState({month:dataString});
  }

  render(){
    return (
      <div>
        <div className='floatingBox'>
          当前线别：{this.state.currentLine?this.state.currentLine:"无"}<span>  </span>
          <Select defaultValue="" onChange={this.handleChange.bind(this)} style={{ width: 120 }}>
          {this.state.line.map((item,i)=>(<Option key={i} value={item.val}>{item.text}</Option>))}
          </Select>
          <MonthPicker onChange={this.onChange.bind(this)} placeholder="选择月份" />
        </div>
        <Row>
          <Col span={8}><DepartDataValuesByMonth currentLine={this.state.currentLine}/></Col>
          <Col span={8}><DepartDataHoursByMonth currentLine={this.state.currentLine}/></Col>
          <Col span={8}><DepartDataCapacityByMonth currentLine={this.state.currentLine}/></Col>
        </Row>
        <Row>
          <Col span = {12}><DepartDataLineEfficiencyGoalByYears currentLine={this.state.currentLine}/></Col>
          <Col span = {12}><DepartDataHoursCircleByMonth /></Col>
        </Row>
        <Row>
          <Col span = {24}><DepartReachGoalByDays currentLine={this.state.currentLine}/></Col>
        </Row>
        <Row>
          <Col span = {24}>
            <DepartDataValueByDays currentLine={this.state.currentLine} info={this.state.line.filter((item)=>{
              if(item.val==this.state.currentLine){
                return true;
              }
              return false;
            })}/>
          </Col>
        </Row>



      </div>
    )
  }

}
