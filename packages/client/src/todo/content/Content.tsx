import React, { FunctionComponent } from 'react';
import { Switch } from 'antd';
import { Todo as TodoInterface, ListItem } from '@todo/shared/interfaces';

import Editable from '../editable';
import Checklist from '../checklist';
import styles from './Content.module.css';

type Content = TodoInterface['content'];

interface ContentProps {
  content: Content;
  editing: boolean;
  onChange: (content: Content) => void;
}

const { isArray } = Array;
const placeholder = 'Добавить описание...';
const emptyListItem: ListItem = { title: '', checked: false };

const Content: FunctionComponent<ContentProps> = ({ content, editing, onChange }) => {
  const editableVisible = content || editing;

  const onSwitchChange = () => {
    onChange(isArray(content) ? '' : [{ ...emptyListItem }]);
  };

  return (
    <>
      {editing && (
        <div className={styles.switchOuter}>
          <Switch
            className={styles.switch}
            checked={isArray(content)}
            onChange={onSwitchChange}
          />
          В виде списка
        </div>
      )}
      {isArray(content) && (
        <Checklist
          content={content}
          editing={editing}
          placeholder={placeholder}
          onChange={onChange}
        />
      )}
      {(editableVisible && !isArray(content)) && (
        <Editable
          html={content ?? ''}
          disabled={!editing}
          placeholder={placeholder}
          onChange={e => onChange(e.target.value)}
        />
      )}
    </>
  );
};

export default Content;
