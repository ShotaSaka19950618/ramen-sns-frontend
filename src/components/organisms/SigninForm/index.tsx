import Link from "next/link";
import { useForm } from "react-hook-form";
import { theme } from "themes";
import styled from "styled-components";
import Input from "components/atoms/Input";
import Text from "components/atoms/Text";
import Button from "components/atoms/Button";

const FormWrapper = styled.form`
  width: 100%;
`

const InputWrapper = styled.div`
  margin: 20px auto;
  width: 65%;
`;
const ErrorMessageWrapper = styled.div`
  margin: 10px auto;
  width: 65%;
`;

const SigninButtonWrapper = styled.div`
  margin: 20px auto;
  width: 65%;
  height: 35px;
`;

const TextWrapper = styled.div`
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary};
`;

type SigninFormData = {
  username: string;
  password: string;
};

type SigninFormProps = {
  onSignin: (username: string, password: string) => void;
};

const SigninForm = (props: SigninFormProps) => {
  const { onSignin } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninFormData>();

  const onSubmit = (data: SigninFormData) => {
    const { username, password } = data;
    onSignin(username, password);
  };

  return (
    <FormWrapper onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <Input
          {...register("username", {
            required: {
              value: true,
              message: "ユーザー名が入力されていません",
            },
          })}
          name="username"
          type="text"
          placeholder="ユーザー名"
          borderBottom={`1px solid ${theme.colors.border}`}
          focusUnderline
        />
      </InputWrapper>
      <ErrorMessageWrapper>
        {errors.username && (
          <Text color={theme.colors.danger}>{errors.username.message}</Text>
        )}
      </ErrorMessageWrapper>
      <InputWrapper>
        <Input
          {...register("password", {
            required: {
              value: true,
              message: "パスワードが入力されていません",
            },
          })}
          name="password"
          type="password"
          placeholder="パスワード"
          borderBottom={`1px solid ${theme.colors.border}`}
          focusUnderline
        />
      </InputWrapper>
      <ErrorMessageWrapper>
        {errors.password && (
          <Text color={theme.colors.danger}>{errors.password.message}</Text>
        )}
      </ErrorMessageWrapper>
      <SigninButtonWrapper>
        <Button
          color="#fff"
          backgroundColor={theme.colors.primary}
          hbackgroundColor={theme.colors.primaryActive}
        >
          サインイン
        </Button>
      </SigninButtonWrapper>
      <TextWrapper>
        <Text>
          アカウントをお持ちでない場合は
          <StyledLink href="/register">登録</StyledLink>してください。
        </Text>
      </TextWrapper>
    </FormWrapper>
  );
};

export default SigninForm;
