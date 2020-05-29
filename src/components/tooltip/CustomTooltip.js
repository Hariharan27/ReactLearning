import React from 'react';

import Tooltip from "@material-ui/core/Tooltip";

  export default class CustomTooltip extends React.Component {

    render(){
       const {child} = this.props;
        return(
          <Tooltip title="Mark as completed" arrow>
          {child}
          </Tooltip>
        );
    }
  }
  
  