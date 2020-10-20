import React from 'react';
import PropTypes from 'prop-types';
import styles from './contactList.module.css';

const ContactList = ({ contacts, onRemoveContact }) => {
  return (
    <ul className={styles.list}>
      {contacts.map(({ name, number, id }) => (
        <li className={styles.listItem} key={id}>
          <div>
            {name}: {number}
          </div>
          <button
            className={styles.deleteBtn}
            type="button"
            onClick={() => onRemoveContact(id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string,
      number: PropTypes.string,
      onRemoveContact: PropTypes.func,
    }),
  ),
};

export default ContactList;
