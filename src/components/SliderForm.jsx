import React, { Component } from "react";
import Carousel from "@brainhubeu/react-carousel";
import Form from "./Form.jsx";
import EndCard from "./EndCard.jsx";
import "../styles/carousel.css";
import "../styles/form.css";

const baseURL = "https://script.google.com/macros/s/AKfycbw005Y9fSczZOvRaboqdmkCkf6kp9Xib0mfNBSOMPU3BfiUzrF7RAItjx7Ugqgjnd0r7w/exec";

class SliderForm extends Component {
  constructor() {
    super();
    this.state = {
      v0: "",
      v1: "",
      v2: "",
      v3: "",
      v4: "",
      v5: "",
      v6: "",
      v7: "",
      formLocation: 0,
      loading: true,
      pageCount: 9,
      result: ""
    };
    this.onChange = this.onChange.bind(this);
    this.updateV1 = this.updateV1.bind(this);
    this.evalStage = this.evalStage.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this._getProgress = this._getProgress.bind(this);
  }

  onChange(value) {
    this.setState({ formLocation: value });
  }

  handleBack() {
    this.setState({ formLocation: this.state.formLocation - 1 });
  }

  updateV1(value) {
    this.setState({ v1: value });
  }

  evalStage(stage, value) {
    if (stage === 0) {
      this.setState({ formLocation: this.state.formLocation + 1 });
    } else if (stage === 1) {
      this.setState({ v0: value, formLocation: this.state.formLocation + 1 });
    } else if (stage === 2) {
      this.setState({ v1: value, formLocation: this.state.formLocation + 1 });
    } else if (stage === 3) {
      this.setState({ v2: value, formLocation: this.state.formLocation + 1 });
    } else if (stage === 4) {
      this.setState({ v3: value, formLocation: this.state.formLocation + 1 }, this.handleSubmit);
    // } else if (stage === 5) {
    //   this.setState({ v4: value, formLocation: this.state.formLocation + 1 });
    // } else if (stage === 6) {
    //   if (value === "Yes") {
    //     this.setState({ v5: value, formLocation: this.state.formLocation + 1, pageCount: 10 });
    //   } else {
    //     this.setState({ v5: value, formLocation: this.state.formLocation + 1, pageCount: 9 });
    //   }
    // } else if (stage === 7) {
    //   this.setState({ v6: value, formLocation: this.state.formLocation + 1 });
    // } else if (stage === 8) {
    //   this.setState({ v7: value, formLocation: this.state.formLocation + 1 }, this.handleSubmit);
    }
  }

  handleSubmit() {
    this.sendFormData((data) => {
      this.setState({ loading: false, result: data.result });
    });
    // setTimeout(() => {
    //   this.setState({ loading: false, result: "success" });
    // }, 10);
  }

  sendFormData(cb) {
    return fetch(`${baseURL}?v0=${this.state.v0}&v1=${this.state.v1}&v2=${this.state.v2}&v3=${this.state.v3}&v4=${this.state.v4}&v5=${this.state.v5}&v6=${this.state.v6}&v7=${this.state.v7}`)
      .then((response) => response.json())
      .then((result) => cb(result));
  }

  handleKeyPress(e) {
    console.log(e);
  }

  componentDidMount() {

  }

  componentDidUpdate() {

  }

  componentWillUnmount() {

  }

  _getProgress() {
    return `${((this.state.formLocation + 1) / this.state.pageCount) * 100}%`;
  }

  render() {
    return (
      <div>
        <span className="page-progress" style={{ width: this._getProgress() }}></span>
        <Carousel
          onKeyPress={(e) => this.handleKeyPress(e) }
          value={this.state.formLocation}
          onChange={this.onChange}
          draggable={false}
          style={{ justifyContent: "left" }}
        >
          <EndCard
            loading={false}
            title="Welcome!"
            content="We are excited to have you onboard! Just a quick form for you to get started!"
            stage="home"
            subcaption="Let's go!"
            onSubmit={() => this.evalStage(0, null)}
            back={this.handleBack}
          />
          <Form
            question="Hello, what is your name?"
            type="text"
            required={true}
            onSubmit={(value) => this.evalStage(1, value)}
            placeholder="Enter your name"
            back={this.handleBack}
          />
          <Form
            question={`Welcome ${this.state.v0}, please help us with your email address. (No spamming, promise)`}
            type="email"
            required={true}
            onSubmit={(value) => this.evalStage(2, value)}
            placeholder="user@domain.com"
            back={this.handleBack}
          />
          <Form
            question="What do you currently do?"
            type="radio"
            options={["School Student", "Undergraduate Student (B.Tech, B.E., B.A., M.B.B.S., etc.)", "Graduate Student (M.S., M.B.A., research roles, etc.)", "Graduated (doing a job, looking for a job, etc.)"]}
            required={true}
            onSubmit={(value) => this.evalStage(3, value)}
            back={this.handleBack}
          />
          <Form
            question="That's great! What is the name of the last college you attended or are currently attending? (e.g. IIT Hyderabad, BITS Pilani, NIT Trichy)"
            type="text"
            required={false}
            onSubmit={(value) => this.evalStage(4, value)}
            placeholder="Enter college name"
            back={this.handleBack}
            stage="last"
          />
          {/* <Form
            question="Thanks a lot. Could you send us the link of your LinkedIn profile? (Type NA if not applicable)"
            type="text"
            required={false}
            onSubmit={(value) => this.evalStage(5, value)}
            placeholder="linkedin.com/in/user"
            back={this.handleBack}
          /> */}
          {/* <Form
            question="All set. Have you ever thought of availing any career counseling services?"
            type="radio"
            options={["Yes", "No"]}
            required={true}
            onSubmit={(value) => this.evalStage(6, value)}
            back={this.handleBack}
          />
          {
            (this.state.v5 === "Yes")
              ? <Form
                question="Have you ever availed any career counseling services in the past?"
                type="radio"
                options={["Yes", "No"]}
                required={true}
                onSubmit={(value) => this.evalStage(7, value)}
                back={this.handleBack}
              />
              : null
          } */}
          {/* <Form
            question="Thanks! What are you likely to search on Google? (XYZ is any career domain like Software Development, Investment Banking, Consulting, etc.) (You can select multiple options)"
            type="checkbox"
            options={
              [
                "\"What are all the career domains I can pursue?\"",
                "\"What are the requirements to pursue a career in XYZ?\"",
                "\"Am I eligible to apply for XYZ?\"",
                "\"Online Courses on XYZ\"",
                "\"Job Listings in XYZ\""
              ]
            }
            required={false}
            onSubmit={(value) => this.evalStage(8, value)}
            back={this.handleBack}
            stage="last"
          /> */}
          <EndCard
            loading={this.state.loading}
            result={this.state.result}
            title="Thank you!"
            content="Look out for our beta annoucement/access pretty soon!"
            subcaption="To infinity and beyond!"
            stage="end"
          />
        </Carousel>
      </div>
    );
  }
}

export default SliderForm;
