import { styled } from '@mui/material/styles';

/**
 * フォームコンテナのスタイル
 * @type {import('@mui/material').StyledComponent}
 */
export const FormContainer = styled('div')(({ theme }) => ({
  maxWidth: 600,
  margin: '0 auto',
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[1],
}));

/**
 * フォームタイトルのスタイル
 * @type {import('@mui/material').StyledComponent}
 */
export const FormTitle = styled('h2')(({ theme }) => ({
  marginBottom: theme.spacing(3),
  color: theme.palette.text.primary,
  fontSize: '1.5rem',
  fontWeight: 600,
}));

/**
 * フォームフィールドのスタイル
 * @type {import('@mui/material').StyledComponent}
 */
export const FormField = styled('div')(({ theme }) => ({
  marginBottom: theme.spacing(2),
  '& .MuiTextField-root': {
    width: '100%',
  },
}));

/**
 * 送信ボタンのスタイル
 * @type {import('@mui/material').StyledComponent}
 */
export const SubmitButton = styled('button')(({ theme }) => ({
  width: '100%',
  marginTop: theme.spacing(3),
  padding: theme.spacing(1.5),
  backgroundColor: theme.palette.primary.main,
  color: theme.palette.primary.contrastText,
  border: 'none',
  borderRadius: theme.shape.borderRadius,
  cursor: 'pointer',
  transition: 'background-color 0.2s ease',
  '&:hover': {
    backgroundColor: theme.palette.primary.dark,
  },
  '&:disabled': {
    backgroundColor: theme.palette.action.disabled,
    cursor: 'not-allowed',
  },
}));

/**
 * エラーメッセージのスタイル
 * @type {import('@mui/material').StyledComponent}
 */
export const ErrorMessage = styled('div')(({ theme }) => ({
  color: theme.palette.error.main,
  fontSize: '0.875rem',
  marginTop: theme.spacing(0.5),
}));

/**
 * 成功メッセージのスタイル
 * @type {import('@mui/material').StyledComponent}
 */
export const SuccessMessage = styled('div')(({ theme }) => ({
  color: theme.palette.success.main,
  fontSize: '0.875rem',
  marginTop: theme.spacing(0.5),
}));

/**
 * ローディングインジケータのスタイル
 * @type {import('@mui/material').StyledComponent}
 */
export const LoadingIndicator = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: theme.spacing(2),
}));

/**
 * レスポンシブデザインのためのメディアクエリ
 */
export const mediaQueries = {
  mobile: '@media (max-width: 600px)',
  tablet: '@media (min-width: 601px) and (max-width: 960px)',
  desktop: '@media (min-width: 961px)',
};

/**
 * アニメーションの定義
 */
export const animations = {
  fadeIn: {
    animation: 'fadeIn 0.3s ease-in',
  },
  slideIn: {
    animation: 'slideIn 0.3s ease-out',
  },
};

/**
 * グローバルスタイルの定義
 */
export const globalStyles = {
  '@keyframes fadeIn': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  '@keyframes slideIn': {
    '0%': {
      transform: 'translateY(-10px)',
      opacity: 0,
    },
    '100%': {
      transform: 'translateY(0)',
      opacity: 1,
    },
  },
};