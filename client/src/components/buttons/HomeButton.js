import React from 'react';
import { Link } from "react-router-dom";
import ButtonMulti from './material-ui/ButtonMulti';
import { useStoreDispatch } from 'easy-peasy';
import { hideComponent, showComponent } from "../../redux/actions/componentActions";
import PropTypes from 'prop-types';

HomeButton.propTypes = {
    hideComponent: PropTypes.string,
}

export default function HomeButton({ hideComp }) {
    console.log(hideComponent);
    const dispatch = useStoreDispatch();

    return (
        <div className="my-5">
            <Link to="/" style={{textDecoration: "none"}}>
                <ButtonMulti
                    onClick={() => {
                        hideComponent(dispatch, hideComp)
                        showComponent(dispatch, "login")
                    }}
                    color="var(--mainWhite)"
                    backgroundColor="var(--mainPink)"
                    backColorOnHover="var(--mainPink)"
                    iconFontAwesome="fas fa-home"
                    textTransform='uppercase'
                >
                    Voltar
                </ButtonMulti>
            </Link>
        </div>
    );
}