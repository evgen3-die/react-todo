import React, { FunctionComponent } from 'react';
import { Button, Checkbox } from 'antd';
import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import { ContentEditableEvent } from 'react-contenteditable';
import { CloseCircleOutlined } from '@ant-design/icons';
import { ListItem } from '@todo/shared/interfaces';

import Editable from '../editable';
import styles from './Checklist.module.css';

interface ChecklistProps {
  content: ListItem[];
  editing: boolean;
  placeholder: string;
  onChange: (listItems: ListItem[]) => void;
}

const Checklist: FunctionComponent<ChecklistProps> = ({
  content,
  editing,
  placeholder,
  onChange,
}) => {
  const updateItem = (fields: Partial<ListItem>, index: number) => {
    const newContent = content
      .map((item, i) => i === index ? { ...item, ...fields } : item);

    onChange(newContent);
  };

  const onCheckboxChange = (e: CheckboxChangeEvent, index: number) => {
    const { checked } = e.target;
    updateItem({ checked }, index);
  };

  const onEditableChange = (e: ContentEditableEvent, index: number) => {
    const { value: title } = e.target;
    updateItem({ title }, index);
  };

  const onRemoveClick = (index: number) => {
    onChange(content.filter((item, j) => j !== index));
  };

  const onAddClick = () => {
    onChange([...content, { title: '', checked: false }]);
  };

  return (
    <>
      {content.map(({ title, checked }, i) => (
        <div
          className={styles.item}
          key={i}
        >
          <Checkbox
            className={styles.checkbox}
            checked={checked}
            onChange={e => onCheckboxChange(e, i)}
          />
          <Editable
            className={styles.label}
            html={title}
            disabled={!editing}
            placeholder={placeholder}
            onChange={e => onEditableChange(e, i)}
          />
          {editing && (
            <CloseCircleOutlined
              className={styles.remove}
              onClick={() => onRemoveClick(i)}
            />
          )}
        </div>
      ))}
      {editing && (
        <div className={styles.add}>
          <Button
            type="dashed"
            size="small"
            onClick={onAddClick}
          >
            Добавить пункт
          </Button>
        </div>
      )}
    </>
  );
};

export default Checklist;
