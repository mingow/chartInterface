import React from 'react';
import { DatePicker,Select ,message,Menu,Button,Icon  } from 'antd';
const Option = Select.Option;
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import DepartDataHoursByMonth from './depart-dataHoursByMonth'
import DepartDataCapacityByMonth from './depart-dataCapacityByMonth'
import DepartDataValuesByMonth from './depart-dataValuesByMonth'
import DepartDataHoursByDays from './depart-dataHoursByDays'
import DepartDataCapacityByDays from './depart-dataCapacityByDays'
import DepartDataValueByDays from './depart-dataValueByDays'
import DepartReachGoalByDays from './depart-reachGoalByDays'

export default class MainFrame extends React.Component {

  constructor(props){
    super(props);
    this.state={
      month:"",
      currentLine:"",
      line:[
        {text:"所有",val:"all"},
        {text:"2FA-1",val:"2FA1"},
        {text:"2FB-1",val:"2FB1"},
        {text:"2FB-2",val:"2FB2"},
        {text:"2FC-1",val:"2FC1"},
        {text:"2FC-2",val:"2FC2"},
        {text:"2FC-3",val:"2FC3"}
      ]

    }
  }

  handleChange(val){
    this.setState({currentLine:val});
  }

  render(){
    return (
      <div>
        <div className='floatingBox'>
        当前线别：{this.state.currentLine?this.state.currentLine:"无"}<span>  </span>
        <Select defaultValue="" onChange={this.handleChange.bind(this)} style={{ width: 120 }}>
        {this.state.line.map((item,i)=>(<Option key={i} value={item.val}>{item.text}</Option>))}
        </Select>
          <MonthPicker placeholder="选择月份" />
        </div>
        <DepartDataValuesByMonth currentLine={this.state.currentLine}/>
        <DepartDataHoursByMonth currentLine={this.state.currentLine}/>
        <DepartDataCapacityByMonth currentLine={this.state.currentLine}/>
        <DepartReachGoalByDays currentLine={this.state.currentLine}/>
        <DepartDataHoursByDays currentLine={this.state.currentLine}/>
        <DepartDataCapacityByDays currentLine={this.state.currentLine}/>
        <DepartDataValueByDays currentLine={this.state.currentLine}/>

      </div>
    )
  }

}
