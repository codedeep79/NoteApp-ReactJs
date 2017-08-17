"use strict"


var Note = React.createClass({
    delete(){
        $.post('/delete', {idDelete: this.props.id}, (data) => {
            list.setState({mobile: data});
        });
    },
    update(){
        this.setState({onEdit: true});
    },
    cancel(){
        this.setState({onEdit: false});
    },
    save(){
        var that = this;
        $.post("/update", {idUpdate: this.props.id
                , content: this.refs.txtEditProgramming.value}, (data) => {  
                list.setState({mobile: data});
                that.setState({onEdit: false});
        });
    },
    getInitialState(){
        return {onEdit: false}
    },
    render: function(){
        if (this.state.onEdit){
            return(
                <div className="note">
                    <input type="text" defaultValue={this.props.children} ref="txtEditProgramming"/>
                    <button onClick={this.cancel}>Cancel</button>
                    <button onClick={this.save}>Save</button>
                </div>
            )
        }
        else
        {
            return(
                <div className="note">
                    <h1>{this.props.children}</h1>
                    <button onClick={this.delete}>Delete</button>
                    <button onClick={this.update}>Update</button>
                </div>
            )
        }
        
    }
});

function addDiv(){
    ReactDOM.render(<InputButton/>, document.getElementById("div-add"));
}

var list;
var List = React.createClass({
    getInitialState(){
        list = this;
        return {mobile: []}
    },
    render: function(){
        return(

            <div>
                <div id="div-add"></div>
                <button onClick={addDiv}>Thêm NNLT</button>
                {
                    this.state.mobile.map((note, index) => {
                        return (<Note key={index} id={index}>{note}</Note>)
                    })
                }
            </div>
        )
    },
    componentDidMount(){
        var that = this;
        $.post("/get-note", (data) => {
            this.setState({mobile: data});
        });
    }
});

var InputButton = React.createClass({
    add() {
        // Lấy list là một đối tượng trong List trỏ tới thuộc tính mobile để thêm dữ liệu
        //list.setState({mobile: list.state.mobile.concat(this.refs.txtProgramming.value)});

        // Dữ liệu gửi lên server rồi lấy về
        $.post("/add", {note: this.refs.txtProgramming.value}, (data) => {
            list.setState({mobile: data});
        });
        ReactDOM.unmountComponentAtNode(document.getElementById("div-add"));
    },
    render: function(){
        return(
            <div>
               <input type="text" ref="txtProgramming" placeholder="Enter Your Programming..."/>
               <button onClick={this.add}>Add Programming</button>
            </div>
        )
    }
});
ReactDOM.render(
    <div className="list">
        <List/>
    </div>,
     document.getElementById("root")
);