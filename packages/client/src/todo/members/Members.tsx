import React, { FunctionComponent } from 'react';
import { Select, Tag } from 'antd';
import { TagProps } from 'antd/lib/tag';
import { Member } from '@todo/shared/interfaces';
import { CustomTagProps } from 'rc-select/lib/interface/generator';

import styles from "./Members.module.css";

interface MembersProps {
  members?: Member[];
  editing: boolean;
}

interface GetTagProps extends TagProps {
  label: CustomTagProps['label'];
  key?: string;
}

const { Option } = Select;
const allMembers: Member[] = [
  {
    id: '0',
    name: 'Pavel'
  },
  {
    id: '1',
    name: 'Fedor'
  }
];

const getTag = ({
  closable,
  onClose,
  label,
  key
}: GetTagProps) => {
  return (
    <Tag
      key={key}
      className={styles.member}
      color="gold"
      closable={closable}
      onClose={onClose}
    >
      {label}
    </Tag>
  );
};

const Members: FunctionComponent<MembersProps> = ({ members, editing }) => {
  if (editing) {
    return (
      <Select
        className={styles.members}
        tagRender={({ closable, onClose, label }) => getTag({ closable, onClose, label })}
        mode="multiple"
      >
        {allMembers.map(({ id, name }) => (
          <Option key={id} value={id}>
            {name}
          </Option>
        ))}
      </Select>
    );
  }

  if (!members) {
    return null;
  }

  return (
    <div className={styles.members}>
      {members.map(({ id, name }) => getTag({
        label: name,
        key: id
      }))}
    </div>
  );
};

export default Members;
