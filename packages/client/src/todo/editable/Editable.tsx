import React, { FunctionComponent, KeyboardEvent } from 'react';
import ContentEditable, { Props as ContentEditableProps } from 'react-contenteditable';

import styles from './Editable.module.css';

interface EditableProps extends ContentEditableProps {
  placeholder?: string;
}

const onKeyPress = (e: KeyboardEvent) => {
  if (e.which === 13) {
    e.preventDefault();
  }
};

const Editable: FunctionComponent<EditableProps> = ({
  placeholder = '',
  html,
  className,
  disabled,
  ...props
}) => {
  const placeholderVisible = !html && !disabled;

  return (
    <div className={`${className} ${styles.wrap}`}>
      {
        // @ts-ignore
        <ContentEditable
          className={styles.editable}
          html={html}
          onKeyPress={onKeyPress}
          disabled={disabled}
          {...props}
        />
      }
      {placeholderVisible && (
        <div className={styles.placeholder}>
          {placeholder}
        </div>
      )}
    </div>
  );
};

export default Editable;
