import React, { FunctionComponent } from 'react';
import { Select, Tag } from 'antd';

import styles from './Members.module.css';

interface MembersProps {
  members?: string[];
  editing: boolean;
  allMembers: string[];
  onChange: (members: string[]) => void;
}

const { Option } = Select;

const Members: FunctionComponent<MembersProps> = ({ members, editing, allMembers, onChange }) => {
  if (!members?.length && !editing) {
    return null;
  }

  const onSelectChange = (members: string[]) => {
    const newMembers = allMembers
      .filter(member => members.includes(member));

    onChange(newMembers);
  };

  return (
    <Select
      disabled={!editing}
      className={styles.members}
      value={members?.length ? members : undefined}
      showSearch={false}
      placeholder="Добавить участников..."
      mode="multiple"
      onChange={onSelectChange}
      tagRender={({ closable, onClose, label }) => (
        <Tag
          className={styles.member}
          color="blue"
          closable={closable && editing}
          onClose={onClose}
        >
          {label}
        </Tag>
      )}
    >
      {allMembers.map(member => (
        <Option key={member} value={member}>
          {member}
        </Option>
      ))}
    </Select>
  );
};

export default Members;
