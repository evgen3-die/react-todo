import React, { FunctionComponent } from 'react';
import { Checkbox, Button, Switch } from 'antd';
import { Todo as TodoInterface } from '@todo/shared/interfaces';
import { CloseCircleOutlined } from '@ant-design/icons';

import Editable from '../editable';
import styles from './Content.module.css';

type Content = TodoInterface['content'];

interface ContentProps {
  content: Content;
  editing: boolean;
  onChange: (content: Content) => void;
}

const { isArray } = Array;
const placeholder = 'Добавить описание...';

const Content: FunctionComponent<ContentProps> = ({ content, editing, onChange }) => {
  const onSwitchChange = () => {
    if (isArray(content)) {
      onChange('');
    } else {
      onChange([{ title: '', checked: false }]);
    }
  };

  const typeSwitcher = editing && (
    <div className={styles.switchOuter}>
      <Switch
        className={styles.switch}
        checked={isArray(content)}
        onChange={onSwitchChange}
      />
      В виде списка
    </div>
  );

  if (!isArray(content)) {
    return (
      <>
        {typeSwitcher}
        <Editable
          html={content ?? ''}
          disabled={!editing}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </>
    );
  }

  return (
    <>
      {typeSwitcher}
      {content.map(({ title, checked }, i) => (
        <div
          className={styles.item}
          key={i}
        >
          <Checkbox
            className={styles.checkbox}
            checked={checked}
            onChange={e => onChange(content.map((item, j) => j === i ? { ...item, checked: e.target.checked } : item))}
          />
          <Editable
            className={styles.label}
            html={title}
            disabled={!editing}
            onChange={e => onChange(content.map((item, j) => j === i ? { ...item, title: e.target.value } : item))}
            placeholder={placeholder}
          />
          {editing && (
            <CloseCircleOutlined
              className={styles.remove}
              onClick={() => onChange(content.filter((item, j) => j !== i))}
            />
          )}
        </div>
      ))}
      {editing && (
        <div className={styles.add}>
          <Button
            type="dashed"
            size="small"
            onClick={() => onChange([...content, { title: '', checked: false }])}
          >
            Добавить пункт
          </Button>
        </div>
      )}
    </>
  );
};

export default Content;
