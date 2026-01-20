import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './Navbar';

// Mock useNavigate
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('Navbar Component', () => {
  const mockOnMenuClick = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  const renderNavbar = () => {
    return render(
      <BrowserRouter>
        <Navbar onMenuClick={mockOnMenuClick} />
      </BrowserRouter>
    );
  };

  it('renders the navbar with logo and user info', () => {
    renderNavbar();
    expect(screen.getByText('Carify')).toBeDefined();
    expect(screen.getByText('Administrator')).toBeDefined();
  });

  it('calls onMenuClick when menu button is clicked', () => {
    renderNavbar();
    // The menu button is the first button in the header
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]); 
    expect(mockOnMenuClick).toHaveBeenCalledTimes(1);
  });

  it('toggles workspace dropdown when clicked', () => {
    renderNavbar();
    const workspaceSelector = screen.getByText('Carify').parentElement!;
    fireEvent.click(workspaceSelector);
    expect(screen.getByText('Active Workspace')).toBeDefined();
    
    fireEvent.click(workspaceSelector);
    expect(screen.queryByText('Active Workspace')).toBeNull();
  });

  it('toggles user dropdown when clicked', () => {
    renderNavbar();
    const userSelector = screen.getByText('Administrator').parentElement!;
    fireEvent.click(userSelector);
    expect(screen.getByText('Signed in as')).toBeDefined();
    expect(screen.getByText('admin@carify.com')).toBeDefined();

    fireEvent.click(userSelector);
    expect(screen.queryByText('Signed in as')).toBeNull();
  });

  it('handles logout correctly', () => {
    localStorage.setItem('user', 'test-user');
    localStorage.setItem('accessToken', 'test-token');
    
    renderNavbar();
    
    // Open user dropdown
    const userSelector = screen.getByText('Administrator').parentElement!;
    fireEvent.click(userSelector);
    
    // Click logout
    const logoutButton = screen.getByText('Logout');
    fireEvent.click(logoutButton);
    
    expect(localStorage.getItem('user')).toBeNull();
    expect(localStorage.getItem('accessToken')).toBeNull();
    expect(mockNavigate).toHaveBeenCalledWith('/login');
  });

  it('toggles language dropdown', () => {
    renderNavbar();
    const langButton = screen.getByText('EN');
    fireEvent.click(langButton);
    expect(screen.getByText('Arabic')).toBeDefined();
    expect(screen.getByText('Spanish')).toBeDefined();

    fireEvent.click(langButton);
    expect(screen.queryByText('Arabic')).toBeNull();
  });

  it('closes one dropdown when another is opened', () => {
    renderNavbar();
    
    // Open workspace dropdown
    const workspaceSelector = screen.getByText('Carify').parentElement!;
    fireEvent.click(workspaceSelector);
    expect(screen.getByText('Active Workspace')).toBeDefined();

    // Open user dropdown
    const userSelector = screen.getByText('Administrator').parentElement!;
    fireEvent.click(userSelector);
    
    // User dropdown should be open
    expect(screen.getByText('Signed in as')).toBeDefined();
    // Workspace dropdown should be closed
    expect(screen.queryByText('Active Workspace')).toBeNull();
  });

  it('renders workspace switch options in dropdown', () => {
    renderNavbar();
    const workspaceSelector = screen.getByText('Carify').parentElement!;
    fireEvent.click(workspaceSelector);

    expect(screen.getByText('The Achievers')).toBeDefined();
    expect(screen.getByText('The Chiefs')).toBeDefined();
    const switchButtons = screen.getAllByText('SWITCH');
    expect(switchButtons.length).toBe(2);
  });

  it('renders View and Remove buttons in workspace dropdown', () => {
    renderNavbar();
    const workspaceSelector = screen.getByText('Carify').parentElement!;
    fireEvent.click(workspaceSelector);

    expect(screen.getByText('View')).toBeDefined();
    expect(screen.getByText('Remove')).toBeDefined();
  });

  it('renders New Workspace button', () => {
    renderNavbar();
    expect(screen.getByText('New Workspace')).toBeDefined();
  });

  it('renders search input', () => {
    renderNavbar();
    const searchInput = screen.getByPlaceholderText('Search dashboard...');
    expect(searchInput).toBeDefined();
    
    fireEvent.change(searchInput, { target: { value: 'test query' } });
    expect((searchInput as HTMLInputElement).value).toBe('test query');
  });
});
