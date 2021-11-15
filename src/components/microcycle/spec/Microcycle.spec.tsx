import React from 'react';
import { render, screen } from '@testing-library/react';
import Microcycle from '../lib/Microcycle';

test('renders Microcycle component', () => {
    const microcycle = render(<Microcycle />);
    expect(microcycle).toMatchSnapshot()
});
