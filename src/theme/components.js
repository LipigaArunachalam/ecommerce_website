import palette from './palette';

export const components = {
  MuiCssBaseline: {
    styleOverrides: {
      body: {
        backgroundColor: '#F9F7FC', 
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },

  MuiAppBar: {
    styleOverrides: {
      root: {
        backgroundColor: palette.primary,
        color: '#FFFFFF',
        boxShadow: '0 2px 12px rgba(120, 81, 169, 0.15)',
      },
    },
  },

  MuiDrawer: {
    styleOverrides: {
      paper: {
        backgroundColor: '#FFFFFF',
        color: '#1A1A2E',
        '& .MuiListItemIcon-root, & .MuiTypography-root': {
          color: '#1A1A2E',
        },
      },
    },
  },

  MuiButton: {
    styleOverrides: {
      root: {
        borderRadius: 8,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
      },
      contained: {
        backgroundColor: palette.primary,
        color: '#FFFFFF',
        boxShadow: '0 4px 14px rgba(120, 81, 169, 0.35)',
        padding: '10px 28px',

        '&:hover': {
          backgroundColor: palette.primary,
          boxShadow: '0 6px 18px rgba(120, 81, 169, 0.45)',
        },
      },
      outlined: {
        border: `2px solid ${palette.primary}`,
        color: palette.primary,
        '&:hover': {
          border: `2px solid ${palette.primary}`,
          backgroundColor: 'rgba(0, 0, 0, 0.06)',
        },
      },
      text: {
        color: '#1A1A2E',
        '&:hover': {
          backgroundColor: 'rgba(26, 26, 46, 0.05)',
        },
      },
    },
  },

  MuiCard: {
    styleOverrides: {
      root: {
        backgroundColor: '#FFFFFF',
        borderRadius: 16,
        boxShadow: '0 4px 20px rgba(120, 81, 169, 0.08)',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        borderLeft: '3px solid transparent',
        '&:hover': {
          borderLeft: `3px solid ${palette.primary}`,
          boxShadow: '0 8px 32px rgba(120, 81, 169, 0.14)', 
        },
      },
    },
  },

  MuiChip: {
    styleOverrides: {
      filledPrimary: {
        backgroundColor: palette.primary,
        color: '#FFFFFF',
      },
      filledSecondary: {
        backgroundColor: palette.secondary,
        color: '#000000',
        fontWeight: 700,
      },
    },
  },

  MuiBadge: {
    styleOverrides: {
      badge: {
        backgroundColor: '#F0A500',
        color: '#000000',
      },
    },
  },

  MuiRating: {
    styleOverrides: {
      iconFilled: {
        color: '#F0A500',
      },
    },
  },

  MuiOutlinedInput: {
    styleOverrides: {
      root: {
        borderRadius: 10,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#EAE4F2',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.primary,
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: palette.primary ,
        },
      },
    },
  },

  MuiInputLabel: {
    styleOverrides: {
      root: {
        '&.Mui-focused': {
          color: palette.primary,
        },
      },
    },
  },

  MuiTabs: {
    styleOverrides: {
      indicator: {
        backgroundColor: palette.primary,
      },
    },
  },

  MuiTab: {
    styleOverrides: {
      root: {
        color: '#5C5C7A',
        '&.Mui-selected': {
          color: palette.primary,
        },
      },
    },
  },

  MuiStepIcon: {
    styleOverrides: {
      root: {
        color: '#EAE4F2',
        '&.Mui-active': {
          color: palette.primary,
        },
        '&.Mui-completed': {
          color: palette.primary,
        },
      },
    },
  },

  MuiLink: {
    styleOverrides: {
      root: {
        color: palette.primary,
        textDecoration: 'none',
        transition: 'color 0.2s ease',
        '&:hover': {
          color: palette.primary,
        },
      },
    },
  },

  MuiDivider: {
    styleOverrides: {
      root: {
        borderColor: '#EAE4F2',
      },
    },
  },

  MuiPaper: {
    styleOverrides: {
      root: {
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
      },
    },
  },
};
