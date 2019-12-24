import React, { useEffect, useState } from 'react';
import { CLIENT_URL } from '../../../config/clientUrl';
import truncateWords from '../../../utils/string/truncateWords';
import styled from 'styled-components';
import { readHighestScores } from '../../../redux/actions/userActions';
import { convertDotToComma } from '../../../utils/numbers/convertDotComma';

export default function RankingPondium() {
    const [highestScores, setHighestScores] = useState([]);

    useEffect(() => {
        readHighestScores()
        .then(res => {
            setHighestScores(res.data);
        })
    }, [])

    return (
        <DivPodium
            className="my-3 container-center flex-column"
        >
            <div
                className="py-3 podium-title text-main-container text-border-white"
            >
                Podium Fidelidade
            </div>
            <div className="podium-container">
                <img
                    src={`${CLIENT_URL}/img/icons/podium.svg`}
                    alt="podium"
                    width="300"
                />
                {highestScores.length !== 0 && highestScores.map((user, id) => {
                    const { name, loyaltyScores } = user;
                    const css = ["first-place", "second-place", "third-place"];
                    return(
                        <div
                            key={id}
                            className={`${css[id]} text-main-container text-shadow-white`}
                        >
                            {typeof loyaltyScores === "undefined"
                            ? (
                              <p>
                                <i className="fas fa-question"></i>
                              </p>
                            ) : (
                                <p className={id === 0 ? `bounce-repeat animated bounce delay-3s` : ""}>
                                    {truncateWords(name, 14)}
                                    <br />
                                    <span>
                                        {loyaltyScores && convertDotToComma(loyaltyScores.currentScore)}
                                    </span>
                                </p>
                            )
                            }
                        </div>
                    );
                })}
            </div>
        </DivPodium>
    );
}

const DivPodium = styled.div`
    & {
        display: flex;
        justify-content: center;
    }

    & i {
        font-size: 1.9em;
    }

    & .bounce-repeat {
        animation-iteration-count: 3;
    }

    & .podium-container {
        position: relative;
    }

    & .podium-title {
        color: var(--mainPink);
        font-weight: bold;
    }

    & .first-place,
      .second-place,
      .third-place {
        text-align: center;
        font-weight: bold;
        min-width: 200px;
    }

    & .first-place {
        position: absolute;
        top: 10%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    & .second-place {
        position: absolute;
        top: 27%;
        left: 10%;
        transform: translate(-50%, -50%);
    }

    & .third-place {
        position: absolute;
        top: 33%;
        left: 90%;
        transform: translate(-50%, -50%);
    }
`;