import * as React from "react";
import BackImage from "@components/BackImage";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const About:React.FunctionComponent = () => {
  return (
    <ReactCSSTransitionGroup
      transitionName="transitionWrapper"
      component="div"
      transitionAppear={true}
      transitionAppearTimeout={500}
      transitionEnterTimeout={500}
      transitionLeaveTimeout={500}
    >
      <BackImage
        img={'banner-about.png'}
        height={360}
        tips={'banner'}
      />
    </ReactCSSTransitionGroup>
  );
};

export default About;