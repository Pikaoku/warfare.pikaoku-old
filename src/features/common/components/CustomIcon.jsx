import React from 'react';

const CustomIcon = ({name, className}) => {

    return (
        <img className={className} src={window.location.origin + '/icons/' + name + '.svg.'} alt={''} />
    )
}
 
export default CustomIcon