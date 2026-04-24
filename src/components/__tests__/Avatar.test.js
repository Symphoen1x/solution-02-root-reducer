import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Avatar from '../Avatar';

describe('Avatar component', () => {
  it('should render an image when src is provided', () => {
    // Arrange
    render(<Avatar src="http://example.com/test.jpg" name="Test User" size={50} />);
    
    // Action
    const imgElement = screen.getByAltText('Test User');
    
    // Assert
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute('src', 'http://example.com/test.jpg');
  });

  it('should render a fallback initial when src is empty', () => {
    // Arrange
    render(<Avatar src="" name="John Doe" size={50} />);
    
    // Action & Assert
    // When no src is provided, it falls back to the initial of the name ('J')
    expect(screen.getByText('J')).toBeInTheDocument();
  });
});