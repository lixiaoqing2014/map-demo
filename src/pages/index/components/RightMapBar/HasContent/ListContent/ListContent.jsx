import React,{Component} from "react";
import "element-theme-default";
import {Table} from "element-react"
class ListContent extends Component{
    constructor(){
        super();
        this.state = {
            columns: [
                {
                    label: "排名",
                    prop: "rank",
                },
                {
                    label: "控制点",
                    prop: "control",
                },
                {
                    label: "空气质量等级",
                    prop: "Airlevel"
                },
                {
                    label: "AQI",
                    prop: "AQI"
                },{
                    label: "查看污染源",
                    prop: "viewpollution"
                }
            ],
            data: [{
                rank: "1",
                control: "深圳工业大学",
                Airlevel: "A",
                AQI:"YUjjkj",
                viewpollution:"jkjfldsjfl"

            }, {
                rank: "2",
                control: "深圳工业大学",
                Airlevel: "A",
                AQI:"YUjjkj",
                viewpollution:"jkjfldsjfl"

            },{
                rank: "3",
                control: "深圳工业大学",
                Airlevel: "A",
                AQI:"YUjjkj",
                viewpollution:"jkjfldsjfl"

            }]
        }

    }
 
    render(){

        return (
            <Table
                style={{width: "100%"}}
                columns={this.state.columns}
                maxHeight={320}
                data={this.state.data} onRowClick={(row,event,column)=>{
                    console.log(row,event,column)
            }}
            />
        )

    }


}
export default ListContent;
