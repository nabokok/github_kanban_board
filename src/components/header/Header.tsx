import { Input } from 'antd';
import styles from './Header.module.css'

interface Props {
  onLoadIssues: (url: string) => void;
  loading: boolean
}

const { Search } = Input;


const Header = ({ onLoadIssues, loading }: Props) => {

  return (
    <header className={styles.header}>
      <div className='container'>
        <Search
          className={styles.inputWrapper}
          placeholder="input search text"
          enterButton="Load issues"
          size="large"
          onSearch={value => onLoadIssues(value)}
          loading={loading}
        />
      </div>
    </header>
  )
}

export default Header;