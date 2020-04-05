import React, { FunctionComponent, useState } from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, StopOutlined } from '@ant-design/icons';
import { Todo as TodoInterface } from '@todo/shared/interfaces';

import Content from './content';
import Members from './members';
import Editable from './editable';

import styles from './Todo.module.css';

type ContentType = TodoInterface['content'];

const convertToDate = (timestamp: number) => (new Date(timestamp * 1000)).toLocaleDateString();
const getContentWithoutEmptyTitles = ((content: ContentType) => {
  if (Array.isArray(content)) {
    return content.filter(({ title }) => title.trim());
  }

  return content;
});

interface TodoProps extends TodoInterface {
  className?: string;
  allMembers: string[];
  defaultEditing?: boolean;
  onDelete?: () => void;
  onCancel?: () => void;
  onSave?: (todo: TodoInterface) => void;
}

const Todo: FunctionComponent<TodoProps> = ({
  className,
  timestamp,
  allMembers,
  defaultEditing,
  onDelete = () => {},
  onCancel = () => {},
  onSave = () => {},
  ...props
}) => {
  const date = timestamp ? convertToDate(timestamp) : null;
  const [editing, setEditing] = useState(defaultEditing ?? false);
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [members, setMembers] = useState(props.members);

  const onCheckClick = () => {
    const newContent = getContentWithoutEmptyTitles(content);
    setContent(newContent);
    setEditing(false);

    onSave({
      title,
      members,
      content: newContent
    });
  };

  const onStopClick = () => {
    setTitle(props.title);
    setContent(props.content);
    setMembers(props.members);
    setEditing(false);
    onCancel();
  };

  const onContentChange = (content: ContentType) => {
    setContent(content);

    if (!editing) {
      onSave({ content });
    }
  };

  const staticButtons = [
    <EditOutlined key="edit" onClick={() => setEditing(true)} />,
    <DeleteOutlined key="delete" onClick={onDelete} />
  ];

  const editingButtons = [
    <CheckOutlined key="check" onClick={onCheckClick} />,
    <StopOutlined key="stop" onClick={onStopClick} />
  ];

  return (
    <Card
      className={`${editing ? styles.editing : ''} ${className}`}
      title={
        <Editable
          className={styles.title}
          html={title ?? ''}
          disabled={!editing}
          onChange={e => setTitle(e.target.value)}
          placeholder="Добавить заголовок..."
        />
      }
      extra={date}
      actions={editing ? editingButtons : staticButtons}
    >
      <Content
        content={content}
        editing={editing}
        onChange={onContentChange}
      />
      <Members
        members={members}
        editing={editing}
        allMembers={allMembers}
        onChange={setMembers}
      />
    </Card>
  );
};

export default Todo;
