import * as React from "react";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";

import BackImage from "@components/BackImage";

const Ours:React.FunctionComponent = () => {
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
        img={'banner-ours.png'}
        height={360}
        tips={'banner'}
      />
    </ReactCSSTransitionGroup>
  );
};

export default Ours;