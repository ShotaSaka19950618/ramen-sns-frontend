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

const SigninButtonWrapper = styled.div`
  margin: 10px auto;
  width: 80%;
`;

const TextWrapper = styled.div`
  margin: 0 auto;
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
    <form onSubmit={handleSubmit(onSubmit)}>
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
    </form>
  );
};

export default SigninForm;
