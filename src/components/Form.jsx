import React, { Component } from "react";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      value: "",
      checkedItems: new Map(),
      buttonClassName: "form-button"
    };
    this.descRef = React.createRef();
    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(value) {
    this.setState({ value });
  }

  handleCheckboxChange(item) {
    const curState = this.state.checkedItems.get(item);
    const nextState = (curState !== undefined) ? !curState : true;
    this.setState((prevState) => ({ checkedItems: prevState.checkedItems.set(item, nextState) }));
  }

  handleSubmit(e) {
    e.preventDefault();

    // this.setState({ buttonClassName: "form-button fade-out-left" });
    if (this.descRef.current) {
      this.descRef.current.blur();
    }
    if (this.props.type !== "checkbox") {
      this.props.onSubmit(this.state.value);
    } else {
      this.props.onSubmit(Array.from(new Map([...this.state.checkedItems].filter((arr) => arr[1] === true)).keys()).join(", "));
    }
  }

  componentDidMount() {
    // console.log(this.props.options);
  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  render() {
    return (
      <form onSubmit={(e) => this.handleSubmit(e)} className="form-page">
        <div className="form-div">
          <span className="form-label">{this.props.question} {(this.props.required === true) ? <>*</> : null}</span>

          {/* Input Options */}
          {
            (this.props.type === "text" || this.props.type === "email")
              ? <input className="form-input" type={this.props.type} onChange={(e) => this.onChange(e.target.value)} required={this.props.required} ref={this.descRef} placeholder={this.props.placeholder}/>
              : (this.props.type === "radio" && this.props.options !== undefined)
                ? this.props.options.map((item) => <div key={item} >
                  <input type={this.props.type} value={item} checked={this.state.value === item} name="options" required={this.props.required}/>
                  <label onClick={() => this.onChange(item)}>{item} </label>
                </div>)
                : (this.props.type === "checkbox" && this.props.options !== undefined)
                  ? this.props.options.map((item) => <div key={item} >
                    <input type={this.props.type} name={item} checked={this.state.checkedItems.get(item)}/>
                    <label onClick={() => this.handleCheckboxChange(item)}>{item}</label>
                  </div>)
                  : null
          }

          {/* Navigation Buttons */}
          <div className="form-options" style={{ marginTop: "0.5em" }}>
            {
              (this.props.stage !== "first")
                ? <a href="#" className={this.state.buttonClassName} onClick={() => this.props.back()} >Back</a>
                : <div></div>
            }
            {
              (this.props.stage !== "last")
                ? <button type="submit" className={this.state.buttonClassName} >Next</button>
                : <button type="submit" className="form-button" >Submit</button>
            }
          </div>
        </div>
      </form>
    );
  }
}

export default Form;
