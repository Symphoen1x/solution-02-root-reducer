import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingIndicator from '../LoadingIndicator';

describe('LoadingIndicator component', () => {
  it('should render inline loading indicator by default', () => {
    // Arrange
    const { container } = render(<LoadingIndicator />);
    
    // Action & Assert
    // Check if the inline container div exists
    expect(container.firstChild).toBeInTheDocument();
    // Verify it doesn't show the "Memuat..." text for inline load
    expect(screen.queryByText('Memuat...')).toBeNull();
  });

  it('should render full page loading indicator when fullPage prop is true', () => {
    // Arrange
    render(<LoadingIndicator fullPage={true} />);
    
    // Action & Assert
    expect(screen.getByText('Memuat...')).toBeInTheDocument();
  });
});
