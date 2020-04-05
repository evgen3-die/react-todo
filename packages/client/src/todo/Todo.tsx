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
  onClickDelete?: () => void;
  allMembers: Member[];
  defaultEditing?: boolean;
}

const placeholder = 'Добавить заголовок...';

const Todo: FunctionComponent<TodoProps> = ({
  className,
  timestamp,
  onClickDelete,
  allMembers,
  defaultEditing,
  ...props
}) => {
  const date = timestamp ? convertToDate(timestamp) : null;

  const [editing, setEditing] = useState(defaultEditing ?? false);

  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const [members, setMembers] = useState(props.members);

  const onStopClick = () => {
    setTitle(props.title);
    setContent(props.content);
    setMembers(props.members);
    setEditing(false);
  };

  const deleteButton = <DeleteOutlined key="delete" onClick={onClickDelete} />;
  const staticButtons = [
    <EditOutlined key="edit" onClick={() => setEditing(true)} />,
    deleteButton
  ];
  const editingButtons = [
    <CheckOutlined key="check" onClick={() => setEditing(false)} />,
    <StopOutlined key="stop" onClick={onStopClick} />,
    deleteButton
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