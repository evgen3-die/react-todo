import React, { FunctionComponent, useState } from 'react';
import { Card } from 'antd';
import { EditOutlined, DeleteOutlined, CheckOutlined, StopOutlined } from '@ant-design/icons';
import { Todo as TodoInterface, Member } from '@todo/shared/interfaces';

import Content from './content';
import Members from './members';
import Editable from './editable';

const convertToDate = (timestamp: number) => (new Date(timestamp * 1000)).toLocaleDateString();

interface TodoProps extends TodoInterface {
  className?: string;
  onDeleteClick?: () => void;
  onStopClick?: () => void;
  onCheckClick?: (todo: TodoInterface) => void;
  allMembers: Member[];
  defaultEditing?: boolean;
}

const placeholder = 'Добавить заголовок...';

const Todo: FunctionComponent<TodoProps> = ({
  className,
  timestamp,
  onDeleteClick,
  allMembers,
  defaultEditing,
  ...props
}) => {
  const date = timestamp ? convertToDate(timestamp) : null;

  const [editing, setEditing] = useState(defaultEditing ?? false);

  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [members, setMembers] = useState(props.members);

  const onCheckClick = () => {
    setEditing(false);

    if (props.onCheckClick) {
      props.onCheckClick({
        title,
        members,
        content: Array.isArray(content) ? content.filter(({ title }) => title.trim()) : content
      });
    }
  };

  const onStopClick = () => {
    setTitle(props.title);
    setContent(props.content);
    setMembers(props.members);
    setEditing(false);

    if (props.onStopClick) {
      props.onStopClick();
    }
  };

  const staticButtons = [
    <EditOutlined key="edit" onClick={() => setEditing(true)} />,
    <DeleteOutlined key="delete" onClick={onDeleteClick} />
  ];
  const editingButtons = [
    <CheckOutlined key="check" onClick={onCheckClick} />,
    <StopOutlined key="stop" onClick={onStopClick} />
  ];

  return (
    <Card
      className={className}
      title={
        <Editable
          html={title ?? ''}
          disabled={!editing}
          onChange={e => setTitle(e.target.value)}
          placeholder={placeholder}
        />
      }
      extra={date}
      actions={editing ? editingButtons : staticButtons}
    >
      <Content
        content={content}
        editing={editing}
        onChange={setContent}
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
