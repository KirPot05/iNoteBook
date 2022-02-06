import React from 'react';

function Alert({alert}) {
    return (
        <div style={{height: "50px"}}>
            {alert && <div className={`alert alert-${alert.type} alert-dismissable fade show`} role="alert">
                <strong>{alert.message}</strong>
            </div>}
        </div>
    );
}

export default Alert;
