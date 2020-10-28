import React from 'react';
import './css/App.css';

export default class App extends React.Component {
  state = {
    //正在进行的
    ingList: ["跑步", "今天"],
    //完成的
    okList: [],
  }
  //回车事件
  enter = (e) => {
    //解构
    let { ingList } = this.state
    //判断键值--回车的键值是13
    if (e.keyCode === 13) {
      //判断input是否为空
      if (e.target.value) {
        //添加到正在进行中的数组
        ingList.push(this.refs.ipt.value)//ingList.push(e.target.value)
        //更新数组
        this.setState({ ingList })
        //清空input框
        this.refs.ipt.value = ""// e.target.value = ""
      }
    }
  }
  changeIng = (e, i) => {
    let { okList, ingList } = this.state
    if (e.target.checked) {
      okList.push(ingList.splice(i, 1)[0])
      this.setState({ ingList })
    }
  }
  changeOk = (e, i) => {
    let { okList, ingList } = this.state
    if (!e.target.checked) {
      ingList.push(okList.splice(i, 1)[0])
      this.setState({ ingList, okList })
    }
  }
  remove = (e,i,code)=>{
    let { okList, ingList } = this.state
    console.log(code)
    if(code === 1){
      ingList.splice(i,1)
      this.setState({ ingList })
    }else if(code === 2){
      okList.splice(i,1)
      this.setState({ okList })
    }
  }
  render() {
    let { ingList, okList } = this.state;
    return (
      <div className="dhz">
        <div className="top">
          <h2>ToDoList</h2>
          <input type="text" placeholder="添加ToDo" onKeyDown={(e) => this.enter(e)} ref="ipt" />
        </div>
        <div className="bottom">
          <div className="ing">
            <h2>正在进行</h2><span>{ingList.length}</span>
            {
              ingList.map((item, i) => {
                return (
                <p key={i}>
                  <input type="checkbox" checked={false} onChange={(e) => this.changeIng(e, i)} id={i} />
                  <label htmlFor={i}>{item}</label>
                  <b className="remove" onClick={(e) => this.remove(e, i,1)}>X</b>
                </p>
                )
              })
            }
            {/* <p><input type="checkbox" id="1" /><label for="1">aaaa</label></p>*/}
          </div>
          <div className="ok">
            <h2>已经完成</h2><span>{okList.length}</span>
            {
              okList.map((item, i) => {
                return (
                <p key={i}>
                  <input type="checkbox" checked={true} onChange={(e) => this.changeOk(e, i)} id={i + "a"} />
                  <label htmlFor={i + "a"}>{item}</label>
                  <b className="remove" onClick={(e) => this.remove(e, i,2)}>X</b>
                </p>
                )
              })
            }
            {/* <p><input type="checkbox" id="2" /><label for="2">aaaa</label></p> */}
          </div>
        </div>
      </div>
    )
  }
}