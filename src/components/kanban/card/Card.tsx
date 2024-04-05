import { Card as AntCard } from 'antd';
import { Issue } from '../../../types/Github';
import { getNumberOdDays } from '../../../utils/date';
import styles from './Card.module.css'

interface Props {
    item: Issue,
}

const Card = ({ item }: Props) => {
    const days = getNumberOdDays(item.created_at);

    return (
        <AntCard size="small" title={item.title} className={styles.card}>
            <div className={styles.cardRow}>
                <span>№{item.number}</span>
                <span>opened {days} days ago</span>
            </div>
            <div className={styles.cardRow}>
                <span>{item.user_name}</span> |
                <span>Comments: {item.comments}</span>
            </div>
        </AntCard>
    )
}

export default Card;