import React from 'react';

export default function SocialNetworks() {
    return (
        <React.Fragment>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ marginRight: '30px' }}>
                    <a href="https://www.instagram.com/babadoo_01" rel="noopener noreferrer" target="_blank">
                        <i style={{ fontSize: '2.8rem' }} className="fab fa-instagram icon-default"></i>
                    </a>
                </div>
                <div>
                    <a href="https://www.facebook.com/babadoo.sexyshop" rel="noopener noreferrer" target="_blank">
                        <i style={{ fontSize: '2.8rem' }} className="fab fa-facebook icon-default"></i>
                    </a>
                </div>
            </div>
        </React.Fragment>
    );
}
