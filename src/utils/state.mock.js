import React from 'react';
import { Provider } from 'react-redux';
import { mount, shallow } from 'enzyme';
import store from '../store';
import { getInitialState } from '../components/app/load-data';
import formatSnapshots from './format-data';
import mockData from './data.mock';

/**
 * Example state object for use in tests of redux-enabled components
 */
export const mockState = getInitialState(formatSnapshots(mockData), {
  allowHistoryDeletion: true,
  showHistory: true
});

// Redux store based on mock data
export const mockStore = store(mockState);

/**
 * React-Redux Provider wrapper for testing connected components
 * @param {Object} children A React component
 * @param {Object} state Redux state object for creating the store
 */
export const MockProvider = ({ children, state = mockState }) => (
  <Provider store={store(state)}>{children}</Provider>
);

/**
 * Set up mounted/shallow Enzyme wrappers
 */
export const setup = {
  /**
   * Mount a React-Redux Provider wrapper for testing connected components
   * @param {Object} children React component(s)
   * @param {Object} state Redux state object for creating the store
   */
  mount: (children, state) =>
    mount(<MockProvider state={state}>{children}</MockProvider>),
  /**
   * Render a pure React component in a shallow wrapper
   * @param {Object} Component A React component
   * @param {Object} props React component props
   */
  shallow: (Component, props = {}) => shallow(<Component {...props} />)
};
