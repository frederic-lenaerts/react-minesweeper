import { useCallback } from 'react';
import { useAppDispatch } from '@app/store';

import { reset } from '../store';
import { headerLayout, resetButton } from './styles.css';

export function Header() {
    const dispatch = useAppDispatch();

    const resetGame = useCallback(() => dispatch(reset()), [dispatch]);

    return <div className={headerLayout}>
        <button className={resetButton} onClick={resetGame}>Reset</button>
    </div>
}