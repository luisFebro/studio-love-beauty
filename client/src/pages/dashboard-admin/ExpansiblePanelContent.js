import React from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import DoneIcon from '@material-ui/icons/Done';
import Chip from '@material-ui/core/Chip';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

ExpansiblePanelContent.propTypes = {
    doneTasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    inProgressTasks: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default function ExpansiblePanelContent({ doneTasks, inProgressTasks }) {
    const gotTasksDone = doneTasks.length !== 0 ? true : false;
    const gotTasksInProgress = inProgressTasks.length !== 0 ? true : false;

    return (
        <div className="text-center">
            <section>
                <div className="text-default text-center mb-3">
                    Funcionalidades Já Implementadas
                    <DoneIcon />
                </div>
                <div>
                    {gotTasksDone ? (
                        <div>
                            {doneTasks.map(elem => (
                                <Chip key={elem.task} icon={<DoneIcon />} label={elem.task} color="primary" />
                            ))}
                        </div>
                    ) : (
                        <div>
                            <span className="text-default">Em Andamento</span>
                        </div>
                    )}
                </div>
            </section>
            <br />
            <Divider />
            <br />
            <section>
                <div className="text-default text-center mb-3">
                    Funcionalidades em Andamento
                    <AccessTimeIcon />
                </div>
                <div>
                    {gotTasksInProgress ? (
                        <div>
                            {inProgressTasks.map(elem => (
                                <Chip key={elem.task} icon={<AccessTimeIcon />} label={elem.task} />
                            ))}
                        </div>
                    ) : (
                        <div>
                            <span className="text-default">Sem Atualizações</span>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
