import React from 'react';
import { Link } from "react-router-dom";
import ButtonMulti from './material-ui/ButtonMulti';
import { useStoreDispatch } from 'easy-peasy';
import { hideComponent, showComponent } from "../../redux/actions/componentActions";
import { logout } from "../../redux/actions/authActions";
import isThisApp from '../../utils/window/isThisApp';
import PropTypes from 'prop-types';

HomeButton.propTypes = {
    hideComponent: PropTypes.string,
}

export default function HomeButton({ hideComp }) {
    const dispatch = useStoreDispatch();

    return (
        <div className="my-5">
            <Link to={true ? "/mobile-app" : "/acesso/verificacao" } style={{textDecoration: "none"}}>
                <ButtonMulti
                    onClick={() => {
                        hideComponent(dispatch, hideComp)
                        showComponent(dispatch, "login")
                        !true && logout(dispatch);
                    }}
                    color="var(--mainWhite)"
                    backgroundColor="var(--mainPink)"
                    backColorOnHover="var(--mainPink)"
                    textTransform='uppercase'
                >
                    Voltar
                </ButtonMulti>
            </Link>
        </div>
    );
}