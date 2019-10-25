import React from "react";
import { Link } from "react-router-dom";

const withLink = WrappedComponent => props => {
  const newProps = {
    ...props,
    video: {
      ...props.video,
      title: <Link to={{ pathname: `/${props.video.id}`, autoplay: true }}>{props.video.title}</Link>
    }
  };

  return <WrappedComponent {...newProps} />;
};

export default withLink;

//"boosts" new component with new functionality

//never alters original component , only returns new one!!

//high order components usefull for reusing component logic
//takes in component as param , or returns component or both
