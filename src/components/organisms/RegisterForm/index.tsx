import Link from "next/link";
import { useForm } from "react-hook-form";
import { theme } from "themes";
import styled from "styled-components";
import Input from "components/atoms/Input";
import Text from "components/atoms/Text";
import Button from "components/atoms/Button";

const InputWrapper = styled.div`
  margin: 10px auto;
  width: 80%;
`;
const ErrorMessageWrapper = styled.div`
  margin: 10px auto;
  width: 80%;
`;

const RegisterButtonWrapper = styled.div`
  margin: 10px auto;
  width: 80%;
`;

const TextWrapper = styled.div`
  margin: 10px auto;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: ${({theme}) => theme.colors.primary};
`

type RegisterFormData = {
  username: string;
  name: string;
  password: string;
};

type RegisterFormProps = {
  onRegister: (username: string, name: string, password: string) => void;
};

const RegisterForm = (props: RegisterFormProps) => {
  const { onRegister } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const onSubmit = (data: RegisterFormData) => {
    const { username, name, password } = data;
    onRegister(username, name, password);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <Input
          {...register("username", {
            required: {
              value: true,
              message: "ユーザー名が入力されていません",
            },
            minLength: {
              value: 5,
              message: "５文字以上で入力してください",
            },
            maxLength: {
              value: 25,
              message: "２５文字以下で入力してください",
            },
            pattern: {
              value: /^[0-9a-zA-Z]*$/,
              message: "英数字で入力してください",
            },
          })}
          name="username"
          type="text"
          placeholder="ユーザー名"
        />
      </InputWrapper>
      <ErrorMessageWrapper>
        {errors.username && (
          <Text color={theme.colors.danger}>{errors.username.message}</Text>
        )}
      </ErrorMessageWrapper>
      <InputWrapper>
        <Input
          {...register("name", {
            required: {
              value: true,
              message: "ニックネームが入力されていません",
            },
            maxLength: {
              value: 25,
              message: "２５文字以下で入力してください",
            },
          })}
          name="name"
          type="text"
          placeholder="ニックネーム"
        />
      </InputWrapper>
      <ErrorMessageWrapper>
        {errors.name && (
          <Text color={theme.colors.danger}>{errors.name.message}</Text>
        )}
      </ErrorMessageWrapper>
      <InputWrapper>
        <Input
          {...register("password", {
            required: {
              value: true,
              message: "パスワードが入力されていません",
            },
            minLength: {
              value: 6,
              message: "６文字以上で入力してください",
            },
            maxLength: {
              value: 25,
              message: "２５文字以下で入力してください",
            },
            pattern: {
              value: /^[0-9a-zA-Z]*$/,
              message: "英数字で入力してください",
            },
          })}
          name="password"
          type="password"
          placeholder="パスワード"
        />
      </InputWrapper>
      <ErrorMessageWrapper>
        {errors.password && (
          <Text color={theme.colors.danger}>{errors.password.message}</Text>
        )}
      </ErrorMessageWrapper>
      <RegisterButtonWrapper>
        <Button
          color="#fff"
          backgroundColor={theme.colors.primary}
          hbackgroundColor={theme.colors.primaryActive}
        >
          サインアップ
        </Button>
      </RegisterButtonWrapper>
            <TextWrapper>
        <Text>アカウントをお持ちの方は<StyledLink href="/signin">ログイン</StyledLink>してください。</Text>
      </TextWrapper>
    </form>
  );
};

export default RegisterForm;
