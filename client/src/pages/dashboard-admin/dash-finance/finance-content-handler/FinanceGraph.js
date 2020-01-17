import React from 'react';
import { Chart } from 'react-google-charts'
import Illustration from '../../../../components/Illustration';
import LoadingThreeDots from '../../../../components/loadingIndicators/LoadingThreeDots';
import { CLIENT_URL } from '../../../../config/clientUrl';
import Tilt from 'react-tilt';
import TitleContainer from '../../../../components/TitleContainer';

const isSmall = window.Helper.isSmallScreen();

export default function FinanceGraph({ dashData }) {
    const { cashInSumAll, cashOutSumAll } = dashData;
    const balanceValue = cashInSumAll - cashOutSumAll;

    return (
        <div className="animated slideInUp m-5">
            {!cashInSumAll && !cashOutSumAll
            ? (
                <Illustration
                    img={`${CLIENT_URL}/img/illustrations/empty-data.svg`}
                    alt="Gráfico Vazio"
                    imgStyle={{
                        maxWidth: 400
                    }}
                    txtImgConfig = {{
                        topPos: "-5%",
                        txt: `NENHUM MOVIMENTO FINANCEIRO ENCONTRADO NESTE PERÍODO`,
                        txtStyle: "text-title",
                        txtBorder: "border-white",
                    }}
                />
            ) : (
                <div className="d-flex flex-column justify-content-md-center">
                    <Tilt
                        className="Tilt text-shadow"
                        options={{ max : 30, reverse: false }}
                    >
                        <TitleContainer
                            title="GRÁFICO BALANÇO FINANCEIRO"
                            className="no-text-shadow"
                        />
                        <Chart
                          width={isSmall ? '800px' : '1000px'}
                          height={'400px'}
                          chartType="PieChart"
                          loader={
                            <div className="container-center">
                                <LoadingThreeDots />
                            </div>
                        }
                          data={[
                            ['movimento', 'valores'],
                            ['ENTRADA R$', cashInSumAll],
                            ['SAÍDA R$', cashOutSumAll],
                            ['PENDENTE R$', 200],
                          ]}
                          options={{
                            fontSize: 30,
                            bold: true,
                            legend: `${isSmall ? 'none' : true}`,
                            backgroundColor: '#f7f1e3',
                            is3D: true,
                            textStyle: {
                                color: 'white', // not working
                                bold: true,
                                italic: true,
                            },
                            slices: {
                              0: { color: '#2ecc71' },//emerald green
                              1: { color: '#ff4757', offset: 0.3 },//watermelon red
                              2: { color: '#fff200', offset: 0.2 },//watermelon red
                            },
                          }}
                          rootProps={{ 'data-testid': '2' }}
                        />
                        <section className="d-flex justify-content-center align-items-center">
                            <div className="mr-4">
                                <img src={`${CLIENT_URL}/img/icons/money.svg`} width={70} height="auto" alt="dinheiro icone"/>
                            </div>
                            <p
                                style={{animationIterationCount: 3, color: balanceValue < 0 ? "var(--expenseRed)" : "var(--incomeGreen)" }}
                                className="animated bounce delay-3s no-text-shadow text-center text-em-2-5 font-weight-bold"
                            >
                                SALDO: R${balanceValue}
                            </p>
                        </section>
                    </Tilt>
                </div>
            )}
        </div>
    )
}