import React, { FunctionComponent } from 'react';
import ContentEditable, { Props as ContentEditableProps } from 'react-contenteditable';

import styles from './Editable.module.css';

interface EditableProps extends ContentEditableProps {
  placeholder?: string;
}

const Editable: FunctionComponent<ContentEditableProps> = ({
  placeholder,
  html,
  className,
  ...props
}) => {
  const content = html || placeholder || '';

  return (
    // @ts-ignore
    <ContentEditable
      className={`${className} ${styles.editable} ${html ? '' : styles.placeholder}`}
      html={content}
      {...props}
    />
  );
};

export default Editable;
