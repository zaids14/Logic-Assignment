import React, { Component } from 'react';
import './App.css'

class App extends Component {
  constructor(props){
    super(props);
    this.state={ 
    file:[],
    Info:'',
    cards:[],
    allChecked:false,
    value:[],
    fileName:'',
    extension:'',
    sizeValue:'',
    typeValue:'',
    id :0,
    cardopen:false,
    selectedItem:Number,
    Editlist:[],
    cardupdate:false,
    upatename:''
    }; 
    this.onSort = this.onSort.bind(this)
  }


  handleInfo = (event) =>{
    this.setState({
      Info:event.target.value
    });

  }

  onhandleupload = (event) =>{
    this.setState({fileName: event.target.files[0].name});
    this.setState({extension: event.target.files[0].name.split('.').pop()})
    this.setState({sizeValue: Math.ceil((event.target.files[0].size)/1024)});
    this.setState({typeValue:event.target.files[0].name.split('.').pop()})
}

 
onCheck(index,id) {
  let box = this.state.value.map((item,index1) => {
    if(index === index1)
    {
      return (item.allChecked=!item.allChecked)
    }
  })
  this.setState({
    allChecked : box,
    index : index,
    selectedItem : parseInt(id)
  })
}  


handleAllChecked = () => {
  let values = this.state.value.map((item)=> {
    return(item.allChecked = true);
  });
  this.setState({ allChecked: values });
};


DeSelectAll=() => {
  let values1 = this.state.value.map((item)=> {
    return(item.allChecked = false);
  });
  this.setState({allChecked : values1})
  }


  addNewItem = () => {
    let data = [...this.state.value,{
      id:this.state.id,
      info:this.state.Info, 
      name :this.state.fileName,
      extension :this.state.extension,
      type :this.state.typeValue,
      size :this.state.sizeValue, 
      allChecked:false
     }]
     this.setState({id: this.state.id+1})
     this.setState({value:data},()=>{console.log(this.state.value);}) 
  };

    Cancel = () => {  
    this.setState({cardopen: !this.state.cardopen})
    }

    updateItem = () =>{
      let data = this.state.value.map((item)=> {
         if(item.allChecked === true){
          return({id:this.state.id,
            info:this.state.Info, 
            name :this.state.fileName,
            extension :this.state.extension,
            type :this.state.typeValue,
            size :this.state.sizeValue, 
            allChecked:false} )
         }
     }) 
     this.setState({id: this.state.id+1})
     this.setState({value:data}) 
  }

  // compareBy(key) {
  //   return function (a, b) {
  //     if (""+a[key]<(""+b[key])) return -1;
  //     if (""+a[key]>(""+b[key])) return 1;
  //     return 0;
  //   };}
    
  //   onSort(key) {
  //   let arrayCopy = [...this.state.value];
  //   arrayCopy.sort(this.compareBy(key));
  //   //arrayCopy.reverse(); for descending
  //   this.setState({value: arrayCopy});
  //   } 

  onSort= () => {
    const { data } = this.state;
    this.state.value.sort((a, b) => a - b)    
    this.setState({ data })
  }
  

  delete = ()=> {
    const currentTaskArray =this.state.value;
    console.log(this.state.selectedItem)
    const taskAfterDeleted = currentTaskArray.filter(
      deletedTask => deletedTask.id !== this.state.selectedItem 
    );
    console.log(taskAfterDeleted)
    this.setState({
      value: taskAfterDeleted
    });
  }

  handleedit=()=>{
    this.setState({cardupdate:true})
    this.state.value.map((item)=>{
      this.setState({upatename:item.info});
    })
  }

  render() { 
    return (
      <div>
        <><><div className="card-button">
      <button className="cbtn" onClick={()=>{this.setState({cardopen:true})}}>Add a Card</button>
    </div>
    {this.state.cardopen && 
    <div className="Card">
      <div>
        <label className="fname">Info:</label>&nbsp;&nbsp;
        <input className="card1" type="text" name='Info'  onChange={this.handleInfo} /><br /><br />
          <label className="file">File:</label>&nbsp;&nbsp;
          <input type="file" onChange={this.onhandleupload}/><br /><br />
        <div className="button">
          <button className="s-btn"  onClick={this.addNewItem}>Save</button>&nbsp;&nbsp;
          <button className="c-btn"  onClick={() => this.Cancel()}> Cancel</button>

        </div>
      </div>
    </div>
  }

  {/* update card */}

  {this.state.cardupdate && 
    <div className="Card">
      <div>
        <label className="fname">Info:</label>&nbsp;&nbsp;
        <input className="card1" type="text" name='Info' placeholder={this.state.upatename} onChange={this.handleInfo} /><br /><br />
          <label className="file">File:</label>&nbsp;&nbsp;
          <input type="file" onChange={this.onhandleupload}/><br /><br />
        <div className="button">
          <button className="s-btn"  onClick={this.updateItem}>Update</button>&nbsp;&nbsp;
          <button className="c-btn"  onClick={() => this.Cancel()}> Cancel</button>

        </div>
      </div>
    </div>
  }

      </><br/>
      <table>
        <thead>
          <tr>
          <th></th>
        <th onClick={()=>this.onSort('info')}>Info</th>
        <th onClick={()=>this.onSort('fileName')}>Filename </th>
        <th onClick={()=>this.onSort('extension')}>Extension</th>
        <th onClick={()=>this.onSort('type')}> Type </th>
        <th onClick={()=>this.onSort('size')}> Size</th>
        </tr>
        </thead>
        <tbody>
        {this.state.value.map((item,index) => {
          return(
           <tr key={index}>  
          <td><input type="checkbox"  checked={item.allChecked} onChange={() => this.onCheck(index,item.id)} /></td>
          <td>{item.info}</td>
          <td>{item.name}</td>
          <td>{item.extension}</td>
          <td>{item.type}</td>
          <td>{item.size}</td>

          </tr>
          )
        })}
        </tbody>
      </table><br/>
      
      <div className="button">
            <button className="w-btn"  value="checkbox" onClick={this.handleAllChecked}>Select All</button>&nbsp;
            <button className="x-btn" value="checkbox" onClick={this.DeSelectAll}>DeSelect All</button>&nbsp;
            <button className="y-btn"  onClick={this.delete}>Delete</button>&nbsp;
            <button className="z-btn" onClick={this.handleedit}> Edit</button>
          </div>
      </>
      </div>
    );
    
  }
}
export default App;

