import React, { FunctionComponent } from 'react';
import { Select, Tag } from 'antd';
import { Member } from '@todo/shared/interfaces';

import styles from "./Members.module.css";

interface MembersProps {
  members?: Member[];
  editing: boolean;
  allMembers: Member[];
}

const { Option } = Select;

const Members: FunctionComponent<MembersProps> = ({ members, editing, allMembers }) => {
  if (!members && !editing) {
    return null;
  }

  return (
    <Select
      disabled={!editing}
      placeholder="Добавить участников..."
      mode="multiple"
      className={styles.members}
      defaultValue={members?.map(({ id }) => id)}
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
