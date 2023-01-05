import React, { Component } from "react";
import "../styles/spiner.css";

class EndCard extends Component {
  constructor() {
    super();
    this._redirect = this._redirect.bind(this);
  }

  _redirect() {
    setTimeout(() => {
      window.location.href = "/";
    }, 5000);
  }

  render() {
    return (
      <div className="form-page">
        <div className="form-div">
          <span className="form-label">{this.props.title}</span>
          {
            (this.props.loading)
              ? <div className="lds-ripple"><div></div><div></div></div>
              : <div>
                {
                  (this.props.stage === "end" && this.props.result !== "success")
                    ? <span className="form-label sub-caption">Facing some issues tryagain later 😞</span>
                    : <span className="form-label sub-caption">{this.props.content}</span>
                }

                <div style={{ marginTop: "3em" }} className="flex align-items-left">
                  <div className="form-label sub-caption">{this.props.subcaption}</div>
                  {
                    (this.props.stage === "end")
                      ? <div>
                        <div className="form-label">MentorPlus</div>
                        <div className="form-label sub-caption" style={{ marginTop: "1em", fontStyle: "italic" }}>You're being auto-directed to homepage in 5s {this._redirect()} </div>
                      </div>
                      : null
                  }
                  {/* Navigation Buttons */}
                  <div className="form-options" style={{ marginTop: "0.5em" }}>
                    <a href="/" className="form-button button-transparent">Go to Home</a>
                    {
                      (this.props.stage !== "home")
                        ? <div></div>
                        : <a href="#" className="form-button" onClick={() => this.props.onSubmit()} >Next</a>
                    }
                  </div>
                </div>
              </div>
          }
        </div>
      </div>
    );
  }
}

export default EndCard;
