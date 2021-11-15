import React from 'react';
import { render, screen } from '@testing-library/react';
import Timeline from '../lib/Timeline';

test('renders timeline component', () => {
    const timeline = render(<Timeline />);
    expect(timeline).toMatchSnapshot()
});
