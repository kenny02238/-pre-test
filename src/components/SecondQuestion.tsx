import { useForm } from "../hooks/useForm";

export default function SecondQuestion() {
  interface LoginReq {
    account: string;
    pwd: string;
  }
  type ValidationRule<T> = {
    [K in keyof T]: (v: T[K]) => boolean;
  };
  const validationRules: ValidationRule<LoginReq> = {
    account: (v) => v.length > 8,
    pwd: (v) => v.length > 10,
  };
  const initialData: LoginReq = {
    account: "",
    pwd: "",
  };
  const [loginReq, formSetter, validationResult] = useForm(
    initialData,
    validationRules
  );

  const doSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validationResult.allFieldsValid()) {
      alert("所有表單驗證通過");
    }
  };

  return (
    <div>
      <form onSubmit={doSubmit}>
        <label htmlFor="account">Account</label>
        <input
          type="text"
          id="account"
          value={loginReq.account}
          onChange={formSetter.account}
        />
        <div className="invalid">
          {validationResult.account?.valid === true
            ? "驗證通過"
            : validationResult.account?.error}
        </div>

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={loginReq.pwd}
          onChange={formSetter.pwd}
        />
        <div className="invalid">
          {validationResult.pwd?.valid === true
            ? "驗證通過"
            : validationResult.pwd?.error}
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  );
}
