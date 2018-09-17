import React, {Component} from "react"
import PropTypes from "prop-types"
import {Table, MessageBox} from "element-react"
import Calendar from "components/calendar/calendar"
import CommonFunc from "components/global/commonFunc";
import Moment from "moment"
import _ from "lodash"
import "./table.scss"

export default class TableWithEdit extends Component {

  state = {
    data: this.props.data || [],
    columns: this.props.columns || [],
    editingRows: [], // 储存编辑状态的行
    errorFields: [] // 储存报错表单
  }

  componentDidMount () {
    this.setRowQid(this.props)
    this.setColProperty(this.props)
  }

  componentWillReceiveProps (nextProps) {
    if(!_.isEqual(nextProps.data, this.props.data) && this.state.data.length === 0){
      this.setRowQid(nextProps)
    }
    this.setColProperty(nextProps)
  }

  // 若数据没有rowKey且每一行数据不包含qid等唯一字段，随机添加qid, 仅前端使用
  setRowQid = (props) => {
    let data = props.data;
    if (!props.rowKey && !props.data.find(row => row.hasOwnProperty("qid"))) {
      data = _.cloneDeep(props.data)
      data = data.map(row => {
        row.qid = CommonFunc.getRandomId()
        return row
      })
    }
    this.setState({data})
  }

  // 若有type属性，根据type值绑定render属性
  setColProperty = (props) => {
    let columns = _.cloneDeep(props.columns)
    columns.forEach(col => {
      if (!col.render && col.type) col.render = this.renderColumn
    })
    this.setState({columns})
  }

  // 根据不同的type提供预设的组件
  renderColumn = (row, col, index) => {
    // 操作列
    if (col.type === "action") {
      return row.isEditMode
        ? <div className="action">
          <button className="btn-confirm" onClick={() => this.onRowConfirmClick(row, col, index)}>确认</button>
          <button className="btn-cancel" onClick={() => this.onRowCancelClick(row, col, index)}>取消</button>
        </div>
        : <div className="action">
          <button className="btn-edit" onClick={() => this.onRowEditClick(row, col, index)}>编辑</button>
          <button className="btn-delete" onClick={() => this.onRowDeleteClick(row, col, index)}>删除</button>
        </div>
    }
    // 文本输入框
    if (col.type === "input") {
      return row.isEditMode
        ? <input
          className={this.hasError(col, row.qid) ? "error" : ""}
          placeholder={this.hasError(col, row.qid) ? "此项未填" : ""}
          type="text"
          key={`${col.prop} + ${index}`}
          value={row[col.prop] || ""}
          onChange={(e) => this.onChangeWrapper(e, row, col, index)}
        />
        : ( col.extraStr ? col.extraStr.replace("#",(row[col.prop] || "--")) : (row[col.prop] || "--") )
    }
    // 日期选择
    if (col.type === "calendar") {
      return row.isEditMode
        ? <Calendar
          className={this.hasError(col, row.qid) ? "error" : ""}
          placeholder={this.hasError(col, row.qid) ? "此项未填" : "选择日期"}
          value={row[col.prop] ? new Date(row[col.prop]) : null}
          onChange={(e) => this.onChangeWrapper(e, row, col, index)}
          {...col.props}
        />
        : row[col.prop] && Moment(row[col.prop]).isValid() ? Moment(row[col.prop]).format(col.format || "YYYY-MM-DD") : "--"
    }
  }

  // 默认的onChange方法
  onChangeWrapper = (e, row, col, index) => {
    let value
    if (col.type === "input") value = e.target.value
    if (col.type === "select") value = e.value
    if (col.type === "calendar") value = e && Moment(e).format("YYYY-MM-DD")
    let data = _.cloneDeep(this.state.data)
    data[index][col.prop] = value
    this.setState({
      data,
      errorFields: value ? this.removeErrorField(row.qid, col) : this.state.errorFields
    })
    col.onChange && col.onChange(value, row, col, index)
  }

  // 操作列 - 编辑
  onRowEditClick = (row, col, index) => {
    col.onEdit && col.onEdit(row, col, index)
    let data = _.cloneDeep(this.state.data)
    data[index].isEditMode = true
    this.setState({
      data,
      editingRows: [...this.state.editingRows, row]
    })
  }

  // 操作列 - 取消
  onRowCancelClick = (row, col, index) => {
    const cancelAct = () => {
      let beRow = this.state.editingRows.find(editRow => editRow.qid === row.qid)
      col.onCancel && col.onCancel(row, col, index, beRow)
      let data = _.cloneDeep(this.state.data)
      if (beRow) {
        data[index] = beRow
        data[index].isEditMode = false
      } else {
        data.splice(index, 1)
      }
      this.setState({
        data,
        errorFields: this.removeErrorField(row.qid)
      })
      this.removeEditingRow(row)
    }
    this.showMessage("cancel", cancelAct)
  }

  // 操作列 - 删除
  onRowDeleteClick = (row, col, index) => {
    const deleteAct = () => {
      col.onDelete && col.onDelete(row, col, index)
      let data = _.cloneDeep(this.state.data)
      data.splice(index, 1)
      this.setState({data}, this.updateParentData)
    }
    this.showMessage("delete", deleteAct)
  }

  // 操作列 - 确认
  onRowConfirmClick = (row, col, index) => {
    if (!this.isValid(row)) return
    col.onConfirm && col.onConfirm(row, col, index)
    let data = _.cloneDeep(this.state.data)
    data[index].isEditMode = false
    this.setState({data}, this.updateParentData)
    this.removeEditingRow(row)
  }

  // 检查是否所有项都填写完整
  isValid = (row) => {
    let errorFields = [];
    let columns = this.state.columns;
    const fieldChecking = (value, key) => {
      if (value || value === 0) return true
      return false
    }
    const checkNumber = (theObj)=> {
      var reg = /^[0-9]+.?[0-9]*$/;
      if (reg.test(theObj)) {
        return true;
      }
      return false;
    }
    let isValid = true
    _.forEach(columns, (item, index) => {
      if ( (item.prop !== "action" && !fieldChecking(row[item.prop], item.prop))
        || (item.dataType && item.dataType === "number") && !checkNumber(row[item.prop]) ){
        errorFields.push({qid: row.qid, prop: item.prop})
        isValid = false
      }
    })
    this.setState({errorFields: this.state.errorFields.concat(errorFields)})
    return isValid
  }

  hasError = (col, qid) => this.state.errorFields.find(field => field.qid === qid && field.prop === col.prop)

  removeErrorField = (qid, col) => {
    let errorFields = _.cloneDeep(this.state.errorFields)
    if (col) {
      let targetIndex = errorFields.findIndex(field => field.qid === qid && field.prop === col.prop)
      if (targetIndex > 0) errorFields.splice(targetIndex, 1)
    } else {
      errorFields = errorFields.filter(field => field.qid !== qid)
    }
    return errorFields
  }

  // 删除不在编辑状态的行
  removeEditingRow = (row) => {
    let beRowIndex = this.state.editingRows.findIndex(editRow => editRow.qid === row.qid)
    let editingRows = _.cloneDeep(this.state.editingRows)
    editingRows.splice(beRowIndex, 1)
    this.setState({editingRows})
  }

  showMessage = (action, cb) => {
    let msg = action === "cancel" ? "是否确认取消此次编辑？" : "是否确认删除此数据？"
    MessageBox.alert(msg, " ").then(cb).catch(_ => _)
  }

  // 添加新行
  addNewData = () => {
    let newRow = {}
    newRow = this.getColumnProps(this.props.columns)
    newRow.qid = CommonFunc.getRandomId()
    newRow.isEditMode = true
    this.setState({data:[...this.state.data, newRow]})
  }

  // 根据columns来获取新行的对象属性
  getColumnProps = (columns, datas = {}) => {
    if (!columns) return
    return columns.reduce((newData, col) => {
      if (col.prop) {
        newData[col.prop] = ""
        return newData
      }
      if (col.subColumns) {
        let subData = this.getColumnProps(col.subColumns, datas)
        return {...subData}
      }
    }, datas)
  }

  // 更新外部数据
  updateParentData = ()=>{
    let data = _.cloneDeep(this.state.data);
    let newData = data.filter(item => !item.isEditMode)
    this.props.updateData && this.props.updateData(newData)
  }

  render () {
    let total = this.state.data.filter(item => !item.isEditMode).length
    return (
      <div className={`table-with-title table-style-base ${this.props.warpClassName ? this.props.warpClassName : ""}`}>
        <div className="header">
          <div className="title">{this.props.title}{this.props.showTotal && <span className="total-records">（共{total}条记录）</span>}</div>
          <div className="add-new-button" onClick={this.addNewData}>新增</div>
        </div>
        <Table
          {...this.props}
          data={this.state.data}
          columns={this.state.columns}
          rowKey={()=>{return this.props.rowKey || "qid"}}
          border
          emptyText="暂无数据"
        />
      </div>
    )
  }
}

TableWithEdit.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  showTotal: PropTypes.bool,
}
