import React from 'react';
import { dataWorkingHour } from '../../utils/GetWorkingHour';

export default function CheckWorkingHour() {
    return (
        <div className="pt-5">
            <span>{dataWorkingHour[0]}</span>
        </div>
    );
}
