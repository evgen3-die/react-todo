import React, { FunctionComponent, useState, KeyboardEvent } from 'react';
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

const Editable: FunctionComponent<ContentEditableProps> = ({
  placeholder = '',
  html,
  className,
  disabled,
  ...props
}) => {
  const [focusing, setFocusing] = useState(false);
  const placeholderVisible = !html && !focusing && !disabled;
  const classes = [
    className,
    styles.editable,
    placeholderVisible ? styles.placeholder : ''
  ];

  return (
    // @ts-ignore
    <ContentEditable
      className={classes.join(' ')}
      html={placeholderVisible ? placeholder : html}
      onFocus={() => setFocusing(true)}
      onBlur={() => setFocusing(false)}
      onKeyPress={onKeyPress}
      disabled={disabled}
      {...props}
    />
  );
};

export default Editable;
