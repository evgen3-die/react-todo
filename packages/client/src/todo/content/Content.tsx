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
const generateId = ((id = 0) => () => `inner-${id++}`)();
const placeholder = 'Добавить описание...';

const Content: FunctionComponent<ContentProps> = ({ content, editing, onChange }) => {
  const onSwitchChange = () => {
    if (isArray(content)) {
      onChange('');
    } else {
      onChange([{ title: '', checked: false, id: generateId() }]);
    }
  };

  const typeSwitcher = editing && (
    <Switch
      checked={isArray(content)}
      checkedChildren="Текстом"
      unCheckedChildren="Списком"
      onChange={onSwitchChange}
    />
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
      {content.map(({ id, title, checked }, i) => (
        <div
          className={styles.item}
          key={id}
        >
          <Checkbox
            className={styles.checkbox}
            checked={checked}
            onChange={e => onChange(content.map(item => item.id === id ? { ...item, checked: e.target.checked } : item))}
          />
          <Editable
            className={styles.label}
            html={title}
            disabled={!editing}
            onChange={e => onChange(content.map(item => item.id === id ? { ...item, title: e.target.value } : item))}
            placeholder={placeholder}
          />
          {editing && (
            <CloseCircleOutlined
              className={styles.remove}
              onClick={() => onChange(content.filter(item => item.id !== id))}
            />
          )}
        </div>
      ))}
      {editing && (
        <Button
          className={styles.add}
          type="dashed"
          size="small"
          onClick={() => onChange([...content, { title: '', checked: false, id: generateId() }])}
        >
          Добавить
        </Button>
      )}
    </>
  );
};

export default Content;
