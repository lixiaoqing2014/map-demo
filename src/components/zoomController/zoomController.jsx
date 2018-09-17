import React, { Component } from "react"
import {Slider} from "element-react"
import ZoomInIcon from "image/zoom_in@2x.png"
import ZoomOutIcon from "image/zoom_out@2x.png"
import "./zoomController.scss"

export default class ZoomController extends Component {

  componentDidMount() {
    // 监听地图滑块滑动事件
    let MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    let target = document.querySelector(".el-slider__button-wrapper");
    this.observer = new MutationObserver(mutations => {
      mutations.forEach(mutation => {
        if (mutation.target.style.bottom === "0%") {
          this.props.onChange && this.props.onChange(this.props.min)
        }
      });
    });
    this.observer && this.observer.observe(target, {attributes: true, attributeFilter: ["style"]});
  }

  componentWillUnmount() {
    this.observer && this.observer.disconnect();
  }

  // 放大缩小的滑块移动触发事件
  zoomBySlider = (zoom) => {
    if (this.isZoominClick || this.isZoomoutClick) {
      this.isZoominClick = false
      this.isZoomoutClick = false
      return
    }
    const {max, min, value, step, onChange} = this.props
    if (zoom > max) zoom = max
    if (zoom <= min + step) zoom = min
    onChange && onChange(zoom)
  }

  // 放大缩小按钮的点击事件
  zoomByBtn = (isEnLager) => {
    const {max, min, value, step, onChange} = this.props
    this.isZoominClick = isEnLager
    this.isZoomoutClick = !isEnLager
    let zoom = isEnLager ? value + step : value - step
    if (zoom === max + step || zoom === min - step) return
    if (zoom > max) zoom = max
    if (zoom < min) zoom = min
    onChange && onChange(zoom)
  }

  render () {
    return (
      <div className="map-slider">
        <img src={ZoomInIcon} alt="放大" className="large" onClick={() => this.zoomByBtn(true)} />
        <Slider
          vertical={true}
          height="1.5rem"
          value={this.props.value}
          min={this.props.min}
          max={this.props.max}
          onChange={this.zoomBySlider}
          step={this.props.step}
        />
        <img src={ZoomOutIcon} alt="缩小" className="small" onClick={() => this.zoomByBtn(false)} />
      </div>
    )
  }
}