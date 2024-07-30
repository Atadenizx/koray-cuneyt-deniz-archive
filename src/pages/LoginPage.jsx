import LoginForm from "../auth/LoginForm";

function LoginPage() {
  return (
    <div className="mt-56 flex flex-col items-center justify-center">
      <div className="mb-4 text-xl font-bold text-gray-600">
        Admin Sayfasına Giriş Yap
      </div>
      <LoginForm />
    </div>
  );
}

export default LoginPage;
