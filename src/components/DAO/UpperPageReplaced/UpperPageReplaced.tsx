import { InfoIcon } from '../../../assets/icons';
import { Logo } from '../../../components';
import { useModal } from '../../../hooks';
import { useEffect, useState } from 'react';
import { Button, Icon, NetworkBadge, Tooltip } from '../../../ui';

import styles from './UpperPage.module.scss';
import { useInjection } from 'inversify-react';
import ThemeStore from '../../../store/ThemeStore';
import { observer } from 'mobx-react-lite';
import { Api, DaoStatsResponse } from '../../../utils/api';
import Big from 'big.js';
import { formatValue } from '../../../utils/formatValue';
import { activeChains } from '../../../constants/chains';

const UpperPageReplaced = observer(() => {
    const themeStore = useInjection(ThemeStore);
    const api = useInjection(Api);

    const [stats, setStats] = useState<DaoStatsResponse>();

    const waitingModal = useModal();

    useEffect(() => {
        api.stats().then(data => setStats(data));
    }, [api]);
    return (
        <div className={styles.wrapper}>
            <div className={styles.infos}>
                <div className={styles.apr}>
                    <div>
                        <span>Total Volume</span>
                        {/*<Tooltip placement="top" content="Content coming here">*/}
                        {/*    <Icon size={16}>*/}
                        {/*        <InfoIcon/>*/}
                        {/*    </Icon>*/}
                        {/*</Tooltip>*/}
                    </div>
                    <div>${formatValue(Big(stats?.volume || 0).toFixed(2), 2, true)}</div>
                    <div>
                        <span>Total Unique Users</span>
                        {/*<Tooltip placement="top" content="Content coming here">*/}
                        {/*    <Icon size={16}>*/}
                        {/*        <InfoIcon/>*/}
                        {/*    </Icon>*/}
                        {/*</Tooltip>*/}
                    </div>
                    <div>{stats?.users || 0}</div>
                </div>
                <div className={styles.totalStaked}>
                    <div>
                        <span>Generated Fees</span>
                        {/*<Tooltip placement="top" content="Content coming here">*/}
                        {/*    <Icon size={16}>*/}
                        {/*        <InfoIcon/>*/}
                        {/*    </Icon>*/}
                        {/*</Tooltip>*/}
                    </div>
                    <div>${Big(stats?.volume || 0).times('.0004').toFixed(2)}</div>
                    {/*<div>*/}
                    {/*  <div>CSM</div>*/}
                    {/*  <div>(23.24%)</div>*/}
                    {/*</div>*/}
                </div>
            </div>
            <div className={styles.yourProfit}>
                <div className={styles.title}>
                    <div>TVL</div>
                    {/*<Tooltip placement="top" content="Content coming here">*/}
                    {/*    <Icon size={16}>*/}
                    {/*        <InfoIcon/>*/}
                    {/*    </Icon>*/}
                    {/*</Tooltip>*/}
                </div>
                <div className={styles.value}>${formatValue(stats?.tvl || '0', 2, true)}</div>
                <div className={styles.line}></div>
                <div className={styles.title}>
                    <div>Total Transactions</div>
                    {/*<Tooltip placement="top" content="Content coming here">*/}
                    {/*    <Icon size={16}>*/}
                    {/*        <InfoIcon/>*/}
                    {/*    </Icon>*/}
                    {/*</Tooltip>*/}
                </div>
                <div className={styles.value}>{stats?.transactions || 0}</div>
                <div className={styles.line}></div>
                <div className={styles.title}>
                    <div>Amount of MEV prevented by Cashmere</div>
                    <Tooltip placement="top" content="Amount by securing from MEV attacks if the transactions were performed on mainnet">
                        <Icon size={16}>
                            <InfoIcon/>
                        </Icon>
                    </Tooltip>
                </div>
                <div className={styles.value}>${formatValue(Big(stats?.volume || 0).times('.0001').toFixed(2), 2, true)}</div>
            </div>
            <div className={styles.faucets}>
                <div className={styles.title}>
                    Faucets
                </div>
                <div>
                    {activeChains.map(chain => (
                        <a href={chain.faucetUrl} target="_blank" key={chain.id} rel="noreferrer">
                            <NetworkBadge chain={chain}/>
                        </a>
                    ))}
                </div>
            </div>
        </div>
    );
});

export { UpperPageReplaced };
