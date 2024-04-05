import { StarOutlined } from '@ant-design/icons';
import { Repo } from '../../../types/Github';
import styles from './Breadcrumbs.module.css'

interface Props {
    repoInfo: Repo,
}

const Breadcrumbs = ({ repoInfo }: Props) => {
    const { owner, owner_url, name, url } = repoInfo;

    return (
        <div className={styles.breadcrumbsWrapper}>
            <div className={styles.breadcrumbs}>
                <a className={styles.breadcrumbsItem} href={owner_url} target="_blank">{owner}</a>
                <a className={styles.breadcrumbsItem} href={url} target="_blank">{name}</a>
            </div>
            <div className={styles.stars}>
                <StarOutlined data-testid="star-icon" />
                {repoInfo.star_count}</div>
        </div>
    )
}

export default Breadcrumbs;