import React from 'react';
import PropTypes from 'prop-types';
import styes from './filter.module.css';

const Filter = ({ title, value, onChangeFilter }) => {
  return (
    <div className={styes.filter}>
      <p>{title}</p>
      <input type="text" value={value} onChange={onChangeFilter} />
    </div>
  );
};

Filter.propTypes = {
  title: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChangeFilter: PropTypes.func.isRequired,
};

export default Filter;
