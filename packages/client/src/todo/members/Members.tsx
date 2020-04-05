import React, { FunctionComponent } from 'react';
import { Select, Tag } from 'antd';
import { Member } from '@todo/shared/interfaces';

import styles from './Members.module.css';

interface MembersProps {
  members?: Member[];
  editing: boolean;
  allMembers: Member[];
  onChange: (members: Member[]) => void;
}

const { Option } = Select;

const Members: FunctionComponent<MembersProps> = ({ members, editing, allMembers, onChange }) => {
  if (!members?.length && !editing) {
    return null;
  }

  const ids = members?.map(({ id }) => id);

  return (
    <Select
      disabled={!editing}
      placeholder="Добавить участников..."
      mode="multiple"
      className={styles.members}
      value={ids?.length ? ids : undefined}
      onChange={ids => onChange(allMembers.filter(({ id }) => ids.includes(id)))}
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
      {allMembers.map(({ id, name }) => (
        <Option key={id} value={id}>
          {name}
        </Option>
      ))}
    </Select>
  );
};

export default Members;
