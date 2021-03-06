import React, { Component } from 'react';

class PhoneInfo extends Component {
  static defaultProps = {
    info: {
      name: 'Name',
      phone: '010-0000-0000',
      id: 0
    }
  }

  state = {
    editing: false,
    name: '',
    phone: '',
  }

  handleRemove = () => {
    // when remove button clicked , call onRemove with id
    const { info, onRemove } = this.props;
    onRemove(info.id);
  }
 
  handleToggleEdit = () => {
    const { editing } = this.state;
    this.setState({ editing: !editing });
  }

  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  }

  componentDidUpdate(prevProps, prevState) {

    const { info, onUpdate } = this.props;
    if(!prevState.editing && this.state.editing) {
    
      this.setState({
        name: info.name,
        phone: info.phone
      })
    }

    if (prevState.editing && !this.state.editing) {
    
      onUpdate(info.id, {
        name: this.state.name,
        phone: this.state.phone
      });
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
   
    if (!this.state.editing  
        && !nextState.editing
        && nextProps.info === this.props.info) {
      return false;
    }
   
    return true;
  }
  
  render() {
    console.log('render PhoneInfo -----------' + this.props.info.id);

    const style = {
      border: '1px solid green',
      padding: '8px',
      margin: '8px'
    };

    const { editing } = this.state;

    
    if (editing) { // modify mode
      return (
        <div style={style}>
          <div>
            <input
              value={this.state.name}
              name="name"
              placeholder="Name"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <input
              value={this.state.phone}
              name="phone"
              placeholder="PhoneNumber"
              onChange={this.handleChange}
            />
          </div>
          <button onClick={this.handleToggleEdit}>Apply</button>
          <button onClick={this.handleRemove}>Remove</button>
        </div>
      );
    }


    // normal mode
    const {
      name, phone
    } = this.props.info;
    
    return (
      <div style={style}>
        <div><b>{name}</b></div>
        <div>{phone}</div>
        <button onClick={this.handleToggleEdit}>Modify</button>
        <button onClick={this.handleRemove}>Remove</button>
      </div>
    );
  }
}

export default PhoneInfo;