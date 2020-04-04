import React, { FunctionComponent } from 'react';
import { Checkbox, Button } from 'antd';
import { Todo as TodoInterface } from '@todo/shared/interfaces';

import Editable from '../editable';
import styles from './Content.module.css';

interface ContentProps {
  content: TodoInterface['content'];
  editing: boolean;
}

const placeholder = 'Добавить описание...';

const Content: FunctionComponent<ContentProps> = ({ content, editing }) => {
  if (!Array.isArray(content)) {
    return (
      <Editable
        html={content ?? ''}
        disabled={!editing}
        onChange={() => {}}
        placeholder={placeholder}
      />
    );
  }

  return (
    <>
      {content.map(({ id, title }) => (
        <div
          className={styles.item}
          key={id}
        >
          <Checkbox
            className={styles.checkbox}
          />
          <Editable
            className={styles.label}
            html={title}
            disabled={!editing}
            onChange={() => {}}
            placeholder={placeholder}
          />
        </div>
      ))}
      {editing && (
        <Button
          className={styles.add}
          type="dashed"
          size="small"
        >
          Добавить
        </Button>
      )}
    </>
  );
};

export default Content;
