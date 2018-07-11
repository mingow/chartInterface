import React from 'react';
import { DatePicker } from 'antd';
const { MonthPicker, RangePicker, WeekPicker } = DatePicker;
import DepartDataHoursByMonth from './depart-dataHoursByMonth'
import DepartDataCapacityByMonth from './depart-dataCapacityByMonth'
export default class MainFrame extends React.Component {

  render(){
    return (
      <div>
        <div className='floatingBox'><MonthPicker placeholder="Select month" /></div>
        <DepartDataHoursByMonth/>
        <DepartDataCapacityByMonth/>
      </div>
    )
  }

}
