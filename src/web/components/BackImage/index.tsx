import * as React from "react";

interface IProps {
  img: string,
  bg?: boolean,
  height?: number,
  tips?: string
}

const BackImage:React.FunctionComponent<IProps> = ({img,bg,height,tips}) => {
  return (
    <div className="backImages"
         style={{ height: height + 'px',position: bg ? "absolute" : "relative"  }}>
      <img src={require('@assets/images/'+img)} alt={ tips ? tips : img}/>
    </div>
  );
};

export default BackImage;