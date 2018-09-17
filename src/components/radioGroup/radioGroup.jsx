import React, {Component} from "react"
import PropTypes from "prop-types"
import "./radioGroup.scss"

export default class RadioGroup extends Component {

  state = {
    options: this.props.options
  }

  onRadioClick = (option) => {
    let options = [...this.state.options]
    options.forEach(opt => {
      opt.checked = opt.value === option.value ? !opt.checked : false
    })
    this.props.onChange && this.props.onChange(options)
    this.setState({options})
  }

  render () {
    return (
      <div className={`radio-group-container ${this.props.className}`}>
        {this.state.options.map(option => (
          <div key={option.value} onClick={() => this.onRadioClick(option)} className="radio-container">
            <span className={`radio-button ${option.checked ? "checked" : ""}`} />
            <span className="radio-label">{option.label}</span>
          </div>
        ))}
      </div>
    )
  }
}

RadioGroup.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    checked: PropTypes.bool
  })).isRequired,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string, PropTypes.bool]),
  onChange: PropTypes.func,
  className: PropTypes.string
}

RadioGroup.defaultProps = {
  options: []
}
