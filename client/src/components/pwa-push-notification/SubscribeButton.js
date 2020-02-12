import React from 'react';
import * as subscription from '../../subscription';

export default function SubscribeButton() {
    const handleSubscribe = () => {
        subscription.subscribeUser();
    }

    return (
        <div>
            <button onClick={handleSubscribe}>Ask Permission</button>
        </div>
    );
}