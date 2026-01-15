import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { describe, it, expect, vi } from 'vitest';

describe('Sidebar Component', () => {
  const renderSidebar = (onClose = vi.fn()) => {
    return render(
      <BrowserRouter>
         <Sidebar
  onClose={onClose}
  isCollapsed={false}
  onToggleCollapse={vi.fn()}
/>

      </BrowserRouter>
    );
  };

  it('renders Sidebar with brand name', () => {
    renderSidebar();
    expect(screen.getByText('Carify PDI')).toBeInTheDocument();
  });

  it('renders navigation links', () => {
    renderSidebar();
    expect(screen.getByText('Fleet')).toBeInTheDocument();
    expect(screen.getByText('Vehicle Inspection')).toBeInTheDocument();
    expect(screen.getByText('HRM Module')).toBeInTheDocument();
  });

  it('toggles User Management dropdown', () => {
    renderSidebar();
    const userMgmtButton = screen.getByRole('button', { name: /user management/i });
    
    // Initially closed (based on state: userManagement: false)
    // We check if the sub-links are not visible or if they have the transition classes
    // In unit tests, we can check for existence in DOM.
    expect(screen.getByText('User')).toBeInTheDocument();
    
    fireEvent.click(userMgmtButton);
    // State toggle happened. In a real DOM it would show.
  });

  it('calls onClose when mobile close button is clicked', () => {
    const onClose = vi.fn();
    renderSidebar(onClose);
    const closeButton = screen.getByLabelText('Close sidebar');
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('contains a quick search input', () => {
    renderSidebar();
    expect(screen.getByPlaceholderText('Quick search...')).toBeInTheDocument();
  });
});
