'use client'
import React, { useState } from 'react';
import {
  TextField,
  CircularProgress,
  InputAdornment,
} from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import {
  FormContainer,
  FormTitle,
  FormField,
  SubmitButton,
  ErrorMessage,
  SuccessMessage,
  LoadingIndicator,
  animations,
} from '../../styles/ContactForm';
import { MdPerson, MdEmail, MdSubject, MdMessage } from 'react-icons/md';

/**
 * @typedef {Object} ContactFormData
 * @property {string} name - ユーザーの名前（1-100文字）
 * @property {string} email - ユーザーのメールアドレス
 * @property {string} subject - 問い合わせの件名（1-100文字）
 * @property {string} message - 問い合わせの本文（10-1000文字）
 */

/**
 * バリデーションスキーマの定義
 * @type {z.ZodObject}
 */
const contactFormSchema = z.object({
  name: z.string()
    .min(1, '名前は必須です')
    .max(100, '名前は100文字以内で入力してください'),
  email: z.string()
    .min(1, 'メールアドレスは必須です')
    .email('正しいメールアドレスを入力してください'),
  subject: z.string()
    .min(1, '件名は必須です')
    .max(100, '件名は100文字以内で入力してください'),
  message: z.string()
    .min(10, '本文は10文字以上で入力してください')
    .max(1000, '本文は1000文字以内で入力してください'),
});

/**
 * 問い合わせフォームコンポーネント
 * @returns {JSX.Element} 問い合わせフォーム
 */
const ContactForm = () => {
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState('success' | 'error' | null);

  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  // セッション情報が変更されたときにフォームを更新
  useEffect(() => {
    if (session?.user) {
      setValue('name', session.user.name || '');
      setValue('email', session.user.email || '');
    }
  }, [session, setValue]);

  /**
   * フォーム送信時の処理
   * @param {ContactFormData} data - フォームデータ
   */
  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // TODO: APIエンドポイントの実装後にここでAPIを呼び出す
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('送信に失敗しました');
      }

      setSubmitStatus('success');
      reset();
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <FormContainer>
      <FormTitle>お問い合わせ</FormTitle>

      {submitStatus === 'success' && (
        <SuccessMessage style={animations.fadeIn}>
          お問い合わせを受け付けました。ありがとうございます。
        </SuccessMessage>
      )}

      {submitStatus === 'error' && (
        <ErrorMessage style={animations.fadeIn}>
          送信に失敗しました。時間をおいて再度お試しください。
        </ErrorMessage>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormField>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="お名前"
                fullWidth
                margin="normal"
                error={!!errors.name}
                helperText={errors.name?.message}
                disabled={isSubmitting}
                placeholder="例：しゃふろぐ"
                // ログイン状態の場合は編集可能
                InputProps={{
                  
                  readOnly: !session?.user,
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdPerson />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </FormField>

        <FormField>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="メールアドレス"
                type="email"
                fullWidth
                margin="normal"
                error={!!errors.email}
                helperText={errors.email?.message}
                disabled={isSubmitting}
                placeholder="例：shahulog@gmail.com"
                // ログイン状態の場合は編集可能
                InputProps={{
                  readOnly: !session?.user,
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdEmail />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </FormField>

        <FormField>
          <Controller
            name="subject"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="件名"
                fullWidth
                margin="normal"
                error={!!errors.subject}
                helperText={errors.subject?.message}
                disabled={isSubmitting}
                placeholder="例：Xでフォローしたのでフォロバしてください"
                // 件名フィールド
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdSubject />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </FormField>

        <FormField>
          <Controller
            name="message"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="本文"
                multiline
                rows={6}
                fullWidth
                margin="normal"
                error={!!errors.message}
                helperText={errors.message?.message}
                disabled={isSubmitting}
                placeholder="例：〇〇って名前です。今日中におねがいね。"
                // 本文フィールド
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <MdMessage />
                    </InputAdornment>
                  ),
                }}
              />
            )}
          />
        </FormField>

        <SubmitButton
          type="submit"
          disabled={isSubmitting}
          style={animations.slideIn}
        >
          {isSubmitting ? (
            <LoadingIndicator>
              <CircularProgress size={24} color="inherit" />
            </LoadingIndicator>
          ) : (
            '送信する'
          )}
        </SubmitButton>
      </form>
    </FormContainer>
  );
};

export default ContactForm;