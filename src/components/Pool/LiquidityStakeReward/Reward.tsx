import { useMediaQuery } from 'react-responsive';
import { Button } from '../../../ui';

import styles from './Reward.module.scss';
import { useInjection } from 'inversify-react';
import ThemeStore from '../../../store/ThemeStore';
import { observer } from 'mobx-react-lite';
import PoolStore from '../../../store/PoolStore';

const Reward = observer(({ onSuccess }: { onSuccess: () => void }) => {
    const themeStore = useInjection(ThemeStore);
    const poolStore = useInjection(PoolStore);

    const isPhoneOrPC = useMediaQuery({
        query: '(max-width: 600px)',
    });

    return (
        <div className={styles.wrapper}>
            <div className={styles.depositingAmount}>
                <div>Your Deposits</div>
                <div>24,680.98 DAI</div>
            </div>
            <div className={styles.line}></div>
            <div className={styles.fee}>
                <div>Your Rewards</div>
                <div>145.67 CSM</div>
            </div>
            <div className={styles.liquidityButton}>
                <Button
                    width="100%"
                    height={isPhoneOrPC ? '34px' : '56px'}
                    fontWeight="fw600"
                    color={themeStore.theme === 'light' ? 'black' : 'white'}
                    onClick={() => {
                        onSuccess();
                        poolStore.setValue('145.67');
                        poolStore.setFunctionName('Claim');
                    }}
                >
                    Claim
                </Button>
            </div>
        </div>
    );
});

export { Reward };
