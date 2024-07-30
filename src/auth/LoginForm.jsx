import { useForm } from "react-hook-form";
import useLogin from "./useLogin";
import Input from "../ui/Input";
import Button from "../ui/Button";

function LoginForm() {
  const { register, handleSubmit } = useForm();

  const { login, isLoading } = useLogin();

  function onSubmit(data) {
    login(data);
  }

  function onError(errors) {
    console.log(errors);
  }
  return (
    <form
      id="login-form"
      className="flex w-96 flex-col gap-2"
      onSubmit={handleSubmit(onSubmit, onError)}
    >
      <Input
        type={"email"}
        id={"email"}
        autoComplete="email"
        register={register}
        required={true}
        rules={{
          required: "This field is required",
        }}
      >
        Email
      </Input>

      <Input
        type={"password"}
        id={"password"}
        autoComplete="password"
        register={register}
        rules={{
          required: "This field is required",
        }}
      >
        Password
      </Input>
      <Button type={"primary"} disabled={isLoading}>
        Sign in
      </Button>
    </form>
  );
}

export default LoginForm;
