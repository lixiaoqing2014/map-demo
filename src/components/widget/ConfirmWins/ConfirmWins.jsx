  
import React from "react";  
import "./ConfirmWins.css";
// import { Link } from 'react-router';  
  
class ConfirmWins extends React.Component {  
  constructor(props) {  
    super(props);
    this.state = {
      
    }  
  }  
  
  render() {  
    const messageConfirm = {  
      title: "短信关联",  
      desc: "2018-05-02 9:00 最新短信已发送至手机端", 
      contacts: "短信联系人 :",

      messageDetails:[
        {region:"滁州市",name1:"赵小敏",telephone1:"13816782280",name2:"钱明",telephone2:"15716779890"},
        {region:"明光市",name1:"徐开阳",telephone1:"13816789080",name2:"姜前",telephone2:"15716233390"},
        {region:"凤阳县",name1:"刘丰盛",telephone1:"13822300092",name2:"",telephone2:""},
        {region:"来安县",name1:"黄翠娥",telephone1:"13037899080",name2:"",telephone2:""},
        {region:"定远县",name1:"龚流芳",telephone1:"13912408900",name2:"",telephone2:""},
        {region:"全椒县",name1:"柳风",telephone1:"13203029800",name2:"",telephone2:""},
        {region:"天长市",name1:"胡策娥",telephone1:"13143590049",name2:"",telephone2:""},
      ],

      leftBtn: {  
        text: "返回"  
      },  
      rightBtn: {  
        text: "保存"  
      }  
    };   
    return (  
      <div className="confirm-wins-container">  
        <div className="wins">  
          <div className="title text-center">{messageConfirm.title}</div>  
          <div className="desc gray-text96">{messageConfirm.desc}</div> 
          <div className="slice-line"></div>
          <div className="contacts">{messageConfirm.contacts}</div>
          <div className="content">
            <div className="table">
              <div className="table-header">
                <div className="region th">地区</div>
                <div className="name1 th">姓名</div>
                <div className="telephone1 th">电话</div>
                <div className="operator1 th"></div>
                <div className="name2 th">姓名</div>
                <div className="telephone2 th">电话</div>
                <div className="operator2 th"></div>
              </div>
              {
                messageConfirm.messageDetails.map((item, index) => {
                  return (
                    <div className="table-row">
                      <div className="region">{item.region}</div>
                      <div className="name1">{item.name1}</div>
                      <div className="telephone1">{item.telephone1}</div>
                      {
                        index < 2 ? (
                          <div className="operator1"></div>
                        ) : (
                          <div className="operator1"><i className="el-icon-plus"></i></div>
                        )
                      }
                      <div className="name2">{item.name2}</div>
                      <div className="telephone2">{item.telephone2}</div>
                      <div className="operator2"></div>
                    </div>
                  )
                })
              }
            </div>
          </div>



          <div className="fn-btn text-center">  

            <div className="messagesetup">短信提醒设置: </div>

            <div className="overproof">  
              <label>排污超标
                <input
                  name="overProof"
                  type="checkbox"
                  // checked={this.state.isGoing}
                  // onChange={this.handleInputChange} 
                />
              </label>               
            </div>


            <div className="expiryoutage">  
              <label>停运到期
                <input
                  name="expiryOutage"
                  type="checkbox"
                  // checked={this.state.isGoing}
                  // onChange={this.handleInputChange} 
                />
              </label>               
            </div>


            {messageConfirm.leftBtn?<span className="btn left-btn clickable" onClick={this.props.onLeftClick}>{messageConfirm.leftBtn.text}</span>:""}  
            <span className="btn right-btn clickable" onClick={this.props.onRightClick}>{messageConfirm.rightBtn.text}</span>  
          </div>  
        </div>  
      </div>  
    );  
  }  
}  
  
ConfirmWins.propTypes = {  
  // title: React.PropTypes.string.isRequired,  
  // desc: React.PropTypes.string.isRequired,  
  // leftBtn: React.PropTypes.object,  
  // rightBtn: React.PropTypes.object.isRequired,  
  // onLeftClick: React.PropTypes.func,  
  // onRightClick: React.PropTypes.func.isRequired,  
};  
  
export default ConfirmWins;