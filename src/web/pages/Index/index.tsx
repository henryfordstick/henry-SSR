import * as React from "react";
import BackImage from "@components/BackImage";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

const Index:React.FunctionComponent = ():JSX.Element => {
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
        img={"banner1.png"}
        height={600}
        tips={"banner"}
      />
    </ReactCSSTransitionGroup>
  );
};

export default Index;